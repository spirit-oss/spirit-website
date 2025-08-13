import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Play, Settings, Download, Gamepad2, Star } from 'lucide-react';

interface RetroArchAppProps {
  onBack: () => void;
}

export const RetroArchApp: React.FC<RetroArchAppProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('games');

  const games = [
    // Original games
    { name: 'Super Mario Bros.', system: 'NES', rating: 5, image: 'bg-red-500' },
    { name: 'Pac-Man', system: 'Arcade', rating: 4, image: 'bg-yellow-400' },
    { name: 'Tetris', system: 'Game Boy', rating: 5, image: 'bg-green-500' },
    // Knock-off versions
    { name: 'Super Luigi Adventure', system: 'NES', rating: 4, image: 'bg-green-600' },
    { name: 'Dot-Muncher', system: 'Arcade', rating: 3, image: 'bg-orange-400' },
    { name: 'Block Drop', system: 'Game Boy', rating: 4, image: 'bg-blue-600' },
  ];

  const systems = [
    { name: 'Nintendo Entertainment System', shortName: 'NES', games: 45, color: 'bg-red-500' },
    { name: 'Super Nintendo', shortName: 'SNES', games: 32, color: 'bg-purple-500' },
    { name: 'Sega Genesis', shortName: 'Genesis', games: 28, color: 'bg-blue-500' },
    { name: 'Game Boy', shortName: 'GB', games: 15, color: 'bg-green-500' },
    { name: 'Arcade', shortName: 'Arcade', games: 67, color: 'bg-yellow-500' },
  ];

  const tabs = [
    { id: 'games', label: 'Games' },
    { id: 'systems', label: 'Systems' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="h-full bg-gradient-surface text-white flex flex-col">
      <StatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-medium">RetroArch</h1>
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* RetroArch Info */}
      <div className="mx-6 mt-6 mb-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-4 border border-purple-500/20">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mr-4">
            <Gamepad2 className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white">RetroArch</h2>
            <p className="text-sm text-white/70">Multi-system emulator</p>
          </div>
        </div>
        <p className="text-xs text-white/60">
          Play classic games from multiple retro gaming systems. Privacy-focused gaming with no telemetry.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 overflow-x-auto">
        <div className="flex space-x-2 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'games' && (
          <div className="p-6 space-y-4">
            {games.map((game, index) => (
              <div key={index} className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center">
                  <div className={`w-16 h-16 rounded-2xl ${game.image} flex items-center justify-center mr-4`}>
                    <Gamepad2 className="w-8 h-8 text-white/80" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white">{game.name}</h3>
                    <p className="text-white/60 text-sm mb-2">{game.system}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < game.rating ? 'text-yellow-400 fill-current' : 'text-white/30'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <button className="px-6 py-2 gradient-primary rounded-xl text-white text-sm font-medium transition-smooth hover:scale-105">
                        <Play className="w-4 h-4 mr-2 inline" />
                        Play
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'systems' && (
          <div className="p-6 space-y-4">
            {systems.map((system, index) => (
              <div key={index} className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-xl ${system.color} flex items-center justify-center mr-4`}>
                      <Gamepad2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white/90 font-medium">{system.name}</h3>
                      <p className="text-white/60 text-sm">{system.games} games available</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70">
                    {system.shortName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-6 space-y-4">
            <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
              <h3 className="text-white/90 font-medium mb-4">Emulation Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Video Driver</span>
                  <span className="text-white/90">Vulkan</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Audio Driver</span>
                  <span className="text-white/90">PulseAudio</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Rewind</span>
                  <div className="w-12 h-6 rounded-full bg-primary relative">
                    <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 right-0.5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
              <h3 className="text-white/90 font-medium mb-4">Privacy</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Analytics</span>
                  <div className="w-12 h-6 rounded-full bg-white/20 relative">
                    <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-0.5" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Network Features</span>
                  <div className="w-12 h-6 rounded-full bg-white/20 relative">
                    <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};