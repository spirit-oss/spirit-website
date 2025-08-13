import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Play, Settings, Download, Gamepad2, Star } from 'lucide-react';

interface RetroArchAppProps {
  onBack: () => void;
}

export const RetroArchApp: React.FC<RetroArchAppProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('games');
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const games = [
    // Original games
    { id: 'mario', name: 'Super Mario Bros.', system: 'NES', rating: 5, image: 'bg-red-500', playable: false },
    { id: 'pacman', name: 'Pac-Man', system: 'Arcade', rating: 4, image: 'bg-yellow-400', playable: false },
    { id: 'tetris', name: 'Tetris', system: 'Game Boy', rating: 5, image: 'bg-green-500', playable: false },
    // Knock-off versions (playable demos)
    { id: 'luigi', name: 'Super Luigi Adventure', system: 'NES', rating: 4, image: 'bg-green-600', playable: true },
    { id: 'dotmuncher', name: 'Dot-Muncher', system: 'Arcade', rating: 3, image: 'bg-orange-400', playable: true },
    { id: 'blockdrop', name: 'Block Drop', system: 'Game Boy', rating: 4, image: 'bg-blue-600', playable: true },
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

  const startGame = (gameId: string, gameName: string) => {
    const game = games.find(g => g.id === gameId);
    if (game?.playable) {
      setCurrentGame(gameId);
      setGameScore(0);
      setIsPlaying(true);
    } else {
      // Show that original games need to be purchased/downloaded
      alert(`${gameName} requires the full version. This is a demo environment.`);
    }
  };

  const exitGame = () => {
    setCurrentGame(null);
    setIsPlaying(false);
    setGameScore(0);
  };

  const incrementScore = () => {
    setGameScore(prev => prev + 10);
  };

  // If a game is currently being played, show the game interface
  if (currentGame) {
    const game = games.find(g => g.id === currentGame);
    return (
      <div className="h-full bg-black text-white flex flex-col">
        <StatusBar />
        
        {/* Game Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-black/50">
          <button
            onClick={exitGame}
            className="px-4 py-2 bg-red-500/20 rounded-xl text-red-400 font-medium hover:bg-red-500/30 transition-smooth"
          >
            Exit Game
          </button>
          <h1 className="text-lg font-medium">{game?.name}</h1>
          <div className="text-accent font-mono">Score: {gameScore}</div>
        </div>

        {/* Simple Game Demo Interface */}
        <div className="flex-1 flex items-center justify-center p-6">
          {currentGame === 'luigi' && (
            <div className="text-center">
              <div className="w-64 h-64 bg-gradient-to-b from-blue-400 to-green-400 rounded-2xl mb-6 relative overflow-hidden">
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-green-600 rounded border-2 border-green-400 animate-bounce">
                    <span className="text-xs">L</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" />
                <div className="absolute top-12 left-8 w-6 h-2 bg-brown-400 rounded" />
              </div>
              <p className="text-white/70 mb-4">Super Luigi Adventure Demo</p>
              <button 
                onClick={incrementScore}
                className="px-6 py-3 gradient-primary rounded-xl font-medium hover:scale-105 transition-smooth"
              >
                Jump! (+10 points)
              </button>
            </div>
          )}

          {currentGame === 'dotmuncher' && (
            <div className="text-center">
              <div className="w-64 h-64 bg-black rounded-2xl mb-6 relative border-2 border-yellow-400 overflow-hidden">
                <div className="grid grid-cols-8 gap-1 p-4 h-full">
                  {[...Array(40)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full opacity-50" />
                  ))}
                </div>
                <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-yellow-400 rounded-full">
                  <div className="w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-black ml-3 mt-1" />
                </div>
              </div>
              <p className="text-white/70 mb-4">Dot-Muncher Demo</p>
              <button 
                onClick={incrementScore}
                className="px-6 py-3 gradient-primary rounded-xl font-medium hover:scale-105 transition-smooth"
              >
                Munch Dots! (+10 points)
              </button>
            </div>
          )}

          {currentGame === 'blockdrop' && (
            <div className="text-center">
              <div className="w-48 h-64 bg-gray-900 rounded-2xl mb-6 relative border-2 border-green-400 overflow-hidden">
                <div className="grid grid-cols-6 gap-px p-2 h-full">
                  {[...Array(60)].map((_, i) => (
                    <div key={i} className={`w-full aspect-square ${
                      i > 50 ? 'bg-green-500' : 
                      i > 45 ? 'bg-blue-500' :
                      i > 40 ? 'bg-red-500' : 'bg-transparent'
                    } opacity-70`} />
                  ))}
                </div>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 grid grid-cols-2 gap-px">
                  <div className="w-4 h-4 bg-purple-500" />
                  <div className="w-4 h-4 bg-purple-500" />
                  <div className="w-4 h-4 bg-purple-500" />
                  <div className="w-4 h-4 bg-purple-500" />
                </div>
              </div>
              <p className="text-white/70 mb-4">Block Drop Demo</p>
              <button 
                onClick={incrementScore}
                className="px-6 py-3 gradient-primary rounded-xl font-medium hover:scale-105 transition-smooth"
              >
                Drop Block! (+10 points)
              </button>
            </div>
          )}
        </div>

        {/* Game Controls */}
        <div className="p-6 bg-black/30">
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <button className="aspect-square bg-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-smooth">
              ←
            </button>
            <button className="aspect-square bg-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-smooth">
              ↓
            </button>
            <button className="aspect-square bg-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-smooth">
              →
            </button>
          </div>
          <div className="flex justify-center mt-4 gap-4">
            <button className="px-6 py-3 bg-red-500/20 rounded-xl text-red-400 font-medium hover:bg-red-500/30 transition-smooth">
              A
            </button>
            <button className="px-6 py-3 bg-blue-500/20 rounded-xl text-blue-400 font-medium hover:bg-blue-500/30 transition-smooth">
              B
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                      
                      <button 
                        onClick={() => startGame(game.id, game.name)}
                        className={`px-6 py-2 rounded-xl text-white text-sm font-medium transition-smooth hover:scale-105 ${
                          game.playable 
                            ? 'gradient-primary' 
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        <Play className="w-4 h-4 mr-2 inline" />
                        {game.playable ? 'Play Demo' : 'Play'}
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