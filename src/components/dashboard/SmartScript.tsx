import React, { useState, useCallback } from 'react';
import { FileVideo, Trash2, Plus, RefreshCw, FileText, Copy, Link, CheckCircle2, Circle, FileTerminal, FileCheck, MessageSquare, Wand2, Edit3, ChevronDown, ChevronRight, ListFilter, ChevronLeft } from 'lucide-react';

interface MainContentProps {
  isFullscreen: boolean;
}

interface VideoInput {
  id: string;
  url: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  transcript?: {
    short: string;
    long: string;
  };
  showTranscript: 'none' | 'short' | 'full';
  isDropdownOpen: boolean;
}

export const SmartScript: React.FC<MainContentProps> = ({ isFullscreen }) => {
  const [videoInputs, setVideoInputs] = useState<VideoInput[]>([{ 
    id: '1', 
    url: '', 
    status: 'idle',
    showTranscript: 'none',
    isDropdownOpen: false
  }]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedScript, setGeneratedScript] = useState('');
  const [showGeneratedScript, setShowGeneratedScript] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'short' | 'full'>('short');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const addVideoInput = () => {
    if (videoInputs.length < 10) {
      const newVideo = { 
        id: String(Date.now()), 
        url: '', 
        status: 'idle',
        showTranscript: 'none',
        isDropdownOpen: false
      };
      setVideoInputs([...videoInputs, newVideo]);
      if (videoInputs.length >= 2) {
        setTimeout(() => {
          document.getElementById(`video-input-${newVideo.id}`)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  const removeVideoInput = (id: string) => {
    setVideoInputs(videoInputs.filter(input => input.id !== id));
    if (selectedVideoId === id) {
      setSelectedVideoId(null);
    }
  };

  const updateVideoUrl = (id: string, url: string) => {
    setVideoInputs(videoInputs.map(input => 
      input.id === id ? { ...input, url } : input
    ));
  };

  const getYouTubeVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const processVideos = async () => {
    setIsProcessing(true);
    setCurrentStep(2);
    
    const processedVideos = videoInputs.map((input, index) => ({
      ...input,
      status: 'completed' as const,
      transcript: {
        short: `Summary of Video ${index + 1}: ${input.url}\n\nThis video discusses key points about ${['artificial intelligence', 'machine learning', 'data science', 'web development'][index % 4]}. The main topics covered include implementation strategies, best practices, and real-world applications. The speaker emphasizes the importance of practical understanding and provides several illustrative examples.`,
        long: `Full Transcript of Video ${index + 1}: ${input.url}\n\nWelcome everyone! Today we're diving deep into ${['artificial intelligence', 'machine learning', 'data science', 'web development'][index % 4]}. Let's start by understanding the fundamental concepts and then move on to more advanced topics. Throughout this presentation, we'll explore various case studies and examine how these technologies are shaping our future.\n\nKey sections covered:\n1. Introduction to core concepts\n2. Implementation strategies\n3. Best practices\n4. Real-world applications\n5. Future trends and predictions`
      }
    }));

    await new Promise(resolve => setTimeout(resolve, 2000));
    setVideoInputs(processedVideos);
    setIsProcessing(false);
    if (processedVideos.length > 0) {
      setSelectedVideoId(processedVideos[0].id);
    }
  };

  const createParticles = useCallback((button: HTMLButtonElement) => {
    const particles = Array.from({ length: 4 }, (_, i) => {
      const particle = document.createElement('div');
      particle.className = 'ai-particle';
      particle.style.top = button.offsetHeight / 2 + 'px';
      return particle;
    });

    particles.forEach(particle => button.appendChild(particle));

    setTimeout(() => {
      particles.forEach(particle => particle.remove());
    }, 1000);
  }, []);

  const generateNewScript = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    setIsGenerating(true);
    button.classList.add('ai-button-processing');
    createParticles(button);

    setCurrentStep(3);
    const promptPrefix = customPrompt ? `[Custom Instructions: ${customPrompt}]\n\n` : '';
    const selectedVideos = videoInputs.filter(v => v.status === 'completed');
    
    let combinedScript = `${promptPrefix}# Combined Script from ${selectedVideos.length} Videos\n\n`;
    selectedVideos.forEach((video, index) => {
      if (video.transcript) {
        combinedScript += `## Part ${index + 1}: ${getYouTubeVideoId(video.url)}\n\n`;
        combinedScript += `${video.transcript.short}\n\n`;
      }
    });
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setGeneratedScript(combinedScript);
    setShowGeneratedScript(true);
    setIsDrawerOpen(true);
    setIsGenerating(false);
    button.classList.remove('ai-button-processing');
  };

  const steps = [
    { number: 1, title: "Add Videos", description: "Add YouTube URLs" },
    { number: 2, title: "Process", description: "Extract transcripts" },
    { number: 3, title: "Generate", description: "Create script" }
  ];

  const selectedVideo = selectedVideoId ? videoInputs.find(v => v.id === selectedVideoId) : null;

  return (
    <div className={`transition-all duration-300 ${isFullscreen ? 'lg:ml-0' : 'lg:ml-0'}`}>
      <div className="p-2 sm:p-4 lg:p-8">
        <div className={`max-w-7xl mx-auto space-y-4 sm:space-y-6 transition-all duration-300 ${isDrawerOpen ? 'lg:mr-[400px]' : ''}`}>
          {/* Header */}
          <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-red-500/10 rounded-lg">
                <FileVideo className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">SmartScript AI</h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              Transform multiple YouTube videos into a single, well-structured script with AI-powered summarization. Effortlessly merge transcripts, extract key insights, and generate cohesive content in seconds! 🚀
            </p>
          </div>

          {/* Steps Progress */}
          <div className="flex justify-start sm:justify-center px-2 sm:px-4 overflow-x-auto scrollbar-thin scrollbar-track-red-900/20 scrollbar-thumb-red-500/20 pb-2">
            <div className="flex items-center space-x-2 sm:space-x-8 min-w-max">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div 
                    className="flex flex-col items-center transition-all duration-500 transform"
                    style={{
                      animation: `fadeIn 0.5s ease-out ${index * 0.1}s backwards`,
                      transform: `scale(${currentStep === step.number ? '1.05' : '1'})`,
                    }}
                  >
                    <div className={`
                      w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center
                      transition-all duration-500 transform hover:scale-110
                      ${currentStep >= step.number 
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' 
                        : 'bg-gray-800 text-gray-400'
                      }
                      group hover:rotate-3
                    `}>
                      {currentStep > step.number ? (
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                      ) : (
                        <Circle className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" />
                      )}
                    </div>
                    <div className="text-center mt-1 sm:mt-2">
                      <p className="text-[10px] sm:text-xs font-medium text-white whitespace-nowrap group-hover:text-red-400 transition-colors duration-300">{step.title}</p>
                      <p className="text-[8px] sm:text-[10px] text-gray-400 whitespace-nowrap group-hover:text-gray-300 transition-colors duration-300">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      w-4 sm:w-8 h-0.5 mt-3 sm:mt-4
                      transition-all duration-500
                      ${currentStep > step.number ? 'bg-red-500' : 'bg-gray-800'}
                      animate-pulse
                    `} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Left Side - Video Inputs List */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="p-1.5 sm:p-2 bg-red-500/10 rounded-lg">
                      <ListFilter className="h-4 w-4 text-red-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">Video List</h3>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-400">{videoInputs.length}/10 videos</span>
                </div>

                <div className="space-y-2 sm:space-y-3 max-h-[300px] sm:max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-red-900/20 scrollbar-thumb-red-500/20">
                  {videoInputs.map((input, index) => (
                    <div
                      key={input.id}
                      id={`video-input-${input.id}`}
                      className={`
                        bg-black/20 backdrop-blur-sm border rounded-lg sm:rounded-xl transition-all duration-300
                        ${selectedVideoId === input.id ? 'border-red-500/50 shadow-lg shadow-red-500/10' : 'border-red-500/10 hover:border-red-500/30'}
                      `}
                    >
                      <div className="p-2 sm:p-3">
                        <div className="flex items-center justify-between gap-2 sm:gap-3">
                          <button
                            onClick={() => input.status === 'completed' && setSelectedVideoId(input.id)}
                            className={`
                              flex-1 flex items-center space-x-2 sm:space-x-3
                              ${input.status === 'completed' ? 'cursor-pointer' : 'cursor-default'}
                            `}
                          >
                            <span className="text-red-400 text-xs sm:text-sm font-medium">#{index + 1}</span>
                            <div className="relative flex-1">
                              <div className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2">
                                <Link className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                              </div>
                              <input
                                type="text"
                                value={input.url}
                                onChange={(e) => updateVideoUrl(input.id, e.target.value)}
                                placeholder="Enter YouTube URL"
                                className="w-full bg-black/30 border border-red-500/20 rounded-lg pl-7 sm:pl-10 pr-2 sm:pr-4 py-1.5 sm:py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-all duration-300 text-xs sm:text-sm"
                              />
                            </div>
                          </button>
                          {videoInputs.length > 1 && (
                            <button
                              onClick={() => removeVideoInput(input.id)}
                              className="p-1.5 sm:p-2 text-red-400 hover:text-red-300 transition-colors duration-300 bg-red-500/10 rounded-lg"
                            >
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                          )}
                        </div>
                        {input.status === 'completed' && (
                          <div className="mt-2 flex items-center justify-between">
                            <span className="flex items-center space-x-1 text-green-400 text-[10px] sm:text-xs">
                              <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              <span>Processed</span>
                            </span>
                            <button
                              onClick={() => setSelectedVideoId(input.id)}
                              className="text-[10px] sm:text-xs text-red-400 hover:text-red-300 transition-colors duration-300 flex items-center space-x-1"
                            >
                              <span>View Details</span>
                              <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {videoInputs.length < 10 && (
                  <button
                    onClick={addVideoInput}
                    className="w-full mt-3 sm:mt-4 bg-black/20 border border-red-500/20 rounded-lg sm:rounded-xl p-2 sm:p-3 text-red-400 hover:text-red-300 hover:border-red-500/40 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">Add Another Video</span>
                  </button>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2 sm:space-y-3 mt-3 sm:mt-4">
                  <button
                    onClick={processVideos}
                    disabled={isProcessing || videoInputs.some(input => !input.url)}
                    className={`
                      px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium
                      ${isProcessing
                        ? 'bg-red-500/20 text-red-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-500 hover:to-red-700'
                      }
                      transition-all duration-300 shadow-lg shadow-red-900/30
                    `}
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                        <span>Processing Videos...</span>
                      </>
                    ) : (
                      <>
                        <FileVideo className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>Process Videos</span>
                      </>
                    )}
                  </button>

                  {videoInputs.every(input => input.status === 'completed') && (
                    <button
                      onClick={generateNewScript}
                      disabled={isGenerating}
                      className={`
                        relative px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg sm:rounded-xl 
                        hover:from-red-500 hover:to-red-700 transition-all duration-300 
                        shadow-lg shadow-red-900/30 flex items-center justify-center space-x-2 
                        text-xs sm:text-sm font-medium overflow-hidden
                        ${isGenerating ? 'cursor-not-allowed opacity-75' : ''}
                      `}
                    >
                      <FileText className={`h-3 w-3 sm:h-4 sm:w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                      <span>{isGenerating ? 'Generating...' : 'Generate Script'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Transcript View */}
            <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6">
              {/* Transcript View */}
              {selectedVideo?.status === 'completed' && selectedVideo.transcript && (
                <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-xl p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-bold text-white">Video Transcript</h3>
                    <div className="flex bg-black/30 rounded-lg p-1 self-stretch sm:self-auto">
                      <button
                        onClick={() => setActiveTab('short')}
                        className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 ${
                          activeTab === 'short'
                            ? 'bg-red-500 text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Summary
                      </button>
                      <button
                        onClick={() => setActiveTab('full')}
                        className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all duration-300 ${
                          activeTab === 'full'
                            ? 'bg-red-500 text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Full Transcript
                      </button>
                    </div>
                  </div>

                  {/* YouTube Preview */}
                  {selectedVideo.url && getYouTubeVideoId(selectedVideo.url) && (
                    <div className="aspect-video w-full rounded-lg overflow-hidden mb-3 sm:mb-4">
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedVideo.url)}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  )}

                  <div className="bg-black/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div className="prose prose-invert max-w-none">
                      <div className="text-gray-300 whitespace-pre-wrap text-xs sm:text-sm">
                        {activeTab === 'short' ? selectedVideo.transcript.short : selectedVideo.transcript.long}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Custom Prompt Input */}
              <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-xl p-3 sm:p-4">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <div className="p-1.5 sm:p-2 bg-red-500/10 rounded-lg">
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Custom Instructions</h3>
                </div>
                <div className="relative">
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Add custom instructions for the AI..."
                    className="w-full bg-black/30 border border-red-500/20 rounded-lg p-2 sm:p-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-all duration-300 text-xs sm:text-sm min-h-[80px] sm:min-h-[100px] resize-y"
                  />
                </div>
              </div>

              {/* Mobile Generated Script Section */}
              <div className="lg:hidden">
                {showGeneratedScript && (
                  <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-xl p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h3 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                        <span>Generated Script</span>
                      </h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setIsEditing(!isEditing)}
                          className="p-1.5 sm:p-2 text-red-400 hover:text-red-300 transition-colors duration-300 bg-red-500/10 rounded-lg"
                        >
                          <Edit3 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <button
                          onClick={() => navigator.clipboard.writeText(generatedScript)}
                          className="p-1.5 sm:p-2 text-red-400 hover:text-red-300 transition-colors duration-300 bg-red-500/10 rounded-lg"
                        >
                          <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="bg-black/20 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                      {isEditing ? (
                        <textarea
                          value={generatedScript}
                          onChange={(e) => setGeneratedScript(e.target.value)}
                          className="w-full h-[200px] sm:h-[300px] bg-black/20 text-gray-300 text-xs sm:text-sm font-mono p-3 sm:p-4 rounded-lg sm:rounded-xl focus:outline-none resize-none"
                        />
                      ) : (
                        <pre className="whitespace-pre-wrap text-gray-300 text-xs sm:text-sm font-mono overflow-x-auto">
                          {generatedScript}
                        </pre>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Generated Script Drawer */}
        <div 
          className={`
            fixed top-0 right-0 h-full w-[400px] bg-black/30 backdrop-blur-xl border-l border-red-500/20
            transform transition-transform duration-300 ease-in-out z-50
            ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}
            hidden lg:block
          `}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-red-500/20">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-red-400" />
                <h3 className="text-lg font-bold text-white">Generated Script</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors duration-300 bg-red-500/10 rounded-lg"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(generatedScript)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors duration-300 bg-red-500/10 rounded-lg"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors duration-300 bg-red-500/10 rounded-lg"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {isEditing ? (
                <textarea
                  value={generatedScript}
                  onChange={(e) => setGeneratedScript(e.target.value)}
                  className="w-full h-full bg-black/20 text-gray-300 text-sm font-mono p-4 rounded-xl focus:outline-none resize-none"
                />
              ) : (
                <pre className="whitespace-pre-wrap text-gray-300 text-sm font-mono">
                  {generatedScript}
                </pre>
              )}
            </div>
          </div>
        </div>

        {/* Toggle Drawer Button (Desktop) */}
        {showGeneratedScript && !isDrawerOpen && (
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-red-500/10 text-red-400 p-2 rounded-l-lg hidden lg:block"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};