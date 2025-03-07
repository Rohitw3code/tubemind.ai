import React, { useState } from 'react';
import { Sidebar } from './dashboard/Sidebar';
import { TopNav } from './dashboard/TopNav';
import { MainContent } from './dashboard/MainContent';

export const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

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
        />
        
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
          <MainContent isFullscreen={!isSidebarOpen} />
        </div>
      </div>
    </div>
  );
};