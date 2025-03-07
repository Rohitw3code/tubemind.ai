import React from 'react';
import { Sparkles, BarChart2, TrendingUp as Trending, MessageSquare, Youtube, Rocket, Play } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-20">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="w-full lg:w-7/12 text-center lg:text-left relative pl-0 lg:pl-8">
          {/* Floating Elements Animation */}
          <div className="absolute -left-4 top-0 w-72 h-72 bg-gradient-to-r from-red-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -right-4 bottom-0 w-72 h-72 bg-gradient-to-l from-red-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-700"></div>

          {/* AI Badge */}
          <div 
            className="inline-block mb-6 relative group cursor-pointer"
            style={{ animation: 'fadeIn 0.6s ease-out' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent rounded-full blur-md transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
            <div className="px-4 py-1 text-xs text-red-400/80 bg-gradient-to-r from-red-500/10 to-transparent rounded-full border border-red-500/20 backdrop-blur-sm relative flex items-center space-x-2 group-hover:border-red-500/40 transition-all duration-300">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>AI-Powered Platform</span>
            </div>
          </div>
          
          {/* Main Title */}
          <div 
            className="relative group mb-6 perspective"
            style={{ animation: 'fadeIn 0.8s ease-out 0.2s backwards' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl -z-10"></div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-red-200 to-red-400 transform-gpu transition-transform duration-700 hover:scale-[1.02] relative group-hover:animate-title-wave">
              <span className="inline-block hover:animate-bounce-subtle">Optimize </span>
              <span className="inline-block hover:animate-bounce-subtle">Your </span>
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-300 to-red-500 hover:animate-bounce-subtle">YouTube </span>
              <span className="inline-block hover:animate-bounce-subtle">Content </span>
              <span className="inline-block hover:animate-bounce-subtle">with </span>
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-300 hover:animate-pulse">AI</span>
            </h1>
          </div>

          {/* Description */}
          <p 
            className="text-base sm:text-lg text-gray-300 mb-8 max-w-xl relative"
            style={{ animation: 'fadeIn 0.8s ease-out 0.4s backwards' }}
          >
            Optimize your YouTube videos effortlessly with TubeMind.ai! AI-driven tools generate engaging titles, descriptions, and tags, update metadata based on trending topics, and enhance engagement with smart automation.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4"
            style={{ animation: 'fadeIn 0.8s ease-out 0.6s backwards' }}
          >
            <button 
              onClick={onGetStarted}
              className="group px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-red-900/70 relative overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-400 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center space-x-2">
                <span>Get Started Free</span>
                <Rocket className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            <button className="group px-6 py-3 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-300 backdrop-blur-sm hover:border-red-500/50 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl"></div>
              <span className="relative flex items-center justify-center space-x-2">
                <Play className="h-4 w-4" />
                <span>Watch Demo</span>
              </span>
            </button>
          </div>

          {/* Feature Pills */}
          <div 
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
            style={{ animation: 'fadeIn 0.8s ease-out 0.8s backwards' }}
          >
            {[
              { icon: BarChart2, text: "Smart Analysis" },
              { icon: Trending, text: "Optimization" },
              { icon: MessageSquare, text: "Engagement" }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group flex items-center justify-center sm:justify-start space-x-2 text-red-300 bg-gradient-to-r from-red-900/20 to-red-900/10 p-3 rounded-lg backdrop-blur-sm border border-red-500/10 hover:border-red-500/30 transition-all duration-300"
                style={{ animation: `fadeIn 0.5s ease-out ${(index + 4) * 0.1}s backwards` }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <feature.icon className="h-4 w-4 text-red-400 group-hover:text-red-300 transition-colors duration-300 relative" />
                </div>
                <span className="text-xs sm:text-sm group-hover:text-red-200 transition-colors duration-300">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div 
          className="w-full lg:w-5/12 lg:-mr-8"
          style={{ animation: 'fadeIn 1s ease-out 1s backwards' }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-800 rounded-xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/20 to-red-900/40 rounded-xl"></div>
            <img 
              src="https://cdn.prod.website-files.com/65f869f476374787afc14dcb/65f9af5c02fc5f92a708475b_TubeMagic%20Hero%20V9.png"
              alt="AI Dashboard"
              className="relative rounded-xl shadow-2xl border border-red-500/20 backdrop-blur-sm w-full transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_50px_rgba(239,68,68,0.2)]"
            />
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-500/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-red-800/30 rounded-full blur-2xl animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};