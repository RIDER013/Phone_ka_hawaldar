import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Battery, 
  Wifi, 
  WifiOff, 
  Gamepad2, 
  CheckCircle2, 
  StopCircle, 
  Activity, 
  Cpu, 
  HardDrive, 
  Smartphone,
  X,
  Radio,
  Globe,
  Key,
  Power,
  Bluetooth,
  MapPin,
  RefreshCw,
  Server
} from 'lucide-react';

interface AppModel {
  id: string;
  name: string;
  packageName: string;
  version: string;
  category: 'installed' | 'system';
  isRunning: boolean;
  ramUsageMb: number;
  batteryDrawMa: number;
  batteryUsedMah: number;
  currentSpeedKbps: number;
  todayInternetMb: number;
  permissions: string[];
}

interface SystemToggle {
  id: string;
  name: string;
  isActive: boolean;
  icon: any;
}

const initialApps: AppModel[] = [
  { id: '1', name: 'WhatsApp', packageName: 'com.whatsapp', version: '2.24.10', category: 'installed', isRunning: true, ramUsageMb: 245, batteryDrawMa: 42, batteryUsedMah: 180, currentSpeedKbps: 145, todayInternetMb: 340, permissions: ['Camera', 'Mic', 'Contacts', 'Storage', 'Location'] },
  { id: '2', name: 'Instagram', packageName: 'com.instagram.android', version: '312.0', category: 'installed', isRunning: true, ramUsageMb: 380, batteryDrawMa: 65, batteryUsedMah: 320, currentSpeedKbps: 450, todayInternetMb: 890, permissions: ['Camera', 'Location', 'Storage', 'Contacts'] },
  { id: '3', name: 'BGMI', packageName: 'com.pubg.imgi', version: '3.1.0', category: 'installed', isRunning: false, ramUsageMb: 0, batteryDrawMa: 0, batteryUsedMah: 45, currentSpeedKbps: 0, todayInternetMb: 120, permissions: ['Storage', 'Mic', 'Network'] },
  { id: '4', name: 'YouTube', packageName: 'com.google.android.youtube', version: '19.14', category: 'installed', isRunning: true, ramUsageMb: 310, batteryDrawMa: 55, batteryUsedMah: 410, currentSpeedKbps: 1200, todayInternetMb: 1650, permissions: ['Network', 'Storage', 'Display'] },
  { id: '5', name: 'Spotify', packageName: 'com.spotify.music', version: '8.9.30', category: 'installed', isRunning: false, ramUsageMb: 0, batteryDrawMa: 0, batteryUsedMah: 30, currentSpeedKbps: 0, todayInternetMb: 210, permissions: ['Audio', 'Storage', 'Network'] },
  { id: '6', name: 'Android System', packageName: 'android', version: '14.0', category: 'system', isRunning: true, ramUsageMb: 850, batteryDrawMa: 90, batteryUsedMah: 950, currentSpeedKbps: 45, todayInternetMb: 520, permissions: ['Root', 'All Hardware', 'Sensors'] },
  { id: '7', name: 'Google Play Services', packageName: 'com.google.android.gms', version: '24.12', category: 'system', isRunning: true, ramUsageMb: 420, batteryDrawMa: 30, batteryUsedMah: 280, currentSpeedKbps: 20, todayInternetMb: 310, permissions: ['Location', 'Network', 'Accounts'] },
  { id: '8', name: 'System UI', packageName: 'com.android.systemui', version: '14.0', category: 'system', isRunning: true, ramUsageMb: 290, batteryDrawMa: 25, batteryUsedMah: 210, currentSpeedKbps: 0, todayInternetMb: 15, permissions: ['Display', 'Overlay', 'Notifications'] },
];

export default function App() {
  const [apps, setApps] = useState<AppModel[]>(initialApps);
  const [activeTab, setActiveTab] = useState<'installed' | 'system'>('installed');
  const [isFocusModalOpen, setIsFocusModalOpen] = useState<boolean>(false);
  const [selectedApp, setSelectedApp] = useState<AppModel | null>(null);
  const [isFocusActive, setIsFocusActive] = useState<boolean>(false);

  // System Toggles state
  const [systemToggles, setSystemToggles] = useState<SystemToggle[]>([
    { id: 'wifi', name: 'Wi-Fi High Performance', isActive: true, icon: Wifi },
    { id: 'bluetooth', name: 'Bluetooth Scanner', isActive: true, icon: Bluetooth },
    { id: 'gps', name: 'GPS Location Services', isActive: true, icon: MapPin },
    { id: 'sync', name: 'Auto-Sync Data', isActive: true, icon: RefreshCw },
    { id: 'background', name: 'Background Data Sync', isActive: true, icon: Server },
  ]);

  const [batteryLevel] = useState<number>(87);
  const [storageUsedGb] = useState<number>(48);
  const storageTotalGb = 128;

  // Live simulation ticker
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
          batteryDrawMa: nextRunning ? Math.floor(Math.random() * 50) + 20 : 0,
          currentSpeedKbps: nextRunning ? Math.floor(Math.random() * 300) + 50 : 0,
        };
      })
    );
  };

  const handleApplyFocusMode = (selectedIdsToStop: string[], togglesToTurnOff: string[]) => {
    setApps((prev) =>
      prev.map((app) => {
        if (selectedIdsToStop.includes(app.id)) {
          return {
            ...app,
            isRunning: false,
            ramUsageMb: 0,
            batteryDrawMa: 0,
            currentSpeedKbps: 0,
          };
        }
        return app;
      })
    );

    setSystemToggles((prev) =>
      prev.map((toggle) => ({
        ...toggle,
        isActive: togglesToTurnOff.includes(toggle.id) ? false : toggle.isActive,
      }))
    );

    setIsFocusActive(true);
    setIsFocusModalOpen(false);
  };

  const filteredApps = apps
    .filter((a) => a.category === activeTab)
    .sort((a, b) => {
      if (a.isRunning && !b.isRunning) return -1;
      if (!a.isRunning && b.isRunning) return 1;
      return 0;
    });

  const activeCount = filteredApps.filter((a) => a.isRunning).length;
  const totalCount = filteredApps.length;

  return (
    <div className="min-h-screen w-full bg-[#090604] text-white font-sans flex flex-col selection:bg-amber-400 selection:text-black">
      
      {/* Full-Screen Immersive App Container */}
      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col p-4 sm:p-6">
        
        {/* Header */}
        <header className="py-4 px-2 flex justify-between items-center border-b border-white/15">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/aistudio/file_000000004fd08210969fc7f45c4a83e2_3fdb1851.png" 
              alt="App Icon" 
              className="w-11 h-11 rounded-2xl border border-[#E89F1F]/40 object-cover shadow-lg"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                Hawaldar <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E89F1F]/20 text-[#E89F1F] border border-[#E89F1F]/30">v1.0</span>
              </h1>
              <p className="text-xs font-mono text-[#E89F1F]">Security & Sentinel</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-black/50 border border-[#E89F1F]/40 flex items-center gap-2 font-mono text-xs sm:text-sm">
              <Battery className="w-4 h-4 text-sky-400" />
              <span className="font-bold text-white">{batteryLevel}%</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-black/50 border border-emerald-400/40 flex items-center gap-2 font-mono text-xs sm:text-sm">
              <Wifi className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white">5G Active</span>
            </div>
          </div>
        </header>

        {/* Dashboard Controls Row */}
        <main className="py-4 space-y-4 flex-1 flex flex-col">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsFocusModalOpen(true)}
              className={`flex-1 p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer active:scale-98 ${
                isFocusActive
                  ? 'bg-emerald-500/20 border-emerald-400/60 shadow-lg shadow-emerald-500/20'
                  : 'bg-black/40 border-white/15 hover:border-[#E89F1F]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${isFocusActive ? 'bg-emerald-400 text-black' : 'bg-[#E89F1F]/20 text-[#E89F1F]'}`}>
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white">Focus Mode</div>
                  <div className="text-xs font-mono text-white/60">
                    {isFocusActive ? 'Active Protection & Toggles Optimized' : 'Tap to Configure Apps & System Toggles'}
                  </div>
                </div>
              </div>
              {isFocusActive && <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />}
            </button>

            <div className="p-1.5 bg-black/40 rounded-2xl border border-white/15 flex items-center gap-1.5 self-center sm:self-auto">
              <button
                onClick={() => setActiveTab('installed')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'installed' ? 'bg-[#E89F1F] text-black shadow-md' : 'text-white/60 hover:text-white'
                }`}
              >
                Installed Apps
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'system' ? 'bg-sky-400 text-black shadow-md' : 'text-white/60 hover:text-white'
                }`}
              >
                System Apps
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center px-1 text-xs font-mono text-white/60 uppercase">
            <span>{activeTab} Apps ({activeCount} active / {totalCount} total)</span>
            <span className="text-[#E89F1F]">Storage: {storageUsedGb}GB / {storageTotalGb}GB</span>
          </div>

          {/* App List */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-white/20">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer group ${
                  app.isRunning 
                    ? 'bg-black/50 border-emerald-500/30 hover:border-emerald-400/60 shadow-md' 
                    : 'bg-black/25 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleApp(app.id);
                    }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      app.isRunning 
                        ? 'bg-emerald-400 text-black shadow-md shadow-emerald-400/20' 
                        : 'bg-black border border-white/20 text-white/30'
                    }`}
                    title={app.isRunning ? 'Active (Tap to Stop)' : 'Inactive (Tap to Start)'}
                  >
                    {app.isRunning ? <CheckCircle2 className="w-6 h-6 font-bold" /> : <StopCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-[#E89F1F] transition-colors">{app.name}</div>
                    <div className="text-[11px] font-mono text-white/50">{app.packageName} • v{app.version}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-xs sm:text-sm font-mono font-bold ${app.isRunning ? 'text-emerald-400' : 'text-white/30'}`}>
                    {app.isRunning ? `${app.ramUsageMb} MB` : 'Stopped'}
                  </div>
                  <div className="text-[10px] font-mono text-[#E89F1F]">
                    Tap for Inspection
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="py-4 text-center border-t border-white/10 bg-black/30 mt-auto">
          <p className="text-xs font-mono tracking-widest text-white/60 lowercase">
            created by rider
          </p>
        </footer>

        {/* Detailed App Inspection Page Modal */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-lg bg-[#18110B] border border-[#E89F1F]/40 rounded-3xl p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              
              <button 
                onClick={() => setSelectedApp(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 pr-10">
                <img 
                  src="/assets/aistudio/file_000000004fd08210969fc7f45c4a83e2_3fdb1851.png" 
                  alt="App Header Icon" 
                  className="w-14 h-14 rounded-2xl border border-[#E89F1F]/40 object-cover shadow-lg"
                />
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
                    {selectedApp.name}
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full ${selectedApp.isRunning ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'}`}>
                      {selectedApp.isRunning ? 'Active' : 'Inactive'}
                    </span>
                  </h2>
                  <p className="text-xs font-mono text-white/50">{selectedApp.packageName} • v{selectedApp.version}</p>
                </div>
              </div>

              {/* Telemetry & Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-emerald-400">
                    <Activity className="w-4 h-4 animate-pulse" />
                    <span>Real-Time Draw</span>
                  </div>
                  <div className="text-base font-bold text-white">{selectedApp.isRunning ? `${selectedApp.batteryDrawMa} mA` : '0 mA'}</div>
                  <div className="text-[10px] text-white/50">Current battery drain</div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-sky-400">
                    <Battery className="w-4 h-4" />
                    <span>Total Battery Used</span>
                  </div>
                  <div className="text-base font-bold text-white">{selectedApp.batteryUsedMah} mAh</div>
                  <div className="text-[10px] text-white/50">Consumed today</div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1 col-span-2">
                  <div className="flex items-center gap-2 text-xs text-amber-300">
                    <Globe className="w-4 h-4" />
                    <span>Daily Data Used (Internet)</span>
                  </div>
                  <div className="text-lg font-bold text-white">{selectedApp.todayInternetMb} MB</div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-1.5">
                    <div 
                      className="bg-amber-400 h-full rounded-full transition-all" 
                      style={{ width: `${Math.min(100, (selectedApp.todayInternetMb / 2000) * 100)}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* Active Permissions Section */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                  <Key className="w-4 h-4 text-[#E89F1F]" />
                  <span>Active Permissions</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedApp.permissions.map((perm, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-black/50 border border-white/15 text-xs font-mono text-[#E89F1F]"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    handleToggleApp(selectedApp.id);
                    setSelectedApp(null);
                  }}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    selectedApp.isRunning 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30' 
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                  }`}
                >
                  <Power className="w-4 h-4" />
                  {selectedApp.isRunning ? 'Force Stop App' : 'Start App'}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Focus Mode Configuration Modal (Including Active System Toggles) */}
        {isFocusModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <FocusModeConfigModal
              apps={apps}
              systemToggles={systemToggles}
              onClose={() => setIsFocusModalOpen(false)}
              onApplyFocus={handleApplyFocusMode}
            />
          </div>
        )}

      </div>
    </div>
  );
}

function FocusModeConfigModal({ 
  apps, 
  systemToggles, 
  onClose, 
  onApplyFocus 
}: { 
  apps: AppModel[]; 
  systemToggles: SystemToggle[]; 
  onClose: () => void; 
  onApplyFocus: (appIds: string[], toggleIds: string[]) => void 
}) {
  const activeInstalledApps = apps.filter(a => a.category === 'installed' && a.isRunning);
  const [selectedAppsToStop, setSelectedAppsToStop] = useState<string[]>(activeInstalledApps.map(a => a.id));
  const [selectedTogglesToTurnOff, setSelectedTogglesToTurnOff] = useState<string[]>(systemToggles.filter(t => t.isActive).map(t => t.id));

  const toggleAppSelect = (id: string) => {
    setSelectedAppsToStop(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSystemSelect = (id: string) => {
    setSelectedTogglesToTurnOff(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="w-full max-w-md bg-[#18110B] border border-emerald-500/40 rounded-3xl p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
      <button 
        onClick={onClose}
        className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>

      <div>
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-emerald-400" />
          Focus Mode & System Toggles
        </h2>
        <p className="text-xs font-mono text-white/50">Stop selected apps and turn off active system background services.</p>
      </div>

      {/* Active System Toggles Section */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">Active System Toggles to Optimize:</span>
        <div className="space-y-2">
          {systemToggles.map(toggle => {
            const IconComp = toggle.icon;
            const isSelected = selectedTogglesToTurnOff.includes(toggle.id);
            return (
              <div 
                key={toggle.id}
                onClick={() => toggleSystemSelect(toggle.id)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isSelected ? 'bg-emerald-500/20 border-emerald-400/50 text-white' : 'bg-black/30 border-white/10 text-white/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IconComp className={`w-4 h-4 ${toggle.isActive ? 'text-emerald-400' : 'text-white/30'}`} />
                  <span className="text-xs font-bold">{toggle.name}</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px]">
                  <span>{toggle.isActive ? 'Active' : 'Off'}</span>
                  <input 
                    type="checkbox" 
                    checked={isSelected}
                    onChange={() => {}}
                    className="accent-emerald-400 w-4 h-4 cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Apps Section */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">Active Apps to Force Stop:</span>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
          {activeInstalledApps.length === 0 ? (
            <p className="text-xs font-mono text-white/40 p-3 text-center bg-black/30 rounded-xl">No active installed apps running.</p>
          ) : (
            activeInstalledApps.map(app => (
              <div 
                key={app.id}
                onClick={() => toggleAppSelect(app.id)}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer ${selectedAppsToStop.includes(app.id) ? 'bg-amber-500/20 border-amber-400/50 text-white' : 'bg-black/30 border-white/10 text-white/50'}`}
              >
                <span className="text-xs font-bold">{app.name} ({app.ramUsageMb} MB)</span>
                <input 
                  type="checkbox" 
                  checked={selectedAppsToStop.includes(app.id)}
                  onChange={() => {}}
                  className="accent-amber-400 w-4 h-4 cursor-pointer"
                />
              </div>
            ))
          )}
        </div>
      </div>

      <button
        onClick={() => onApplyFocus(selectedAppsToStop, selectedTogglesToTurnOff)}
        className="w-full py-3.5 rounded-2xl bg-emerald-500 text-black font-extrabold text-xs tracking-wide shadow-lg shadow-emerald-500/30 cursor-pointer hover:bg-emerald-400 transition-all"
      >
        Apply Focus Mode & Optimize Toggles
      </button>
    </div>
  );
}
