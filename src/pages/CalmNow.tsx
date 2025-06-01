
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useVoiceSupport } from '@/hooks/useVoiceSupport';

const CalmNow = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [phase, setPhase] = useState('');
  const [technique, setTechnique] = useState('');
  const { speak } = useVoiceSupport();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (technique === '478') {
        if (phase === 'Inhale') {
          setTimeLeft(7);
          setPhase('Hold');
          speak("Hold your breath for 7 seconds.");
        } else if (phase === 'Hold') {
          setTimeLeft(8);
          setPhase('Exhale');
          speak("Now exhale slowly for 8 seconds.");
        } else if (phase === 'Exhale') {
          setTimeLeft(4);
          setPhase('Inhale');
          speak("Inhale deeply through your nose for 4 seconds.");
        }
      } else if (technique === 'box') {
        if (phase === 'Inhale') {
          setTimeLeft(4);
          setPhase('Hold1');
          speak("Hold your breath for 4 seconds.");
        } else if (phase === 'Hold1') {
          setTimeLeft(4);
          setPhase('Exhale');
          speak("Exhale slowly for 4 seconds.");
        } else if (phase === 'Exhale') {
          setTimeLeft(4);
          setPhase('Hold2');
          speak("Hold your breath again for 4 seconds.");
        } else if (phase === 'Hold2') {
          setTimeLeft(4);
          setPhase('Inhale');
          speak("Inhale deeply for 4 seconds.");
        }
      } else if (technique === 'equal') {
        if (phase === 'Inhale') {
          setTimeLeft(6);
          setPhase('Exhale');
          speak("Now exhale slowly for 6 seconds.");
        } else if (phase === 'Exhale') {
          setTimeLeft(6);
          setPhase('Inhale');
          speak("Inhale deeply for 6 seconds.");
        }
      } else if (technique === 'triangle') {
        if (phase === 'Inhale') {
          setTimeLeft(4);
          setPhase('Hold');
          speak("Hold your breath for 4 seconds.");
        } else if (phase === 'Hold') {
          setTimeLeft(4);
          setPhase('Exhale');
          speak("Exhale slowly for 4 seconds.");
        } else if (phase === 'Exhale') {
          setTimeLeft(4);
          setPhase('Inhale');
          speak("Inhale deeply for 4 seconds.");
        }
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, phase, technique, speak]);

  const startBreathingExercise = (selectedTechnique: string) => {
    // Stop any existing exercise first
    stopExercise();
    
    setTechnique(selectedTechnique);
    setIsActive(true);
    
    let introText = "";
    if (selectedTechnique === '478') {
      introText = "Starting 4-7-8 breathing. Find a comfortable position and close your eyes if you wish. Inhale for 4, hold for 7, exhale for 8. Let's begin.";
      setTimeLeft(4);
      setPhase('Inhale');
    } else if (selectedTechnique === 'box') {
      introText = "Starting box breathing. This technique helps with focus and calm. We'll breathe in equal counts of 4. Get comfortable and let's begin.";
      setTimeLeft(4);
      setPhase('Inhale');
    } else if (selectedTechnique === 'equal') {
      introText = "Starting equal breathing. This balances your nervous system with equal inhale and exhale. Find your rhythm and let's begin.";
      setTimeLeft(6);
      setPhase('Inhale');
    } else if (selectedTechnique === 'triangle') {
      introText = "Starting triangle breathing. A simple 3-part breath to center yourself. Relax your shoulders and let's begin.";
      setTimeLeft(4);
      setPhase('Inhale');
    }
    
    speak(introText);
  };

  const stopExercise = () => {
    setIsActive(false);
    setTimeLeft(0);
    setPhase('');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    speak("Breathing exercise stopped. Take a moment to notice how you feel.");
  };

  const resetExercise = () => {
    setIsActive(false);
    setTimeLeft(0);
    setPhase('');
    setTechnique('');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    speak("Exercise reset. Choose another technique when you're ready.");
  };

  return (
    <div className="min-h-screen bg-black overflow-y-auto">
      <div className="flex flex-col items-center justify-start p-4 min-h-screen">
        {/* Header */}
        <div className="text-center mb-8 mt-8">
          <h1 className="text-4xl font-serif text-white mb-2 text-glow animate-fade-in">
            Calm Your Mind 🧘
          </h1>
          <p className="text-cyan-300 text-lg opacity-80 animate-fade-in">
            You've resisted 3 cravings this week. Let's breathe together.
          </p>
        </div>

        {/* Main Breathing Circle */}
        <div className="relative flex items-center justify-center mb-8 animate-scale-in">
          {/* Breathing Circle */}
          <div className={`
            w-80 h-80 rounded-full border-4 border-cyan-400/50 flex items-center justify-center relative
            ${isActive ? 'animate-pulse' : ''}
          `}>
            {/* Inner Content */}
            <div className="text-center">
              {!isActive ? (
                <Button
                  onClick={() => startBreathingExercise('478')}
                  size="lg"
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 border-0 shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col items-center">
                    <Play className="w-8 h-8 mb-1" />
                    <span className="text-sm font-semibold">Begin</span>
                  </div>
                </Button>
              ) : (
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">
                    {timeLeft}
                  </div>
                  <div className="text-xl text-white mb-4">
                    {phase}
                  </div>
                  <div className="space-x-2">
                    <Button
                      onClick={stopExercise}
                      size="sm"
                      variant="outline"
                      className="bg-red-500/20 border-red-500/50 text-red-300 hover:bg-red-500/40"
                    >
                      <Pause className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={resetExercise}
                      size="sm"
                      variant="outline"
                      className="bg-gray-500/20 border-gray-500/50 text-gray-300 hover:bg-gray-500/40"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Outer breathing rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 border border-cyan-400/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[28rem] h-[28rem] border border-cyan-400/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Additional Techniques - Round Buttons */}
        {!isActive && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mb-8 animate-fade-in">
            <div className="text-center">
              <Button
                onClick={() => startBreathingExercise('478')}
                className="w-20 h-20 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 transition-all duration-300 hover:scale-105 mb-2"
              >
                <span className="text-xs font-semibold">4-7-8</span>
              </Button>
              <p className="text-xs text-cyan-300 opacity-80">Classic Relaxation</p>
            </div>
            
            <div className="text-center">
              <Button
                onClick={() => startBreathingExercise('box')}
                className="w-20 h-20 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 transition-all duration-300 hover:scale-105 mb-2"
              >
                <span className="text-xs font-semibold">Box</span>
              </Button>
              <p className="text-xs text-blue-300 opacity-80">4-4-4-4 Pattern</p>
            </div>
            
            <div className="text-center">
              <Button
                onClick={() => startBreathingExercise('equal')}
                className="w-20 h-20 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/50 transition-all duration-300 hover:scale-105 mb-2"
              >
                <span className="text-xs font-semibold">Equal</span>
              </Button>
              <p className="text-xs text-purple-300 opacity-80">6-6 Balance</p>
            </div>
            
            <div className="text-center">
              <Button
                onClick={() => startBreathingExercise('triangle')}
                className="w-20 h-20 rounded-full bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/50 transition-all duration-300 hover:scale-105 mb-2"
              >
                <span className="text-xs font-semibold">Triangle</span>
              </Button>
              <p className="text-xs text-green-300 opacity-80">4-4-4 Pattern</p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center max-w-md text-gray-400 text-sm mb-8 animate-fade-in">
          <p>Choose a breathing technique above. Each one includes voice guidance to help you follow along. Make sure to find a quiet space for the best experience.</p>
        </div>
      </div>
    </div>
  );
};

export default CalmNow;
