import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { AppIcon } from './AppIcon';
import { AppDrawer } from './AppDrawer';
import { NotificationPanel } from './NotificationPanel';
import { SettingsApp } from './SettingsApp';
import { PhoneApp } from './PhoneApp';
import { MessagesApp } from './MessagesApp';
import { CameraApp } from './CameraApp';
import { BrowserApp } from './BrowserApp';
import { CalculatorApp } from './CalculatorApp';
import { CalendarApp } from './CalendarApp';
import { MusicApp } from './MusicApp';
import { FilesApp } from './FilesApp';
import { NotesApp } from './NotesApp';
import { PrivacyCentralApp } from './PrivacyCentralApp';
import { TerminalApp } from './TerminalApp';
import { WeatherApp } from './WeatherApp';
import { GalleryApp } from './GalleryApp';
import { ClockApp } from './ClockApp';
import { ContactsApp } from './ContactsApp';
import { RetroArchApp } from './RetroArchApp';
import { MapsApp } from './MapsApp';
import { FDroidApp } from './FDroidApp';
import { 
  Settings, 
  Camera, 
  MessageSquare, 
  Phone, 
  Globe, 
  Calculator,
  Calendar,
  Music,
  FileText,
  Shield,
  Smartphone,
  Download,
  Cloud,
  Image,
  Clock
} from 'lucide-react';

interface HomeScreenProps {
  volume?: number;
  batteryEnabled?: boolean;
  gpsEnabled?: boolean;
  micEnabled?: boolean;
  cameraEnabled?: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  volume = 50,
  batteryEnabled = true,
  gpsEnabled = true,
  micEnabled = true,
  cameraEnabled = true
}) => {
  const [currentApp, setCurrentApp] = useState<string | null>(null);
  const [showAppDrawer, setShowAppDrawer] = useState(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [swipeStartY, setSwipeStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [notificationOffset, setNotificationOffset] = useState(0);

  const mainApps = [
    { icon: Phone, name: 'Phone', gradient: true },
    { icon: MessageSquare, name: 'Messages', gradient: false },
    { icon: Camera, name: 'Camera', gradient: false },
    { icon: Globe, name: 'Browser', gradient: false },
  ];

  const dockApps = [
    { icon: Settings, name: 'Settings', gradient: false },
    { icon: Calculator, name: 'Calculator', gradient: false },
    { icon: Calendar, name: 'Calendar', gradient: false },
    { icon: Music, name: 'Music', gradient: false },
  ];

  const openApp = (appName: string) => {
    setCurrentApp(appName);
  };

  const closeApp = () => {
    setCurrentApp(null);
  };

  const openAppDrawer = () => {
    setShowAppDrawer(true);
  };

  const closeAppDrawer = () => {
    setShowAppDrawer(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setSwipeStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - swipeStartY;
    
    // Swipe down from top to show notification bar
    if (swipeStartY < 100 && deltaY > 0) {
      setNotificationOffset(Math.min(deltaY, 300));
      if (deltaY > 100) {
        setShowNotificationPanel(true);
      }
    }
    
    // Swipe up from bottom to lock (handled by parent component)
    if (swipeStartY > window.innerHeight - 100 && deltaY < -50) {
      // This will be handled by the parent component
      const event = new CustomEvent('lockScreen');
      window.dispatchEvent(event);
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (notificationOffset > 100) {
      setShowNotificationPanel(true);
    }
    setNotificationOffset(0);
  };

  if (currentApp === 'Settings') {
    return <SettingsApp onBack={closeApp} />;
  }

  if (currentApp === 'Phone') {
    return <PhoneApp onBack={closeApp} />;
  }

  if (currentApp === 'Messages') {
    return <MessagesApp onBack={closeApp} />;
  }

  if (currentApp === 'Camera') {
    return <CameraApp onBack={closeApp} />;
  }

  if (currentApp === 'Browser') {
    return <BrowserApp onBack={closeApp} />;
  }

  if (currentApp === 'Calculator') {
    return <CalculatorApp onBack={closeApp} />;
  }

  if (currentApp === 'Calendar') {
    return <CalendarApp onBack={closeApp} />;
  }

  if (currentApp === 'Music') {
    return <MusicApp onBack={closeApp} />;
  }

  if (currentApp === 'Files') {
    return <FilesApp onBack={closeApp} />;
  }

  if (currentApp === 'Notes') {
    return <NotesApp onBack={closeApp} />;
  }

  if (currentApp === 'Privacy Central') {
    return <PrivacyCentralApp onBack={closeApp} />;
  }

  if (currentApp === 'Terminal') {
    return <TerminalApp onBack={closeApp} />;
  }

  if (currentApp === 'Weather') {
    return <WeatherApp onBack={closeApp} />;
  }

  if (currentApp === 'Gallery') {
    return <GalleryApp onBack={closeApp} />;
  }

  if (currentApp === 'Clock') {
    return <ClockApp onBack={closeApp} />;
  }

  if (currentApp === 'Contacts') {
    return <ContactsApp onBack={closeApp} />;
  }

  if (currentApp === 'RetroArch') {
    return <RetroArchApp onBack={closeApp} />;
  }

  if (currentApp === 'Maps') {
    return <MapsApp onBack={closeApp} />;
  }

  if (currentApp === 'F-Droid') {
    return <FDroidApp onBack={closeApp} />;
  }

  if (showAppDrawer) {
    return <AppDrawer onClose={closeAppDrawer} onAppSelect={openApp} />;
  }

  if (showNotificationPanel) {
    return (
      <NotificationPanel 
        onClose={() => setShowNotificationPanel(false)} 
        isVisible={showNotificationPanel}
        volume={volume}
        batteryEnabled={batteryEnabled}
        gpsEnabled={gpsEnabled}
        micEnabled={micEnabled}
        cameraEnabled={cameraEnabled}
      />
    );
  }

  return (
    <div 
      className="h-full bg-gradient-surface text-white flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: showNotificationPanel ? 'none' : `translateY(${Math.min(notificationOffset * 0.1, 30)}px)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out'
      }}
    >
      <StatusBar />
      
      {/* Wallpaper area with apps */}
      <div className="flex-1 relative px-6 py-8">
        {/* Spirit OS Branding */}
        <div className="text-center mb-12 animate-float">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center elevated-shadow">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-light text-white/90">Spirit OS</h1>
          <p className="text-sm text-white/60 mt-1">Privacy-First Android</p>
        </div>

        {/* Main apps grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {mainApps.map((app, index) => (
            <AppIcon
              key={index}
              icon={app.icon}
              name={app.name}
              gradient={app.gradient}
              onClick={() => openApp(app.name)}
            />
          ))}
        </div>

        {/* Features showcase */}
        <div className="bg-black/20 rounded-2xl p-4 mb-8 backdrop-blur-sm">
          <div className="flex items-center mb-3">
            <Shield className="w-5 h-5 text-accent mr-2" />
            <span className="text-sm font-medium text-white/90">Privacy Features</span>
          </div>
          <div className="space-y-2 text-xs text-white/70">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-accent rounded-full mr-2" />
              <span>No Google Services</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-accent rounded-full mr-2" />
              <span>Open Source AOSP</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-accent rounded-full mr-2" />
              <span>Aurora Store & F-Droid</span>
            </div>
          </div>
        </div>

        {/* App drawer button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={openAppDrawer}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-smooth hover:bg-white/20"
          >
            <div className="grid grid-cols-2 gap-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-white/60 rounded-full" />
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* Dock */}
      <div className="px-6 pb-8">
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4">
          <div className="grid grid-cols-4 gap-4 justify-items-center">
            {dockApps.map((app, index) => (
              <AppIcon
                key={index}
                icon={app.icon}
                name={app.name}
                gradient={app.gradient}
                onClick={() => openApp(app.name)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Notification Panel Overlay */}
      {notificationOffset > 0 && !showNotificationPanel && (
        <div 
          className="absolute top-0 left-0 right-0 bg-gradient-surface border-b border-white/10"
          style={{ height: `${Math.min(notificationOffset, 100)}px`, opacity: notificationOffset / 100 }}
        />
      )}
    </div>
  );
};