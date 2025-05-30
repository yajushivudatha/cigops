
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

const CalmNow = () => {
  const [isActive, setIsActive] = useState(false);
  const [breatheCount, setBreatheCount] = useState(0);

  const handleCalmNow = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setBreatheCount(breatheCount + 1);
    }
    console.log('Calm Now activated!');
  };

  const resetSession = () => {
    setIsActive(false);
    setBreatheCount(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl font-serif text-white mb-4 text-glow">
            Calm Your Mind 🧘‍♀️
          </h1>
          <p className="text-cyan-300 text-lg opacity-80">
            You've resisted 3 cravings this week. Let's breathe together.
          </p>
        </div>

        {/* Main Breathing Circle */}
        <div className="relative mb-12">
          {/* Outer breathing rings */}
          <div className={`absolute inset-0 w-80 h-80 mx-auto rounded-full border-2 border-cyan-400/30 ${isActive ? 'animate-breathe' : ''}`}></div>
          <div className={`absolute inset-4 w-72 h-72 mx-auto rounded-full border border-cyan-400/20 ${isActive ? 'animate-breathe' : ''}`} style={{ animationDelay: '0.5s' }}></div>
          <div className={`absolute inset-8 w-64 h-64 mx-auto rounded-full border border-cyan-400/10 ${isActive ? 'animate-breathe' : ''}`} style={{ animationDelay: '1s' }}></div>
          
          {/* Center button */}
          <div className="relative z-10 flex items-center justify-center h-80">
            <Button
              onClick={handleCalmNow}
              size="lg"
              className={`
                w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 
                hover:from-cyan-400 hover:to-blue-500 border-0 shadow-2xl transition-all duration-300
                ${isActive ? 'animate-pulse-glow scale-110' : 'hover:scale-105'}
              `}
            >
              <div className="flex flex-col items-center">
                {isActive ? (
                  <Pause className="w-12 h-12 mb-2" />
                ) : (
                  <Play className="w-12 h-12 mb-2" />
                )}
                <span className="text-lg font-semibold">
                  {isActive ? 'Pause' : 'Begin'}
                </span>
              </div>
            </Button>
          </div>
        </div>

        {/* Breathing Instructions */}
        {isActive && (
          <div className="mb-8 animate-fade-in">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl text-white mb-3">Breathe with the circle</h3>
              <p className="text-cyan-300 text-sm opacity-80 mb-4">
                Inhale as it expands, exhale as it contracts
              </p>
              <div className="text-2xl text-cyan-400 font-bold">
                Session {breatheCount}
              </div>
            </div>
          </div>
        )}

        {/* Session Controls */}
        <div className="flex justify-center space-x-4">
          <Button
            onClick={resetSession}
            variant="outline"
            className="glass-card border-white/20 hover:border-cyan-400/50 hover:bg-cyan-500/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Motivational Quote */}
        <div className="mt-12 glass-card p-6 rounded-xl animate-scale-in">
          <blockquote className="text-lg text-white font-serif italic mb-3">
            "Every breath is a new beginning. You have the strength within you."
          </blockquote>
          <cite className="text-cyan-300 text-sm opacity-80">— Your Recovery Journey</cite>
        </div>
      </div>
    </div>
  );
};

export default CalmNow;
