import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, Thermometer, Clock, Sparkles } from 'lucide-react';

interface PhoneBatteryState {
  level: number; // 0 - 100
  isCharging: boolean;
  temperature: number; // e.g. 31.8 C
  voltage: number; // e.g. 4.15 V
  health: string; // 'Good' | 'Optimal'
  chargingType: string; // 'Super Fast Charge (33W)' | 'Standard' | 'Discharging'
  estimatedTime: string; // '38m to 100%' | '9h 15m remaining'
}

export const PhoneBatteryIndicator: React.FC = () => {
  const [battery, setBattery] = useState<PhoneBatteryState>({
    level: 82,
    isCharging: true,
    temperature: 31.4,
    voltage: 4.18,
    health: 'Optimal (98%)',
    chargingType: 'Fast Charge 33W',
    estimatedTime: '28m to full',
  });

  const [isOpen, setIsOpen] = useState(false);

  // Hook into real Web Battery API if available, with graceful fallback
  useEffect(() => {
    let batteryApi: any = null;

    const updateFromApi = (b: any) => {
      const pct = Math.round(b.level * 100);
      const charging = b.charging;
      setBattery((prev) => ({
        ...prev,
        level: pct,
        isCharging: charging,
        chargingType: charging ? 'Fast Charge 33W' : 'Discharging',
        estimatedTime: charging
          ? b.chargingTime && isFinite(b.chargingTime) && b.chargingTime > 0
            ? `${Math.round(b.chargingTime / 60)}m to 100%`
            : `${Math.max(10, Math.round((100 - pct) * 1.2))}m to full`
          : b.dischargingTime && isFinite(b.dischargingTime) && b.dischargingTime > 0
          ? `${Math.floor(b.dischargingTime / 3600)}h ${Math.round((b.dischargingTime % 3600) / 60)}m left`
          : `${Math.round(pct * 0.12)}h left`,
      }));
    };

    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      (navigator as any)
        .getBattery()
        .then((b: any) => {
          batteryApi = b;
          updateFromApi(b);

          b.addEventListener('levelchange', () => updateFromApi(b));
          b.addEventListener('chargingchange', () => updateFromApi(b));
        })
        .catch(() => {
          // If restricted by iframe sandbox, fallback stays active
        });
    }

    // Dynamic subtle temperature/voltage micro-jitter simulation
    const interval = setInterval(() => {
      setBattery((prev) => {
        const tempDelta = (Math.random() - 0.5) * 0.2;
        const voltDelta = (Math.random() - 0.5) * 0.02;
        return {
          ...prev,
          temperature: Math.round((prev.temperature + tempDelta) * 10) / 10,
          voltage: Math.round((prev.voltage + voltDelta) * 100) / 100,
        };
      });
    }, 4000);

    return () => {
      clearInterval(interval);
      if (batteryApi) {
        try {
          batteryApi.removeEventListener('levelchange', () => updateFromApi(batteryApi));
          batteryApi.removeEventListener('chargingchange', () => updateFromApi(batteryApi));
        } catch {
          // no-op
        }
      }
    };
  }, []);

  const toggleSimulateCharging = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBattery((prev) => {
      const nextCharging = !prev.isCharging;
      return {
        ...prev,
        isCharging: nextCharging,
        chargingType: nextCharging ? 'Fast Charge 33W' : 'On Battery',
        estimatedTime: nextCharging ? '28m to full' : '8h 40m remaining',
      };
    });
  };

  // Determine color theme based on battery level & charging
  const getTheme = () => {
    if (battery.isCharging) {
      return {
        bar: 'bg-gradient-to-r from-emerald-400 to-cyan-300',
        text: 'text-emerald-300',
        glow: 'shadow-emerald-500/20',
        border: 'border-emerald-500/30',
      };
    }
    if (battery.level <= 20) {
      return {
        bar: 'bg-rose-500',
        text: 'text-rose-400',
        glow: 'shadow-rose-500/20',
        border: 'border-rose-500/30',
      };
    }
    if (battery.level <= 40) {
      return {
        bar: 'bg-amber-400',
        text: 'text-amber-300',
        glow: 'shadow-amber-500/20',
        border: 'border-amber-500/30',
      };
    }
    return {
      bar: 'bg-gradient-to-r from-emerald-400 to-teal-300',
      text: 'text-emerald-300',
      glow: 'shadow-emerald-500/20',
      border: 'border-emerald-500/30',
    };
  };

  const theme = getTheme();

  return (
    <div className="relative">
      {/* Stylish Glass Battery Capsule Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="View phone charging details"
        aria-label="Phone Battery Status"
        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border ${theme.border} hover:bg-black/60 transition-all cursor-pointer select-none group shadow-sm`}
      >
        {/* Custom Mini Stylish Battery Gauge */}
        <div className="relative flex items-center">
          {/* Battery Shell */}
          <div className="w-6 h-3 rounded-[3px] border border-white/60 p-[1.5px] flex items-center relative overflow-hidden bg-black/30">
            {/* Battery Fill */}
            <div
              className={`h-full rounded-[1.5px] transition-all duration-500 ${theme.bar}`}
              style={{ width: `${Math.min(100, Math.max(8, battery.level))}%` }}
            />
          </div>
          {/* Battery Tip/Nipple */}
          <div className="w-[2px] h-1.5 bg-white/60 rounded-r-[1px] ml-[1px]" />

          {/* Charging Bolt Overlay inside or next to battery */}
          {battery.isCharging && (
            <div className="absolute -top-1 -right-1 text-amber-300 drop-shadow-sm">
              <Zap className="w-2.5 h-2.5 fill-amber-300 stroke-amber-400" />
            </div>
          )}
        </div>

        {/* Battery Percentage */}
        <span className="font-mono font-bold text-xs tracking-tight text-white drop-shadow-sm">
          {battery.level}%
        </span>

        {/* Small Charging Badge if charging */}
        {battery.isCharging && (
          <span className="hidden sm:inline-flex items-center text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
            FAST
          </span>
        )}
      </button>

      {/* Stylish Popup Card on Click */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 sm:left-1/2 sm:-translate-x-1/2 w-64 p-3.5 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 shadow-2xl z-40 text-white animate-fade-in space-y-3">
            {/* Header info */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-xs font-semibold text-white/90">Phone Battery</span>
              </div>
              <button
                onClick={toggleSimulateCharging}
                className={`text-[10px] font-mono px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                  battery.isCharging
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                    : 'bg-white/10 text-white/60 border-white/20 hover:text-white'
                }`}
                title="Tap to toggle charge state"
              >
                {battery.isCharging ? '⚡ Charging' : 'On Battery'}
              </button>
            </div>

            {/* Big Level Display */}
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-extrabold font-mono tracking-tight text-white drop-shadow-md">
                  {battery.level}%
                </span>
                <span className="text-[11px] text-white/60 block font-medium mt-0.5">
                  {battery.chargingType}
                </span>
              </div>
              <span className="text-[11px] font-mono text-cyan-300">
                {battery.estimatedTime}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className={`h-full rounded-full transition-all duration-500 ${theme.bar}`}
                style={{ width: `${battery.level}%` }}
              />
            </div>

            {/* Mini Health & Temp Grid */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-mono">
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                <Thermometer className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <div>
                  <span className="text-[9px] text-white/40 block">Temp</span>
                  <span className="text-white font-semibold">{battery.temperature}°C</span>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <div>
                  <span className="text-[9px] text-white/40 block">Health</span>
                  <span className="text-white font-semibold">{battery.health}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-white/40 font-mono px-0.5 pt-0.5">
              <span>Voltage: {battery.voltage}V</span>
              <span>5,000 mAh</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
