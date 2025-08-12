import React from 'react';
import { LockScreen } from './LockScreen';
import { PowerAnimation } from './PowerAnimation';

interface PhoneFrameProps {
  children: React.ReactNode;
  isPoweredOn?: boolean;
  isBooting?: boolean;
  onPowerComplete?: () => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ 
  children, 
  isPoweredOn = true, 
  isBooting = false,
  onPowerComplete 
}) => {
  const [isLocked, setIsLocked] = React.useState(true);

  React.useEffect(() => {
    const handleLockScreen = () => {
      setIsLocked(true);
    };

    window.addEventListener('lockScreen', handleLockScreen);
    return () => window.removeEventListener('lockScreen', handleLockScreen);
  }, []);

  return (
    <div className="relative mx-auto w-[375px] h-[812px] bg-phone-background rounded-[3rem] p-2 phone-shadow">
      {/* Phone outer frame */}
      <div className="w-full h-full bg-black rounded-[2.5rem] relative overflow-hidden">
        {/* Screen area */}
        <div className="absolute inset-1 bg-phone-screen rounded-[2rem] overflow-hidden">
          {!isPoweredOn ? (
            <div className="w-full h-full bg-black" />
          ) : isBooting ? (
            <PowerAnimation onComplete={onPowerComplete} />
          ) : (
            <>
          {isLocked ? (
            <LockScreen onUnlock={() => setIsLocked(false)} />
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