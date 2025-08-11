import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Camera, RotateCcw, Zap, Settings } from 'lucide-react';

interface CameraAppProps {
  onBack: () => void;
}

export const CameraApp: React.FC<CameraAppProps> = ({ onBack }) => {
  const [mode, setMode] = useState<'photo' | 'video' | 'portrait'>('photo');
  const [flashEnabled, setFlashEnabled] = useState(false);
  
  const modes = [
    { id: 'photo', label: 'Photo' },
    { id: 'video', label: 'Video' },
    { id: 'portrait', label: 'Portrait' },
  ];

  return (
    <div className="h-full bg-black text-white flex flex-col relative overflow-hidden">
      {/* Camera viewfinder simulation */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
        <div className="absolute inset-0 bg-black/20">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="border border-white/20" />
            ))}
          </div>
          
          {/* Simulated camera preview */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <Camera className="w-24 h-24 text-white/40 mx-auto mb-4" />
            <p className="text-white/60">Camera Preview</p>
            <p className="text-sm text-white/40 mt-2">Spirit OS Camera</p>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="relative z-10">
        <StatusBar />
      </div>

      {/* Top Controls */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-smooth hover:bg-black/60"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setFlashEnabled(!flashEnabled)}
            className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-smooth ${
              flashEnabled ? 'bg-accent/40 hover:bg-accent/60' : 'bg-black/40 hover:bg-black/60'
            }`}
          >
            <Zap className={`w-5 h-5 ${flashEnabled ? 'text-accent' : 'text-white'}`} />
          </button>
          
          <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-smooth hover:bg-black/60">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="relative z-10 mt-auto pb-8">
        {/* Mode Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/40 backdrop-blur-sm rounded-full p-1">
            {modes.map((modeOption) => (
              <button
                key={modeOption.id}
                onClick={() => setMode(modeOption.id as any)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-smooth ${
                  mode === modeOption.id
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {modeOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Camera Controls */}
        <div className="flex items-center justify-center space-x-12">
          {/* Recent Photos */}
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm" />
          
          {/* Shutter Button */}
          <div className="relative">
            <button className="w-20 h-20 rounded-full bg-white border-4 border-white/60 transition-smooth hover:scale-110 active:scale-95">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                {mode === 'video' ? (
                  <div className="w-6 h-6 rounded bg-red-500" />
                ) : (
                  <Camera className="w-8 h-8 text-black" />
                )}
              </div>
            </button>
            {mode === 'video' && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
            )}
          </div>
          
          {/* Flip Camera */}
          <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-smooth hover:bg-white/30">
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>

        {/* Mode Info */}
        <div className="text-center mt-6">
          <p className="text-white/80 text-sm capitalize">{mode} Mode</p>
          {mode === 'portrait' && (
            <p className="text-white/60 text-xs mt-1">Depth effect ready</p>
          )}
        </div>
      </div>
    </div>
  );
};