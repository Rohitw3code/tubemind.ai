import React, { useState } from 'react';
import { TopNav } from './components/TopNav';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Automation } from './components/Automation';
import { CreativeTools } from './components/CreativeTools';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleGetStarted = () => {
    setShowDashboard(true);
  };

  if (showDashboard) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-red-950">
      {/* Static Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-red-700 rounded-full mix-blend-multiply filter blur-[96px] opacity-20"></div>
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-[112px] opacity-20"></div>
      </div>

      <TopNav onGetStarted={handleGetStarted} />
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <Automation />
      <CreativeTools />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;