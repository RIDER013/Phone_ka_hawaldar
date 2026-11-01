import { AppItem } from '../types';

export const initialAppsData: AppItem[] = [
  // ================= INSTALLED APPS =================
  {
    id: 'whatsapp',
    name: 'WhatsApp Messenger',
    packageName: 'com.whatsapp',
    icon: 'MessageSquare',
    category: 'installed',
    state: 'background',
    purpose: 'End-to-end encrypted instant messaging, voice & video calls, status updates, and media file sharing.',
    currentActivity: 'Maintaining background WebSocket connection for real-time messages and incoming call alerts.',
    battery: {
      totalPercent: 12.8,
      totalMah: 588,
      liveDrawMa: 145,
      drainRatePerHourPercent: 2.4,
      screenOnDrainPercent: 8.5,
      backgroundDrainPercent: 4.3,
      history: [
        { time: '10:00', drawMa: 60 },
        { time: '10:15', drawMa: 190 },
        { time: '10:30', drawMa: 140 },
        { time: '10:45', drawMa: 155 },
        { time: '11:00', drawMa: 145 }
      ]
    },
    activeSince: '07:45 AM (3h 15m ago)',
    activeSinceMinutesAgo: 195,
    foregroundMinutesToday: 68,
    backgroundMinutesToday: 195,
    storage: {
      totalMb: 1240,
      appMb: 95,
      dataMb: 925,
      cacheMb: 220
    },
    ramMb: 345,
    cpuPercent: 3.2,
    dataUsage: {
      wifiMb: 840,
      cellularMb: 145,
      currentSpeedKbps: 24
    },
    permissions: [
      {
        type: 'microphone',
        name: 'Microphone',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Actively in use right now (Voice daemon standby)',
        description: 'Records audio messages, voice notes, and audio calls.'
      },
      {
        type: 'camera',
        name: 'Camera',
        granted: true,
        isCurrentlyActive: false,
        lastAccessedTime: '15 minutes ago',
        description: 'Captures photos, video messages, and video calls.'
      },
      {
        type: 'contacts',
        name: 'Contacts',
        granted: true,
        isCurrentlyActive: false,
        lastAccessedTime: '2 hours ago',
        description: 'Reads phone contacts to show chat list and status.'
      },
      {
        type: 'storage',
        name: 'Files & Media',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Actively caching incoming media files',
        description: 'Saves photos, videos, voice notes, and documents.'
      },
      {
        type: 'notifications',
        name: 'Notifications',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Active now',
        description: 'Displays incoming chat messages and call alerts.'
      },
      {
        type: 'background',
        name: 'Background Run',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Active daemon running',
        description: 'Allows syncing incoming chats when screen is locked.'
      }
    ],
    privacyRisk: 'medium',
    isBackgroundRestricted: false
  },
  {
    id: 'google-maps',
    name: 'Google Maps',
    packageName: 'com.google.android.apps.maps',
    icon: 'MapPin',
    category: 'installed',
    state: 'foreground',
    purpose: 'GPS satellite navigation, live traffic alerts, public transit routing, and local place reviews.',
    currentActivity: 'Actively querying device GPS chip for live coordinates and rendering 3D vector map tiles.',
    battery: {
      totalPercent: 18.5,
      totalMah: 850,
      liveDrawMa: 380,
      drainRatePerHourPercent: 6.8,
      screenOnDrainPercent: 14.0,
      backgroundDrainPercent: 4.5,
      history: [
        { time: '10:00', drawMa: 120 },
        { time: '10:15', drawMa: 280 },
        { time: '10:30', drawMa: 410 },
        { time: '10:45', drawMa: 395 },
        { time: '11:00', drawMa: 380 }
      ]
    },
    activeSince: '09:20 AM (1h 40m ago)',
    activeSinceMinutesAgo: 100,
    foregroundMinutesToday: 45,
    backgroundMinutesToday: 55,
    storage: {
      totalMb: 680,
      appMb: 110,
      dataMb: 390,
      cacheMb: 180
    },
    ramMb: 490,
    cpuPercent: 12.4,
    dataUsage: {
      wifiMb: 120,
      cellularMb: 290,
      currentSpeedKbps: 110
    },
    permissions: [
      {
        type: 'location',
        name: 'Precise GPS Location',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Live GPS satellite polling right now',
        description: 'High-precision real-time satellite geolocation.'
      },
      {
        type: 'storage',
        name: 'Storage',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Streaming offline map cache',
        description: 'Stores offline maps and route caches.'
      },
      {
        type: 'notifications',
        name: 'Notifications',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Turn-by-turn navigation alerts',
        description: 'Sends real-time route instructions.'
      },
      {
        type: 'microphone',
        name: 'Microphone',
        granted: true,
        isCurrentlyActive: false,
        lastAccessedTime: '25 minutes ago (voice search)',
        description: 'Used for hands-free voice destination search.'
      }
    ],
    privacyRisk: 'high',
    isBackgroundRestricted: false
  },
  {
    id: 'instagram',
    name: 'Instagram',
    packageName: 'com.instagram.android',
    icon: 'Camera',
    category: 'installed',
    state: 'cached',
    purpose: 'Social networking platform for browsing reels, posting photos, viewing stories, and messaging friends.',
    currentActivity: 'Suspended in memory cache; pre-fetching recommended reels and direct messages.',
    battery: {
      totalPercent: 11.2,
      totalMah: 515,
      liveDrawMa: 45,
      drainRatePerHourPercent: 1.1,
      screenOnDrainPercent: 9.8,
      backgroundDrainPercent: 1.4,
      history: [
        { time: '10:00', drawMa: 320 },
        { time: '10:15', drawMa: 180 },
        { time: '10:30', drawMa: 50 },
        { time: '10:45', drawMa: 40 },
        { time: '11:00', drawMa: 45 }
      ]
    },
    activeSince: '08:30 AM (2h 30m ago)',
    activeSinceMinutesAgo: 150,
    foregroundMinutesToday: 38,
    backgroundMinutesToday: 112,
    storage: {
      totalMb: 1840,
      appMb: 85,
      dataMb: 810,
      cacheMb: 945
    },
    ramMb: 410,
    cpuPercent: 0.8,
    dataUsage: {
      wifiMb: 1650,
      cellularMb: 240,
      currentSpeedKbps: 4
    },
    permissions: [
      {
        type: 'camera',
        name: 'Camera',
        granted: true,
        isCurrentlyActive: false,
        lastAccessedTime: '40 minutes ago',
        description: 'Captures stories and reels video recording.'
      },
      {
        type: 'microphone',
        name: 'Microphone',
        granted: true,
        isCurrentlyActive: false,
        lastAccessedTime: '40 minutes ago',
        description: 'Records audio for video reels.'
      },
      {
        type: 'storage',
        name: 'Photos & Videos',
        granted: true,
        isCurrentlyActive: false,
        lastAccessedTime: '30 minutes ago',
        description: 'Accesses gallery to choose media to post.'
      },
      {
        type: 'notifications',
        name: 'Notifications',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Active push standby',
        description: 'Notifies of new likes, comments, and messages.'
      }
    ],
    privacyRisk: 'medium',
    isBackgroundRestricted: false
  },
  {
    id: 'spotify',
    name: 'Spotify Music',
    packageName: 'com.spotify.music',
    icon: 'Headphones',
    category: 'installed',
    state: 'background',
    purpose: 'Digital music, podcast, and audiobook streaming platform with offline playback capability.',
    currentActivity: 'Actively decoding 320kbps audio stream and feeding hardware audio DSP in background.',
    battery: {
      totalPercent: 9.4,
      totalMah: 432,
      liveDrawMa: 160,
      drainRatePerHourPercent: 2.8,
      screenOnDrainPercent: 2.1,
      backgroundDrainPercent: 7.3,
      history: [
        { time: '10:00', drawMa: 150 },
        { time: '10:15', drawMa: 165 },
        { time: '10:30', drawMa: 155 },
        { time: '10:45', drawMa: 162 },
        { time: '11:00', drawMa: 160 }
      ]
    },
    activeSince: '09:10 AM (1h 50m ago)',
    activeSinceMinutesAgo: 110,
    foregroundMinutesToday: 12,
    backgroundMinutesToday: 98,
    storage: {
      totalMb: 1120,
      appMb: 78,
      dataMb: 420,
      cacheMb: 622
    },
    ramMb: 260,
    cpuPercent: 4.1,
    dataUsage: {
      wifiMb: 380,
      cellularMb: 85,
      currentSpeedKbps: 64
    },
    permissions: [
      {
        type: 'notifications',
        name: 'Notifications',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Lockscreen playback widget active',
        description: 'Displays media player controls in notification shade.'
      },
      {
        type: 'storage',
        name: 'Storage',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Reading encrypted offline songs',
        description: 'Stores downloaded tracks for offline listening.'
      },
      {
        type: 'background',
        name: 'Background Audio Service',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Actively playing in background',
        description: 'Keeps audio stream playing when screen is locked.'
      }
    ],
    privacyRisk: 'low',
    isBackgroundRestricted: false
  },
  {
    id: 'chrome',
    name: 'Google Chrome',
    packageName: 'com.android.chrome',
    icon: 'Globe',
    category: 'installed',
    state: 'background',
    purpose: 'Fast, secure web browser for browsing websites, rendering web pages, and managing downloads.',
    currentActivity: 'Holding 6 suspended web tabs in memory and listening for web push events.',
    battery: {
      totalPercent: 8.6,
      totalMah: 395,
      liveDrawMa: 55,
      drainRatePerHourPercent: 1.2,
      screenOnDrainPercent: 7.2,
      backgroundDrainPercent: 1.4,
      history: [
        { time: '10:00', drawMa: 220 },
        { time: '10:15', drawMa: 90 },
        { time: '10:30', drawMa: 60 },
        { time: '10:45', drawMa: 50 },
        { time: '11:00', drawMa: 55 }
      ]
    },
    activeSince: '08:00 AM (3 hours ago)',
    activeSinceMinutesAgo: 180,
    foregroundMinutesToday: 32,
    backgroundMinutesToday: 148,
    storage: {
      totalMb: 1420,
      appMb: 130,
      dataMb: 780,
      cacheMb: 510
    },
    ramMb: 580,
    cpuPercent: 1.5,
    dataUsage: {
      wifiMb: 890,
      cellularMb: 130,
      currentSpeedKbps: 8
    },
    permissions: [
      {
        type: 'storage',
        name: 'Storage',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Accessing downloads folder',
        description: 'Saves downloaded files and web images.'
      },
      {
        type: 'notifications',
        name: 'Notifications',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Web push standby',
        description: 'Sends site alerts and download progress notifications.'
      },
      {
        type: 'camera',
        name: 'Camera',
        granted: true,
        isCurrentlyActive: false,
        lastAccessedTime: 'Yesterday (QR scanner)',
        description: 'Allows websites to scan codes or use camera with permission.'
      },
      {
        type: 'microphone',
        name: 'Microphone',
        granted: true,
        isCurrentlyActive: false,
        lastAccessedTime: 'Yesterday',
        description: 'Allows voice search on web pages.'
      }
    ],
    privacyRisk: 'medium',
    isBackgroundRestricted: false
  },
  {
    id: 'swiggy',
    name: 'Swiggy Food & Grocery',
    packageName: 'in.swiggy.android',
    icon: 'ShoppingBag',
    category: 'installed',
    state: 'background',
    purpose: 'Food delivery and grocery ordering application with live order tracking and restaurant discovery.',
    currentActivity: 'Tracking live delivery courier location updates and syncing estimated arrival time.',
    battery: {
      totalPercent: 5.2,
      totalMah: 239,
      liveDrawMa: 110,
      drainRatePerHourPercent: 2.1,
      screenOnDrainPercent: 3.4,
      backgroundDrainPercent: 1.8,
      history: [
        { time: '10:00', drawMa: 40 },
        { time: '10:15', drawMa: 130 },
        { time: '10:30', drawMa: 120 },
        { time: '10:45', drawMa: 115 },
        { time: '11:00', drawMa: 110 }
      ]
    },
    activeSince: '10:10 AM (50 minutes ago)',
    activeSinceMinutesAgo: 50,
    foregroundMinutesToday: 14,
    backgroundMinutesToday: 36,
    storage: {
      totalMb: 380,
      appMb: 68,
      dataMb: 210,
      cacheMb: 102
    },
    ramMb: 210,
    cpuPercent: 2.8,
    dataUsage: {
      wifiMb: 110,
      cellularMb: 45,
      currentSpeedKbps: 32
    },
    permissions: [
      {
        type: 'location',
        name: 'Location',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Actively checking GPS for delivery tracking',
        description: 'Identifies delivery address and tracks courier proximity.'
      },
      {
        type: 'notifications',
        name: 'Notifications',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Active live activity alert',
        description: 'Provides real-time order status updates.'
      }
    ],
    privacyRisk: 'high',
    isBackgroundRestricted: false
  },
  {
    id: 'truecaller',
    name: 'Truecaller',
    packageName: 'com.truecaller',
    icon: 'PhoneCall',
    category: 'installed',
    state: 'background',
    purpose: 'Caller identification, spam call detection, fraud prevention, and dialer management.',
    currentActivity: 'PhoneStateListener listening for incoming telephony calls and updating spam database.',
    battery: {
      totalPercent: 4.8,
      totalMah: 220,
      liveDrawMa: 70,
      drainRatePerHourPercent: 1.2,
      screenOnDrainPercent: 1.5,
      backgroundDrainPercent: 3.3,
      history: [
        { time: '10:00', drawMa: 65 },
        { time: '10:15', drawMa: 72 },
        { time: '10:30', drawMa: 68 },
        { time: '10:45', drawMa: 75 },
        { time: '11:00', drawMa: 70 }
      ]
    },
    activeSince: '07:30 AM (3h 30m ago)',
    activeSinceMinutesAgo: 210,
    foregroundMinutesToday: 8,
    backgroundMinutesToday: 202,
    storage: {
      totalMb: 420,
      appMb: 92,
      dataMb: 240,
      cacheMb: 88
    },
    ramMb: 195,
    cpuPercent: 1.8,
    dataUsage: {
      wifiMb: 85,
      cellularMb: 32,
      currentSpeedKbps: 6
    },
    permissions: [
      {
        type: 'phone',
        name: 'Phone & Call Logs',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Actively monitoring call events',
        description: 'Identifies unknown incoming calls and displays caller ID.'
      },
      {
        type: 'contacts',
        name: 'Contacts',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Contacts synced',
        description: 'Matches incoming phone numbers with your address book.'
      },
      {
        type: 'notifications',
        name: 'Notifications',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Active caller popup ready',
        description: 'Displays caller ID bubble during calls.'
      }
    ],
    privacyRisk: 'high',
    isBackgroundRestricted: false
  },
  {
    id: 'youtube',
    name: 'YouTube',
    packageName: 'com.google.android.youtube',
    icon: 'PlayCircle',
    category: 'installed',
    state: 'stopped',
    purpose: 'Online video platform for watching tutorials, music videos, educational lectures, and YouTube Shorts.',
    currentActivity: 'Process terminated and completely stopped (0 mA battery draw).',
    battery: {
      totalPercent: 9.1,
      totalMah: 418,
      liveDrawMa: 0,
      drainRatePerHourPercent: 0,
      screenOnDrainPercent: 8.7,
      backgroundDrainPercent: 0.4,
      history: [
        { time: '10:00', drawMa: 380 },
        { time: '10:15', drawMa: 410 },
        { time: '10:30', drawMa: 40 },
        { time: '10:45', drawMa: 0 },
        { time: '11:00', drawMa: 0 }
      ]
    },
    activeSince: '08:40 AM (2h 20m ago)',
    activeSinceMinutesAgo: 140,
    foregroundMinutesToday: 42,
    backgroundMinutesToday: 98,
    storage: {
      totalMb: 1350,
      appMb: 120,
      dataMb: 610,
      cacheMb: 620
    },
    ramMb: 360,
    cpuPercent: 0.5,
    dataUsage: {
      wifiMb: 1840,
      cellularMb: 95,
      currentSpeedKbps: 2
    },
    permissions: [
      {
        type: 'notifications',
        name: 'Notifications',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'New video alerts standby',
        description: 'Sends alerts for subscribed channels and live streams.'
      },
      {
        type: 'storage',
        name: 'Storage',
        granted: true,
        isCurrentlyActive: false,
        lastAccessedTime: '1 hour ago',
        description: 'Stores downloaded offline videos and thumbnails.'
      },
      {
        type: 'microphone',
        name: 'Microphone',
        granted: true,
        isCurrentlyActive: false,
        lastAccessedTime: 'Yesterday (Voice search)',
        description: 'Enables voice search for videos.'
      }
    ],
    privacyRisk: 'low',
    isBackgroundRestricted: false
  },

  // ================= SYSTEM APPS =================
  {
    id: 'google-play-services',
    name: 'Google Play Services',
    packageName: 'com.google.android.gms',
    icon: 'ShieldCheck',
    category: 'system',
    state: 'background',
    purpose: 'Core system component managing Google account authentication, cloud push messaging (FCM), Play Protect, and location APIs.',
    currentActivity: 'Brokering cloud push notifications for 14 installed apps and running security integrity verification.',
    battery: {
      totalPercent: 7.8,
      totalMah: 358,
      liveDrawMa: 90,
      drainRatePerHourPercent: 1.5,
      screenOnDrainPercent: 1.2,
      backgroundDrainPercent: 6.6,
      history: [
        { time: '10:00', drawMa: 75 },
        { time: '10:15', drawMa: 110 },
        { time: '10:30', drawMa: 85 },
        { time: '10:45', drawMa: 95 },
        { time: '11:00', drawMa: 90 }
      ]
    },
    activeSince: 'Device boot (14 hours ago)',
    activeSinceMinutesAgo: 840,
    foregroundMinutesToday: 0,
    backgroundMinutesToday: 840,
    storage: {
      totalMb: 820,
      appMb: 240,
      dataMb: 490,
      cacheMb: 90
    },
    ramMb: 310,
    cpuPercent: 2.1,
    dataUsage: {
      wifiMb: 420,
      cellularMb: 65,
      currentSpeedKbps: 18
    },
    permissions: [
      {
        type: 'location',
        name: 'Location Geofencing',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Low-power location geofence active',
        description: 'Provides unified location services for installed apps.'
      },
      {
        type: 'contacts',
        name: 'Contacts Sync',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Google account sync',
        description: 'Synchronizes address book with your Google Account.'
      },
      {
        type: 'storage',
        name: 'System Storage',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Active database maintenance',
        description: 'Manages authentication credentials and SQLite databases.'
      },
      {
        type: 'background',
        name: 'Core Daemon',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Continuous system daemon',
        description: 'Runs required system background framework tasks.'
      }
    ],
    privacyRisk: 'low',
    isBackgroundRestricted: false
  },
  {
    id: 'system-ui',
    name: 'Android System UI & Launcher',
    packageName: 'com.android.systemui',
    icon: 'Layers',
    category: 'system',
    state: 'foreground',
    purpose: 'Controls the home screen layout, status bar indicators, notification drawer, navigation gestures, and wallpaper display.',
    currentActivity: 'Compositing surface flinger displays, managing 120Hz refresh rate, and processing touchscreen gestures.',
    battery: {
      totalPercent: 6.2,
      totalMah: 285,
      liveDrawMa: 85,
      drainRatePerHourPercent: 1.4,
      screenOnDrainPercent: 5.0,
      backgroundDrainPercent: 1.2,
      history: [
        { time: '10:00', drawMa: 80 },
        { time: '10:15', drawMa: 90 },
        { time: '10:30', drawMa: 85 },
        { time: '10:45', drawMa: 82 },
        { time: '11:00', drawMa: 85 }
      ]
    },
    activeSince: 'Device boot (14 hours ago)',
    activeSinceMinutesAgo: 840,
    foregroundMinutesToday: 210,
    backgroundMinutesToday: 630,
    storage: {
      totalMb: 310,
      appMb: 180,
      dataMb: 95,
      cacheMb: 35
    },
    ramMb: 420,
    cpuPercent: 4.8,
    dataUsage: {
      wifiMb: 15,
      cellularMb: 2,
      currentSpeedKbps: 0
    },
    permissions: [
      {
        type: 'notifications',
        name: 'Notification Management',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Notification shade active',
        description: 'Renders incoming alerts and quick toggle settings.'
      },
      {
        type: 'background',
        name: 'System Kernel Service',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Core OS subsystem',
        description: 'Essential operating system user interface.'
      }
    ],
    privacyRisk: 'low',
    isBackgroundRestricted: false
  },
  {
    id: 'camera',
    name: 'Camera System',
    packageName: 'com.android.camera',
    icon: 'Aperture',
    category: 'system',
    state: 'stopped',
    purpose: 'Hardware camera sensor HAL interface for high-definition photography, 4K video recording, HDR, and optical zoom.',
    currentActivity: 'Fully dormant and unpowered (Camera sensor is offline, 0 mA draw).',
    battery: {
      totalPercent: 4.1,
      totalMah: 188,
      liveDrawMa: 0,
      drainRatePerHourPercent: 0,
      screenOnDrainPercent: 4.1,
      backgroundDrainPercent: 0,
      history: [
        { time: '10:00', drawMa: 0 },
        { time: '10:15', drawMa: 480 },
        { time: '10:30', drawMa: 0 },
        { time: '10:45', drawMa: 0 },
        { time: '11:00', drawMa: 0 }
      ]
    },
    activeSince: 'Used 1 hour ago',
    activeSinceMinutesAgo: 60,
    foregroundMinutesToday: 15,
    backgroundMinutesToday: 0,
    storage: {
      totalMb: 145,
      appMb: 85,
      dataMb: 45,
      cacheMb: 15
    },
    ramMb: 0,
    cpuPercent: 0,
    dataUsage: {
      wifiMb: 0,
      cellularMb: 0,
      currentSpeedKbps: 0
    },
    permissions: [
      {
        type: 'camera',
        name: 'Camera Hardware Sensor',
        granted: true,
        isCurrentlyActive: false,
        lastAccessedTime: '1 hour ago',
        description: 'Accesses physical optical lenses and image processors.'
      },
      {
        type: 'microphone',
        name: 'Audio Recording',
        granted: true,
        isCurrentlyActive: false,
        lastAccessedTime: '1 hour ago',
        description: 'Records stereo sound during video recording.'
      },
      {
        type: 'location',
        name: 'Geotagging',
        granted: true,
        isCurrentlyActive: false,
        lastAccessedTime: '1 hour ago',
        description: 'Attaches GPS coordinates to photo EXIF metadata.'
      },
      {
        type: 'storage',
        name: 'Photo Storage',
        granted: true,
        isCurrentlyActive: false,
        lastAccessedTime: '1 hour ago',
        description: 'Saves captured photos into DCIM directory.'
      }
    ],
    privacyRisk: 'low',
    isBackgroundRestricted: false
  },
  {
    id: 'google-photos',
    name: 'Google Photos & Cloud Backup',
    packageName: 'com.google.android.apps.photos',
    icon: 'Image',
    category: 'system',
    state: 'background',
    purpose: 'Automatic cloud backup of camera photos and videos, on-device gallery organization, and AI visual search.',
    currentActivity: 'Compressing and uploading 4 new camera photos to cloud backup over Wi-Fi.',
    battery: {
      totalPercent: 6.9,
      totalMah: 317,
      liveDrawMa: 210,
      drainRatePerHourPercent: 3.5,
      screenOnDrainPercent: 2.1,
      backgroundDrainPercent: 4.8,
      history: [
        { time: '10:00', drawMa: 50 },
        { time: '10:15', drawMa: 60 },
        { time: '10:30', drawMa: 220 },
        { time: '10:45', drawMa: 235 },
        { time: '11:00', drawMa: 210 }
      ]
    },
    activeSince: '09:45 AM (1h 15m ago)',
    activeSinceMinutesAgo: 75,
    foregroundMinutesToday: 18,
    backgroundMinutesToday: 57,
    storage: {
      totalMb: 940,
      appMb: 105,
      dataMb: 520,
      cacheMb: 315
    },
    ramMb: 310,
    cpuPercent: 7.5,
    dataUsage: {
      wifiMb: 680,
      cellularMb: 12,
      currentSpeedKbps: 450
    },
    permissions: [
      {
        type: 'storage',
        name: 'Photos & Videos',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Reading DCIM camera folder',
        description: 'Scans device storage for new photos to backup.'
      },
      {
        type: 'notifications',
        name: 'Notifications',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Active backup progress notification',
        description: 'Shows status of photo upload and memory collages.'
      },
      {
        type: 'background',
        name: 'Background Upload Job',
        granted: true,
        isCurrentlyActive: true,
        lastAccessedTime: 'Active background backup running',
        description: 'Uploads photos to Google Drive in the background.'
      }
    ],
    privacyRisk: 'medium',
    isBackgroundRestricted: false
  }
];
