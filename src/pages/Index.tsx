import React from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';
import { HomeScreen } from '@/components/HomeScreen';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
      <div className="text-center">
        {/* Hero Section */}
        <div className="mb-12 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Spirit OS
          </h1>
          <p className="text-xl text-slate-300 mb-4">
            Privacy-First Android Experience
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Experience a degoogled Android OS built on AOSP. No tracking, no Google services, 
            complete privacy control. Built for the community, by the community.
          </p>
        </div>

        {/* Phone Demo */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <PhoneFrame>
            <HomeScreen />
          </PhoneFrame>
          
          {/* Features */}
          <div className="max-w-md space-y-6 text-left">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-3">🔒 Privacy First</h3>
              <p className="text-slate-300 text-sm">
                No Google services, no tracking, no data collection. Your device, your data.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-3">🌟 Open Source</h3>
              <p className="text-slate-300 text-sm">
                Built on AOSP with transparent development. Audit the code, contribute, and trust.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-3">🛡️ Secure</h3>
              <p className="text-slate-300 text-sm">
                Regular security updates, verified apps, and privacy-focused defaults.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-6">
            Try the interactive demo above • Tap to explore the interface
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              Download Spirit OS
            </button>
            <button className="px-8 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300">
              View on GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
