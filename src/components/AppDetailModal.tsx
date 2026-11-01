import React, { useState } from 'react';
import { 
  ArrowLeft,
  X, 
  Trash2, 
  Mic,
  Camera,
  MapPin,
  Folder,
  Users,
  Bell,
  Phone,
  Layers,
  Activity,
  Globe,
  MessageSquare,
  Headphones,
  ShoppingBag,
  Aperture,
  PhoneCall,
  Image,
  PlayCircle,
  ShieldCheck,
  PowerOff,
  Zap,
  HardDrive
} from 'lucide-react';
import { AppItem, PermissionType } from '../types';
import { useRealDeviceConnectivity } from '../hooks/useRealDeviceConnectivity';

interface AppDetailModalProps {
  app: AppItem | null;
  onClose: () => void;
  onTogglePermission: (appId: string, permType: PermissionType) => void;
  onToggleForceStop: (appId: string) => void;
  onClearCache: (appId: string) => void;
  onToggleBackgroundRestriction: (appId: string) => void;
}

export const AppDetailModal: React.FC<AppDetailModalProps> = ({
  app,
  onClose,
  onTogglePermission,
  onToggleForceStop,
  onClearCache,
  onToggleBackgroundRestriction
}) => {
  if (!app) return null;

  const conn = useRealDeviceConnectivity();
  const [activeTab, setActiveTab] = useState<'overview' | 'permissions' | 'storage' | 'battery'>('overview');
  const isStopped = app.state === 'stopped';

  const getAppIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-emerald-300 drop-shadow-sm" />;
      case 'MapPin': return <MapPin className="w-5 h-5 text-cyan-300 drop-shadow-sm" />;
      case 'Camera': return <Camera className="w-5 h-5 text-pink-300 drop-shadow-sm" />;
      case 'Headphones': return <Headphones className="w-5 h-5 text-green-300 drop-shadow-sm" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-blue-300 drop-shadow-sm" />;
      case 'Globe': return <Globe className="w-5 h-5 text-sky-300 drop-shadow-sm" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-orange-300 drop-shadow-sm" />;
      case 'Layers': return <Layers className="w-5 h-5 text-indigo-300 drop-shadow-sm" />;
      case 'Aperture': return <Aperture className="w-5 h-5 text-purple-300 drop-shadow-sm" />;
      case 'PhoneCall': return <PhoneCall className="w-5 h-5 text-teal-300 drop-shadow-sm" />;
      case 'Image': return <Image className="w-5 h-5 text-yellow-300 drop-shadow-sm" />;
      case 'PlayCircle': return <PlayCircle className="w-5 h-5 text-rose-300 drop-shadow-sm" />;
      default: return <Activity className="w-5 h-5 text-slate-300 drop-shadow-sm" />;
    }
  };

  const getPermissionIcon = (type: PermissionType) => {
    switch (type) {
      case 'camera': return <Camera className="w-3.5 h-3.5 text-pink-300" />;
      case 'microphone': return <Mic className="w-3.5 h-3.5 text-emerald-300" />;
      case 'location': return <MapPin className="w-3.5 h-3.5 text-cyan-300" />;
      case 'storage': return <Folder className="w-3.5 h-3.5 text-indigo-300" />;
      case 'contacts': return <Users className="w-3.5 h-3.5 text-amber-300" />;
      case 'notifications': return <Bell className="w-3.5 h-3.5 text-yellow-300" />;
      case 'phone': return <Phone className="w-3.5 h-3.5 text-teal-300" />;
      case 'background': return <Layers className="w-3.5 h-3.5 text-purple-300" />;
    }
  };

  const appPercent = Math.round((app.storage.appMb / app.storage.totalMb) * 100);
  const dataPercent = Math.round((app.storage.dataMb / app.storage.totalMb) * 100);
  const cachePercent = Math.round((app.storage.cacheMb / app.storage.totalMb) * 100);

  const getDrawLevelText = () => {
    if (isStopped) return 'Offline (0 mA)';
    if (app.battery.liveDrawMa >= 300) return 'High Power Draw';
    if (app.battery.liveDrawMa >= 120) return 'Moderate Power Draw';
    return 'Low Power Draw';
  };

  return (
    /* Completely Transparent Full Screen View */
    <div className="fixed inset-0 z-50 w-full h-full min-h-screen bg-black/15 backdrop-blur-[2px] flex flex-col text-white animate-fade-in overflow-hidden">
      {/* Top Header Bar - Completely Transparent, smaller text */}
      <header className="sticky top-0 z-20 px-4 md:px-8 py-3 flex items-center justify-between bg-transparent shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            aria-label="Back to apps list"
            className="w-8 h-8 rounded-xl bg-black/25 hover:bg-black/45 flex items-center justify-center text-white/90 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-black/20 flex items-center justify-center">
              {getAppIcon(app.icon)}
            </div>
            <h1 className="text-xs md:text-sm font-semibold text-white tracking-tight drop-shadow-md">
              {app.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleForceStop(app.id)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
              isStopped
                ? 'bg-emerald-500/80 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20'
                : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300'
            }`}
          >
            <PowerOff className="w-2.5 h-2.5" />
            <span>{isStopped ? 'Resume' : 'Force Stop'}</span>
          </button>

          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-black/25 hover:bg-black/45 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Navigation Tabs - Icons Only (Text Removed as requested) */}
      <div className="px-4 md:px-8 py-2 flex items-center bg-transparent shrink-0">
        <div className="max-w-3xl mx-auto w-full flex items-center justify-center gap-2 p-1 bg-black/20 backdrop-blur-md rounded-2xl">
          <button
            onClick={() => setActiveTab('overview')}
            title="Overview"
            aria-label="Overview"
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white/25 text-white shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <Activity className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            title="Permissions & Sensors"
            aria-label="Permissions & Sensors"
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              activeTab === 'permissions'
                ? 'bg-white/25 text-white shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('battery')}
            title="Live Battery Draw"
            aria-label="Live Battery Draw"
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              activeTab === 'battery'
                ? 'bg-white/25 text-white shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <Zap className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('storage')}
            title="Storage & Memory"
            aria-label="Storage & Memory"
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              activeTab === 'storage'
                ? 'bg-white/25 text-white shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <HardDrive className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Full-Screen Scrollable Content Area - Completely Transparent & Compact Text */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 scrollbar-thin">
        <div className="max-w-3xl mx-auto w-full space-y-4">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-3">
              {/* Purpose & Current Action - Smaller text, no glow */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-black/20">
                <p className="text-xs md:text-sm text-white/95 leading-relaxed font-normal">
                  {app.purpose}
                </p>
                <div className="flex items-start gap-2 pt-1 text-xs text-cyan-300 font-medium">
                  <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${isStopped ? 'bg-white/40' : 'bg-cyan-400'}`} />
                  <p className="leading-relaxed">
                    {isStopped ? 'Process is terminated and completely stopped.' : app.currentActivity}
                  </p>
                </div>
              </div>

              {/* Telemetry Numbers Strip - Smaller, compact */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-2.5 rounded-xl bg-black/20 text-center">
                  <span className="text-[10px] text-white/50 block mb-0.5">Live Draw</span>
                  <span className="text-sm md:text-base font-bold text-amber-300 font-mono tabular-nums">
                    {isStopped ? '0' : app.battery.liveDrawMa} mA
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/20 text-center">
                  <span className="text-[10px] text-white/50 block mb-0.5">Storage</span>
                  <span className="text-sm md:text-base font-bold text-indigo-300 font-mono tabular-nums">
                    {app.storage.totalMb} MB
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/20 text-center">
                  <span className="text-[10px] text-white/50 block mb-0.5">CPU</span>
                  <span className="text-sm md:text-base font-bold text-emerald-300 font-mono tabular-nums">
                    {isStopped ? '0%' : `${app.cpuPercent}%`}
                  </span>
                </div>
              </div>

              {/* Active Uptime - Compact text */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-black/20 text-xs">
                <div className="flex items-center justify-between text-white/80">
                  <span className="text-white/50">Active Since</span>
                  <span className="font-mono text-white">{app.activeSince}</span>
                </div>
                <div className="flex items-center justify-between text-white/80">
                  <span className="text-white/50">Screen-On Time</span>
                  <span className="font-mono text-emerald-300">{Math.floor(app.foregroundMinutesToday / 60)}h {app.foregroundMinutesToday % 60}m</span>
                </div>
                <div className="flex items-center justify-between text-white/80">
                  <span className="text-white/50">Background Run Time</span>
                  <span className="font-mono text-cyan-300">{Math.floor(app.backgroundMinutesToday / 60)}h {app.backgroundMinutesToday % 60}m</span>
                </div>
              </div>
            </div>
          )}

          {/* PERMISSIONS */}
          {activeTab === 'permissions' && (
            <div className="space-y-2">
              {app.permissions.map((perm) => {
                const isLive = perm.isCurrentlyActive && !isStopped;
                return (
                  <div 
                    key={perm.type}
                    className="p-3 rounded-xl bg-black/20 flex items-start justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-black/25 flex items-center justify-center shrink-0 mt-0.5">
                        {getPermissionIcon(perm.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs md:text-sm font-semibold text-white">
                            {perm.name}
                          </h4>
                          {isLive ? (
                            <span className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              Active now
                            </span>
                          ) : perm.granted ? (
                            <span className="text-[9px] font-mono text-white/40">
                              Granted
                            </span>
                          ) : (
                            <span className="text-[9px] font-mono text-rose-300">
                              Denied
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-white/70 mt-0.5 leading-relaxed">
                          {perm.description}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onTogglePermission(app.id, perm.type)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                        perm.granted ? 'bg-cyan-500' : 'bg-white/20'
                      }`}
                      aria-label={`Toggle ${perm.name}`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                          perm.granted ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* BATTERY */}
          {activeTab === 'battery' && (
            <div className="space-y-3">
              {/* Live Draw Rate & Real-time Draw Meter */}
              <div className="p-4 rounded-2xl bg-black/20 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-xs text-white/80 font-medium">Live Battery Draw Rate</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold font-mono text-amber-300 tabular-nums">
                      {isStopped ? '0' : app.battery.liveDrawMa} <span className="text-xs text-white/60">mA</span>
                    </span>
                    <span className="text-[10px] text-white/50 block font-mono">
                      ~{isStopped ? 0 : app.battery.drainRatePerHourPercent}% / hr
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[10px] text-white/50 font-mono mb-1">
                    <span>0 mA (Idle)</span>
                    <span className="text-amber-300 font-semibold">{getDrawLevelText()}</span>
                    <span>500 mA (Max)</span>
                  </div>
                  <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden p-0.5">
                    <div 
                      className="bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(3, (app.battery.liveDrawMa / 500) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>



              {/* Cumulative Battery Consumption */}
              <div className="p-4 rounded-2xl bg-black/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">Total Consumed Today</span>
                  <span className="text-sm font-bold font-mono text-white">
                    {app.battery.totalPercent}% <span className="text-xs text-white/50">({app.battery.totalMah} mAh)</span>
                  </span>
                </div>

                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-amber-400 h-full"
                    style={{ width: `${(app.battery.screenOnDrainPercent / app.battery.totalPercent) * 100}%` }}
                  />
                  <div 
                    className="bg-cyan-400 h-full"
                    style={{ width: `${(app.battery.backgroundDrainPercent / app.battery.totalPercent) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-white/60 font-mono pt-0.5">
                  <span>Screen On: {app.battery.screenOnDrainPercent}%</span>
                  <span>Background: {app.battery.backgroundDrainPercent}%</span>
                </div>
              </div>

              {/* Background Restriction Toggle */}
              <div className="p-3.5 rounded-2xl bg-black/20 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white">
                    Restrict Background Battery
                  </h4>
                  <p className="text-[10px] text-white/50 mt-0.5">
                    Throttles background execution to save power.
                  </p>
                </div>
                <button
                  onClick={() => onToggleBackgroundRestriction(app.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-medium transition-colors cursor-pointer ${
                    app.isBackgroundRestricted
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-white/10 text-white/80 hover:text-white'
                  }`}
                >
                  {app.isBackgroundRestricted ? 'Restricted' : 'Unrestricted'}
                </button>
              </div>
            </div>
          )}

          {/* STORAGE */}
          {activeTab === 'storage' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-black/20 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">Storage Allocation</span>
                  <span className="text-base font-bold font-mono text-white">
                    {app.storage.totalMb} MB
                  </span>
                </div>

                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-indigo-400 h-full" style={{ width: `${appPercent}%` }} />
                  <div className="bg-cyan-400 h-full" style={{ width: `${dataPercent}%` }} />
                  <div className="bg-amber-400 h-full" style={{ width: `${cachePercent}%` }} />
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-1">
                  <div className="p-2 rounded-xl bg-black/20">
                    <span className="text-white/40 block text-[10px]">App Size</span>
                    <span className="text-indigo-300 font-bold">{app.storage.appMb} MB</span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/20">
                    <span className="text-white/40 block text-[10px]">User Data</span>
                    <span className="text-cyan-300 font-bold">{app.storage.dataMb} MB</span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/20">
                    <span className="text-white/40 block text-[10px]">Cache</span>
                    <span className="text-amber-300 font-bold">{app.storage.cacheMb} MB</span>
                  </div>
                </div>

                {app.storage.cacheMb > 0 && (
                  <button
                    onClick={() => onClearCache(app.id)}
                    className="w-full mt-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-white/70" />
                    <span>Clear Cache ({app.storage.cacheMb} MB)</span>
                  </button>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-black/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70 block">
                    Data Consumption
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300">
                    Live: {conn.downlinkSpeedMbps} Mbps ({conn.effectiveType.toUpperCase()})
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-black/20 flex items-center justify-between">
                    <span className="text-white/50">Wi-Fi</span>
                    <span className="text-white font-bold">{app.dataUsage.wifiMb} MB</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/20 flex items-center justify-between">
                    <span className="text-white/50">Cellular</span>
                    <span className="text-white font-bold">{app.dataUsage.cellularMb} MB</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
