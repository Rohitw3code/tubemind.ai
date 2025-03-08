import React, { useState } from 'react';
import { Brain, Sparkles, MessageSquare, Settings, Play, Pause, RefreshCw } from 'lucide-react';

export const AIAgent = () => {
  const [isActive, setIsActive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('2 minutes ago');
  const [status, setStatus] = useState('idle');

  const toggleAgent = () => {
    setIsActive(!isActive);
    setStatus(isActive ? 'idle' : 'monitoring');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Brain className="h-6 w-6 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white">AI Video Assistant</h2>
          </div>
          <p className="text-sm text-gray-400">
            Your personal AI assistant that continuously monitors your videos and optimizes them based on trending topics and viewer engagement.
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${isActive ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                <Sparkles className={`h-5 w-5 ${isActive ? 'text-green-400' : 'text-red-400'}`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Agent Status</h3>
                <p className="text-sm text-gray-400">Last updated: {lastUpdate}</p>
              </div>
            </div>
            <button
              onClick={toggleAgent}
              className={`
                px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium
                transition-all duration-300
                ${isActive 
                  ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' 
                  : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'}
              `}
            >
              {isActive ? (
                <>
                  <Pause className="h-4 w-4" />
                  <span>Stop Agent</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Start Agent</span>
                </>
              )}
            </button>
          </div>

          {/* Status Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-black/20 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <RefreshCw className={`h-4 w-4 ${status === 'monitoring' ? 'text-green-400 animate-spin' : 'text-gray-400'}`} />
                <span className="text-sm font-medium text-white">Monitoring</span>
              </div>
              <p className="text-xs text-gray-400">Analyzing video performance and trends</p>
            </div>
            <div className="bg-black/20 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MessageSquare className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-white">Updates</span>
              </div>
              <p className="text-xs text-gray-400">Automatic metadata optimization</p>
            </div>
            <div className="bg-black/20 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Settings className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-white">Settings</span>
              </div>
              <p className="text-xs text-gray-400">Configure AI behavior and preferences</p>
            </div>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">More Features Coming Soon</h3>
              <p className="text-sm text-gray-400">
                We're working on advanced AI capabilities including automatic thumbnail generation, 
                trend prediction, and smart scheduling.
              </p>
            </div>
            <div className="hidden sm:block">
              <Brain className="h-16 w-16 text-red-400/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};