import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Send, Plus, Search } from 'lucide-react';

interface MessagesAppProps {
  onBack: () => void;
}

interface Message {
  text: string;
  sender: 'me' | 'them';
  time: string;
}

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

export const MessagesApp: React.FC<MessagesAppProps> = ({ onBack }) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: 'Mom',
      lastMessage: 'Don\'t forget dinner tonight!',
      time: '2:30 PM',
      unread: 1,
      messages: [
        { text: 'Hi honey, how was your day?', sender: 'them', time: '2:15 PM' },
        { text: 'It was great! Working on some new projects', sender: 'me', time: '2:20 PM' },
        { text: 'Don\'t forget dinner tonight!', sender: 'them', time: '2:30 PM' },
      ]
    },
    {
      id: 2,
      name: 'John Smith',
      lastMessage: 'Thanks for the help earlier',
      time: 'Yesterday',
      unread: 0,
      messages: [
        { text: 'Hey, can you help me with that code?', sender: 'them', time: 'Yesterday 3:00 PM' },
        { text: 'Sure! What do you need help with?', sender: 'me', time: 'Yesterday 3:05 PM' },
        { text: 'Thanks for the help earlier', sender: 'them', time: 'Yesterday 4:30 PM' },
      ]
    },
    {
      id: 3,
      name: 'Privacy Group',
      lastMessage: 'New Spirit OS update available',
      time: 'Monday',
      unread: 3,
      messages: [
        { text: 'Hey everyone! 👋', sender: 'them', time: 'Monday 9:00 AM' },
        { text: 'New Spirit OS update available', sender: 'them', time: 'Monday 10:30 AM' },
      ]
    },
  ]);

  const handleChatSelect = (chatId: number) => {
    // Clear unread count when opening a chat
    setConversations(prevConvs => 
      prevConvs.map(conv => 
        conv.id === chatId ? { ...conv, unread: 0 } : conv
      )
    );
    setSelectedChat(chatId);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: Message = {
      text: newMessage.trim(),
      sender: 'me',
      time: currentTime
    };

    setConversations(prevConvs => 
      prevConvs.map(conv => {
        if (conv.id === selectedChat) {
          return {
            ...conv,
            messages: [...conv.messages, newMsg],
            lastMessage: newMsg.text,
            time: currentTime
          };
        }
        return conv;
      })
    );

    setNewMessage('');
  };

  const currentChat = conversations.find(c => c.id === selectedChat);

  if (selectedChat && currentChat) {
    return (
      <div className="h-full bg-gradient-surface text-white flex flex-col">
        <StatusBar />
        
        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center">
            <button
              onClick={() => setSelectedChat(null)}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20 mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-medium">{currentChat.name}</h1>
              <p className="text-sm text-white/60">Online</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {currentChat.messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl ${
                  message.sender === 'me'
                    ? 'gradient-primary text-white'
                    : 'bg-black/20 text-white/90'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">{message.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-6 border-t border-white/10">
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-black/20 rounded-full px-4 py-3 backdrop-blur-sm">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-transparent text-white placeholder-white/60 outline-none"
              />
            </div>
            <button 
              type="submit"
              disabled={!newMessage.trim()}
              className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center disabled:opacity-50 transition-smooth"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </form>
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
        <h1 className="text-xl font-medium">Messages</h1>
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
            placeholder="Search messages"
            className="flex-1 bg-transparent text-white placeholder-white/60 outline-none"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleChatSelect(chat.id)}
            className="flex items-center p-6 border-b border-white/5 hover:bg-white/5 transition-smooth cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
              <span className="text-primary font-medium">{chat.name[0]}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-white/90">{chat.name}</h3>
                <span className="text-xs text-white/60">{chat.time}</span>
              </div>
              <p className="text-sm text-white/60 truncate">{chat.lastMessage}</p>
            </div>
            {chat.unread > 0 && (
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center ml-3">
                <span className="text-xs text-white font-medium">{chat.unread}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};