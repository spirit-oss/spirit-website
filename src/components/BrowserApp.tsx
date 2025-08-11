import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Search, Globe, RefreshCw, Share, MoreVertical } from 'lucide-react';

interface BrowserAppProps {
  onBack: () => void;
}

export const BrowserApp: React.FC<BrowserAppProps> = ({ onBack }) => {
  const [url, setUrl] = useState('spirit-os.org');
  const [loading, setLoading] = useState(false);
  
  const quickLinks = [
    { name: 'Spirit OS', url: 'spirit-os.org', color: 'bg-primary/20' },
    { name: 'F-Droid', url: 'f-droid.org', color: 'bg-accent/20' },
    { name: 'DuckDuckGo', url: 'duckduckgo.com', color: 'bg-orange-500/20' },
    { name: 'Aurora Store', url: 'auroraoss.com', color: 'bg-blue-500/20' },
  ];

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
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
        <h1 className="text-xl font-medium">Browser</h1>
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* URL Bar */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="flex-1 bg-black/20 rounded-full px-4 py-3 backdrop-blur-sm flex items-center">
            <Globe className="w-5 h-5 text-white/60 mr-3" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-white/60 outline-none"
              placeholder="Search or enter website"
            />
          </div>
          <button
            onClick={handleRefresh}
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Simulated webpage content */}
        <div className="p-6">
          {/* Quick Links */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-white/90 mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              {quickLinks.map((link, index) => (
                <div key={index} className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm hover:bg-black/30 transition-smooth cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center mb-3`}>
                    <Globe className="w-6 h-6 text-white/80" />
                  </div>
                  <h4 className="text-white/90 font-medium">{link.name}</h4>
                  <p className="text-white/60 text-sm">{link.url}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Simulated Spirit OS Website */}
          <div className="bg-black/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Spirit OS</h2>
              <p className="text-white/70">Privacy-First Mobile Experience</p>
            </div>

            <div className="space-y-4 text-sm text-white/80">
              <div className="bg-black/20 rounded-xl p-4">
                <h3 className="font-medium text-white mb-2">🔒 No Google Services</h3>
                <p>Complete freedom from Google's ecosystem while maintaining app compatibility.</p>
              </div>
              
              <div className="bg-black/20 rounded-xl p-4">
                <h3 className="font-medium text-white mb-2">🌟 Open Source</h3>
                <p>Built on AOSP with transparent development and community contributions.</p>
              </div>
              
              <div className="bg-black/20 rounded-xl p-4">
                <h3 className="font-medium text-white mb-2">🛡️ Privacy Focused</h3>
                <p>No tracking, no data collection, complete control over your information.</p>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button className="flex-1 gradient-primary py-3 rounded-xl text-white font-medium">
                Download
              </button>
              <button className="flex-1 border border-white/20 py-3 rounded-xl text-white font-medium">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-center p-4 border-t border-white/10">
        <div className="flex items-center space-x-6">
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
            <Share className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};