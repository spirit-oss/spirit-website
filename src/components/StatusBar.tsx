import React from 'react';
import { Battery, Signal, Wifi } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <div className="flex items-center justify-between px-6 py-2 h-12 bg-phone-status text-white text-sm font-medium">
      {/* Left side - Time */}
      <div className="flex items-center">
        <span className="font-mono">{currentTime}</span>
      </div>
      
      {/* Right side - Status icons */}
      <div className="flex items-center space-x-1">
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <div className="flex items-center">
          <span className="text-xs mr-1">87</span>
          <Battery className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};