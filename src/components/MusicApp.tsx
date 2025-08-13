import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react';

interface MusicAppProps {
  onBack: () => void;
}

export const MusicApp: React.FC<MusicAppProps> = ({ onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const playlist = [
    {
      title: 'Track 1',
      artist: 'Local Artist',
      album: 'Spirit Collection',
      src: '/music1.mp3',
      cover: 'gradient-primary'
    },
    {
      title: 'Track 2',
      artist: 'Local Artist',
      album: 'Spirit Collection',
      src: '/music2.mp3',
      cover: 'gradient-app'
    },
    {
      title: 'Track 3',
      artist: 'Local Artist',
      album: 'Spirit Collection',
      src: '/music3.mp3',
      cover: 'bg-accent'
    },
    {
      title: 'Track 4',
      artist: 'Local Artist',
      album: 'Spirit Collection',
      src: '/music4.mp3',
      cover: 'bg-orange-500'
    }
  ];

  const currentTrack = playlist[currentSong];

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      // Auto-play next song
      if (currentSong < playlist.length - 1) {
        setCurrentSong(currentSong + 1);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong, playlist.length]);

  // Update audio source when song changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = currentTrack.src;
      audio.load();
      if (isPlaying) {
        audio.play().catch(console.error);
      }
    }
  }, [currentSong, currentTrack.src]);

  // Handle play/pause
  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };

  // Format time in mm:ss
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="h-full bg-gradient-surface text-white flex flex-col overflow-hidden">
      <StatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 flex-shrink-0">
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

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Now Playing */}
        <div className="flex flex-col items-center px-6 py-4">
          {/* Album Art */}
          <div className={`w-48 h-48 rounded-2xl ${currentTrack.cover} flex items-center justify-center mb-6 elevated-shadow flex-shrink-0`}>
            <div className="w-24 h-24 rounded-xl bg-black/20 backdrop-blur-sm flex items-center justify-center">
              <Volume2 className="w-12 h-12 text-white/60" />
            </div>
          </div>

          {/* Track Info */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-white mb-1 leading-tight">{currentTrack.title}</h2>
            <p className="text-base text-white/70 mb-1">{currentTrack.artist}</p>
            <p className="text-sm text-white/50">{currentTrack.album}</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full mb-6 px-2">
            <div className="flex justify-between text-sm text-white/60 mb-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-1">
              <div 
                className="bg-primary h-1 rounded-full transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-6 mb-6">
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
              <Shuffle className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => setCurrentSong(Math.max(0, currentSong - 1))}
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20"
            >
              <SkipBack className="w-6 h-6" />
            </button>
            
            <button
              onClick={togglePlayPause}
              className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center transition-smooth hover:scale-105 app-shadow"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </button>
            
            <button 
              onClick={() => setCurrentSong(Math.min(playlist.length - 1, currentSong + 1))}
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20"
            >
              <SkipForward className="w-6 h-6" />
            </button>
            
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
              <Repeat className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Playlist */}
        <div className="px-6 pb-6">
          <h3 className="text-lg font-medium text-white/90 mb-3">Up Next</h3>
          <div className="bg-black/20 rounded-2xl backdrop-blur-sm overflow-hidden">
            {playlist.map((song, index) => (
              <div
                key={index}
                onClick={() => setCurrentSong(index)}
                className={`
                  flex items-center p-3 transition-smooth cursor-pointer
                  ${index === currentSong ? 'bg-primary/20' : 'hover:bg-white/5'}
                  ${index !== playlist.length - 1 ? 'border-b border-white/5' : ''}
                `}
              >
                <div className={`w-10 h-10 rounded-lg ${song.cover} flex items-center justify-center mr-3 flex-shrink-0`}>
                  <Volume2 className="w-5 h-5 text-white/80" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white/90 font-medium text-sm truncate">{song.title}</h4>
                  <p className="text-white/60 text-xs truncate">{song.artist}</p>
                </div>
                <span className="text-white/60 text-xs flex-shrink-0">{formatTime(duration)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="metadata" />
    </div>
  );
};