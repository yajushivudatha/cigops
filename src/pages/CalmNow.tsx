
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useVoiceSupport } from '@/hooks/useVoiceSupport';
import { meditationScripts } from '@/utils/meditationScripts';

const CalmNow = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [technique, setTechnique] = useState('');
  const { speak, stopCurrentAudio } = useVoiceSupport();
  const scriptTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isActiveRef = useRef(false);

  // Update ref when isActive changes
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  // Cleanup on unmount - stop audio and timers
  useEffect(() => {
    return () => {
      stopCurrentAudio();
      if (scriptTimeoutRef.current) {
        clearTimeout(scriptTimeoutRef.current);
      }
    };
  }, [stopCurrentAudio]);

  // Stop everything when leaving the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      stopCurrentAudio();
      if (scriptTimeoutRef.current) {
        clearTimeout(scriptTimeoutRef.current);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload();
    };
  }, [stopCurrentAudio]);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const playMeditationScript = async (selectedTechnique: string) => {
    const script = meditationScripts[selectedTechnique as keyof typeof meditationScripts];
    if (!script) return;

    setIsPlaying(true);
    
    // Stop any existing audio first
    stopCurrentAudio();
    if (scriptTimeoutRef.current) {
      clearTimeout(scriptTimeoutRef.current);
    }

    try {
      // Play introduction
      if (!isActiveRef.current) return;
      await speak(script.introduction);
      await sleep(4000);

      // Play each cycle with proper timing
      for (let i = 0; i < script.cycles.length; i++) {
        if (!isActiveRef.current) break;
        
        setCurrentStep(i + 1);
        await speak(script.cycles[i]);
        
        // Different timing based on the type of instruction
        if (script.cycles[i].includes('1, 2, 3, 4, 5, 6, 7, 8')) {
          await sleep(12000); // 8-count breathing needs more time
        } else if (script.cycles[i].includes('1, 2, 3, 4, 5, 6, 7')) {
          await sleep(10000); // 7-count hold needs time
        } else if (script.cycles[i].includes('1, 2, 3, 4, 5, 6')) {
          await sleep(8000); // 6-count breathing
        } else if (script.cycles[i].includes('1, 2, 3, 4')) {
          await sleep(6000); // 4-count breathing
        } else {
          await sleep(4000); // Instructions without counting
        }
      }

      // Play conclusion
      if (isActiveRef.current) {
        await speak(script.conclusion);
        await sleep(5000);
      }
    } catch (error) {
      console.log('Meditation interrupted:', error);
    }

    if (isActiveRef.current) {
      setIsPlaying(false);
      setCurrentStep(0);
    }
  };

  const startBreathingExercise = (selectedTechnique: string) => {
    // Stop any existing exercise and audio first
    stopExercise();
    
    setTechnique(selectedTechnique);
    setIsActive(true);
    setCurrentStep(0);
    
    // Start the meditation script
    playMeditationScript(selectedTechnique);
  };

  const stopExercise = () => {
    setIsActive(false);
    setIsPlaying(false);
    setCurrentStep(0);
    stopCurrentAudio();
    
    if (scriptTimeoutRef.current) {
      clearTimeout(scriptTimeoutRef.current);
    }
  };

  const resetExercise = () => {
    stopExercise();
    setTechnique('');
  };

  return (
    <div className="min-h-screen bg-black overflow-y-auto pb-16">
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
                <div className="text-center">
                  <div className="text-xl text-white mb-4">
                    Choose a technique below
                  </div>
                  <div className="text-cyan-300 text-sm">
                    Each includes guided voice instructions
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">
                    {technique === '478' ? '4-7-8' : 
                     technique === 'box' ? 'Box' : 
                     technique === 'equal' ? 'Equal' : 
                     technique === 'triangle' ? 'Triangle' : technique}
                  </div>
                  <div className="text-lg text-white mb-2">
                    Step {currentStep}
                  </div>
                  <div className="text-sm text-cyan-300 mb-4">
                    {isPlaying ? 'Listening to guidance...' : 'In progress...'}
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

        {/* Breathing Techniques - Round Buttons */}
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
