import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does TubeMind.ai's AI optimization work?",
      answer: "TubeMind.ai uses advanced machine learning algorithms to analyze your content, viewer behavior, and trending topics. It then provides actionable recommendations for titles, descriptions, tags, and thumbnails to maximize your video's reach and engagement."
    },
    {
      question: "Can I try TubeMind.ai for free?",
      answer: "Yes! We offer a free trial that includes access to our core features. You can optimize up to 3 videos to experience the power of our AI-driven platform before choosing a subscription plan."
    },
    {
      question: "How accurate is the Hindi-to-English caption generator?",
      answer: "Our caption generator achieves over 95% accuracy in translation and timing alignment. It's trained on millions of hours of multilingual content and continuously improves through machine learning."
    },
    {
      question: "Is my content safe with TubeMind.ai?",
      answer: "Absolutely! We prioritize your data security. All content is processed through encrypted channels, and we never store your original video files. Our platform complies with global data protection standards."
    },
    {
      question: "How often are optimization recommendations updated?",
      answer: "Our AI system updates recommendations in real-time based on trending topics and viewer behavior. You'll receive notifications when new optimization opportunities are identified for your content."
    }
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-16 xl:px-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-red-500/5 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-red-800/5 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-2 bg-black/30 rounded-2xl px-6 py-3 mb-8 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group">
            <HelpCircle className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-red-400">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-red-200 to-red-400">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Everything you need to know about TubeMind.ai and how it can help optimize your YouTube content
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s backwards`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl rounded-xl"></div>
              
              <div className="relative bg-black/30 backdrop-blur-sm border border-red-500/10 group-hover:border-red-500/30 rounded-xl overflow-hidden transition-all duration-300">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                >
                  <span className="text-white group-hover:text-red-300 transition-colors duration-300 font-medium">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-red-400 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-48 pb-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-400 text-sm">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};