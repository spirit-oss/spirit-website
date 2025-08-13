import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Plus, Search, Phone, MessageSquare, Mail, MoreVertical } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  color: string;
  favorite: boolean;
  avatarImage?: 0 | 1 | 2; // Index for contact0.png, contact1.png, contact2.png
}

interface ContactsAppProps {
  onBack: () => void;
}

// Avatar component that handles both image and text avatars
const ContactAvatar: React.FC<{
  contact: Contact;
  size: 'small' | 'medium' | 'large';
  className?: string;
}> = ({ contact, size, className = '' }) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16', 
    large: 'w-24 h-24'
  };
  
  const textSizes = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-3xl'
  };

  if (contact.avatarImage !== undefined) {
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden flex items-center justify-center ${className}`}>
        <img 
          src={`/contact${contact.avatarImage}.png`}
          alt={`${contact.name} avatar`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to text avatar if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.className = `${sizeClasses[size]} rounded-full ${contact.color} flex items-center justify-center ${className}`;
              parent.innerHTML = `<span class="${textSizes[size]} font-bold text-white">${contact.avatar}</span>`;
            }
          }}
        />
      </div>
    );
  }

  // Fallback to text avatar
  return (
    <div className={`${sizeClasses[size]} rounded-full ${contact.color} flex items-center justify-center ${className}`}>
      <span className={`${textSizes[size]} font-bold text-white`}>{contact.avatar}</span>
    </div>
  );
};

export const ContactsApp: React.FC<ContactsAppProps> = ({ onBack }) => {
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingContact, setEditingContact] = useState<number | null>(null);
  const [showAvatarPicker, setShowAvatarPicker] = useState<number | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'Alice Johnson',
      phone: '+1 (555) 0123',
      email: 'alice@example.com',
      avatar: 'A',
      color: 'bg-blue-500',
      favorite: true,
      avatarImage: 0
    },
    {
      id: 2,
      name: 'Bob Wilson',
      phone: '+1 (555) 0456',
      email: 'bob@example.com',
      avatar: 'B',
      color: 'bg-green-500',
      favorite: false,
      avatarImage: 1
    },
    {
      id: 3,
      name: 'Charlie Brown',
      phone: '+1 (555) 0789',
      email: 'charlie@example.com',
      avatar: 'C',
      color: 'bg-purple-500',
      favorite: true,
      avatarImage: 2
    },
    {
      id: 4,
      name: 'Diana Prince',
      phone: '+1 (555) 0321',
      email: 'diana@example.com',
      avatar: 'D',
      color: 'bg-red-500',
      favorite: false
    },
    {
      id: 5,
      name: 'Eve Adams',
      phone: '+1 (555) 0654',
      email: 'eve@example.com',
      avatar: 'E',
      color: 'bg-yellow-500',
      favorite: false
    },
  ]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteContacts = contacts.filter(contact => contact.favorite);

  const updateContactAvatar = (contactId: number, avatarImage: 0 | 1 | 2 | undefined) => {
    setContacts(contacts.map(contact => 
      contact.id === contactId 
        ? { ...contact, avatarImage }
        : contact
    ));
    setShowAvatarPicker(null);
  };

  // Avatar Picker Modal
  if (showAvatarPicker) {
    const contact = contacts.find(c => c.id === showAvatarPicker);
    if (!contact) {
      setShowAvatarPicker(null);
      return null;
    }

    return (
      <div className="h-full bg-gradient-surface text-white flex flex-col">
        <StatusBar />
        
        {/* Avatar Picker Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <button
            onClick={() => setShowAvatarPicker(null)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-medium">Choose Avatar</h1>
          <div className="w-10 h-10" /> {/* Spacer */}
        </div>

        {/* Avatar Options */}
        <div className="flex-1 p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">{contact.name}</h2>
            <p className="text-white/70">Select an avatar image</p>
          </div>

          <div className="space-y-6">
            {/* PNG Avatar Options */}
            <div>
              <h3 className="text-white/90 font-medium mb-4">Avatar Images</h3>
              <div className="grid grid-cols-3 gap-4">
                {[0, 1, 2].map((avatarIndex) => (
                  <button
                    key={avatarIndex}
                    onClick={() => updateContactAvatar(contact.id, avatarIndex as 0 | 1 | 2)}
                    className={`relative p-4 bg-black/20 rounded-2xl backdrop-blur-sm hover:bg-black/30 transition-smooth ${
                      contact.avatarImage === avatarIndex ? 'ring-2 ring-accent' : ''
                    }`}
                  >
                    <div className="w-20 h-20 mx-auto mb-2">
                      <img 
                        src={`/contact${avatarIndex}.png`}
                        alt={`Avatar ${avatarIndex}`}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM2QjcyODAiLz4KPHR4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgZG9taW5hbnQtYmFzZWxpbmU9ImNlbnRyYWwiIHRleHQtYW5jaG9yPSJtaWRkbGUiPj88L3R4dD4KPC9zdmc+';
                        }}
                      />
                    </div>
                    <p className="text-white/80 text-sm">Avatar {avatarIndex + 1}</p>
                    {contact.avatarImage === avatarIndex && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Avatar Option */}
            <div>
              <h3 className="text-white/90 font-medium mb-4">Text Avatar</h3>
              <button
                onClick={() => updateContactAvatar(contact.id, undefined)}
                className={`w-full p-4 bg-black/20 rounded-2xl backdrop-blur-sm hover:bg-black/30 transition-smooth ${
                  contact.avatarImage === undefined ? 'ring-2 ring-accent' : ''
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-16 h-16 rounded-full ${contact.color} flex items-center justify-center mr-4`}>
                    <span className="text-2xl font-bold text-white">{contact.avatar}</span>
                  </div>
                  <div className="text-left">
                    <p className="text-white/90 font-medium">Use Text Avatar</p>
                    <p className="text-white/60 text-sm">Default colored circle with initial</p>
                  </div>
                  {contact.avatarImage === undefined && (
                    <div className="ml-auto w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedContact) {
    const contact = contacts.find(c => c.id === selectedContact);
    if (!contact) return null;

    return (
      <div className="h-full bg-gradient-surface text-white flex flex-col">
        <StatusBar />
        
        {/* Contact Detail Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <button
            onClick={() => setSelectedContact(null)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-medium">Contact</h1>
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Contact Info */}
        <div className="flex-1 p-6">
          <div className="text-center mb-8">
            <div 
              className="mx-auto mb-4 cursor-pointer"
              onClick={() => setShowAvatarPicker(contact.id)}
            >
              <ContactAvatar contact={contact} size="large" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{contact.name}</h2>
            <p className="text-white/70">{contact.phone}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-6 mb-8">
            <button className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center transition-smooth hover:scale-105">
              <Phone className="w-8 h-8 text-white" />
            </button>
            <button className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
              <MessageSquare className="w-8 h-8 text-white" />
            </button>
            <button className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
              <Mail className="w-8 h-8 text-white" />
            </button>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Phone</p>
                  <p className="text-white/90 text-lg">{contact.phone}</p>
                </div>
                <Phone className="w-5 h-5 text-white/60" />
              </div>
            </div>

            <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <p className="text-white/90 text-lg">{contact.email}</p>
                </div>
                <Mail className="w-5 h-5 text-white/60" />
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
        <h1 className="text-xl font-medium">Contacts</h1>
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
            placeholder="Search contacts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-white/60 outline-none"
          />
        </div>
      </div>

      {/* Favorites */}
      {favoriteContacts.length > 0 && !searchQuery && (
        <div className="px-6 mb-6">
          <h3 className="text-white/90 font-medium mb-4">Favorites</h3>
          <div className="flex space-x-4 overflow-x-auto">
            {favoriteContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact.id)}
                className="flex flex-col items-center cursor-pointer"
              >
                <div className="mb-2">
                  <ContactAvatar contact={contact} size="medium" />
                </div>
                <span className="text-white/80 text-xs text-center max-w-[4rem] truncate">
                  {contact.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 pb-8">
          {!searchQuery && (
            <h3 className="text-white/90 font-medium mb-4">All Contacts</h3>
          )}
          <div className="space-y-3">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact.id)}
                className="flex items-center p-4 bg-black/20 rounded-2xl backdrop-blur-sm hover:bg-black/30 transition-smooth cursor-pointer"
              >
                <div className="mr-4">
                  <ContactAvatar contact={contact} size="small" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white/90 font-medium">{contact.name}</h3>
                  <p className="text-white/60 text-sm">{contact.phone}</p>
                </div>
                {contact.favorite && (
                  <div className="w-2 h-2 bg-accent rounded-full" />
                )}
              </div>
            ))}
          </div>

          {filteredContacts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60">No contacts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};