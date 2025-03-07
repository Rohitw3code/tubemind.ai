import React from 'react';
import { ImagePlus, Type, Languages, VideoIcon, ShieldCheck, Wand2 } from 'lucide-react';

export const CreativeTools = () => {
  const tools = [
    {
      icon: ImagePlus,
      title: "AI Thumbnail Generator",
      description: "Instantly create eye-catching video covers that boost click-through rates",
      gradient: "from-purple-500/20 via-pink-500/20 to-red-500/20"
    },
    {
      icon: Type,
      title: "Title & Keyword Generator",
      description: "Get AI-suggested trending titles, keywords, and ideas to improve discoverability",
      gradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20"
    },
    {
      icon: Languages,
      title: "Hindi-to-English Caption Generator",
      description: "Auto-generate accurate captions to engage global audiences",
      gradient: "from-green-500/20 via-teal-500/20 to-blue-500/20"
    },
    {
      icon: VideoIcon,
      title: "Long Video to Shorts Converter",
      description: "Repurpose long-form content into high-impact Shorts for more views",
      gradient: "from-yellow-500/20 via-orange-500/20 to-red-500/20"
    },
    {
      icon: ShieldCheck,
      title: "Content Safety Scan",
      description: "AI scans videos to detect inappropriate or controversial content",
      gradient: "from-red-500/20 via-rose-500/20 to-pink-500/20"
    }
  ];

  return (
    <section className="py-0 px-6 md:px-12 lg:px-16 xl:px-20 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-red-800/5 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-2 bg-black/30 rounded-2xl px-6 py-3 mb-8 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group">
            <Wand2 className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-red-400">
              Creative & Compliance Tools
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-red-200 to-red-400">
            Enhance Visuals, Expand Reach & Ensure Content Safety
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            TubeMind.ai provides AI-driven tools to make your videos more appealing, accessible, and compliant—helping you reach a wider audience while avoiding risks.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool, index) => (
            <div
              key={tool.title}
              className="group relative"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s backwards`
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl rounded-xl`}></div>
              
              <div className="relative bg-black/30 backdrop-blur-sm border border-red-500/10 group-hover:border-red-500/30 p-6 rounded-xl h-full transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="relative">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-red-500/10 to-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                    <tool.icon className="w-6 h-6 text-red-400 group-hover:text-red-300" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-300 transition-colors duration-300">
                    {tool.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                    {tool.description}
                  </p>

                  {/* Hover Effect Arrow */}
                  <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 delay-100">
                    <div className="flex items-center text-red-400/40 text-sm">
                      Try Now
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button className="group relative px-8 py-3 bg-gradient-to-r from-red-600 to-red-800 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/30">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-400 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center space-x-2 text-white">
              <span>Create, Optimize & Stay Safe with AI</span>
              <Wand2 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};