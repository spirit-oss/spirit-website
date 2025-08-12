import React, { useState, useEffect } from 'react';
import { Smartphone } from 'lucide-react';

interface PowerAnimationProps {
  onComplete?: () => void;
}

export const PowerAnimation: React.FC<PowerAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'boot' | 'logo' | 'complete'>('boot');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage === 'boot') {
        setStage('logo');
      } else if (stage === 'logo') {
        setStage('complete');
        onComplete?.();
      }
    }, stage === 'boot' ? 2000 : 1500);

    return () => clearTimeout(timer);
  }, [stage, onComplete]);

  useEffect(() => {
    if (stage === 'boot') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 40);

      return () => clearInterval(interval);
    }
  }, [stage]);

  if (stage === 'complete') {
    return null;
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center">
      {stage === 'boot' && (
        <>
          {/* Boot Animation */}
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center animate-pulse">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-xl font-light text-white mb-2">Spirit OS</h2>
            <p className="text-white/60 text-sm">Booting...</p>
          </div>

          {/* Progress Bar */}
          <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="mt-4 text-white/40 text-xs">
            {progress}%
          </div>
        </>
      )}

      {stage === 'logo' && (
        <>
          {/* Logo Animation */}
          <div className="animate-pulse">
            <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center mb-6 animate-float">
              <Smartphone className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-light text-white mb-2">Spirit OS</h1>
            <p className="text-white/60 text-sm">Privacy-First Android</p>
          </div>

          {/* Animated dots */}
          <div className="flex space-x-1 mt-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};