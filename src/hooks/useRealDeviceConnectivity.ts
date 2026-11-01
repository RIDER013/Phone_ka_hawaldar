import { useState, useEffect } from 'react';

export interface RealConnectivityState {
  isOnline: boolean;
  effectiveType: string; // '4g' | '3g' | '2g' | 'slow-2g' | 'wifi' | 'unknown'
  downlinkSpeedMbps: number; // e.g. 15.2 Mbps
  rttLatencyMs: number; // e.g. 35 ms
  saveData: boolean;
  batteryLevel: number | null; // 0 - 100
  isCharging: boolean | null;
  deviceRamGb: number; // e.g. 8 GB
  cpuCores: number; // e.g. 8 cores
  storageUsedMb: number;
  storageTotalMb: number;
  realPermissions: {
    geolocation: 'granted' | 'denied' | 'prompt' | 'unsupported';
    notifications: 'granted' | 'denied' | 'prompt' | 'unsupported';
    camera: 'granted' | 'denied' | 'prompt' | 'unsupported';
    microphone: 'granted' | 'denied' | 'prompt' | 'unsupported';
  };
}

export function useRealDeviceConnectivity() {
  const [connectivity, setConnectivity] = useState<RealConnectivityState>({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    effectiveType: '4g',
    downlinkSpeedMbps: 10,
    rttLatencyMs: 40,
    saveData: false,
    batteryLevel: null,
    isCharging: null,
    deviceRamGb: typeof navigator !== 'undefined' && (navigator as any).deviceMemory ? (navigator as any).deviceMemory : 8,
    cpuCores: typeof navigator !== 'undefined' && navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 8,
    storageUsedMb: 450,
    storageTotalMb: 64000,
    realPermissions: {
      geolocation: 'prompt',
      notifications: 'prompt',
      camera: 'prompt',
      microphone: 'prompt'
    }
  });

  // 1. Listen to real online/offline events
  useEffect(() => {
    const handleOnline = () => {
      setConnectivity((prev) => ({ ...prev, isOnline: true }));
    };

    const handleOffline = () => {
      setConnectivity((prev) => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 2. Real Network Information API (navigator.connection)
  useEffect(() => {
    const navConn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

    const updateNetworkInfo = () => {
      if (navConn) {
        setConnectivity((prev) => ({
          ...prev,
          effectiveType: navConn.effectiveType || '4g',
          downlinkSpeedMbps: navConn.downlink !== undefined ? navConn.downlink : 12,
          rttLatencyMs: navConn.rtt !== undefined ? navConn.rtt : 45,
          saveData: Boolean(navConn.saveData),
        }));
      }
    };

    updateNetworkInfo();

    if (navConn) {
      navConn.addEventListener('change', updateNetworkInfo);
      return () => {
        navConn.removeEventListener('change', updateNetworkInfo);
      };
    }
  }, []);

  // 3. Real Web Battery API (navigator.getBattery)
  useEffect(() => {
    let batteryApi: any = null;

    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        batteryApi = battery;
        const updateBattery = () => {
          setConnectivity((prev) => ({
            ...prev,
            batteryLevel: Math.round(battery.level * 100),
            isCharging: battery.charging,
          }));
        };

        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
      }).catch(() => {
        // Battery API might be restricted in some iframes
      });
    }

    return () => {
      if (batteryApi) {
        try {
          batteryApi.removeEventListener('levelchange', () => {});
          batteryApi.removeEventListener('chargingchange', () => {});
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // 4. Real Storage Estimate API
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate) {
      navigator.storage.estimate().then((est) => {
        if (est.usage !== undefined && est.quota !== undefined) {
          setConnectivity((prev) => ({
            ...prev,
            storageUsedMb: Math.round(est.usage! / (1024 * 1024)),
            storageTotalMb: Math.round(est.quota! / (1024 * 1024)),
          }));
        }
      }).catch(() => {});
    }
  }, []);

  // 5. Real Permissions Query
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.permissions && navigator.permissions.query) {
      const permsToCheck: Array<{ key: keyof RealConnectivityState['realPermissions']; name: PermissionName }> = [
        { key: 'geolocation', name: 'geolocation' as PermissionName },
        { key: 'notifications', name: 'notifications' as PermissionName },
      ];

      permsToCheck.forEach(({ key, name }) => {
        navigator.permissions.query({ name }).then((status) => {
          setConnectivity((prev) => ({
            ...prev,
            realPermissions: {
              ...prev.realPermissions,
              [key]: status.state,
            },
          }));

          status.onchange = () => {
            setConnectivity((prev) => ({
              ...prev,
              realPermissions: {
                ...prev.realPermissions,
                [key]: status.state,
              },
            }));
          };
        }).catch(() => {
          setConnectivity((prev) => ({
            ...prev,
            realPermissions: {
              ...prev.realPermissions,
              [key]: 'unsupported',
            },
          }));
        });
      });
    }
  }, []);

  // 6. Periodic Real Live Ping Latency Test
  useEffect(() => {
    const measureLivePing = async () => {
      if (!navigator.onLine) {
        setConnectivity((prev) => ({ ...prev, rttLatencyMs: 0 }));
        return;
      }

      const start = performance.now();
      try {
        // Lightweight cache-busted fetch to test real round-trip network response
        await fetch(`/favicon.ico?_ping=${Date.now()}`, { method: 'HEAD', cache: 'no-store' });
        const latency = Math.round(performance.now() - start);
        setConnectivity((prev) => ({
          ...prev,
          rttLatencyMs: Math.max(5, Math.min(999, latency)),
        }));
      } catch {
        // fallback
      }
    };

    measureLivePing();
    const interval = setInterval(measureLivePing, 8000);
    return () => clearInterval(interval);
  }, []);

  return connectivity;
}
