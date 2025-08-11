import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Download, Star, Shield, Info } from 'lucide-react';

interface AuroraStoreAppProps {
  onBack: () => void;
}

export const AuroraStoreApp: React.FC<AuroraStoreAppProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('featured');
  
  const featuredApps = [
    {
      name: 'Signal',
      developer: 'Signal Foundation',
      rating: 4.8,
      category: 'Communication',
      description: 'Private messaging with end-to-end encryption',
      icon: 'bg-blue-500',
      featured: true
    },
    {
      name: 'Brave Browser',
      developer: 'Brave Software',
      rating: 4.6,
      category: 'Internet',
      description: 'Privacy-focused web browser',
      icon: 'bg-orange-500',
      featured: true
    },
    {
      name: 'ProtonMail',
      developer: 'Proton Technologies',
      rating: 4.7,
      category: 'Communication',
      description: 'Secure email with encryption',
      icon: 'bg-purple-500',
      featured: false
    },
    {
      name: 'NewPipe',
      developer: 'TeamNewPipe',
      rating: 4.5,
      category: 'Media',
      description: 'Lightweight YouTube client',
      icon: 'bg-red-500',
      featured: false
    }
  ];

  const categories = [
    { id: 'featured', label: 'Featured' },
    { id: 'communication', label: 'Communication' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'media', label: 'Media' },
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
        <h1 className="text-xl font-medium">Aurora Store</h1>
        <div className="w-10" />
      </div>

      {/* Aurora Store Info */}
      <div className="mx-6 mt-6 mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4 border border-blue-500/20">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mr-4">
            <Download className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white">Aurora Store</h2>
            <p className="text-sm text-white/70">Google Play alternative</p>
          </div>
        </div>
        <p className="text-xs text-white/60">
          Access Google Play Store apps without Google Play Services. Privacy-focused and anonymous downloads.
        </p>
      </div>

      {/* Categories */}
      <div className="flex px-6 mb-6 overflow-x-auto">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth whitespace-nowrap ${
                activeTab === category.id
                  ? 'bg-primary text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Apps List */}
      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        <div className="space-y-4">
          {featuredApps
            .filter(app => 
              activeTab === 'featured' ? app.featured : 
              app.category.toLowerCase() === activeTab
            )
            .map((app, index) => (
              <div key={index} className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-start">
                  <div className={`w-16 h-16 rounded-2xl ${app.icon} flex items-center justify-center mr-4`}>
                    <Shield className="w-8 h-8 text-white/80" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-white">{app.name}</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-white/70">{app.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-white/60 text-sm mb-1">{app.developer}</p>
                    <p className="text-white/50 text-xs mb-3">{app.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 bg-white/10 rounded-lg text-xs text-white/70">
                        {app.category}
                      </span>
                      
                      <button className="px-6 py-2 gradient-primary rounded-xl text-white text-sm font-medium transition-smooth hover:scale-105">
                        Install
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center mb-3">
            <Info className="w-5 h-5 text-accent mr-2" />
            <span className="text-sm font-medium text-white/90">Privacy Notice</span>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            Aurora Store provides anonymous access to Google Play Store apps without requiring Google Play Services. 
            No Google account needed. All downloads are direct from Google's servers.
          </p>
        </div>
      </div>
    </div>
  );
};