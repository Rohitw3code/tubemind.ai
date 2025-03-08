import React, { useState } from 'react';
import { Sidebar } from './dashboard/Sidebar';
import { TopNav } from './dashboard/TopNav';
import { SmartScript } from './dashboard/SmartScript';
import { ScriptGenerator } from './dashboard/ScriptGenerator';
import { TagGenerator } from './dashboard/TagGenerator';
import { AIAgent } from './dashboard/AIAgent';

export const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState<'smartscript' | 'scriptgenerator' | 'taggenerator' | 'aiagent'>('smartscript');

  const handleMenuItemClick = (view: 'smartscript' | 'scriptgenerator' | 'taggenerator' | 'aiagent') => {
    setActiveView(view);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-red-950">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <TopNav 
        setSidebarOpen={setSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />
      
      <div className="flex">
        <Sidebar 
          isSidebarOpen={isSidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          onMenuItemClick={handleMenuItemClick}
          activeView={activeView}
        />
        
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
          {activeView === 'smartscript' && <SmartScript isFullscreen={!isSidebarOpen} />}
          {activeView === 'scriptgenerator' && <ScriptGenerator />}
          {activeView === 'taggenerator' && <TagGenerator />}
          {activeView === 'aiagent' && <AIAgent />}
        </div>
      </div>
    </div>
  );
};