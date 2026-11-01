import React from 'react';
import { 
  ShieldCheck,
  Activity,
  Globe,
  MessageSquare,
  Headphones,
  ShoppingBag,
  Aperture,
  PhoneCall,
  Image,
  PlayCircle,
  MapPin,
  Camera,
  Layers
} from 'lucide-react';
import { AppItem } from '../types';

interface AppCardProps {
  app: AppItem;
  onSelect: (app: AppItem) => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  app,
  onSelect,
}) => {
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

  return (
    <button
      onClick={() => onSelect(app)}
      title={app.name}
      aria-label={app.name}
      className={`relative w-11 h-11 rounded-xl bg-black/25 hover:bg-black/45 active:scale-95 border border-white/20 hover:border-white/40 backdrop-blur-md transition-all duration-150 flex items-center justify-center cursor-pointer shadow-md shadow-black/15 group shrink-0 ${
        app.state === 'stopped' ? 'opacity-50 hover:opacity-90' : 'opacity-100'
      }`}
    >
      {/* Small app icon */}
      <div className="transform group-hover:scale-110 transition-transform duration-150">
        {getAppIcon(app.icon)}
      </div>

      {/* Subtle active status indicator dot - solid, no glow/pulse */}
      {app.state === 'foreground' && (
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-1 ring-black/40" />
      )}
      {app.state === 'background' && (
        <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-cyan-400 ring-1 ring-black/40" />
      )}
    </button>
  );
};
