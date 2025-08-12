import React, { useState } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { HomeScreen } from '@/components/HomeScreen';
import { Power, Volume2, VolumeX, Battery, MapPin, Mic, Camera } from 'lucide-react';

const TestOS = () => {
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [isBooting, setIsBooting] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [isFullyBooted, setIsFullyBooted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [volume, setVolume] = useState(50);
  const [batteryEnabled, setBatteryEnabled] = useState(true);
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [showVolumePopup, setShowVolumePopup] = useState(false);

  // Initialize with boot sequence on first load
  React.useEffect(() => {
    // Start with boot animation
    setIsBooting(true);
    setTimeout(() => {
      setIsFullyBooted(true);
      setIsBooting(false);
      // Start locked after boot
      setIsUnlocked(false);
    }, 3000);
  }, []);

  const handlePowerButton = (duration: 'short' | 'long') => {
    if (duration === 'short') {
      // Screen on/off (but keep powered)
      if (isPoweredOn) {
        // Toggle lock state
        setIsUnlocked(!isUnlocked);
      }
    } else {
      // Power on/off functionality
      if (isPoweredOn) {
        // Start shutdown animation
        setIsShuttingDown(true);
        setIsFullyBooted(false);
        setIsUnlocked(false);
      } else {
        // Power on with boot animation
        setIsBooting(true);
        setIsFullyBooted(false);
        setIsUnlocked(false);
        setTimeout(() => {
          setIsPoweredOn(true);
        }, 100);
      }
    }
  };

  const handleVolumeChange = (direction: 'up' | 'down') => {
    // Only allow volume changes if phone is fully booted and unlocked
    if (!isPoweredOn || !isFullyBooted || !isUnlocked) {
      return;
    }
    
    if (direction === 'up') {
      setVolume(prev => Math.min(100, prev + 10));
      setShowVolumePopup(true);
    } else {
      setVolume(prev => Math.max(0, prev - 10));
      setShowVolumePopup(true);
    }
  };

  const handleBatteryToggle = () => {
    if (batteryEnabled) {
      // Immediately turn off phone when battery is disabled
      setBatteryEnabled(false);
      setIsPoweredOn(false);
      setIsFullyBooted(false);
      setIsUnlocked(false);
    } else {
      // Re-enable battery but don't auto-power on
      setBatteryEnabled(true);
    }
  };

  const handleBootComplete = () => {
    setIsBooting(false);
    setIsFullyBooted(true);
    setIsUnlocked(false); // Start locked after boot
  };

  const handleShutdownComplete = () => {
    setIsShuttingDown(false);
    setIsPoweredOn(false);
    setIsFullyBooted(false);
    setIsUnlocked(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-7xl mx-auto">
        {/* Phone Demo */}
        <div className="flex-shrink-0">
          <PhoneFrame 
            isPoweredOn={isPoweredOn}
            isBooting={isBooting}
            isShuttingDown={isShuttingDown}
            onPowerComplete={handleBootComplete}
            onShutdownComplete={handleShutdownComplete}
          >
            <HomeScreen 
              volume={volume}
              batteryEnabled={batteryEnabled}
              gpsEnabled={gpsEnabled}
              micEnabled={micEnabled}
              cameraEnabled={cameraEnabled}
              isFullyBooted={isFullyBooted}
              isUnlocked={isUnlocked}
              onVolumeChange={setVolume}
              showVolumePopup={showVolumePopup}
              onHideVolumePopup={() => setShowVolumePopup(false)}
            />
          </PhoneFrame>
        </div>
        
        {/* Control Panel */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 min-w-[350px]">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Hardware Controls</h2>
          
          {/* Power Button Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Power className="w-5 h-5 text-green-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Power Button</h3>
            </div>
            
            <button
              onClick={() => handlePowerButton('short')}
              className={`w-full font-medium py-3 px-6 rounded-xl transition-all duration-200 mb-2 ${
                isPoweredOn && isFullyBooted
                  ? (isUnlocked ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white')
                  : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
              }`}
              disabled={isBooting || isShuttingDown}
            >
              <Power className="w-5 h-5 inline mr-2" />
              {!isPoweredOn ? 'Power On' : 
               !isFullyBooted ? 'Booting...' :
               isUnlocked ? 'Lock Screen' : 'Unlock Screen'}
            </button>
            
            <button
              onClick={() => handlePowerButton('long')}
              className={`w-full font-medium py-2 px-6 rounded-xl transition-all duration-200 mb-3 text-sm ${
                isPoweredOn && !isShuttingDown
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
              disabled={isBooting || isShuttingDown}
            >
              {isShuttingDown ? 'Shutting Down...' :
               isPoweredOn ? 'Power Off' : 'Boot Up'}
            </button>
          </div>

          {/* Volume Controls */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Volume2 className="w-5 h-5 text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Volume</h3>
            </div>
            
            <div className="flex gap-3 mb-3">
              <button
                onClick={() => handleVolumeChange('down')}
                className={`flex-1 font-medium py-3 px-4 rounded-xl transition-all duration-200 ${
                  isPoweredOn && isFullyBooted && isUnlocked
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!isPoweredOn || !isFullyBooted || !isUnlocked}
              >
                V-
              </button>
              <button
                onClick={() => handleVolumeChange('up')}
                className={`flex-1 font-medium py-3 px-4 rounded-xl transition-all duration-200 ${
                  isPoweredOn && isFullyBooted && isUnlocked
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!isPoweredOn || !isFullyBooted || !isUnlocked}
              >
                V+
              </button>
            </div>
            
            <div className="text-center text-white font-medium">{volume}%</div>
            <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  isPoweredOn && isFullyBooted && isUnlocked ? 'bg-blue-500' : 'bg-gray-500'
                }`}
                style={{ width: `${volume}%` }}
              />
            </div>
            {(!isPoweredOn || !isFullyBooted || !isUnlocked) && (
              <div className="text-center text-xs text-slate-400 mt-2">
                {!isPoweredOn ? 'Phone is off' :
                 !isFullyBooted ? 'Phone is booting' :
                 'Screen is locked'}
              </div>
            )}
          </div>

          {/* Privacy Switches */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Privacy Switches</h3>
            
            <div className="space-y-4">
              {/* Battery */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Battery className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-white">Battery</span>
                </div>
                <button
                  onClick={handleBatteryToggle}
                  className={`w-12 h-6 rounded-full transition-all duration-200 ${
                    batteryEnabled ? 'bg-green-500' : 'bg-slate-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-all duration-200 ${
                      batteryEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* GPS/GSM */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-white">GPS/GSM</span>
                </div>
                <button
                  onClick={() => setGpsEnabled(!gpsEnabled)}
                  className={`w-12 h-6 rounded-full transition-all duration-200 ${
                    gpsEnabled ? 'bg-green-500' : 'bg-slate-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-all duration-200 ${
                      gpsEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Microphone */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mic className="w-5 h-5 text-yellow-400 mr-3" />
                  <span className="text-white">Microphone</span>
                </div>
                <button
                  onClick={() => setMicEnabled(!micEnabled)}
                  className={`w-12 h-6 rounded-full transition-all duration-200 ${
                    micEnabled ? 'bg-green-500' : 'bg-slate-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-all duration-200 ${
                      micEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Camera */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Camera className="w-5 h-5 text-purple-400 mr-3" />
                  <span className="text-white">Camera</span>
                </div>
                <button
                  onClick={() => setCameraEnabled(!cameraEnabled)}
                  className={`w-12 h-6 rounded-full transition-all duration-200 ${
                    cameraEnabled ? 'bg-green-500' : 'bg-slate-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-all duration-200 ${
                      cameraEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400 italic">
              This is a simulated OS, the real OS might vary
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestOS;