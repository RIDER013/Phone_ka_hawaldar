import React, { useState, useEffect } from 'react';
import { initialAppsData } from './data/mockApps';
import { AppItem, ActiveTab, PermissionType } from './types';
import { Header } from './components/Header';
import { AppCard } from './components/AppCard';
import { AppDetailModal } from './components/AppDetailModal';
import { GameFocusModal } from './components/GameFocusModal';
import { Gamepad2, Smartphone, Cpu, Activity, Zap } from 'lucide-react';

export default function App() {
  const [apps, setApps] = useState<AppItem[]>(initialAppsData);
  const [activeTab, setActiveTab] = useState<ActiveTab>('installed');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [isFocusModalOpen, setIsFocusModalOpen] = useState<boolean>(false);
  const [isFocusActive, setIsFocusActive] = useState<boolean>(false);

  // Real-time live simulation engine (fluctuates mA live draw and active speed)
  useEffect(() => {
    const interval = setInterval(() => {
      setApps((prevApps) =>
        prevApps.map((app) => {
          if (app.state === 'stopped') return app;

          const jitter = (Math.random() - 0.48) * 8;
          const newDraw = Math.max(10, Math.round(app.battery.liveDrawMa + jitter));
          const newSpeed = Math.max(0, Math.round(app.dataUsage.currentSpeedKbps + (Math.random() - 0.5) * 10));

          const currentHistory = [...app.battery.history];
          if (currentHistory.length > 0) {
            currentHistory[currentHistory.length - 1] = {
              ...currentHistory[currentHistory.length - 1],
              drawMa: newDraw,
            };
          }

          return {
            ...app,
            battery: {
              ...app.battery,
              liveDrawMa: newDraw,
              history: currentHistory,
            },
            dataUsage: {
              ...app.dataUsage,
              currentSpeedKbps: newSpeed,
            },
          };
        })
      );
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  // Handler: Toggle Force Stop / Resume
  const handleToggleForceStop = (appId: string) => {
    setApps((prevApps) =>
      prevApps.map((app) => {
        if (app.id !== appId) return app;

        if (app.state === 'stopped') {
          return {
            ...app,
            state: app.category === 'system' ? 'foreground' : 'background',
            battery: {
              ...app.battery,
              liveDrawMa: Math.max(40, Math.round(app.battery.totalMah / 5)),
            },
            ramMb: Math.max(120, app.ramMb || 180),
          };
        } else {
          return {
            ...app,
            state: 'stopped',
            battery: {
              ...app.battery,
              liveDrawMa: 0,
            },
            cpuPercent: 0,
            dataUsage: {
              ...app.dataUsage,
              currentSpeedKbps: 0,
            },
          };
        }
      })
    );
  };

  // Handler: Clear Cache
  const handleClearCache = (appId: string) => {
    setApps((prevApps) =>
      prevApps.map((app) => {
        if (app.id !== appId) return app;

        const freedMb = app.storage.cacheMb;
        return {
          ...app,
          storage: {
            ...app.storage,
            totalMb: Math.max(10, app.storage.totalMb - freedMb),
            cacheMb: 0,
          },
        };
      })
    );
  };

  // Handler: Toggle Permission
  const handleTogglePermission = (appId: string, permType: PermissionType) => {
    setApps((prevApps) =>
      prevApps.map((app) => {
        if (app.id !== appId) return app;

        const updatedPermissions = app.permissions.map((p) => {
          if (p.type !== permType) return p;
          const willBeGranted = !p.granted;
          return {
            ...p,
            granted: willBeGranted,
            isCurrentlyActive: willBeGranted ? p.isCurrentlyActive : false,
            lastAccessedTime: willBeGranted ? 'Granted by user' : 'Revoked by user',
          };
        });

        return {
          ...app,
          permissions: updatedPermissions,
        };
      })
    );
  };

  // Handler: Toggle Background Restriction
  const handleToggleBackgroundRestriction = (appId: string) => {
    setApps((prevApps) =>
      prevApps.map((app) => {
        if (app.id !== appId) return app;
        const newRestricted = !app.isBackgroundRestricted;
        return {
          ...app,
          isBackgroundRestricted: newRestricted,
          battery: {
            ...app.battery,
            liveDrawMa: newRestricted ? Math.round(app.battery.liveDrawMa * 0.4) : Math.round(app.battery.liveDrawMa * 1.5),
          },
        };
      })
    );
  };

  // Handler: Apply Focus Mode (batch stop selected installed apps)
  const handleApplyFocusMode = (selectedAppIdsToStop: string[]) => {
    setApps((prevApps) =>
      prevApps.map((app) => {
        if (selectedAppIdsToStop.includes(app.id)) {
          return {
            ...app,
            state: 'stopped',
            battery: {
              ...app.battery,
              liveDrawMa: 0,
            },
            cpuPercent: 0,
            dataUsage: {
              ...app.dataUsage,
              currentSpeedKbps: 0,
            },
          };
        }
        return app;
      })
    );
    setIsFocusActive(true);
  };

  const handleTurnOffFocusMode = () => {
    setIsFocusActive(false);
  };

  // Filter apps strictly by activeTab and sort active apps at the top, stopped/off apps at the bottom
  const currentListApps = apps
    .filter((a) => a.category === activeTab)
    .sort((a, b) => {
      const aActive = a.state !== 'stopped';
      const bActive = b.state !== 'stopped';

      if (aActive && !bActive) return -1;
      if (!aActive && bActive) return 1;

      if (aActive && bActive) {
        if (a.state === 'foreground' && b.state !== 'foreground') return -1;
        if (a.state !== 'foreground' && b.state === 'foreground') return 1;
        return b.battery.liveDrawMa - a.battery.liveDrawMa;
      }

      return 0;
    });

  const selectedApp = apps.find((a) => a.id === selectedAppId) || null;

  const activeListApps = currentListApps.filter((a) => a.state !== 'stopped');
  const stoppedListApps = currentListApps.filter((a) => a.state === 'stopped');

  // Count totals for bottom right and summary panel
  const installedTotal = apps.filter((a) => a.category === 'installed').length;
  const installedActive = apps.filter((a) => a.category === 'installed' && a.state !== 'stopped').length;
  const systemTotal = apps.filter((a) => a.category === 'system').length;
  const systemActive = apps.filter((a) => a.category === 'system' && a.state !== 'stopped').length;

  return (
    <div 
      className="min-h-screen text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black relative bg-no-repeat bg-center bg-fixed bg-cover overflow-hidden"
      style={{
        backgroundColor: '#e89f1f',
        backgroundImage: `url('/assets/aistudio/image_6290b92a.png')`,
      }}
    >
      {/* Header: Phone ka Hawaldar & Tabs */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Screen: Unified Dashboard / Preview layout ("ekach fill") */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 md:px-8 py-2 flex justify-between items-start overflow-hidden">
        {/* Left Side: Game Mode & Status widgets ("ekdam normal varti ghe") */}
        <div className="flex flex-col items-start gap-3 z-20 w-48 sm:w-56 pt-0">
          <button
            type="button"
            onClick={() => setIsFocusModalOpen(true)}
            className="w-full group flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-black/30 hover:bg-black/45 backdrop-blur-xl border border-white/15 hover:border-amber-400/40 shadow-xl transition-all cursor-pointer text-left active:scale-[0.98]"
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isFocusActive
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-400/30'
                    : 'bg-white/10 text-amber-300 group-hover:bg-amber-400/20'
                }`}
              >
                <Gamepad2 className="w-4 h-4" />
              </div>
              <span className="text-[12px] font-semibold text-white tracking-wide group-hover:text-amber-200">
                Focus Mode
              </span>
            </div>
            {isFocusActive && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          {/* Unified Preview / Status Card ("ekach fill") */}
          <div className="w-full p-3 rounded-2xl bg-black/25 backdrop-blur-md border border-white/15 space-y-2 text-[11px] font-mono">
            <div className="flex items-center justify-between text-white/70 border-b border-white/10 pb-1.5">
              <span className="lowercase">category</span>
              <span className="text-amber-300 font-semibold uppercase">{activeTab}</span>
            </div>
            <div className="flex items-center justify-between text-white/80">
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-amber-300" />
                <span>Installed</span>
              </div>
              <span className="font-bold">{installedActive}/{installedTotal}</span>
            </div>
            <div className="flex items-center justify-between text-white/80">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-300" />
                <span>System</span>
              </div>
              <span className="font-bold">{systemActive}/{systemTotal}</span>
            </div>
          </div>
        </div>

        {/* Right side vertical flowing app cards dock */}
        <div className="flex flex-col items-end gap-2.5 max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-none py-1 px-1">
          {/* Active Header & Active Apps */}
          {activeListApps.length > 0 && (
            <div className="flex flex-col items-end gap-1.5 w-full">
              <span className="text-[11px] font-mono tracking-widest lowercase text-white/50 select-none px-1">
                active
              </span>
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2.5 items-end">
                {activeListApps.map((app) => (
                  <AppCard
                    key={app.id}
                    app={app}
                    onSelect={(selected) => setSelectedAppId(selected.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Stopped Apps */}
          {stoppedListApps.length > 0 && (
            <div className="flex flex-col items-end gap-1.5 w-full pt-1">
              <span className="text-[10px] font-mono tracking-wider lowercase text-white/30 select-none px-1">
                stopped
              </span>
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2.5 items-end">
                {stoppedListApps.map((app) => (
                  <AppCard
                    key={app.id}
                    app={app}
                    onSelect={(selected) => setSelectedAppId(selected.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Deep-Dive Inspection Modal */}
      {selectedApp && (
        <AppDetailModal
          app={selectedApp}
          onClose={() => setSelectedAppId(null)}
          onTogglePermission={handleTogglePermission}
          onToggleForceStop={handleToggleForceStop}
          onClearCache={handleClearCache}
          onToggleBackgroundRestriction={handleToggleBackgroundRestriction}
        />
      )}

      {/* Game / Focus Mode Modal */}
      <GameFocusModal
        apps={apps}
        isOpen={isFocusModalOpen}
        isFocusActive={isFocusActive}
        onClose={() => setIsFocusModalOpen(false)}
        onApply={handleApplyFocusMode}
        onTurnOffFocus={handleTurnOffFocusMode}
      />

      {/* Footer: "created by rider" at bottom center in one line */}
      <footer className="relative z-10 mt-auto py-3 px-4 md:px-8 flex justify-center items-center w-full">
        <div className="flex justify-center select-none">
          <p className="text-[10px] sm:text-[11px] text-white/60 lowercase tracking-widest font-mono drop-shadow-sm whitespace-nowrap">
            created by rider
          </p>
        </div>
      </footer>
    </div>
  );
}

