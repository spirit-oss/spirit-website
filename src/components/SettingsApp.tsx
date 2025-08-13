import React, { useState, useRef } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, ChevronRight, Check, X, Play, Pause } from 'lucide-react';
import { 
  Wifi, 
  Bluetooth, 
  Volume2, 
  Shield, 
  Battery, 
  Smartphone,
  Lock,
  Users,
  Download,
  Info,
  Smartphone as Display,
  Bell,
  Globe,
  HardDrive,
  Zap,
  Languages,
  Clock,
  Accessibility,
  Fingerprint,
  Image
} from 'lucide-react';

interface SettingsAppProps {
  onBack: () => void;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({ onBack }) => {
  const [selectedSetting, setSelectedSetting] = React.useState<string | null>(null);
  const [selectedSoundCategory, setSelectedSoundCategory] = useState<string | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Sound configuration state
  const [soundSettings, setSoundSettings] = useState({
    ringtones: {
      default: 'old-ringtone.mp3',
      work: 'work-calling.mp3',
      mom: 'mom-calling.mp3',
      boss: 'boss-calling.mp3'
    },
    textAlerts: {
      default: 'woo-hoo-text.mp3',
      special: 'mario-1-up.mp3'
    },
    alarms: {
      default: 'basic-alarm.mp3',
      work: 'back-to-work.mp3'
    }
  });

  // Wallpaper state
  const [currentWallpaper, setCurrentWallpaper] = useState('default');
  
  const wallpapers = [
    { id: 'default', name: 'Spirit Gradient', preview: 'bg-gradient-surface', type: 'gradient' },
    { id: 'background1', name: 'Background 1', preview: '/background1.jpeg', type: 'image' },
    { id: 'background2', name: 'Background 2', preview: '/background2.jpeg', type: 'image' },
    { id: 'background3', name: 'Background 3', preview: '/background3.jpeg', type: 'image' },
    { id: 'background4', name: 'Background 4', preview: '/background4.jpeg', type: 'image' }
  ];

  const settingsGroups = [
    {
      title: "Connectivity",
      items: [
        { icon: Wifi, name: "Wi-Fi", value: "Connected", color: "text-accent" },
        { icon: Bluetooth, name: "Bluetooth", value: "Off", color: "text-white/60" },
      ]
    },
    {
      title: "Device",
      items: [
        { icon: Volume2, name: "Sound & Vibration", value: "", color: "text-white/90", id: "sound" },
        { icon: Battery, name: "Battery", value: "87%", color: "text-accent", id: "battery" },
        { icon: Smartphone, name: "Display", value: "", color: "text-white/90", id: "display" },
      ]
    },
    {
      title: "Privacy & Security",
      items: [
        { icon: Shield, name: "Privacy Dashboard", value: "Active", color: "text-accent", id: "privacy" },
        { icon: Lock, name: "Security", value: "", color: "text-white/90", id: "security" },
        { icon: Users, name: "App Permissions", value: "", color: "text-white/90", id: "permissions" },
      ]
    },
    {
      title: "System",
      items: [
        { icon: Download, name: "System Update", value: "Up to date", color: "text-accent" },
        { icon: Info, name: "About Spirit OS", value: "v1.0", color: "text-white/90" },
      ]
    }
  ];

  // Audio control functions
  const playSound = async (soundFile: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (currentlyPlaying === soundFile) {
        audio.pause();
        setCurrentlyPlaying(null);
      } else {
        audio.src = `/${soundFile}`;
        audio.currentTime = 0;
        await audio.play();
        setCurrentlyPlaying(soundFile);
        
        // Auto-stop after playback
        audio.onended = () => setCurrentlyPlaying(null);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };

  // Sound category data
  const soundCategories = {
    ringtones: {
      title: 'Ringtones',
      icon: Bell,
      color: 'text-blue-400',
      sounds: [
        { name: 'Classic Ring', file: 'old-ringtone.mp3', description: 'Traditional phone ring' },
        { name: 'Work Call', file: 'work-calling.mp3', description: 'Professional tone' },
        { name: 'Mom Calling', file: 'mom-calling.mp3', description: 'Family-friendly tone' },
        { name: 'Boss Calling', file: 'boss-calling.mp3', description: 'Important call alert' }
      ]
    },
    textAlerts: {
      title: 'Text Alerts',
      icon: Volume2,
      color: 'text-green-400',
      sounds: [
        { name: 'Woo Hoo!', file: 'woo-hoo-text.mp3', description: 'Cheerful notification' },
        { name: 'Mario 1-Up', file: 'mario-1-up.mp3', description: 'Game-style alert' }
      ]
    },
    alarms: {
      title: 'Alarms',
      icon: Clock,
      color: 'text-orange-400',
      sounds: [
        { name: 'Basic Alarm', file: 'basic-alarm.mp3', description: 'Standard wake-up call' },
        { name: 'Back to Work', file: 'back-to-work.mp3', description: 'Productivity reminder' }
      ]
    }
  };

  // Individual setting screens
  const renderSoundSettings = () => {
    if (selectedSoundCategory) {
      const category = soundCategories[selectedSoundCategory as keyof typeof soundCategories];
      return (
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-6 space-y-6">
            {/* Category Header */}
            <div className="flex items-center mb-6">
              <button
                onClick={() => setSelectedSoundCategory(null)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20 mr-4"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mr-4`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-white">{category.title}</h2>
                  <p className="text-white/60 text-sm">Tap to preview • Set as default</p>
                </div>
              </div>
            </div>

            {/* Sound List */}
            <div className="space-y-3">
              {category.sounds.map((sound, index) => (
                <div key={index} className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-white/90 font-medium">{sound.name}</h4>
                      <p className="text-white/50 text-sm">{sound.description}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {/* Preview Button */}
                      <button
                        onClick={() => playSound(sound.file)}
                        className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center transition-smooth hover:bg-primary/30"
                      >
                        {currentlyPlaying === sound.file ? (
                          <Pause className="w-5 h-5 text-primary" />
                        ) : (
                          <Play className="w-5 h-5 text-primary ml-0.5" />
                        )}
                      </button>
                      
                      {/* Set as Default Button */}
                      <button 
                        onClick={() => {
                          const newSettings = { ...soundSettings };
                          if (selectedSoundCategory === 'ringtones') {
                            newSettings.ringtones.default = sound.file;
                          } else if (selectedSoundCategory === 'textAlerts') {
                            newSettings.textAlerts.default = sound.file;
                          } else if (selectedSoundCategory === 'alarms') {
                            newSettings.alarms.default = sound.file;
                          }
                          setSoundSettings(newSettings);
                        }}
                        className="px-4 py-2 rounded-xl bg-accent/20 text-accent text-sm font-medium transition-smooth hover:bg-accent/30"
                      >
                        Set Default
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hidden Audio Element */}
          <audio ref={audioRef} preload="metadata" />
        </div>
      );
    }

    return (
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-6 space-y-6">
          {/* Volume Controls */}
          <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
            <h3 className="text-white/90 font-medium mb-4">Volume</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Media</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 h-2 bg-white/20 rounded-full">
                    <div className="w-3/4 h-2 bg-primary rounded-full" />
                  </div>
                  <span className="text-white/60 text-sm">75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Ringtone</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 h-2 bg-white/20 rounded-full">
                    <div className="w-1/2 h-2 bg-primary rounded-full" />
                  </div>
                  <span className="text-white/60 text-sm">50%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Notifications</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 h-2 bg-white/20 rounded-full">
                    <div className="w-2/3 h-2 bg-primary rounded-full" />
                  </div>
                  <span className="text-white/60 text-sm">67%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sound Categories */}
          <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
            <h3 className="text-white/90 font-medium mb-4">Sound & Alerts</h3>
            <div className="space-y-3">
              {Object.entries(soundCategories).map(([key, category]) => (
                <div
                  key={key}
                  onClick={() => setSelectedSoundCategory(key)}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl cursor-pointer transition-smooth hover:bg-white/10"
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mr-3`}>
                      <category.icon className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <div>
                      <span className="text-white/90 block">{category.title}</span>
                      <span className="text-white/50 text-xs">{category.sounds.length} sounds available</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/40" />
                </div>
              ))}
            </div>
          </div>

          {/* Sound Options */}
          <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
            <h3 className="text-white/90 font-medium mb-4">Sound Options</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Vibrate on ring</span>
                <div className="w-12 h-6 rounded-full bg-primary relative">
                  <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 right-0.5" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Touch sounds</span>
                <div className="w-12 h-6 rounded-full bg-white/20 relative">
                  <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-0.5" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Screen lock sounds</span>
                <div className="w-12 h-6 rounded-full bg-primary relative">
                  <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 right-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Current Assignments */}
          <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
            <h3 className="text-white/90 font-medium mb-4">Current Assignments</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Default Ringtone</span>
                <span className="text-white/90 text-sm">{soundSettings.ringtones.default.replace('.mp3', '').replace(/-/g, ' ')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Default Text Alert</span>
                <span className="text-white/90 text-sm">{soundSettings.textAlerts.default.replace('.mp3', '').replace(/-/g, ' ')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Default Alarm</span>
                <span className="text-white/90 text-sm">{soundSettings.alarms.default.replace('.mp3', '').replace(/-/g, ' ')}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hidden Audio Element */}
        <audio ref={audioRef} preload="metadata" />
      </div>
    );
  };

  const renderBatterySettings = () => (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-6 space-y-6">
        {/* Battery Status */}
        <div className="bg-black/20 rounded-2xl p-6 backdrop-blur-sm text-center">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <Battery className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">87%</h3>
          <p className="text-white/70">Charging • 2h 15m until full</p>
        </div>

        {/* Battery Usage */}
        <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-white/90 font-medium mb-4">Battery Usage</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center mr-3">
                  <Display className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-white/70">Screen</span>
              </div>
              <span className="text-white/60">32%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center mr-3">
                  <Globe className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-white/70">Browser</span>
              </div>
              <span className="text-white/60">18%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded bg-purple-500/20 flex items-center justify-center mr-3">
                  <Volume2 className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-white/70">Music</span>
              </div>
              <span className="text-white/60">12%</span>
            </div>
          </div>
        </div>

        {/* Battery Optimization */}
        <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-white/90 font-medium mb-4">Battery Optimization</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Battery Saver</span>
              <div className="w-12 h-6 rounded-full bg-white/20 relative">
                <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-0.5" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Adaptive Battery</span>
              <div className="w-12 h-6 rounded-full bg-primary relative">
                <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 right-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-6 space-y-6">
        {/* Privacy Dashboard */}
        <div className="bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl p-6 border border-accent/20">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Privacy Protected</h3>
            <p className="text-white/70">Your data stays on your device</p>
          </div>
        </div>

        {/* Privacy Controls */}
        <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-white/90 font-medium mb-4">Privacy Controls</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Location Services</span>
              <div className="w-12 h-6 rounded-full bg-primary relative">
                <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 right-0.5" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Camera Access</span>
              <div className="w-12 h-6 rounded-full bg-primary relative">
                <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 right-0.5" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Microphone Access</span>
              <div className="w-12 h-6 rounded-full bg-primary relative">
                <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 right-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Data Collection */}
        <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-white/90 font-medium mb-4">Data Collection</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <X className="w-5 h-5 text-red-400 mr-2" />
                <span className="text-white/70">Google Services</span>
              </div>
              <span className="text-red-400 text-sm">Disabled</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <X className="w-5 h-5 text-red-400 mr-2" />
                <span className="text-white/70">Analytics</span>
              </div>
              <span className="text-red-400 text-sm">Disabled</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-accent mr-2" />
                <span className="text-white/70">Local Processing</span>
              </div>
              <span className="text-accent text-sm">Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-6 space-y-6">
        {/* Screen Lock */}
        <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-white/90 font-medium mb-4">Screen Lock</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center">
                <Fingerprint className="w-5 h-5 text-primary mr-3" />
                <span className="text-white/90">Fingerprint</span>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center">
                <Lock className="w-5 h-5 text-white/70 mr-3" />
                <span className="text-white/90">PIN</span>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </div>
          </div>
        </div>

        {/* Security Options */}
        <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-white/90 font-medium mb-4">Security Options</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Auto-lock</span>
              <span className="text-white/60">30 seconds</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Show on lock screen</span>
              <div className="w-12 h-6 rounded-full bg-white/20 relative">
                <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Encryption */}
        <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-white/90 font-medium mb-4">Encryption</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-accent mr-2" />
                <span className="text-white/70">Device Encryption</span>
              </div>
              <span className="text-accent text-sm">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-accent mr-2" />
                <span className="text-white/70">Secure Boot</span>
              </div>
              <span className="text-accent text-sm">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPermissionsSettings = () => (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-6 space-y-6">
        {/* Permission Categories */}
        <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-white/90 font-medium mb-4">Permission Categories</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center">
                <Camera className="w-5 h-5 text-purple-400 mr-3" />
                <div>
                  <span className="text-white/90 block">Camera</span>
                  <span className="text-white/50 text-xs">2 apps have access</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center">
                <Volume2 className="w-5 h-5 text-blue-400 mr-3" />
                <div>
                  <span className="text-white/90 block">Microphone</span>
                  <span className="text-white/50 text-xs">1 app has access</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-green-400 mr-3" />
                <div>
                  <span className="text-white/90 block">Location</span>
                  <span className="text-white/50 text-xs">3 apps have access</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </div>
          </div>
        </div>

        {/* Recently Used Permissions */}
        <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-white/90 font-medium mb-4">Recent Permission Usage</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center mr-3">
                  <Camera className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <span className="text-white/90 text-sm block">Camera</span>
                  <span className="text-white/50 text-xs">Used 5 min ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDisplaySettings = () => (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-6 space-y-6">
        {/* Wallpaper Section */}
        <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-white/90 font-medium mb-4">Wallpaper</h3>
          <div className="grid grid-cols-2 gap-3">
            {wallpapers.map((wallpaper) => (
              <div
                key={wallpaper.id}
                onClick={() => setCurrentWallpaper(wallpaper.id)}
                className={`relative rounded-xl overflow-hidden cursor-pointer transition-smooth hover:scale-105 ${
                  currentWallpaper === wallpaper.id ? 'ring-2 ring-accent' : ''
                }`}
              >
                {wallpaper.type === 'gradient' ? (
                  <div className={`w-full h-24 ${wallpaper.preview}`} />
                ) : (
                  <img
                    src={wallpaper.preview}
                    alt={wallpaper.name}
                    className="w-full h-24 object-cover"
                  />
                )}
                
                {/* Selection indicator */}
                {currentWallpaper === wallpaper.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                
                {/* Wallpaper name */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2">
                  <span className="text-white text-xs font-medium">{wallpaper.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-white/90 font-medium mb-4">Screen</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Brightness</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 h-2 bg-white/20 rounded-full">
                  <div className="w-2/3 h-2 bg-primary rounded-full" />
                </div>
                <span className="text-white/60 text-sm">67%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Auto-brightness</span>
              <div className="w-12 h-6 rounded-full bg-primary relative">
                <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 right-0.5" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Screen timeout</span>
              <span className="text-white/60">2 minutes</span>
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-white/90 font-medium mb-4">Theme</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Dark mode</span>
              <div className="w-12 h-6 rounded-full bg-primary relative">
                <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 right-0.5" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Material You colors</span>
              <div className="w-12 h-6 rounded-full bg-primary relative">
                <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 right-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (selectedSetting) {
    return (
      <div className="h-full bg-gradient-surface text-white flex flex-col">
        <StatusBar />
        
        {/* Header */}
        <div className="flex items-center px-6 py-4 border-b border-white/10">
          <button
            onClick={() => setSelectedSetting(null)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20 mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-medium">
            {selectedSetting === 'sound' && 'Sound & Vibration'}
            {selectedSetting === 'battery' && 'Battery'}
            {selectedSetting === 'display' && 'Display'}
            {selectedSetting === 'privacy' && 'Privacy Dashboard'}
            {selectedSetting === 'security' && 'Security'}
            {selectedSetting === 'permissions' && 'App Permissions'}
          </h1>
        </div>

        {/* Setting Content */}
        {selectedSetting === 'sound' && renderSoundSettings()}
        {selectedSetting === 'battery' && renderBatterySettings()}
        {selectedSetting === 'display' && renderDisplaySettings()}
        {selectedSetting === 'privacy' && renderPrivacySettings()}
        {selectedSetting === 'security' && renderSecuritySettings()}
        {selectedSetting === 'permissions' && renderPermissionsSettings()}
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-surface text-white flex flex-col">
      <StatusBar />
      
      {/* Header */}
      <div className="flex items-center px-6 py-4 border-b border-white/10">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20 mr-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-medium">Settings</h1>
      </div>

      {/* Settings content */}
      <div className="flex-1 overflow-y-auto">
        {/* Spirit OS Banner */}
        <div className="mx-6 mt-6 mb-8 bg-gradient-primary rounded-2xl p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-lg font-medium text-white mb-2">Spirit OS</h2>
          <p className="text-sm text-white/80">Privacy-first Android experience</p>
          <p className="text-xs text-white/60 mt-2">No Google • Open Source • Secure</p>
        </div>

        {/* Settings groups */}
        <div className="px-6 space-y-8 pb-8">
          {settingsGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">
                {group.title}
              </h3>
              <div className="bg-black/20 rounded-2xl backdrop-blur-sm overflow-hidden">
                {group.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`
                      flex items-center justify-between p-4 transition-smooth hover:bg-white/5
                      ${itemIndex !== group.items.length - 1 ? 'border-b border-white/5' : ''}
                    `}
                    onClick={() => item.id && setSelectedSetting(item.id)}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mr-4">
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div>
                        <div className="text-white/90 font-medium">{item.name}</div>
                        {item.value && (
                          <div className={`text-sm ${item.color}`}>{item.value}</div>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/40" />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* About section */}
          <div className="bg-black/20 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-white/90 font-medium mb-4">About This Build</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Android Version</span>
                <span className="text-white/90">16.0 (API 35)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Build Type</span>
                <span className="text-white/90">AOSP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Security Patch</span>
                <span className="text-accent">2024-11-01</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Kernel</span>
                <span className="text-white/90">6.8.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};