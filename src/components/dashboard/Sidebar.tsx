import React from 'react';
import { X, Rocket, FileVideo, Type, Tags, Mic2, TrendingUp, MessageSquare, BrainCircuit, ImagePlus, Languages, Shield } from 'lucide-react';

interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const menuItems = [
  {
    category: "Video Tools",
    items: [
      { icon: FileVideo, label: "SmartScript AI", description: "AI-powered video content analysis" },
      { icon: Type, label: "Generate Script", description: "Create engaging video scripts" },
      { icon: Tags, label: "Tag Generator", description: "Trending tags for better reach" },
      { icon: Mic2, label: "Voice Enhancement", description: "Enhance audio quality" }
    ]
  },
  {
    category: "Creative Suite",
    items: [
      { icon: ImagePlus, label: "Thumbnail Creator", description: "Eye-catching thumbnail generation" },
      { icon: Languages, label: "Caption Generator", description: "Multi-language caption creation" },
      { icon: BrainCircuit, label: "Content Ideas", description: "AI-powered content suggestions" }
    ]
  },
  {
    category: "Analytics",
    items: [
      { icon: TrendingUp, label: "Performance", description: "Track video metrics" },
      { icon: MessageSquare, label: "Engagement", description: "Monitor audience interaction" },
      { icon: Shield, label: "Content Safety", description: "AI content verification" }
    ]
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setSidebarOpen }) => {
  return (
    <div 
      className={`
        fixed top-0 left-0 h-full bg-black/30 backdrop-blur-xl border-r border-red-500/20 
        transition-all duration-300 ease-in-out z-50 
        w-64 mt-16
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:border-r-0'}
      `}
    >
      {/* Close button for mobile */}
      <button
        onClick={() => setSidebarOpen(false)}
        className="lg:hidden absolute top-4 right-4 p-2 text-red-400 hover:text-red-300 
          transition-colors duration-300 bg-red-500/10 rounded-lg"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Sidebar Content */}
      <div className={`h-full overflow-y-auto scrollbar-thin scrollbar-track-red-900/20 scrollbar-thumb-red-500/20 ${isSidebarOpen ? 'opacity-100 w-64' : 'opacity-0 w-0 lg:hidden'}`}>
        {/* Logo - Only show on mobile */}
        <div className="p-6 flex items-center space-x-3 lg:hidden">
          <Rocket className="w-8 h-8 text-red-500" />
          <span className="text-xl font-bold text-white">
            TubeMind<span className="text-red-500">.ai</span>
          </span>
        </div>

        {/* Menu Items */}
        <div className="px-4 py-2">
          {menuItems.map((category, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-red-400 text-xs font-semibold mb-3 px-2">
                {category.category}
              </h3>
              <div className="space-y-1">
                {category.items.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    className="w-full group flex items-center space-x-3 p-2 rounded-lg
                      hover:bg-red-500/10 transition-all duration-300 px-4"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <item.icon className="w-4 h-4 text-red-400 group-hover:text-red-300 
                        transition-colors duration-300 relative" 
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-gray-200 text-sm font-medium">{item.label}</p>
                      <p className="text-gray-400 text-xs">{item.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};