import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react';

interface MusicAppProps {
  onBack: () => void;
}

export const MusicApp: React.FC<MusicAppProps> = ({ onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  
  const playlist = [
    {
      title: 'Digital Dreams',
      artist: 'Synthwave Collective',
      album: 'Neon Nights',
      duration: '3:42',
      cover: 'gradient-primary'
    },
    {
      title: 'Open Source Symphony',
      artist: 'Code Musicians',
      album: 'FOSS Vibes',
      duration: '4:15',
      cover: 'gradient-app'
    },
    {
      title: 'Privacy Anthem',
      artist: 'Encrypted Beats',
      album: 'Secure Sounds',
      duration: '3:28',
      cover: 'bg-accent'
    },
    {
      title: 'AOSP Blues',
      artist: 'Android Collective',
      album: 'Mobile Melodies',
      duration: '2:56',
      cover: 'bg-orange-500'
    }
  ];

  const currentTrack = playlist[currentSong];

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
        <h1 className="text-xl font-medium">Music</h1>
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Now Playing */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-8">
        {/* Album Art */}
        <div className={`w-64 h-64 rounded-3xl ${currentTrack.cover} flex items-center justify-center mb-8 elevated-shadow`}>
          <div className="w-32 h-32 rounded-2xl bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <Volume2 className="w-16 h-16 text-white/60" />
          </div>
        </div>

        {/* Track Info */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">{currentTrack.title}</h2>
          <p className="text-lg text-white/70 mb-1">{currentTrack.artist}</p>
          <p className="text-white/50">{currentTrack.album}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-8">
          <div className="flex justify-between text-sm text-white/60 mb-2">
            <span>1:23</span>
            <span>{currentTrack.duration}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-1">
            <div className="bg-primary h-1 rounded-full w-1/3 transition-all duration-300" />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-8 mb-8">
          <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
            <Shuffle className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => setCurrentSong(Math.max(0, currentSong - 1))}
            className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20"
          >
            <SkipBack className="w-7 h-7" />
          </button>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center transition-smooth hover:scale-105 app-shadow"
          >
            {isPlaying ? (
              <Pause className="w-10 h-10 text-white" />
            ) : (
              <Play className="w-10 h-10 text-white ml-1" />
            )}
          </button>
          
          <button 
            onClick={() => setCurrentSong(Math.min(playlist.length - 1, currentSong + 1))}
            className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20"
          >
            <SkipForward className="w-7 h-7" />
          </button>
          
          <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
            <Repeat className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Playlist */}
      <div className="px-6 pb-8">
        <h3 className="text-lg font-medium text-white/90 mb-4">Up Next</h3>
        <div className="bg-black/20 rounded-2xl backdrop-blur-sm overflow-hidden">
          {playlist.map((song, index) => (
            <div
              key={index}
              onClick={() => setCurrentSong(index)}
              className={`
                flex items-center p-4 transition-smooth cursor-pointer
                ${index === currentSong ? 'bg-primary/20' : 'hover:bg-white/5'}
                ${index !== playlist.length - 1 ? 'border-b border-white/5' : ''}
              `}
            >
              <div className={`w-12 h-12 rounded-xl ${song.cover} flex items-center justify-center mr-4`}>
                <Volume2 className="w-6 h-6 text-white/80" />
              </div>
              <div className="flex-1">
                <h4 className="text-white/90 font-medium">{song.title}</h4>
                <p className="text-white/60 text-sm">{song.artist}</p>
              </div>
              <span className="text-white/60 text-sm">{song.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};