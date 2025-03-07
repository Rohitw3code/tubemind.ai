import React, { useState } from 'react';
import { Youtube, X, Menu, BarChart2, Settings, Layout, Zap, TrendingUp, MessageSquare } from 'lucide-react';

interface TopNavProps {
  onGetStarted: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuCards = [
    { icon: Layout, title: 'Dashboard', metric: '12', subtitle: 'Active Videos' },
    { icon: TrendingUp, title: 'Analytics', metric: '+24%', subtitle: 'Growth Rate' },
    { icon: MessageSquare, title: 'Comments', metric: '156', subtitle: 'New Today' },
  ];

  return (
    <>
      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div 
        className={`
          lg:hidden fixed top-0 right-0 h-full w-64
          bg-gradient-to-br from-black via-gray-900 to-red-950
          backdrop-blur-lg border-l border-red-500/20
          transition-all duration-500 ease-in-out transform 
          ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
          z-[70] shadow-[-10px_0_30px_rgba(239,68,68,0.15)]
          overflow-y-auto scrollbar-thin scrollbar-track-red-900/20 scrollbar-thumb-red-500/20
          rounded-l-[2.5rem]
        `}
      >
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-l-[2.5rem]">
          <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full mix-blend-multiply filter blur-[80px] animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-red-800/10 rounded-full mix-blend-multiply filter blur-[50px] animate-pulse delay-300"></div>
        </div>

        {/* Close button */}
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 p-2 text-red-400 hover:text-red-300 transition-colors duration-300 bg-red-500/10 rounded-full backdrop-blur-sm"
        >
          <X size={24} />
        </button>

        {/* Navigation content */}
        <div className="relative flex flex-col space-y-6 p-6 mt-16">
          {/* Logo for mobile */}
          <div className="flex items-center space-x-2 mb-8 bg-gradient-to-r from-black/50 to-transparent p-4 rounded-2xl backdrop-blur-sm border border-red-500/10">
            <Youtube className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-white">TubeMind<span className="text-red-500">.ai</span></span>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid gap-4">
            {menuCards.map((card, index) => (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-2xl"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <button className="relative w-full bg-gradient-to-r from-gray-900/50 to-black/50 p-4 rounded-2xl border border-red-500/10 hover:border-red-500/30 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-500/10 rounded-lg">
                        <card.icon className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-300">{card.title}</p>
                        <p className="text-xs text-gray-500">{card.subtitle}</p>
                      </div>
                    </div>
                    <span className="text-lg font-semibold text-red-400">{card.metric}</span>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Navigation links with icons */}
          <div className="space-y-2">
            <div className="px-2 py-1 text-xs text-gray-500">MAIN MENU</div>
            {[
              { icon: Layout, label: 'Dashboard' },
              { icon: BarChart2, label: 'Analytics' },
              { icon: Settings, label: 'Settings' },
              { icon: Zap, label: 'Optimize' },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-red-500/10 rounded-xl transition-all duration-300 group"
              >
                <item.icon className="h-5 w-5 text-red-400 group-hover:text-red-300 transition-colors duration-300" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-8 space-y-3">
            <button className="w-full px-6 py-3 text-sm font-medium text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 backdrop-blur-sm hover:border-red-500/50 group relative">
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 blur-md"></div>
              <span className="relative">Login</span>
            </button>
            <button 
              onClick={onGetStarted}
              className="w-full px-6 py-3 text-sm font-medium bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl hover:from-red-500 hover:to-red-700 transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-red-900/70 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-400 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></span>
              <span className="relative">Get Started</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-4">
        <nav className="relative bg-black/30 backdrop-blur-lg rounded-full border border-red-500/10 px-4 py-3 shadow-[0_0_30px_rgba(239,68,68,0.1)] overflow-hidden group hover:border-red-500/30 transition-all duration-300">
          {/* Animated glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-transparent to-red-500/30 animate-glow"></div>
            <div className="absolute -inset-[100%] moving-light opacity-70"></div>
          </div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-2">
              <Youtube className="h-6 w-6 sm:h-7 sm:w-7 text-red-500" />
              <span className="text-xl sm:text-2xl font-bold text-white">TubeMind<span className="text-red-500">.ai</span></span>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-red-400 hover:text-red-300 transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-5">
              <button className="px-6 py-2 text-sm font-medium text-red-400 border border-red-500/30 rounded-full hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 backdrop-blur-sm hover:border-red-500/50 group relative">
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 blur-md"></div>
                <span className="relative">Login</span>
              </button>
              <button 
                onClick={onGetStarted}
                className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full hover:from-red-500 hover:to-red-700 transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-red-900/70 relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-400 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></span>
                <span className="relative">Get Started</span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};