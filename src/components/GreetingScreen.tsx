
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
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Single Breathing Circle Around Text */}
      <div className="relative">
        <div className="absolute inset-0 w-96 h-96 border-2 border-cyan-400/30 rounded-full animate-breathe flex items-center justify-center"></div>
        
        {/* Greeting Text */}
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
