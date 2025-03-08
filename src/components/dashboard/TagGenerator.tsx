import React, { useState } from 'react';
import { Tags, Sparkles, Copy, RefreshCw, Trash2, ChevronRight, Type, MessageSquare, Hash, Zap, TrendingUp, Target, CheckCircle2, X } from 'lucide-react';

export const TagGenerator = () => {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTags, setGeneratedTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [copiedTimeout, setCopiedTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const generateTags = async () => {
    if (!input.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Example tags based on AI analysis
    const tags = [
      'content creation', 'youtube tips', 'video editing', 'social media growth',
      'digital marketing', 'online presence', 'content strategy', 'youtube algorithm',
      'video optimization', 'audience engagement', 'viral content', 'youtube success',
      'content creator', 'video marketing', 'social media tips', 'youtube growth',
      'video production', 'online business', 'digital content', 'creator economy',
      'youtube channel', 'video content', 'content marketing', 'social media marketing',
      'digital strategy', 'online marketing', 'youtube marketing', 'video strategy',
      'content optimization', 'digital presence'
    ];
    
    setGeneratedTags(tags);
    setIsGenerating(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const selectAllTags = () => {
    setSelectedTags([...generatedTags]);
  };

  const deselectAllTags = () => {
    setSelectedTags([]);
  };

  const removeTag = (tagToRemove: string) => {
    setGeneratedTags(prev => prev.filter(tag => tag !== tagToRemove));
    setSelectedTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const copyTags = () => {
    const tagString = selectedTags.map(tag => `#${tag}`).join(' ');
    navigator.clipboard.writeText(tagString);
    
    setIsCopied(true);
    
    if (copiedTimeout) {
      clearTimeout(copiedTimeout);
    }
    
    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    
    setCopiedTimeout(timeout);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Tags className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">AI Tag Generator</h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">
            Generate optimized tags for your YouTube videos using advanced AI analysis. Boost your video's discoverability with trending and relevant hashtags.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-white">Video Content</h3>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your video title, description, or script here..."
            className="w-full bg-black/20 border border-red-500/20 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-all duration-300 text-xs sm:text-sm min-h-[100px] resize-y"
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={generateTags}
              disabled={!input.trim() || isGenerating}
              className={`
                relative px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl
                hover:from-red-500 hover:to-red-700 transition-all duration-300
                shadow-lg shadow-red-900/30 flex items-center space-x-2 text-xs sm:text-sm
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Analyzing Content...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Tags</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Tags */}
        {generatedTags.length > 0 && (
          <div className="bg-black/30 backdrop-blur-sm border border-red-500/20 rounded-xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Hash className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-white">Generated Tags</h3>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={selectAllTags}
                  className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 transition-colors duration-300 bg-red-500/10 rounded-lg"
                >
                  Select All
                </button>
                <button
                  onClick={deselectAllTags}
                  className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 transition-colors duration-300 bg-red-500/10 rounded-lg"
                >
                  Deselect All
                </button>
                <button
                  onClick={copyTags}
                  disabled={selectedTags.length === 0}
                  className={`
                    px-3 py-1.5 text-xs text-red-400 hover:text-red-300 transition-colors duration-300
                    bg-red-500/10 rounded-lg flex items-center space-x-2
                    ${selectedTags.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {isCopied ? (
                    <CheckCircle2 className="h-3 w-3 text-green-400" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  <span>{isCopied ? 'Copied!' : 'Copy Tags'}</span>
                </button>
              </div>
            </div>

            {/* Tag Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-black/20 rounded-xl p-3 flex items-center space-x-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Target className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Selected</p>
                  <p className="text-lg font-semibold text-white">{selectedTags.length} / {generatedTags.length}</p>
                </div>
              </div>
              <div className="bg-black/20 rounded-xl p-3 flex items-center space-x-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Trending Score</p>
                  <p className="text-lg font-semibold text-white">92%</p>
                </div>
              </div>
              <div className="bg-black/20 rounded-xl p-3 flex items-center space-x-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Zap className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Relevance</p>
                  <p className="text-lg font-semibold text-white">High</p>
                </div>
              </div>
            </div>

            {/* Tags Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
              {generatedTags.map((tag, index) => (
                <div
                  key={tag}
                  className={`
                    relative group p-2 rounded-lg border transition-all duration-300
                    ${selectedTags.includes(tag)
                      ? 'bg-red-500/10 border-red-500/50 shadow-lg shadow-red-500/10'
                      : 'bg-black/30 border-red-500/10 hover:border-red-500/30'
                    }
                  `}
                  style={{
                    animation: `fadeIn 0.5s ease-out ${index * 0.05}s backwards`
                  }}
                >
                  <button
                    onClick={() => toggleTag(tag)}
                    className="w-full relative flex items-center text-left group"
                  >
                    <Hash className="h-3 w-3 text-red-400 flex-shrink-0" />
                    <span className="text-xs text-gray-300 group-hover:text-white transition-colors duration-300 ml-1 truncate">
                      {tag}
                    </span>
                  </button>
                  <button
                    onClick={() => removeTag(tag)}
                    className="absolute -top-1 -right-1 p-0.5 bg-red-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <X className="h-3 w-3 text-red-400" />
                  </button>
                </div>
              ))}
            </div>

            {/* Selected Tags Preview */}
            {selectedTags.length > 0 && (
              <div className="mt-6 bg-black/20 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-red-500/10 rounded-lg">
                    <Type className="h-3 w-3 sm:h-4 sm:w-4 text-red-400" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-medium text-white">Selected Tags Preview</h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 break-words">
                  {selectedTags.map(tag => `#${tag}`).join(' ')}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};