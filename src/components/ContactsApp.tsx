import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Plus, Search, Phone, MessageSquare, Mail, MoreVertical } from 'lucide-react';

interface ContactsAppProps {
  onBack: () => void;
}

export const ContactsApp: React.FC<ContactsAppProps> = ({ onBack }) => {
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const contacts = [
    {
      id: 1,
      name: 'Alice Johnson',
      phone: '+1 (555) 0123',
      email: 'alice@example.com',
      avatar: 'A',
      color: 'bg-blue-500',
      favorite: true
    },
    {
      id: 2,
      name: 'Bob Wilson',
      phone: '+1 (555) 0456',
      email: 'bob@example.com',
      avatar: 'B',
      color: 'bg-green-500',
      favorite: false
    },
    {
      id: 3,
      name: 'Charlie Brown',
      phone: '+1 (555) 0789',
      email: 'charlie@example.com',
      avatar: 'C',
      color: 'bg-purple-500',
      favorite: true
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
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteContacts = contacts.filter(contact => contact.favorite);

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
            <div className={`w-24 h-24 rounded-full ${contact.color} flex items-center justify-center mx-auto mb-4`}>
              <span className="text-3xl font-bold text-white">{contact.avatar}</span>
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
                <div className={`w-16 h-16 rounded-full ${contact.color} flex items-center justify-center mb-2`}>
                  <span className="text-xl font-bold text-white">{contact.avatar}</span>
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
                <div className={`w-12 h-12 rounded-full ${contact.color} flex items-center justify-center mr-4`}>
                  <span className="text-lg font-bold text-white">{contact.avatar}</span>
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