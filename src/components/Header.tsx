import React from 'react';
import { Smartphone, Cpu } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-transparent border-none px-4 md:px-8 py-3.5">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Phone ka Hawaldar - Prominent Header */}
        <div className="flex items-center gap-2.5 select-none">
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white drop-shadow-md">
              Phone ka Hawaldar
            </h1>
            <p className="text-[10px] font-mono text-white/70 uppercase tracking-widest">
              Security & Device Sentinel
            </p>
          </div>
        </div>

        {/* Apps Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 p-1 bg-black/35 backdrop-blur-md rounded-xl border border-white/10">
            <button
              onClick={() => onTabChange('installed')}
              title="Installed Apps"
              aria-label="Installed Apps"
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'installed'
                  ? 'bg-white/25 text-white shadow-sm border border-white/25 backdrop-blur-md'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => onTabChange('system')}
              title="System Apps"
              aria-label="System Apps"
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'system'
                  ? 'bg-white/25 text-white shadow-sm border border-white/25 backdrop-blur-md'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Cpu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
