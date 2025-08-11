import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Plus, Search, Edit3, Trash2 } from 'lucide-react';

interface NotesAppProps {
  onBack: () => void;
}

export const NotesApp: React.FC<NotesAppProps> = ({ onBack }) => {
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [noteContent, setNoteContent] = useState('');

  const notes = [
    {
      id: 1,
      title: 'Spirit OS Setup',
      preview: 'Remember to install F-Droid and Aurora Store for apps...',
      date: 'Today',
      content: `Spirit OS Setup Notes

Remember to install F-Droid and Aurora Store for apps.

Key privacy features:
- No Google services
- Local data storage
- Open source apps only
- Regular security updates

Next steps:
1. Configure privacy settings
2. Install essential apps
3. Set up encrypted messaging`
    },
    {
      id: 2,
      title: 'Privacy Checklist',
      preview: 'Things to review after installing Spirit OS...',
      date: 'Yesterday',
      content: `Privacy Checklist

✓ Disable location services for unnecessary apps
✓ Review app permissions
✓ Enable encrypted storage
✓ Set up secure lock screen
□ Configure VPN
□ Review network settings
□ Set up encrypted backups`
    },
    {
      id: 3,
      title: 'App Recommendations',
      preview: 'Best privacy-focused apps for Spirit OS...',
      date: '2 days ago',
      content: `Privacy-Focused App Recommendations

Communication:
- Signal (encrypted messaging)
- Element (Matrix client)
- Briar (decentralized messaging)

Browsers:
- Fennec F-Droid (Firefox-based)
- Privacy Browser
- Tor Browser

Utilities:
- NewPipe (YouTube client)
- OsmAnd (offline maps)
- KeePassDX (password manager)`
    }
  ];

  const currentNote = notes.find(n => n.id === selectedNote);

  if (selectedNote && currentNote) {
    return (
      <div className="h-full bg-gradient-surface text-white flex flex-col">
        <StatusBar />
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <button
            onClick={() => setSelectedNote(null)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-medium">{currentNote.title}</h1>
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
            <Edit3 className="w-5 h-5" />
          </button>
        </div>

        {/* Note Content */}
        <div className="flex-1 p-6">
          <div className="bg-black/20 rounded-2xl p-6 backdrop-blur-sm h-full">
            <textarea
              value={noteContent || currentNote.content}
              onChange={(e) => setNoteContent(e.target.value)}
              className="w-full h-full bg-transparent text-white/90 placeholder-white/50 outline-none resize-none text-sm leading-relaxed"
              placeholder="Start writing..."
            />
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
        <h1 className="text-xl font-medium">Notes</h1>
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Search */}
      <div className="px-6 py-4">
        <div className="bg-black/20 rounded-full px-4 py-3 backdrop-blur-sm flex items-center">
          <Search className="w-5 h-5 text-white/60 mr-3" />
          <input
            type="text"
            placeholder="Search notes"
            className="flex-1 bg-transparent text-white placeholder-white/60 outline-none"
          />
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note.id)}
              className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm hover:bg-black/30 transition-smooth cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white/90 font-medium text-lg">{note.title}</h3>
                <span className="text-white/50 text-xs">{note.date}</span>
              </div>
              <p className="text-white/70 text-sm line-clamp-2">{note.preview}</p>
            </div>
          ))}
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-white/90 font-medium mb-2">Local Storage</h3>
          <p className="text-xs text-white/70 leading-relaxed">
            All notes are stored locally on your device. No cloud sync, no external access.
          </p>
        </div>
      </div>
    </div>
  );
};