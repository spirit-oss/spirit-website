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
  Clock,
  Search
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
    { icon: Camera, name: 'Camera', gradient: false },
    { icon: Settings, name: 'Settings', gradient: false },
    { icon: Calculator, name: 'Calculator', gradient: false },
    { icon: Calendar, name: 'Calendar', gradient: false },
    { icon: Music, name: 'Music', gradient: false },
  ];

  const dockApps = [
    { icon: Phone, name: 'Phone', gradient: true },
    { icon: MessageSquare, name: 'Messages', gradient: false },
  ];

  const openApp = (appName: string) => {
    // Check if camera is disabled and user tries to open camera
    if (appName === 'Camera' && !cameraEnabled) {
      alert('Camera not available - hardware disabled');
      return;
    }
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
    return <AppDrawer onClose={closeAppDrawer} onAppSelect={openApp} cameraEnabled={cameraEnabled} />;
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
      <StatusBar gpsEnabled={gpsEnabled} micEnabled={micEnabled} />
      
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

        {/* DuckDuckGo Search Widget */}
        <div className="mb-8">
          <button
            onClick={() => openApp('Browser')}
            className="w-full bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-black/30 transition-smooth"
          >
            <div className="flex items-center">
              <Search className="w-5 h-5 text-white/70 mr-3" />
              <span className="text-white/70 text-left">Search DuckDuckGo</span>
            </div>
          </button>
        </div>

        {/* Main apps grid */}
        <div className="grid grid-cols-4 gap-6 mb-12">
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

        {/* App drawer button */}
      </div>

      {/* Dock */}
      <div className="px-6 pb-4">
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex justify-center items-center space-x-8">
            {/* Phone */}
            <AppIcon
              icon={dockApps[0].icon}
              name={dockApps[0].name}
              gradient={dockApps[0].gradient}
              onClick={() => openApp(dockApps[0].name)}
            />
            
            {/* App Drawer Button */}
            <button
              onClick={openAppDrawer}
              className="flex flex-col items-center space-y-2 cursor-pointer group transition-smooth"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center app-shadow group-hover:scale-110 transition-spring">
                <div className="grid grid-cols-2 gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-white/60 rounded-full" />
                  ))}
                </div>
              </div>
              <span className="text-xs text-white/90 text-center leading-tight max-w-[4rem] break-words">
                Apps
              </span>
            </button>
            
            {/* Messages */}
            <AppIcon
              icon={dockApps[1].icon}
              name={dockApps[1].name}
              gradient={dockApps[1].gradient}
              onClick={() => openApp(dockApps[1].name)}
            />
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