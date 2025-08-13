import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Search, Navigation, MapPin, Star, Clock, Route } from 'lucide-react';

interface MapsAppProps {
  onBack: () => void;
}

export const MapsApp: React.FC<MapsAppProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('map');
  const [searchQuery, setSearchQuery] = useState('');

  const recentSearches = [
    { name: 'Coffee Shop', address: '123 Main St', type: 'restaurant' },
    { name: 'Central Park', address: 'New York, NY', type: 'park' },
    { name: 'Library', address: '456 Oak Ave', type: 'library' },
    { name: 'Gas Station', address: '789 Pine Rd', type: 'gas_station' },
  ];

  const savedPlaces = [
    { name: 'Home', address: '123 Home Street', icon: '🏠' },
    { name: 'Work', address: '456 Office Blvd', icon: '🏢' },
    { name: 'Gym', address: '789 Fitness Ave', icon: '💪' },
    { name: 'Favorite Restaurant', address: '321 Food St', icon: '🍽️' },
  ];

  const tabs = [
    { id: 'map', label: 'Map' },
    { id: 'search', label: 'Search' },
    { id: 'saved', label: 'Saved' },
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
        <h1 className="text-xl font-medium">Maps</h1>
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
          <Navigation className="w-5 h-5" />
        </button>
      </div>

      {/* Maps Info */}
      <div className="mx-6 mt-6 mb-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-4 border border-green-500/20">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mr-4">
            <MapPin className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white">OsmAnd Maps</h2>
            <p className="text-sm text-white/70">Privacy-focused navigation</p>
          </div>
        </div>
        <p className="text-xs text-white/60">
          Offline maps powered by OpenStreetMap. No tracking, no data collection, complete privacy.
        </p>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-4">
        <div className="bg-black/20 rounded-full px-4 py-3 backdrop-blur-sm flex items-center">
          <Search className="w-5 h-5 text-white/60 mr-3" />
          <input
            type="text"
            placeholder="Search places"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-white/60 outline-none"
          />
        </div>
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
        {activeTab === 'map' && (
          <div className="flex-1 relative">
            {/* Cached Map View */}
            <div className="h-full relative overflow-hidden">
              {/* Cached Map Image */}
              <img 
                src="/map-cached.png" 
                alt="Cached Map" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-green-800', 'via-green-700', 'to-green-900');
                }}
              />
              
              {/* Location Markers */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white animate-pulse" />
              </div>
              
              <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-blue-500 rounded-full border border-white" />
              </div>
              
              <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2 translate-y-1/2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full border border-white" />
              </div>

              {/* Map Controls */}
              <div className="absolute bottom-6 right-6 space-y-2">
                <button className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-smooth">
                  <Navigation className="w-6 h-6" />
                </button>
                <button className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-smooth">
                  <MapPin className="w-6 h-6" />
                </button>
              </div>

              {/* Current Location Info */}
              <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-sm rounded-2xl p-4 max-w-xs">
                <h3 className="text-white font-medium mb-1">Current Location</h3>
                <p className="text-white/70 text-sm">Downtown Area</p>
                <p className="text-white/50 text-xs mt-1">Accuracy: ±5 meters</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="p-6">
            <h3 className="text-white/90 font-medium mb-4">Recent Searches</h3>
            <div className="space-y-3">
              {recentSearches.map((place, index) => (
                <div key={index} className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-white/80" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white/90 font-medium">{place.name}</h4>
                      <p className="text-white/60 text-sm">{place.address}</p>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Route className="w-5 h-5 text-primary" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="p-6">
            <h3 className="text-white/90 font-medium mb-4">Saved Places</h3>
            <div className="space-y-3">
              {savedPlaces.map((place, index) => (
                <div key={index} className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mr-4 text-2xl">
                      {place.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white/90 font-medium">{place.name}</h4>
                      <p className="text-white/60 text-sm">{place.address}</p>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Route className="w-5 h-5 text-primary" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="mx-6 mb-6 bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
        <div className="flex items-center mb-2">
          <MapPin className="w-5 h-5 text-accent mr-2" />
          <span className="text-sm font-medium text-white/90">Privacy Protected</span>
        </div>
        <p className="text-xs text-white/70 leading-relaxed">
          All map data is stored locally. No location tracking, no data sharing with third parties.
        </p>
      </div>
    </div>
  );
};