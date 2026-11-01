import React, { useState } from 'react';
import { AppItem } from '../types';
import { 
  Gamepad2, 
  BellOff, 
  Zap, 
  Cpu, 
  Crosshair, 
  Check, 
  X
} from 'lucide-react';

interface FocusToggles {
  blockNotifications: boolean;
  performanceBoost: boolean;
  deepRamClean: boolean;
  touchBoost: boolean;
}

interface GameFocusModalProps {
  apps: AppItem[];
  isOpen: boolean;
  isFocusActive: boolean;
  onClose: () => void;
  onApply: (selectedAppIdsToStop: string[], toggles: FocusToggles) => void;
  onTurnOffFocus: () => void;
}

export const GameFocusModal: React.FC<GameFocusModalProps> = ({
  apps,
  isOpen,
  isFocusActive,
  onClose,
  onApply,
  onTurnOffFocus,
}) => {
  // STRICT CONSTRAINT: Only installed active apps are eligible (System apps must NOT be present!)
  const activeInstalledApps = apps.filter(
    (app) => app.category === 'installed' && app.state !== 'stopped'
  );

  // By default, select all active installed apps to stop
  const [selectedToStop, setSelectedToStop] = useState<string[]>(() =>
    activeInstalledApps.map((a) => a.id)
  );

  // Focus mode toggles (NO internet toggle)
  const [toggles, setToggles] = useState<FocusToggles>({
    blockNotifications: true,
    performanceBoost: true,
    deepRamClean: true,
    touchBoost: true,
  });

  if (!isOpen) return null;

  const toggleAppSelection = (id: string) => {
    setSelectedToStop((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedToStop(activeInstalledApps.map((a) => a.id));
  };

  const handleDeselectAll = () => {
    setSelectedToStop([]);
  };

  const handleDone = () => {
    onApply(selectedToStop, toggles);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md max-h-[90vh] flex flex-col rounded-3xl bg-black/25 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fully transparent glass */}
        <div className="relative p-4 pb-3 border-b border-white/10 flex items-center justify-between bg-transparent">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 border border-white/15 text-amber-300">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold tracking-tight text-white">
                Focus Mode
              </h2>
              {isFocusActive && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white border border-white/10 transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
          {/* Toggles - Fully transparent glass buttons */}
          <div className="grid grid-cols-2 gap-2">
            {/* DND Toggle */}
            <button
              type="button"
              onClick={() => setToggles((t) => ({ ...t, blockNotifications: !t.blockNotifications }))}
              className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                toggles.blockNotifications
                  ? 'bg-amber-400/15 border-amber-400/30 text-amber-200'
                  : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <BellOff className={`w-4 h-4 shrink-0 ${toggles.blockNotifications ? 'text-amber-400' : 'text-white/40'}`} />
                <span className="text-[11px] font-medium truncate">Block Alerts</span>
              </div>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                toggles.blockNotifications ? 'bg-amber-400/20 text-amber-300 border-amber-400/30' : 'bg-white/5 text-white/40 border-white/10'
              }`}>
                {toggles.blockNotifications ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Performance Boost */}
            <button
              type="button"
              onClick={() => setToggles((t) => ({ ...t, performanceBoost: !t.performanceBoost }))}
              className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                toggles.performanceBoost
                  ? 'bg-amber-400/15 border-amber-400/30 text-amber-200'
                  : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Zap className={`w-4 h-4 shrink-0 ${toggles.performanceBoost ? 'text-amber-400' : 'text-white/40'}`} />
                <span className="text-[11px] font-medium truncate">Performance</span>
              </div>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                toggles.performanceBoost ? 'bg-amber-400/20 text-amber-300 border-amber-400/30' : 'bg-white/5 text-white/40 border-white/10'
              }`}>
                {toggles.performanceBoost ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* RAM Clean */}
            <button
              type="button"
              onClick={() => setToggles((t) => ({ ...t, deepRamClean: !t.deepRamClean }))}
              className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                toggles.deepRamClean
                  ? 'bg-amber-400/15 border-amber-400/30 text-amber-200'
                  : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Cpu className={`w-4 h-4 shrink-0 ${toggles.deepRamClean ? 'text-amber-400' : 'text-white/40'}`} />
                <span className="text-[11px] font-medium truncate">RAM Boost</span>
              </div>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                toggles.deepRamClean ? 'bg-amber-400/20 text-amber-300 border-amber-400/30' : 'bg-white/5 text-white/40 border-white/10'
              }`}>
                {toggles.deepRamClean ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Touch Boost */}
            <button
              type="button"
              onClick={() => setToggles((t) => ({ ...t, touchBoost: !t.touchBoost }))}
              className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                toggles.touchBoost
                  ? 'bg-amber-400/15 border-amber-400/30 text-amber-200'
                  : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Crosshair className={`w-4 h-4 shrink-0 ${toggles.touchBoost ? 'text-amber-400' : 'text-white/40'}`} />
                <span className="text-[11px] font-medium truncate">Touch Boost</span>
              </div>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                toggles.touchBoost ? 'bg-amber-400/20 text-amber-300 border-amber-400/30' : 'bg-white/5 text-white/40 border-white/10'
              }`}>
                {toggles.touchBoost ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>

          {/* Active Installed Apps List */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                Active Apps ({selectedToStop.length}/{activeInstalledApps.length})
              </span>
              {activeInstalledApps.length > 0 && (
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="text-amber-400 hover:underline cursor-pointer bg-transparent border-0 p-0"
                  >
                    all
                  </button>
                  <span className="text-white/20">•</span>
                  <button
                    type="button"
                    onClick={handleDeselectAll}
                    className="text-white/50 hover:underline cursor-pointer bg-transparent border-0 p-0"
                  >
                    none
                  </button>
                </div>
              )}
            </div>

            {activeInstalledApps.length === 0 ? (
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center text-white/40 text-[11px]">
                No active apps
              </div>
            ) : (
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-0.5 scrollbar-none">
                {activeInstalledApps.map((app) => {
                  const isSelected = selectedToStop.includes(app.id);
                  return (
                    <div
                      key={app.id}
                      onClick={() => toggleAppSelection(app.id)}
                      className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-rose-500/15 border-rose-500/30 text-white'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={app.icon}
                          alt={app.name}
                          className="w-7 h-7 rounded-lg object-cover shrink-0 border border-white/10 shadow-sm"
                        />
                        <div className="min-w-0">
                          <p className="text-[12px] font-medium truncate text-white leading-tight">
                            {app.name}
                          </p>
                          <span className="text-[9px] font-mono text-white/40">
                            {app.battery.liveDrawMa} mA
                          </span>
                        </div>
                      </div>

                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-rose-500 border-rose-400 text-white'
                            : 'border-white/25 bg-white/5'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions - Transparent glass buttons */}
        <div className="p-3 border-t border-white/10 bg-transparent flex items-center justify-between gap-2">
          {isFocusActive ? (
            <button
              type="button"
              onClick={() => {
                onTurnOffFocus();
                onClose();
              }}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white text-[11px] font-medium transition-all cursor-pointer"
            >
              Turn Off
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white text-[11px] font-medium transition-all cursor-pointer"
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={handleDone}
            className="flex-1 max-w-[160px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-400/80 hover:bg-amber-400 border border-amber-300/50 text-black font-semibold text-[12px] shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Done ({selectedToStop.length})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
