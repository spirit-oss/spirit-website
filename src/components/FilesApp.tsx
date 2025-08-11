import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Folder, FileText, Image, Music, Video, Download, Search, MoreVertical } from 'lucide-react';

interface FilesAppProps {
  onBack: () => void;
}

export const FilesApp: React.FC<FilesAppProps> = ({ onBack }) => {
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const folders = [
    { name: 'Documents', icon: Folder, items: 24, type: 'folder' },
    { name: 'Downloads', icon: Download, items: 12, type: 'folder' },
    { name: 'Pictures', icon: Image, items: 156, type: 'folder' },
    { name: 'Music', icon: Music, items: 89, type: 'folder' },
    { name: 'Videos', icon: Video, items: 8, type: 'folder' },
  ];

  const files = [
    { name: 'Spirit_OS_Guide.pdf', icon: FileText, size: '2.4 MB', type: 'file' },
    { name: 'Privacy_Policy.txt', icon: FileText, size: '12 KB', type: 'file' },
    { name: 'Setup_Notes.md', icon: FileText, size: '8 KB', type: 'file' },
  ];

  const allItems = [...folders, ...files];

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
        <h1 className="text-xl font-medium">Files</h1>
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Path */}
      <div className="px-6 py-3 border-b border-white/5">
        <p className="text-white/70 text-sm">Internal Storage {currentPath}</p>
      </div>

      {/* Storage Info */}
      <div className="mx-6 mt-4 mb-6 bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/90 font-medium">Storage</span>
          <span className="text-white/60 text-sm">42.8 GB used of 128 GB</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full w-1/3 transition-all duration-300" />
        </div>
      </div>

      {/* Files and Folders */}
      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        <div className="space-y-3">
          {allItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-black/20 rounded-2xl backdrop-blur-sm hover:bg-black/30 transition-smooth cursor-pointer"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mr-4">
                  <item.icon className="w-6 h-6 text-white/80" />
                </div>
                <div>
                  <h3 className="text-white/90 font-medium">{item.name}</h3>
                  <p className="text-white/60 text-sm">
                    {item.type === 'folder' ? `${item.items} items` : item.size}
                  </p>
                </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
                <MoreVertical className="w-4 h-4 text-white/60" />
              </button>
            </div>
          ))}
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-white/90 font-medium mb-2">Privacy Protected</h3>
          <p className="text-xs text-white/70 leading-relaxed">
            Your files are stored locally on your device. No cloud sync, no external access. 
            Complete control over your data.
          </p>
        </div>
      </div>
    </div>
  );
};