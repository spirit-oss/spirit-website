import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Shield, Eye, Lock, Wifi, MapPin, Mic, Camera, ChevronRight } from 'lucide-react';

interface PrivacyCentralAppProps {
  onBack: () => void;
}

export const PrivacyCentralApp: React.FC<PrivacyCentralAppProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const privacyStats = [
    { label: 'Trackers Blocked', value: '1,247', icon: Shield, color: 'text-accent' },
    { label: 'Apps Monitored', value: '23', icon: Eye, color: 'text-primary' },
    { label: 'Permissions Denied', value: '89', icon: Lock, color: 'text-orange-400' },
  ];

  const recentActivity = [
    { app: 'Browser', action: 'Location access denied', time: '2 min ago', severity: 'high' },
    { app: 'Camera', action: 'Microphone access granted', time: '5 min ago', severity: 'medium' },
    { app: 'Maps', action: 'Location access granted', time: '1 hour ago', severity: 'low' },
    { app: 'Music', action: 'Storage access granted', time: '2 hours ago', severity: 'low' },
  ];

  const permissionCategories = [
    { name: 'Location', icon: MapPin, apps: 3, status: 'restricted' },
    { name: 'Camera', icon: Camera, apps: 5, status: 'controlled' },
    { name: 'Microphone', icon: Mic, apps: 4, status: 'controlled' },
    { name: 'Network', icon: Wifi, apps: 12, status: 'monitored' },
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'permissions', label: 'Permissions' },
    { id: 'activity', label: 'Activity' },
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
        <h1 className="text-xl font-medium">Privacy Central</h1>
        <div className="w-10" />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 text-sm font-medium transition-smooth ${
              activeTab === tab.id
                ? 'text-accent border-b-2 border-accent'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <div className="p-6 space-y-6">
            {/* Privacy Score */}
            <div className="bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl p-6 border border-accent/20">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-12 h-12 text-accent" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">95%</h2>
                <p className="text-white/80">Privacy Score</p>
                <p className="text-white/60 text-sm mt-2">Excellent protection</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4">
              {privacyStats.map((stat, index) => (
                <div key={index} className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mr-4">
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                      <p className="text-white/70 text-sm">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
              <h3 className="text-white/90 font-medium mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-smooth">
                  <span className="text-white/90">Review App Permissions</span>
                  <ChevronRight className="w-5 h-5 text-white/60" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-smooth">
                  <span className="text-white/90">Privacy Audit</span>
                  <ChevronRight className="w-5 h-5 text-white/60" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="p-6 space-y-4">
            {permissionCategories.map((category, index) => (
              <div key={index} className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mr-4">
                      <category.icon className="w-6 h-6 text-white/80" />
                    </div>
                    <div>
                      <h3 className="text-white/90 font-medium">{category.name}</h3>
                      <p className="text-white/60 text-sm">{category.apps} apps</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      category.status === 'restricted' ? 'bg-red-500/20 text-red-400' :
                      category.status === 'controlled' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {category.status}
                    </span>
                    <ChevronRight className="w-5 h-5 text-white/60 ml-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="p-6 space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <span className="text-white/90 font-medium mr-2">{activity.app}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        activity.severity === 'high' ? 'bg-red-400' :
                        activity.severity === 'medium' ? 'bg-yellow-400' :
                        'bg-green-400'
                      }`} />
                    </div>
                    <p className="text-white/70 text-sm">{activity.action}</p>
                  </div>
                  <span className="text-white/50 text-xs">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};