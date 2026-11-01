export type AppCategory = 'installed' | 'system';

export type AppState = 'foreground' | 'background' | 'cached' | 'stopped';

export type PermissionType = 
  | 'camera'
  | 'microphone'
  | 'location'
  | 'storage'
  | 'contacts'
  | 'notifications'
  | 'phone'
  | 'background';

export interface AppPermission {
  type: PermissionType;
  name: string;
  granted: boolean;
  isCurrentlyActive: boolean; // whether permission is actively in use right now!
  lastAccessedTime?: string;
  description: string;
}

export interface BatteryHistoryPoint {
  time: string;
  drawMa: number;
}

export interface AppItem {
  id: string;
  name: string;
  packageName: string;
  icon: string;
  category: AppCategory;
  state: AppState;
  
  // What the app does (its purpose)
  purpose: string;
  
  // What the app is doing right now
  currentActivity: string;

  // Battery metrics
  battery: {
    totalPercent: number; // e.g. 14.2%
    totalMah: number; // e.g. 640 mAh
    liveDrawMa: number; // e.g. 185 mA (real-time draw)
    drainRatePerHourPercent: number; // e.g. 3.2%/hr
    screenOnDrainPercent: number;
    backgroundDrainPercent: number;
    history: BatteryHistoryPoint[];
  };

  // Active time & uptime
  activeSince: string; // e.g. "08:15 AM (2h 15m ago)"
  activeSinceMinutesAgo: number;
  foregroundMinutesToday: number;
  backgroundMinutesToday: number;

  // Space & Data
  storage: {
    totalMb: number;
    appMb: number;
    dataMb: number;
    cacheMb: number;
  };
  ramMb: number;
  cpuPercent: number;
  dataUsage: {
    wifiMb: number;
    cellularMb: number;
    currentSpeedKbps: number;
  };

  // Permissions & Privacy
  permissions: AppPermission[];
  privacyRisk: 'low' | 'medium' | 'high';
  isBackgroundRestricted: boolean;
}

export type ActiveTab = 'installed' | 'system';
export type SortOption = 'battery_desc' | 'live_draw_desc' | 'ram_desc' | 'storage_desc' | 'name_asc';
