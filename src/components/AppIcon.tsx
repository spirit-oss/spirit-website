import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AppIconProps {
  icon: LucideIcon;
  name: string;
  gradient?: boolean;
  onClick?: () => void;
}

export const AppIcon: React.FC<AppIconProps> = ({ 
  icon: Icon, 
  name, 
  gradient = false,
  onClick 
}) => {
  return (
    <div 
      className="flex flex-col items-center space-y-2 cursor-pointer group transition-smooth"
      onClick={onClick}
    >
      <div className={`
        w-14 h-14 rounded-2xl flex items-center justify-center app-shadow
        group-hover:scale-110 transition-spring
        ${gradient ? 'gradient-primary' : 'bg-card'}
      `}>
        <Icon 
          className={`w-8 h-8 ${gradient ? 'text-white' : 'text-primary'}`} 
        />
      </div>
      <span className="text-xs text-white/90 text-center leading-tight max-w-[4rem] break-words">
        {name}
      </span>
    </div>
  );
};