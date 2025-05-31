
import React from 'react';

interface GreetingScreenProps {
  onTransition: () => void;
}

const GreetingScreen = ({ onTransition }: GreetingScreenProps) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onTransition();
    }, 3000); // Show greeting for 3 seconds

    return () => clearTimeout(timer);
  }, [onTransition]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden transition-all duration-1000 ease-in-out">
      {/* Breathing Bubbles Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/20 rounded-full animate-breathe"></div>
        <div className="absolute top-1/3 right-32 w-24 h-24 bg-blue-500/15 rounded-full animate-breathe" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full animate-breathe" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-teal-500/15 rounded-full animate-breathe" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-indigo-500/10 rounded-full animate-breathe" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Centered Breathing Circle Around Text */}
      <div className="relative flex items-center justify-center">
        {/* Centered breathing rings around the text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 border-2 border-cyan-400/30 rounded-full animate-breathe"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-80 h-80 border border-cyan-400/20 rounded-full animate-breathe" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border border-cyan-400/10 rounded-full animate-breathe" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Greeting Text - No background, just text */}
        <div className="text-center animate-fade-in relative z-10">
          <h1 className="text-6xl font-serif text-white text-glow animate-pulse-glow">
            Good evening, Alex 💙
          </h1>
          <p className="text-cyan-300 text-lg mt-4 opacity-80">
            Welcome to your recovery journey
          </p>
        </div>
      </div>
    </div>
  );
};

export default GreetingScreen;
