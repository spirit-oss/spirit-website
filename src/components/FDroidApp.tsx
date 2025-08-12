import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Download, Star, Shield, Search, Package, Info } from 'lucide-react';

interface FDroidAppProps {
  onBack: () => void;
}

export const FDroidApp: React.FC<FDroidAppProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('featured');

  const featuredApps = [
    {
      name: 'NewPipe',
      developer: 'TeamNewPipe',
      rating: 4.8,
      category: 'Media & Video',
      description: 'Lightweight YouTube frontend',
      icon: 'bg-red-500',
      featured: true,
      foss: true
    },
    {
      name: 'Fennec F-Droid',
      developer: 'Mozilla',
      rating: 4.6,
      category: 'Internet',
      description: 'Firefox-based browser',
      icon: 'bg-orange-500',
      featured: true,
      foss: true
    },
    {
      name: 'OsmAnd~',
      developer: 'OsmAnd',
      rating: 4.5,
      category: 'Maps & Navigation',
      description: 'Offline maps & navigation',
      icon: 'bg-green-500',
      featured: true,
      foss: true
    },
    {
      name: 'KeePassDX',
      developer: 'Kunzisoft',
      rating: 4.7,
      category: 'Tools',
      description: 'Password manager',
      icon: 'bg-blue-500',
      featured: false,
      foss: true
    },
    {
      name: 'Simple Gallery Pro',
      developer: 'Simple Mobile Tools',
      rating: 4.4,
      category: 'Multimedia',
      description: 'Photo & video gallery',
      icon: 'bg-purple-500',
      featured: false,
      foss: true
    },
    {
      name: 'Termux',
      developer: 'Fredrik Fornwall',
      rating: 4.6,
      category: 'System',
      description: 'Terminal emulator',
      icon: 'bg-gray-600',
      featured: false,
      foss: true
    }
  ];

  const categories = [
    { id: 'featured', label: 'Featured' },
    { id: 'latest', label: 'Latest' },
    { id: 'categories', label: 'Categories' },
    { id: 'updates', label: 'Updates' },
  ];

  const appCategories = [
    { name: 'Internet', count: 45, icon: '🌐' },
    { name: 'Multimedia', count: 67, icon: '🎵' },
    { name: 'Games', count: 89, icon: '🎮' },
    { name: 'Office', count: 23, icon: '📄' },
    { name: 'System', count: 34, icon: '⚙️' },
    { name: 'Security', count: 28, icon: '🔒' },
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
        <h1 className="text-xl font-medium">F-Droid</h1>
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* F-Droid Info */}
      <div className="mx-6 mt-6 mb-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-4 border border-green-500/20">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mr-4">
            <Package className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white">F-Droid</h2>
            <p className="text-sm text-white/70">Free & Open Source Software</p>
          </div>
        </div>
        <p className="text-xs text-white/60">
          Catalog of FOSS applications for Android. All apps are built from source code and verified for security.
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

      {/* Content */}
      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        {activeTab === 'featured' && (
          <div className="space-y-4">
            {featuredApps
              .filter(app => app.featured)
              .map((app, index) => (
                <div key={index} className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-start">
                    <div className={`w-16 h-16 rounded-2xl ${app.icon} flex items-center justify-center mr-4`}>
                      <Package className="w-8 h-8 text-white/80" />
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
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-white/10 rounded-lg text-xs text-white/70">
                            {app.category}
                          </span>
                          {app.foss && (
                            <span className="px-2 py-1 bg-green-500/20 rounded-lg text-xs text-green-400 flex items-center">
                              <Shield className="w-3 h-3 mr-1" />
                              FOSS
                            </span>
                          )}
                        </div>
                        
                        <button className="px-6 py-2 gradient-primary rounded-xl text-white text-sm font-medium transition-smooth hover:scale-105">
                          Install
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {activeTab === 'latest' && (
          <div className="space-y-4">
            {featuredApps.map((app, index) => (
              <div key={index} className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl ${app.icon} flex items-center justify-center mr-4`}>
                    <Package className="w-6 h-6 text-white/80" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white/90 font-medium">{app.name}</h3>
                    <p className="text-white/60 text-sm">{app.developer}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-white/90 text-sm">v2.1.0</div>
                    <div className="text-white/50 text-xs">Updated today</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="grid grid-cols-2 gap-4">
            {appCategories.map((category, index) => (
              <div key={index} className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="text-white/90 font-medium">{category.name}</h3>
                  <p className="text-white/60 text-sm">{category.count} apps</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'updates' && (
          <div className="space-y-4">
            <div className="text-center py-8">
              <Package className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-white/70 text-lg mb-2">All apps up to date</h3>
              <p className="text-white/50 text-sm">Check back later for updates</p>
            </div>
          </div>
        )}

        {/* FOSS Information */}
        <div className="mt-8 bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center mb-3">
            <Info className="w-5 h-5 text-accent mr-2" />
            <span className="text-sm font-medium text-white/90">About F-Droid</span>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            F-Droid is a catalog of FOSS (Free and Open Source Software) applications for Android. 
            All apps are built from source code and verified for security and privacy.
          </p>
        </div>
      </div>
    </div>
  );
};