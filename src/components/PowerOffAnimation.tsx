import React, { useState, useEffect } from 'react';
import { Power } from 'lucide-react';

interface PowerOffAnimationProps {
  onComplete?: () => void;
}

export const PowerOffAnimation: React.FC<PowerOffAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'shutting-down' | 'complete'>('shutting-down');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('complete');
      onComplete?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center">
      {stage === 'shutting-down' && (
        <>
          {/* Power Off Animation */}
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center animate-pulse">
              <Power className="w-10 h-10 text-red-400" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-xl font-light text-white mb-2">Shutting down...</h2>
            <p className="text-white/60 text-sm">Spirit OS</p>
          </div>

          {/* Animated shutdown bar */}
          <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 rounded-full shutdown-animation" />
          </div>
          
          <style>{`
            @keyframes shutdown {
              0% { width: 0%; }
              100% { width: 100%; }
            }
            .shutdown-animation {
              animation: shutdown 2s ease-out forwards;
            }
          `}</style>
        </>
      )}
    </div>
  );
};