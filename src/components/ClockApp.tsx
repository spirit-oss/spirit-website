import React, { useState, useEffect } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Plus, Play, Pause, RotateCcw, Bell, Clock } from 'lucide-react';

interface ClockAppProps {
  onBack: () => void;
}

export const ClockApp: React.FC<ClockAppProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('clock');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [timerTime, setTimerTime] = useState(300); // 5 minutes default
  const [timerRunning, setTimerRunning] = useState(false);

  const tabs = [
    { id: 'clock', label: 'Clock', icon: Clock },
    { id: 'alarm', label: 'Alarm', icon: Bell },
    { id: 'stopwatch', label: 'Stopwatch', icon: Play },
    { id: 'timer', label: 'Timer', icon: RotateCcw },
  ];

  const alarms = [
    { id: 1, time: '07:00', label: 'Wake up', enabled: true, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    { id: 2, time: '12:30', label: 'Lunch break', enabled: false, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    { id: 3, time: '18:00', label: 'Gym time', enabled: true, days: ['Mon', 'Wed', 'Fri'] },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (stopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [stopwatchRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime(prev => {
          if (prev <= 1) {
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerTime]);

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    });
  };

  const formatStopwatch = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
        <h1 className="text-xl font-medium">Clock</h1>
        <div className="w-10" />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-0 py-3 px-2 text-xs font-medium transition-smooth flex flex-col items-center ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            <tab.icon className="w-5 h-5 mb-1" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'clock' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="text-center mb-8">
              <div className="text-6xl font-light text-white mb-4 font-mono">
                {formatTime(currentTime)}
              </div>
              <div className="text-lg text-white/70">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            <div className="bg-black/20 rounded-2xl p-6 backdrop-blur-sm w-full max-w-sm">
              <h3 className="text-white/90 font-medium mb-4 text-center">World Clock</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">New York</span>
                  <span className="text-white/90 font-mono">
                    {new Date().toLocaleTimeString('en-US', { 
                      timeZone: 'America/New_York',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">London</span>
                  <span className="text-white/90 font-mono">
                    {new Date().toLocaleTimeString('en-US', { 
                      timeZone: 'Europe/London',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Tokyo</span>
                  <span className="text-white/90 font-mono">
                    {new Date().toLocaleTimeString('en-US', { 
                      timeZone: 'Asia/Tokyo',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alarm' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-white/90">Alarms</h3>
              <button className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Plus className="w-5 h-5 text-primary" />
              </button>
            </div>
            
            <div className="space-y-4">
              {alarms.map((alarm) => (
                <div key={alarm.id} className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-3xl font-light text-white">{alarm.time}</div>
                    <div className={`w-12 h-6 rounded-full ${alarm.enabled ? 'bg-primary' : 'bg-white/20'} relative transition-smooth`}>
                      <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-smooth ${alarm.enabled ? 'left-6' : 'left-0.5'}`} />
                    </div>
                  </div>
                  <div className="text-white/70 text-sm mb-2">{alarm.label}</div>
                  <div className="flex space-x-1">
                    {alarm.days.map((day, index) => (
                      <span key={index} className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stopwatch' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="text-center mb-12">
              <div className="text-6xl font-light text-white mb-8 font-mono">
                {formatStopwatch(stopwatchTime)}
              </div>
            </div>

            <div className="flex space-x-8">
              <button
                onClick={() => {
                  setStopwatchTime(0);
                  setStopwatchRunning(false);
                }}
                className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20"
              >
                <RotateCcw className="w-8 h-8" />
              </button>
              
              <button
                onClick={() => setStopwatchRunning(!stopwatchRunning)}
                className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center transition-smooth hover:scale-105"
              >
                {stopwatchRunning ? (
                  <Pause className="w-10 h-10 text-white" />
                ) : (
                  <Play className="w-10 h-10 text-white ml-1" />
                )}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'timer' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="text-center mb-12">
              <div className="text-6xl font-light text-white mb-8 font-mono">
                {formatTimer(timerTime)}
              </div>
              
              {!timerRunning && (
                <div className="flex space-x-4 mb-8">
                  <button
                    onClick={() => setTimerTime(60)}
                    className="px-4 py-2 bg-white/10 rounded-xl text-white/80 hover:bg-white/20 transition-smooth"
                  >
                    1m
                  </button>
                  <button
                    onClick={() => setTimerTime(300)}
                    className="px-4 py-2 bg-white/10 rounded-xl text-white/80 hover:bg-white/20 transition-smooth"
                  >
                    5m
                  </button>
                  <button
                    onClick={() => setTimerTime(600)}
                    className="px-4 py-2 bg-white/10 rounded-xl text-white/80 hover:bg-white/20 transition-smooth"
                  >
                    10m
                  </button>
                  <button
                    onClick={() => setTimerTime(1800)}
                    className="px-4 py-2 bg-white/10 rounded-xl text-white/80 hover:bg-white/20 transition-smooth"
                  >
                    30m
                  </button>
                </div>
              )}
            </div>

            <div className="flex space-x-8">
              <button
                onClick={() => {
                  setTimerTime(300);
                  setTimerRunning(false);
                }}
                className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20"
              >
                <RotateCcw className="w-8 h-8" />
              </button>
              
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                disabled={timerTime === 0}
                className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center transition-smooth hover:scale-105 disabled:opacity-50"
              >
                {timerRunning ? (
                  <Pause className="w-10 h-10 text-white" />
                ) : (
                  <Play className="w-10 h-10 text-white ml-1" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};