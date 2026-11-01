import React, { useState } from 'react';
import { Wifi, WifiOff, Activity, Cpu, HardDrive, ShieldCheck, Globe, Zap } from 'lucide-react';
import { useRealDeviceConnectivity } from '../hooks/useRealDeviceConnectivity';

export const NetworkConnectivityCapsule: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const conn = useRealDeviceConnectivity();

  return (
    <div className="relative">
      {/* Sleek Glass Network Capsule Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Real device network & hardware connectivity"
        aria-label="Network Connectivity Status"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border transition-all cursor-pointer select-none group shadow-sm ${
          conn.isOnline 
            ? 'border-emerald-500/30 hover:bg-black/60 text-white' 
            : 'border-rose-500/40 bg-rose-950/30 text-rose-300'
        }`}
      >
        {conn.isOnline ? (
          <>
            <Wifi className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-mono text-xs font-semibold tracking-tight text-white/90">
              {conn.effectiveType.toUpperCase()}
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="hidden md:inline font-mono text-[10px] text-emerald-300/80">
              {conn.rttLatencyMs}ms
            </span>
          </>
        ) : (
          <>
            <WifiOff className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="font-mono text-xs font-semibold tracking-tight text-rose-300">
              Offline
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
          </>
        )}
      </button>

      {/* Detail Popover Card */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 w-72 p-3.5 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/15 shadow-2xl z-40 text-white animate-fade-in space-y-3">
            {/* Header info */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-300" />
                <span className="text-xs font-semibold text-white/95">Real Connectivity</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                conn.isOnline 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-semibold' 
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}>
                {conn.isOnline ? 'LIVE CONNECTED' : 'OFFLINE'}
              </span>
            </div>

            {/* Network Metrics */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">Network Type</span>
                <span className="font-mono font-bold text-white uppercase">{conn.effectiveType}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">Downlink Bandwidth</span>
                <span className="font-mono font-bold text-cyan-300">{conn.downlinkSpeedMbps} Mbps</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">Roundtrip Latency (Ping)</span>
                <span className="font-mono font-bold text-emerald-300">{conn.rttLatencyMs} ms</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">Data Saver</span>
                <span className="font-mono text-white/80">{conn.saveData ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>

            {/* Device Hardware Spec */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold block mb-1.5">
                Real Device Hardware
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <div>
                    <span className="text-[9px] text-white/40 block">CPU Cores</span>
                    <span className="text-white font-semibold">{conn.cpuCores} Threads</span>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                  <div>
                    <span className="text-[9px] text-white/40 block">Device RAM</span>
                    <span className="text-white font-semibold">{conn.deviceRamGb} GB Tier</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Storage Quota */}
            <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-indigo-300" />
                <span className="text-white/70 text-[11px]">Disk Quota</span>
              </div>
              <span className="text-white font-semibold">
                {conn.storageUsedMb} MB / {Math.round(conn.storageTotalMb / 1024)} GB
              </span>
            </div>

            {/* Real Browser Permissions Status */}
            <div className="pt-1 border-t border-white/10 text-[10px] font-mono flex items-center justify-between text-white/60">
              <span>Geo: <strong className="text-white">{conn.realPermissions.geolocation}</strong></span>
              <span>Notif: <strong className="text-white">{conn.realPermissions.notifications}</strong></span>
              <span>Online API: <strong className="text-emerald-300">Active</strong></span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
