import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useVoiceSupport } from '@/hooks/useVoiceSupport';

const CalmNow = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [phase, setPhase] = useState('');
  const [technique, setTechnique] = useState('478');
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
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative flex items-center justify-center">
        {/* Breathing Circle */}
        <div className={`
          w-80 h-80 rounded-full border-4 border-cyan-400/50 flex items-center justify-center relative
          ${isActive ? 'animate-breathe' : ''}
        `}>
          {/* Inner Content */}
          <div className="text-center">
            {!isActive ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif text-white text-glow">
                  Choose Your Breathing
                </h2>
                <div className="space-y-3">
                  <Button
                    onClick={() => startBreathingExercise('478')}
                    className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50"
                  >
                    4-7-8 Breathing
                  </Button>
                  <Button
                    onClick={() => startBreathingExercise('box')}
                    className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50"
                  >
                    Box Breathing
                  </Button>
                </div>
              </div>
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
    </div>
  );
};

export default CalmNow;
