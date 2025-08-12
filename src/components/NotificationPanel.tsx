import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from './StatusBar';
import { Wifi, Bluetooth, Volume2, Battery, Flashlight, Airplay as Airplane, Settings, X, Sun, Moon, MapPin, Mic, Camera } from 'lucide-react';

interface NotificationPanelProps {
  onClose: () => void;
  isVisible: boolean;
  volume?: number;
  batteryEnabled?: boolean;
  gpsEnabled?: boolean;
  micEnabled?: boolean;
  cameraEnabled?: boolean;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ 
  onClose, 
  isVisible,
  volume = 50,
  batteryEnabled = true,
  gpsEnabled = true,
  micEnabled = true,
  cameraEnabled = true
}) => {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [flashlightEnabled, setFlashlightEnabled] = useState(false);
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [brightness, setBrightness] = useState(60);
  const [swipeStartY, setSwipeStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [panelOffset, setPanelOffset] = useState(0);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setSwipeStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - swipeStartY;
    
    if (deltaY < 0) {
      setPanelOffset(Math.max(deltaY, -300));
    }
  };

  const handleTouchEnd = () => {
    if (panelOffset < -100) {
      onClose();
    }
    setPanelOffset(0);
    setIsDragging(false);
  };

  return (
    <div 
      className={`
        absolute inset-0 z-50 transition-all duration-300 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
      style={{
        transform: `translateY(${panelOffset}px)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="h-full bg-gradient-surface text-white flex flex-col">
        <StatusBar />
        
        {/* Drag Handle */}
        <div className="flex justify-center py-2">
          <div className="w-12 h-1 bg-white/30 rounded-full" />
        </div>
        
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

          {/* Hardware Status */}
          <div className="mb-6">
            <h3 className="text-white/90 font-medium mb-4">Hardware Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-3 rounded-xl ${batteryEnabled ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                <div className="flex items-center">
                  <Battery className={`w-5 h-5 mr-2 ${batteryEnabled ? 'text-green-400' : 'text-red-400'}`} />
                  <span className="text-white/90 text-sm">Battery</span>
                </div>
                <p className="text-xs text-white/60 mt-1">{batteryEnabled ? 'Enabled' : 'Disabled'}</p>
              </div>

              <div className={`p-3 rounded-xl ${gpsEnabled ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                <div className="flex items-center">
                  <MapPin className={`w-5 h-5 mr-2 ${gpsEnabled ? 'text-green-400' : 'text-red-400'}`} />
                  <span className="text-white/90 text-sm">GPS</span>
                </div>
                <p className="text-xs text-white/60 mt-1">{gpsEnabled ? 'Enabled' : 'Disabled'}</p>
              </div>

              <div className={`p-3 rounded-xl ${micEnabled ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                <div className="flex items-center">
                  <Mic className={`w-5 h-5 mr-2 ${micEnabled ? 'text-green-400' : 'text-red-400'}`} />
                  <span className="text-white/90 text-sm">Microphone</span>
                </div>
                <p className="text-xs text-white/60 mt-1">{micEnabled ? 'Enabled' : 'Disabled'}</p>
              </div>

              <div className={`p-3 rounded-xl ${cameraEnabled ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                <div className="flex items-center">
                  <Camera className={`w-5 h-5 mr-2 ${cameraEnabled ? 'text-green-400' : 'text-red-400'}`} />
                  <span className="text-white/90 text-sm">Camera</span>
                </div>
                <p className="text-xs text-white/60 mt-1">{cameraEnabled ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>
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
                <div className="w-full h-2 bg-white/20 rounded-full">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${volume}%` }}
                  />
                </div>
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