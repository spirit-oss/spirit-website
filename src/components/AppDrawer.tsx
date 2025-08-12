import React from 'react';
import { AppIcon } from './AppIcon';
import { StatusBar } from './StatusBar';
import { AuroraStoreApp } from './AuroraStoreApp';
import { ArrowLeft } from 'lucide-react';
import { 
  FileText, 
  Download, 
  Shield, 
  Lock, 
  Zap,
  Terminal,
  Package,
  Users,
  Heart,
  Coffee,
  Gamepad2,
  Map,
  Cloud,
  Image,
  Clock
} from 'lucide-react';

interface AppDrawerProps {
  onClose: () => void;
  onAppSelect: (appName: string) => void;
  cameraEnabled?: boolean;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({ 
  onClose, 
  onAppSelect, 
  cameraEnabled = true 
}) => {
  const [currentApp, setCurrentApp] = React.useState<string | null>(null);
  
  if (currentApp === 'Aurora Store') {
    return <AuroraStoreApp onBack={() => setCurrentApp(null)} />;
  }
  
  const allApps = [
    { icon: FileText, name: 'Files', gradient: false },
    { icon: Download, name: 'Aurora Store', gradient: true },
    { icon: Cloud, name: 'Weather', gradient: false },
    { icon: Coffee, name: 'Notes', gradient: false },
    { icon: Terminal, name: 'Terminal', gradient: false },
    { icon: Package, name: 'F-Droid', gradient: true },
    { icon: Users, name: 'Contacts', gradient: false },
    { icon: Heart, name: 'Health', gradient: false },
    { icon: Gamepad2, name: 'RetroArch', gradient: false },
    { icon: Map, name: 'Maps', gradient: false },
    { icon: Image, name: 'Gallery', gradient: false },
    { icon: Clock, name: 'Clock', gradient: false },
    { icon: Shield, name: 'Privacy Central', gradient: false },
  ];

  return (
    <div className="h-full bg-gradient-surface text-white flex flex-col">
      <StatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-medium">All Apps</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Apps grid */}
      <div className="flex-1 px-6 pb-8">
        <div className="grid grid-cols-4 gap-6">
          {allApps.map((app, index) => (
            <AppIcon
              key={index}
              icon={app.icon}
              name={app.name}
              gradient={app.gradient}
              onClick={() => {
                if (app.name === 'Aurora Store') {
                  setCurrentApp(app.name);
                } else if (app.name === 'Camera' && !cameraEnabled) {
                  // Let the parent handle the crash dialog
                  onAppSelect(app.name);
                } else {
                  onAppSelect(app.name);
                }
              }}
            />
          ))}
        </div>

        {/* AOSP Info */}
        <div className="mt-8 bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-white/90 mb-2">
            Android Open Source Project
          </h3>
          <p className="text-xs text-white/70 leading-relaxed">
            Spirit OS is built on AOSP without any Google services or tracking. 
            All apps are verified and come from trusted sources like F-Droid and Aurora Store.
          </p>
        </div>
      </div>
    </div>
  );
};