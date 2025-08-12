import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VolumePopupProps {
  volume: number;
  isVisible: boolean;
  onHide: () => void;
}

export const VolumePopup: React.FC<VolumePopupProps> = ({ volume, isVisible, onHide }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        onHide();
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!shouldRender) return null;

  const volumeSegments = Array.from({ length: 15 }, (_, i) => i);
  const activeSegments = Math.ceil((volume / 100) * 15);

  return (
    <div className={`
      absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50
      transition-all duration-300 ease-out
      ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
    `}>
      <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 min-w-[120px]">
        <div className="flex flex-col items-center">
          {/* Volume Icon */}
          <div className="mb-3">
            {volume === 0 ? (
              <VolumeX className="w-6 h-6 text-white/80" />
            ) : (
              <Volume2 className="w-6 h-6 text-white/80" />
            )}
          </div>

          {/* Volume Slider */}
          <div className="flex flex-col items-center space-y-1 mb-3">
            {volumeSegments.reverse().map((segment) => (
              <div
                key={segment}
                className={`w-8 h-2 rounded-full transition-all duration-200 ${
                  segment < activeSegments
                    ? volume > 66 ? 'bg-white' :
                      volume > 33 ? 'bg-yellow-400' : 'bg-red-400'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Volume Percentage */}
          <div className="text-white/90 text-sm font-medium">
            {volume}%
          </div>
        </div>
      </div>
    </div>
  );
};