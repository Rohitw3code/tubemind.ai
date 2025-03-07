import React from 'react';
import { FileVideo, Type, Tags, Mic2, TrendingUp, Rocket, Youtube, Sparkles } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: FileVideo,
      title: "AI Video Analysis",
      description: "Instant insights from your video content.",
      gradient: "from-red-500/20 via-orange-500/20 to-red-500/20"
    },
    {
      icon: Type,
      title: "Smart Metadata",
      description: "Auto-updating titles and descriptions.",
      gradient: "from-red-500/20 via-pink-500/20 to-red-500/20"
    },
    {
      icon: Tags,
      title: "Tag Generation",
      description: "Trending tags for better reach.",
      gradient: "from-red-500/20 via-purple-500/20 to-red-500/20"
    },
    {
      icon: Mic2,
      title: "Script & Audio",
      description: "Enhanced scripts and voiceovers.",
      gradient: "from-red-500/20 via-blue-500/20 to-red-500/20"
    }
  ];

  return (
    <section className="py-4 px-6 md:px-12 lg:px-16 xl:px-20 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-800/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto relative">
        {/* Section Header with Logo */}
        <div className="text-center mb-12 relative">
          <div className="inline-flex items-center justify-center space-x-2 bg-black/30 rounded-2xl px-6 py-3 mb-8 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group">
            <Youtube className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform duration-300" />
            <TrendingUp className="w-4 h-4 text-red-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-red-400">
              TubeMind<span className="text-red-500">.ai</span>
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-red-200 to-red-400">
            Smart Video Optimization
          </h2>
          
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Create high-performing content with AI-powered insights
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Animated Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl`}></div>
              
              <div className="relative bg-black/30 backdrop-blur-sm border border-red-500/10 group-hover:border-red-500/30 p-4 rounded-xl h-full">
                {/* Animated Icon */}
                <div className="inline-flex p-2 rounded-lg bg-gradient-to-r from-red-500/10 to-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-5 h-5 text-red-400 group-hover:text-red-300" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover Effect Sparkle */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <Sparkles className="w-3 h-3 text-red-400/50" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="group relative px-5 py-2 bg-gradient-to-r from-red-600 to-red-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-400 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></span>
            <span className="relative flex items-center space-x-2 text-sm text-white">
              <span>Optimize Now</span>
              <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};