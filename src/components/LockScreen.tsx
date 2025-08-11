import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from './StatusBar';
import { Lock, Unlock, ChevronUp } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [swipeY, setSwipeY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = startY.current - currentY;
    
    if (deltaY > 0) {
      setSwipeY(Math.min(deltaY, 200));
    }
  };

  const handleTouchEnd = () => {
    if (swipeY > 100) {
      setIsUnlocking(true);
      setTimeout(() => {
        onUnlock();
      }, 300);
    } else {
      setSwipeY(0);
    }
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startY.current = e.clientY;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const currentY = e.clientY;
    const deltaY = startY.current - currentY;
    
    if (deltaY > 0) {
      setSwipeY(Math.min(deltaY, 200));
    }
  };

  const handleMouseUp = () => {
    if (swipeY > 100) {
      setIsUnlocking(true);
      setTimeout(() => {
        onUnlock();
      }, 300);
    } else {
      setSwipeY(0);
    }
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const currentY = e.clientY;
        const deltaY = startY.current - currentY;
        
        if (deltaY > 0) {
          setSwipeY(Math.min(deltaY, 200));
        }
      };

      const handleGlobalMouseUp = () => {
        if (swipeY > 100) {
          setIsUnlocking(true);
          setTimeout(() => {
            onUnlock();
          }, 300);
        } else {
          setSwipeY(0);
        }
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, swipeY, onUnlock]);

  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col relative overflow-hidden">
      {/* Wallpaper overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900/40" />
      
      <StatusBar />
      
      {/* Lock screen content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-8">
        {/* Time and Date */}
        <div className="text-center mb-12">
          <div className="text-6xl font-light text-white mb-2 font-mono">
            {currentTime}
          </div>
          <div className="text-lg text-white/80">
            {currentDate}
          </div>
        </div>

        {/* Spirit OS Branding */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 elevated-shadow">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-xl font-light text-white/90 mb-2">Spirit OS</h1>
          <p className="text-sm text-white/60">Swipe up to unlock</p>
        </div>

        {/* Unlock indicator */}
        <div 
          className={`
            transition-all duration-300 cursor-pointer select-none
            ${isUnlocking ? 'scale-110 opacity-50' : 'scale-100 opacity-100'}
          `}
          style={{ transform: `translateY(-${swipeY}px)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div className="flex flex-col items-center">
            <div className={`
              w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4
              transition-all duration-300 border-2 border-white/20
              ${swipeY > 50 ? 'bg-primary/30 border-primary/50' : ''}
              ${isUnlocking ? 'bg-primary border-primary' : ''}
            `}>
              {isUnlocking ? (
                <Unlock className="w-8 h-8 text-white" />
              ) : (
                <ChevronUp className={`w-8 h-8 text-white transition-transform duration-300 ${swipeY > 0 ? 'scale-125' : ''}`} />
              )}
            </div>
            <div className={`
              text-sm text-white/60 transition-all duration-300
              ${swipeY > 50 ? 'text-primary' : ''}
            `}>
              {swipeY > 100 ? 'Release to unlock' : 'Swipe up to unlock'}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom notification area */}
      <div className="p-6 text-center">
        <div className="text-white/40 text-xs">
          No new notifications
        </div>
      </div>
    </div>
  );
};