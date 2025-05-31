
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      clearInterval(intervalId);

      if (technique === '478') {
        if (phase === 'Inhale') {
          setTimeLeft(7);
          setPhase('Hold');
          speak("Hold your breath.");
        } else if (phase === 'Hold') {
          setTimeLeft(8);
          setPhase('Exhale');
          speak("Exhale slowly.");
        } else if (phase === 'Exhale') {
          setTimeLeft(4);
          setPhase('Inhale');
          speak("Inhale deeply.");
        }
      } else if (technique === 'box') {
        if (phase === 'Inhale') {
          setTimeLeft(4);
          setPhase('Hold1');
          speak("Hold your breath.");
        } else if (phase === 'Hold1') {
          setTimeLeft(4);
          setPhase('Exhale');
          speak("Exhale slowly.");
        } else if (phase === 'Exhale') {
          setTimeLeft(4);
          setPhase('Hold2');
          speak("Hold your breath.");
        } else if (phase === 'Hold2') {
          setTimeLeft(4);
          setPhase('Inhale');
          speak("Inhale deeply.");
        }
      } else if (technique === 'equal') {
        if (phase === 'Inhale') {
          setTimeLeft(6);
          setPhase('Exhale');
          speak("Exhale slowly.");
        } else if (phase === 'Exhale') {
          setTimeLeft(6);
          setPhase('Inhale');
          speak("Inhale deeply.");
        }
      } else if (technique === 'triangle') {
        if (phase === 'Inhale') {
          setTimeLeft(4);
          setPhase('Hold');
          speak("Hold your breath.");
        } else if (phase === 'Hold') {
          setTimeLeft(4);
          setPhase('Exhale');
          speak("Exhale slowly.");
        } else if (phase === 'Exhale') {
          setTimeLeft(4);
          setPhase('Inhale');
          speak("Inhale deeply.");
        }
      }
    }

    return () => clearInterval(intervalId);
  }, [isActive, timeLeft, phase, technique, speak]);

  const startBreathingExercise = (selectedTechnique: string) => {
    setTechnique(selectedTechnique);
    setIsActive(true);
    speak("Let's begin your breathing exercise. Follow the guidance on screen.");
    
    if (selectedTechnique === '478') {
      setTimeLeft(4);
      setPhase('Inhale');
    } else if (selectedTechnique === 'box') {
      setTimeLeft(4);
      setPhase('Inhale');
    } else if (selectedTechnique === 'equal') {
      setTimeLeft(6);
      setPhase('Inhale');
    } else if (selectedTechnique === 'triangle') {
      setTimeLeft(4);
      setPhase('Inhale');
    }
  };

  const stopExercise = () => {
    setIsActive(false);
    setTimeLeft(0);
    setPhase('');
  };

  const resetExercise = () => {
    setIsActive(false);
    setTimeLeft(0);
    setPhase('');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif text-white mb-2 text-glow">
          Calm Your Mind 🧘
        </h1>
        <p className="text-cyan-300 text-lg opacity-80">
          You've resisted 3 cravings this week. Let's breathe together.
        </p>
      </div>

      {/* Main Breathing Circle */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Breathing Circle */}
        <div className={`
          w-80 h-80 rounded-full border-4 border-cyan-400/50 flex items-center justify-center relative
          ${isActive ? 'animate-breathe' : ''}
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
                    className="bg-red-500/20 border-red-500/50 text-red-300"
                  >
                    <Pause className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={resetExercise}
                    size="sm"
                    variant="outline"
                    className="bg-gray-500/20 border-gray-500/50 text-gray-300"
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
          <div className="w-96 h-96 border border-cyan-400/20 rounded-full animate-breathe" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[28rem] h-[28rem] border border-cyan-400/10 rounded-full animate-breathe" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Reset Button */}
      {isActive && (
        <Button
          onClick={resetExercise}
          variant="outline"
          className="mb-8 bg-gray-500/20 border-gray-500/50 text-gray-300 hover:bg-gray-500/30"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      )}

      {/* Additional Techniques */}
      {!isActive && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
          <Button
            onClick={() => startBreathingExercise('478')}
            className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 p-4 h-auto flex flex-col"
          >
            <span className="font-semibold mb-1">4-7-8</span>
            <span className="text-xs opacity-80">Classic Relaxation</span>
          </Button>
          
          <Button
            onClick={() => startBreathingExercise('box')}
            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 p-4 h-auto flex flex-col"
          >
            <span className="font-semibold mb-1">Box</span>
            <span className="text-xs opacity-80">4-4-4-4 Pattern</span>
          </Button>
          
          <Button
            onClick={() => startBreathingExercise('equal')}
            className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/50 p-4 h-auto flex flex-col"
          >
            <span className="font-semibold mb-1">Equal</span>
            <span className="text-xs opacity-80">6-6 Balance</span>
          </Button>
          
          <Button
            onClick={() => startBreathingExercise('triangle')}
            className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/50 p-4 h-auto flex flex-col"
          >
            <span className="font-semibold mb-1">Triangle</span>
            <span className="text-xs opacity-80">4-4-4 Pattern</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CalmNow;
