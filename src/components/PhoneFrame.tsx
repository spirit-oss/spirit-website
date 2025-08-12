import React from 'react';
import { LockScreen } from './LockScreen';
import { PowerAnimation } from './PowerAnimation';
import { PowerOffAnimation } from './PowerOffAnimation';

interface PhoneFrameProps {
  children: React.ReactNode;
  isPoweredOn?: boolean;
  isBooting?: boolean;
  isShuttingDown?: boolean;
  isUnlocked?: boolean;
  onPowerComplete?: () => void;
  onShutdownComplete?: () => void;
  onUnlockChange?: (unlocked: boolean) => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ 
  children, 
  isPoweredOn = true, 
  isBooting = false,
  isShuttingDown = false,
  isUnlocked = false,
  onPowerComplete,
  onShutdownComplete,
  onUnlockChange
}) => {
  const [isLocked, setIsLocked] = React.useState(!isUnlocked);

  // Update lock state when isUnlocked prop changes
  React.useEffect(() => {
    setIsLocked(!isUnlocked);
  }, [isUnlocked]);

  React.useEffect(() => {
    const handleLockScreen = () => {
      setIsLocked(true);
      onUnlockChange?.(false);
    };

    window.addEventListener('lockScreen', handleLockScreen);
    return () => window.removeEventListener('lockScreen', handleLockScreen);
  }, [onUnlockChange]);

  const handleUnlock = () => {
    setIsLocked(false);
    onUnlockChange?.(true);
  };

  return (
    <div className="relative mx-auto w-[375px] h-[812px] bg-phone-background rounded-[3rem] p-2 phone-shadow">
      {/* Phone outer frame */}
      <div className="w-full h-full bg-black rounded-[2.5rem] relative overflow-hidden">
        {/* Screen area */}
        <div className="absolute inset-1 bg-phone-screen rounded-[2rem] overflow-hidden">
          {!isPoweredOn ? (
            <div className="w-full h-full bg-black" />
          ) : isShuttingDown ? (
            <PowerOffAnimation onComplete={onShutdownComplete} />
          ) : isBooting ? (
            <PowerAnimation onComplete={onPowerComplete} />
          ) : (
            <>
          {isLocked ? (
            <LockScreen onUnlock={handleUnlock} />
          ) : (
            children
          )}
            </>
          )}
        </div>
        
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
      </div>
      
      {/* Power button */}
      <div className="absolute right-[-2px] top-32 w-1 h-16 bg-phone-background rounded-l" />
      
      {/* Volume buttons */}
      <div className="absolute left-[-2px] top-24 w-1 h-12 bg-phone-background rounded-r" />
      <div className="absolute left-[-2px] top-40 w-1 h-12 bg-phone-background rounded-r" />
    </div>
  );
};