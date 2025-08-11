import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from './StatusBar';
import { Wifi, Bluetooth, Volume2, Battery, Flashlight, Airplay as Airplane, Settings, X, Sun, Moon } from 'lucide-react';

interface NotificationBarProps {
  onClose: () => void;
  isVisible: boolean;
}

export const NotificationBar: React.FC<NotificationBarProps> = ({ onClose, isVisible }) => {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [flashlightEnabled, setFlashlightEnabled] = useState(false);
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(60);

  const quickSettings = [
    {
      icon: Wifi,
      label: 'Wi-Fi',
      enabled: wifiEnabled,
      toggle: () => setWifiEnabled(!wifiEnabled),
      color: 'text-blue-400'
    },
    {
      icon: Bluetooth,
      label: 'Bluetooth',
      enabled: bluetoothEnabled,
      toggle: () => setBluetoothEnabled(!bluetoothEnabled),
      color: 'text-blue-400'
    },
    {
      icon: Flashlight,
      label: 'Flashlight',
      enabled: flashlightEnabled,
      toggle: () => setFlashlightEnabled(!flashlightEnabled),
      color: 'text-yellow-400'
    },
    {
      icon: Airplane,
      label: 'Airplane',
      enabled: airplaneMode,
      toggle: () => setAirplaneMode(!airplaneMode),
      color: 'text-orange-400'
    },
    {
      icon: darkMode ? Moon : Sun,
      label: darkMode ? 'Dark' : 'Light',
      enabled: darkMode,
      toggle: () => setDarkMode(!darkMode),
      color: 'text-purple-400'
    },
    {
      icon: Settings,
      label: 'Settings',
      enabled: false,
      toggle: () => {},
      color: 'text-gray-400'
    }
  ];

  return (
    <div className={`
      absolute inset-0 z-50 transition-all duration-300 ease-out
      ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
    `}>
      <div className="h-full bg-gradient-surface text-white flex flex-col">
        <StatusBar />
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h1 className="text-xl font-medium">Quick Settings</h1>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Settings Grid */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {quickSettings.map((setting, index) => (
              <button
                key={index}
                onClick={setting.toggle}
                className={`
                  aspect-square rounded-2xl p-4 flex flex-col items-center justify-center transition-smooth
                  ${setting.enabled 
                    ? 'bg-white/20 backdrop-blur-sm border border-white/20' 
                    : 'bg-black/20 backdrop-blur-sm border border-white/10'
                  }
                  hover:scale-105 active:scale-95
                `}
              >
                <setting.icon 
                  className={`w-8 h-8 mb-2 ${
                    setting.enabled ? setting.color : 'text-white/60'
                  }`} 
                />
                <span className={`text-xs font-medium ${
                  setting.enabled ? 'text-white' : 'text-white/60'
                }`}>
                  {setting.label}
                </span>
              </button>
            ))}
          </div>

          {/* Sliders */}
          <div className="space-y-6">
            {/* Brightness */}
            <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Sun className="w-5 h-5 text-yellow-400 mr-3" />
                  <span className="text-white/90 font-medium">Brightness</span>
                </div>
                <span className="text-white/60 text-sm">{brightness}%</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            {/* Volume */}
            <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Volume2 className="w-5 h-5 text-blue-400 mr-3" />
                  <span className="text-white/90 font-medium">Volume</span>
                </div>
                <span className="text-white/60 text-sm">{volume}%</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="flex-1 px-6 pb-8">
          <h3 className="text-lg font-medium text-white/90 mb-4">Notifications</h3>
          <div className="bg-black/20 rounded-2xl p-6 backdrop-blur-sm text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Battery className="w-8 h-8 text-white/60" />
            </div>
            <p className="text-white/60">No new notifications</p>
          </div>
        </div>
      </div>
    </div>
  );
};