import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Battery, 
  BatteryCharging, 
  Wifi, 
  WifiOff, 
  Gamepad2, 
  CheckCircle2, 
  StopCircle, 
  Activity, 
  Cpu, 
  HardDrive, 
  Smartphone,
  Lock,
  Unlock,
  Trash2,
  AlertTriangle,
  X,
  Radio,
  Globe,
  Key
} from 'lucide-react';

interface AppModel {
  id: string;
  name: string;
  packageName: string;
  version: string;
  category: 'installed' | 'system';
  isRunning: boolean;
  ramUsageMb: number;
  batteryUsedMah: number;
  currentSpeedKbps: number;
  todayInternetMb: number;
  permissions: string[];
}

const initialApps: AppModel[] = [
  { id: '1', name: 'WhatsApp', packageName: 'com.whatsapp', version: '2.24.10', category: 'installed', isRunning: true, ramUsageMb: 245, batteryUsedMah: 180, currentSpeedKbps: 145, todayInternetMb: 340, permissions: ['Camera', 'Mic', 'Contacts', 'Storage', 'Location'] },
  { id: '2', name: 'Instagram', packageName: 'com.instagram.android', version: '312.0', category: 'installed', isRunning: true, ramUsageMb: 380, batteryUsedMah: 320, currentSpeedKbps: 450, todayInternetMb: 890, permissions: ['Camera', 'Location', 'Storage', 'Contacts'] },
  { id: '3', name: 'BGMI', packageName: 'com.pubg.imgi', version: '3.1.0', category: 'installed', isRunning: false, ramUsageMb: 0, batteryUsedMah: 45, currentSpeedKbps: 0, todayInternetMb: 120, permissions: ['Storage', 'Mic', 'Network'] },
  { id: '4', name: 'YouTube', packageName: 'com.google.android.youtube', version: '19.14', category: 'installed', isRunning: true, ramUsageMb: 310, batteryUsedMah: 410, currentSpeedKbps: 1200, todayInternetMb: 1650, permissions: ['Network', 'Storage', 'Display'] },
  { id: '5', name: 'Spotify', packageName: 'com.spotify.music', version: '8.9.30', category: 'installed', isRunning: false, ramUsageMb: 0, batteryUsedMah: 30, currentSpeedKbps: 0, todayInternetMb: 210, permissions: ['Audio', 'Storage', 'Network'] },
  { id: '6', name: 'Android System', packageName: 'android', version: '14.0', category: 'system', isRunning: true, ramUsageMb: 850, batteryUsedMah: 950, currentSpeedKbps: 45, todayInternetMb: 520, permissions: ['Root', 'All Hardware', 'Sensors'] },
  { id: '7', name: 'Google Play Services', packageName: 'com.google.android.gms', version: '24.12', category: 'system', isRunning: true, ramUsageMb: 420, batteryUsedMah: 280, currentSpeedKbps: 20, todayInternetMb: 310, permissions: ['Location', 'Network', 'Accounts'] },
  { id: '8', name: 'System UI', packageName: 'com.android.systemui', version: '14.0', category: 'system', isRunning: true, ramUsageMb: 290, batteryUsedMah: 210, currentSpeedKbps: 0, todayInternetMb: 15, permissions: ['Display', 'Overlay', 'Notifications'] },
];

export default function App() {
  const [apps, setApps] = useState<AppModel[]>(initialApps);
  const [activeTab, setActiveTab] = useState<'installed' | 'system'>('installed');
  const [isFocusActive, setIsFocusActive] = useState<boolean>(false);
  const [selectedApp, setSelectedApp] = useState<AppModel | null>(null);
  const [storageUsedGb, setStorageUsedGb] = useState<number>(48);
  const storageTotalGb = 128;

  const [batteryLevel, setBatteryLevel] = useState<number>(87);
  const [isCharging, setIsCharging] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  // Live simulation ticker for speeds & battery drain
  useEffect(() => {
    const timer = setInterval(() => {
      setApps((prev) =>
        prev.map((app) => {
          if (!app.isRunning) return app;
          const speedFluctuation = Math.max(0, app.currentSpeedKbps + Math.floor((Math.random() - 0.5) * 50));
          return {
            ...app,
            currentSpeedKbps: speedFluctuation,
            batteryUsedMah: app.batteryUsedMah + 1,
            todayInternetMb: app.todayInternetMb + (speedFluctuation > 100 ? 2 : 0),
          };
        })
      );
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleApp = (id: string) => {
    setApps((prev) =>
      prev.map((app) => {
        if (app.id !== id) return app;
        const nextRunning = !app.isRunning;
        return {
          ...app,
          isRunning: nextRunning,
          ramUsageMb: nextRunning ? Math.floor(Math.random() * 200) + 120 : 0,
          currentSpeedKbps: nextRunning ? Math.floor(Math.random() * 300) + 50 : 0,
        };
      })
    );
  };

  const handleToggleFocusMode = () => {
    const nextFocus = !isFocusActive;
    setIsFocusActive(nextFocus);
    if (nextFocus) {
      setApps((prev) =>
        prev.map((app) => (app.category === 'installed' ? { ...app, isRunning: false, ramUsageMb: 0, currentSpeedKbps: 0 } : app))
      );
    }
  };

  const filteredApps = apps.filter((a) => a.category === activeTab);
  const activeCount = filteredApps.filter((a) => a.isRunning).length;
  const totalCount = filteredApps.length;

  return (
    <div className="min-h-screen bg-[#090604] text-white font-sans flex flex-col items-center justify-center p-2 sm:p-6 select-none">
      {/* Immersive Phone Frame Mockup */}
      <div className="w-full max-w-md h-[92vh] max-h-[880px] rounded-[44px] bg-gradient-to-b from-[#2C1B06] via-[#120D08] to-[#090604] border-[6px] border-[#2A241F] shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Android Status Bar */}
        <div className="w-full px-6 pt-3 pb-1 flex justify-between items-center text-[11px] font-mono text-white/50">
          <span>02:01</span>
          <div className="w-20 h-4 bg-black/40 rounded-full mx-auto" />
          <div className="flex items-center gap-1.5">
            <span>5G</span>
            <div className="w-5 h-2.5 border border-white/50 rounded-xs p-0.5 flex items-center">
              <div className="h-full w-3.5 bg-emerald-400 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* APK Header (Clean text header without any icons) */}
        <div className="px-5 pt-3 pb-2 flex justify-between items-center border-b border-white/15">
          <div>
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
              Hawaldar <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#E89F1F]/20 text-[#E89F1F] border border-[#E89F1F]/30">v1.0</span>
            </h1>
            <p className="text-[10px] font-mono text-[#E89F1F]">Security & Sentinel</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-xl bg-black/50 border border-[#E89F1F]/40 flex items-center gap-1.5 font-mono text-xs">
              <Battery className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-bold text-white">{batteryLevel}%</span>
            </div>

            <div className="px-2.5 py-1 rounded-xl bg-black/50 border border-emerald-400/40 flex items-center gap-1.5 font-mono text-xs">
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold text-white">5G</span>
            </div>
          </div>
        </div>

        {/* Dashboard Controls Row */}
        <div className="p-4 space-y-3 flex-1 flex flex-col overflow-hidden">
          <div className="flex gap-3">
            <button
              onClick={handleToggleFocusMode}
              className={`flex-1 p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer active:scale-98 ${
                isFocusActive
                  ? 'bg-emerald-500/20 border-emerald-400/60 shadow-lg shadow-emerald-500/20'
                  : 'bg-black/40 border-white/15 hover:border-[#E89F1F]/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl ${isFocusActive ? 'bg-emerald-400 text-black' : 'bg-[#E89F1F]/20 text-[#E89F1F]'}`}>
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Focus Mode</div>
                  <div className="text-[10px] font-mono text-white/60">
                    {isFocusActive ? 'Active Protection' : 'Tap to Enable'}
                  </div>
                </div>
              </div>
              {isFocusActive && <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />}
            </button>

            <div className="p-1 bg-black/40 rounded-2xl border border-white/15 flex items-center gap-1">
              <button
                onClick={() => setActiveTab('installed')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'installed' ? 'bg-[#E89F1F] text-black shadow-md' : 'text-white/60 hover:text-white'
                }`}
              >
                Installed
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'system' ? 'bg-sky-400 text-black shadow-md' : 'text-white/60 hover:text-white'
                }`}
              >
                System
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center px-1 text-[10px] font-mono text-white/60 uppercase">
            <span>{activeTab} Apps ({activeCount} active / {totalCount} total)</span>
            <span className="text-[#E89F1F]">Storage: {storageUsedGb}GB / {storageTotalGb}GB</span>
          </div>

          {/* App List (Tapping opens telemetry & permissions inspection modal) */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin scrollbar-thumb-white/20">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className="p-3 rounded-2xl bg-black/40 border border-white/12 hover:border-[#E89F1F]/60 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleApp(app.id);
                    }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      app.isRunning ? 'bg-emerald-400/20 text-emerald-400' : 'bg-white/10 text-white/40'
                    }`}
                    title="Click to Stop/Resume App"
                  >
                    {app.isRunning ? <CheckCircle2 className="w-5 h-5" /> : <StopCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#E89F1F] transition-colors">{app.name}</div>
                    <div className="text-[9px] font-mono text-white/50">{app.packageName} • v{app.version}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-[11px] font-mono font-bold ${app.isRunning ? 'text-sky-400' : 'text-white/30'}`}>
                    {app.isRunning ? `${app.ramUsageMb} MB` : 'Stopped'}
                  </div>
                  <div className="text-[9px] font-mono text-[#E89F1F]">
                    Tap for Stats & Permissions
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="py-3 text-center border-t border-white/10 bg-black/30">
          <p className="text-[10px] font-mono tracking-widest text-white/60 lowercase">
            created by rider
          </p>
        </div>

        {/* Deep-Dive App Inspection Modal (Battery Used, Speed, Internet, Permissions) */}
        {selectedApp && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-end p-4 animate-in fade-in duration-200">
            <div className="w-full bg-[#18110B] border border-[#E89F1F]/40 rounded-3xl p-5 space-y-4 shadow-2xl relative max-h-[85vh] overflow-y-auto">
              
              <button 
                onClick={() => setSelectedApp(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 pr-8">
                <div className="w-12 h-12 rounded-2xl bg-[#E89F1F]/20 border border-[#E89F1F]/40 flex items-center justify-center text-[#E89F1F] font-bold text-lg">
                  {selectedApp.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">{selectedApp.name}</h2>
                  <p className="text-[10px] font-mono text-white/50">{selectedApp.packageName}</p>
                </div>
              </div>

              {/* Telemetry Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 font-mono">
                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-sky-400">
                    <Battery className="w-3.5 h-3.5" />
                    <span>Battery Used</span>
                  </div>
                  <div className="text-sm font-bold text-white">{selectedApp.batteryUsedMah} mAh</div>
                  <div className="text-[9px] text-white/50">Today's power draw</div>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    <span>Current Speed</span>
                  </div>
                  <div className="text-sm font-bold text-white">{selectedApp.currentSpeedKbps} KB/s</div>
                  <div className="text-[9px] text-white/50">Live network rate</div>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1 col-span-2">
                  <div className="flex items-center gap-1.5 text-xs text-amber-300">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Total Internet Used Today</span>
                  </div>
                  <div className="text-base font-bold text-white">{selectedApp.todayInternetMb} MB</div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1">
                    <div 
                      className="bg-amber-400 h-full rounded-full transition-all" 
                      style={{ width: `${Math.min(100, (selectedApp.todayInternetMb / 2000) * 100)}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* Permissions Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-white/70">
                  <Key className="w-3.5 h-3.5 text-[#E89F1F]" />
                  <span>Required & Requested Permissions</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedApp.permissions.map((perm, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-xl bg-black/50 border border-white/15 text-[11px] font-mono text-[#E89F1F]"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    handleToggleApp(selectedApp.id);
                    setSelectedApp(null);
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    selectedApp.isRunning 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30' 
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                  }`}
                >
                  {selectedApp.isRunning ? 'Force Stop App' : 'Resume App'}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
