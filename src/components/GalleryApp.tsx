import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Search, MoreVertical, Heart, Share, Trash2, Image as ImageIcon } from 'lucide-react';

interface GalleryAppProps {
  onBack: () => void;
}

export const GalleryApp: React.FC<GalleryAppProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('photos');

  const photos = [
    { id: 1, name: 'Sunset Beach', date: '2024-01-15', size: '2.4 MB', category: 'Nature' },
    { id: 2, name: 'City Lights', date: '2024-01-14', size: '3.1 MB', category: 'Urban' },
    { id: 3, name: 'Mountain View', date: '2024-01-13', size: '2.8 MB', category: 'Nature' },
    { id: 4, name: 'Coffee Shop', date: '2024-01-12', size: '1.9 MB', category: 'Lifestyle' },
    { id: 5, name: 'Street Art', date: '2024-01-11', size: '2.2 MB', category: 'Art' },
    { id: 6, name: 'Ocean Waves', date: '2024-01-10', size: '3.5 MB', category: 'Nature' },
  ];

  const albums = [
    { name: 'Camera', count: 156, color: 'bg-blue-500' },
    { name: 'Screenshots', count: 89, color: 'bg-green-500' },
    { name: 'Downloads', count: 23, color: 'bg-purple-500' },
    { name: 'Favorites', count: 12, color: 'bg-red-500' },
  ];

  const tabs = [
    { id: 'photos', label: 'Photos' },
    { id: 'albums', label: 'Albums' },
  ];

  if (selectedImage) {
    const photo = photos.find(p => p.id === selectedImage);
    return (
      <div className="h-full bg-black text-white flex flex-col">
        <StatusBar />
        
        {/* Image Viewer Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-sm">
          <button
            onClick={() => setSelectedImage(null)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-medium">{photo?.name}</h1>
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Image Display */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center">
            <ImageIcon className="w-24 h-24 text-white/40" />
          </div>
        </div>

        {/* Image Actions */}
        <div className="flex items-center justify-center space-x-8 p-6 bg-black/80 backdrop-blur-sm">
          <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
            <Heart className="w-6 h-6" />
          </button>
          <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
            <Share className="w-6 h-6" />
          </button>
          <button className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center transition-smooth hover:bg-red-500/30">
            <Trash2 className="w-6 h-6 text-red-400" />
          </button>
        </div>

        {/* Image Info */}
        <div className="px-6 pb-6">
          <div className="bg-white/5 rounded-2xl p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-white/60">Date:</span>
                <span className="text-white/90 ml-2">{photo?.date}</span>
              </div>
              <div>
                <span className="text-white/60">Size:</span>
                <span className="text-white/90 ml-2">{photo?.size}</span>
              </div>
            </div>
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
        <h1 className="text-xl font-medium">Gallery</h1>
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 text-sm font-medium transition-smooth ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'photos' && (
          <div className="p-6">
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedImage(photo.id)}
                  className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-smooth"
                >
                  <ImageIcon className="w-8 h-8 text-white/40" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'albums' && (
          <div className="p-6 space-y-4">
            {albums.map((album, index) => (
              <div key={index} className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center">
                  <div className={`w-16 h-16 rounded-2xl ${album.color} flex items-center justify-center mr-4`}>
                    <ImageIcon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white/90 font-medium text-lg">{album.name}</h3>
                    <p className="text-white/60 text-sm">{album.count} photos</p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
                    <MoreVertical className="w-4 h-4 text-white/60" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};