import React from 'react';
import { Menu, Rocket } from 'lucide-react';

interface TopNavProps {
  setSidebarOpen: (isOpen: boolean) => void;
  isSidebarOpen: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({ setSidebarOpen, isSidebarOpen }) => {
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="sticky top-0 z-30 w-full bg-black/30 backdrop-blur-lg border-b border-red-500/20">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            className="p-2 text-red-400 hover:text-red-300 transition-colors duration-300 bg-red-500/10 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
            <span className="text-lg sm:text-xl font-bold text-white">
              TubeMind<span className="text-red-500">.ai</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};