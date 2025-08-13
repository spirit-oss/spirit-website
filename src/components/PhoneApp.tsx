import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Phone, Plus, Search } from 'lucide-react';

interface PhoneAppProps {
  onBack: () => void;
  networkEnabled?: boolean;
}

export const PhoneApp: React.FC<PhoneAppProps> = ({ onBack, networkEnabled = true }) => {
  const [activeTab, setActiveTab] = useState('recents');
  const [showNetworkError, setShowNetworkError] = useState(false);
  
  const recentCalls = [
    { name: 'Mom', number: '+1 (555) 0123', time: '2 min ago', type: 'outgoing' },
    { name: 'Work', number: '+1 (555) 0456', time: '1 hour ago', type: 'incoming' },
    { name: 'John Smith', number: '+1 (555) 0789', time: 'Yesterday', type: 'missed' },
    { name: 'Pizza Palace', number: '+1 (555) 0321', time: 'Yesterday', type: 'outgoing' },
  ];

  const contacts = [
    { name: 'Alice Johnson', number: '+1 (555) 0111' },
    { name: 'Bob Wilson', number: '+1 (555) 0222' },
    { name: 'Charlie Brown', number: '+1 (555) 0333' },
    { name: 'Diana Prince', number: '+1 (555) 0444' },
  ];

  const tabs = [
    { id: 'recents', label: 'Recents' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'keypad', label: 'Keypad' },
  ];

  const handleCall = (number?: string) => {
    if (!networkEnabled) {
      setShowNetworkError(true);
      setTimeout(() => setShowNetworkError(false), 3000);
      return;
    }
    // Handle normal call functionality here
    console.log('Calling:', number);
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
        <h1 className="text-xl font-medium">Phone</h1>
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
        {activeTab === 'recents' && (
          <div className="p-6 space-y-4">
            {recentCalls.map((call, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-black/20 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-white/90 font-medium">{call.name}</div>
                    <div className="text-white/60 text-sm">{call.number}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white/60 text-sm">{call.time}</div>
                  <div className={`text-xs ${
                    call.type === 'missed' ? 'text-destructive' : 
                    call.type === 'outgoing' ? 'text-accent' : 'text-primary'
                  }`}>
                    {call.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="p-6 space-y-4">
            {contacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-black/20 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mr-4">
                    <span className="text-accent font-medium">{contact.name[0]}</span>
                  </div>
                  <div>
                    <div className="text-white/90 font-medium">{contact.name}</div>
                    <div className="text-white/60 text-sm">{contact.number}</div>
                  </div>
                </div>
                <button 
                  onClick={() => handleCall(contact.number)}
                  className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-smooth"
                >
                  <Phone className="w-5 h-5 text-primary" />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'keypad' && (
          <div className="p-6">
            <div className="bg-black/20 rounded-2xl p-6 mb-6 text-center backdrop-blur-sm">
              <div className="text-2xl font-mono text-white/90 mb-2">+1 (555) 0</div>
              <div className="text-white/60 text-sm">Enter number to call</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
                <button
                  key={key}
                  className="aspect-square bg-white/10 rounded-2xl flex items-center justify-center text-xl font-medium text-white hover:bg-white/20 transition-smooth"
                >
                  {key}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => handleCall('+1 (555) 0')}
              className="w-full mt-6 py-4 gradient-primary rounded-2xl text-white font-medium flex items-center justify-center hover:scale-105 transition-smooth"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call
            </button>
          </div>
        )}
      </div>

      {/* Network Error Modal */}
      {showNetworkError && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-red-900/90 to-red-800/90 rounded-2xl p-6 mx-6 max-w-sm border border-red-500/20">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No Network Available</h3>
              <p className="text-white/70 text-sm mb-4">
                Unable to place call. Check your network connection and try again.
              </p>
              <button 
                onClick={() => setShowNetworkError(false)}
                className="px-6 py-2 bg-red-500/20 rounded-xl text-red-400 font-medium hover:bg-red-500/30 transition-smooth"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};