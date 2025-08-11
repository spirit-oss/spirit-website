import React from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, ChevronRight } from 'lucide-react';
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
  Info
} from 'lucide-react';

interface SettingsAppProps {
  onBack: () => void;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({ onBack }) => {
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
        { icon: Volume2, name: "Sound & Vibration", value: "", color: "text-white/90" },
        { icon: Battery, name: "Battery", value: "87%", color: "text-accent" },
        { icon: Smartphone, name: "Display", value: "", color: "text-white/90" },
      ]
    },
    {
      title: "Privacy & Security",
      items: [
        { icon: Shield, name: "Privacy Dashboard", value: "Active", color: "text-accent" },
        { icon: Lock, name: "Security", value: "", color: "text-white/90" },
        { icon: Users, name: "App Permissions", value: "", color: "text-white/90" },
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