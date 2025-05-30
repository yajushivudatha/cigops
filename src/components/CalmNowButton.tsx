
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

const CalmNowButton = () => {
  const [isActive, setIsActive] = useState(false);

  const handleCalmNow = () => {
    setIsActive(!isActive);
    // Here we would integrate with ElevenLabs voice API
    console.log('Calm Now activated!');
  };

  return (
    <div className="text-center animate-scale-in">
      <div className="mb-6">
        <h2 className="text-2xl font-serif text-white mb-2">Need a moment?</h2>
        <p className="text-cyan-300 opacity-80">Let's breathe together</p>
      </div>
      
      <div className="relative">
        {/* Breathing Animation Ring */}
        <div className={`absolute inset-0 rounded-full border-2 border-cyan-400/30 ${isActive ? 'animate-breathe' : ''}`}></div>
        <div className={`absolute inset-2 rounded-full border border-cyan-400/20 ${isActive ? 'animate-breathe' : ''}`} style={{ animationDelay: '0.5s' }}></div>
        
        {/* Main Button */}
        <Button
          onClick={handleCalmNow}
          size="lg"
          className={`
            relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 
            hover:from-cyan-400 hover:to-blue-500 border-0 shadow-2xl transition-all duration-300
            ${isActive ? 'animate-pulse-glow scale-110' : 'hover:scale-105'}
          `}
        >
          <div className="flex flex-col items-center">
            {isActive ? (
              <Pause className="w-8 h-8 mb-1" />
            ) : (
              <Play className="w-8 h-8 mb-1" />
            )}
            <span className="text-sm font-semibold">
              {isActive ? 'Pause' : 'Calm Now'}
            </span>
          </div>
        </Button>
      </div>
      
      {isActive && (
        <div className="mt-6 animate-fade-in">
          <p className="text-cyan-300 text-sm opacity-80">
            "You've resisted 3 cravings this week. Let's breathe like Tuesday..."
          </p>
        </div>
      )}
    </div>
  );
};

export default CalmNowButton;
