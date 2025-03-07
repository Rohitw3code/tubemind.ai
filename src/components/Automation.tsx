import React from 'react';
import { Bot, Zap, Clock, Youtube, Rocket, Brain, Sparkles, MessageSquare, Timer } from 'lucide-react';

export const Automation = () => {
  const automationFeatures = [
    {
      icon: Zap,
      title: "One-Click Optimization",
      description: "Transform your content instantly with AI-powered optimization that analyzes trends, engagement patterns, and viewer behavior to maximize reach.",
      gradient: "from-yellow-500/20 via-orange-500/20 to-red-500/20"
    },
    {
      icon: MessageSquare,
      title: "Auto-Reply Agent",
      description: "Keep your audience engaged 24/7 with smart AI responses that understand context, maintain your voice, and boost community interaction.",
      gradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20"
    },
    {
      icon: Timer,
      title: "Smart Timestamping",
      description: "Automatically generate perfect chapter markers and timestamps that improve navigation and boost viewer retention rates.",
      gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20"
    },
    {
      icon: Youtube,
      title: "Channel Integration",
      description: "Seamlessly connect your channel for real-time analytics and instant content optimization based on performance metrics.",
      gradient: "from-red-500/20 via-rose-500/20 to-pink-500/20"
    }
  ];

  return (
    <section className="py-8 px-6 md:px-12 lg:px-16 xl:px-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-red-500/5 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-800/5 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto relative">
        {/* Section Header with AI Brain Logo */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-3 bg-black/30 rounded-2xl px-6 py-3 mb-8 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group">
            <div className="relative">
              <Brain className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform duration-300" />
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-red-400 animate-pulse" />
            </div>
            <Bot className="w-5 h-5 text-red-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-red-400">
              AI Automation
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-red-200 to-red-400">
            AI-Powered Automation
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Let AI handle the heavy lifting—focus on creating, while TubeMind.ai automates optimization and engagement
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {automationFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s backwards`
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl rounded-xl`}></div>
              
              <div className="relative bg-black/30 backdrop-blur-sm border border-red-500/10 group-hover:border-red-500/30 p-6 rounded-xl h-full transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-500/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="relative">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-red-500/10 to-transparent mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-red-400 group-hover:text-red-300 transition-all duration-300 animate-pulse" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-300 transition-colors duration-300 group-hover:translate-x-1">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-all duration-300 group-hover:translate-x-1 relative">
                    {feature.description}
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-red-500/30 group-hover:w-full transition-all duration-500"></span>
                  </p>
                </div>

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  <Sparkles className="w-4 h-4 text-red-400/40 animate-pulse" />
                </div>

                {/* Additional hover effects */}
                <div className="absolute inset-0 rounded-xl border border-red-500/0 group-hover:border-red-500/20 transition-all duration-500"></div>
                <div className="absolute -inset-px bg-gradient-to-r from-transparent via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="group relative px-8 py-3 bg-gradient-to-r from-red-600 to-red-800 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/30">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-400 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center space-x-2 text-white">
              <span>Start Automating Now</span>
              <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};