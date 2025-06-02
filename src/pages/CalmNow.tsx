
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useVoiceSupport } from '@/hooks/useVoiceSupport';
import { meditationScripts } from '@/utils/meditationScripts';

const CalmNow = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [technique, setTechnique] = useState('');
  const [breathingPhase, setBreathingPhase] = useState('');
  const { speak, stopCurrentAudio } = useVoiceSupport();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const phaseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCurrentAudio();
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
    };
  }, [stopCurrentAudio]);

  const startBreathingCycle = (selectedTechnique: string) => {
    const script = meditationScripts[selectedTechnique as keyof typeof meditationScripts];
    if (!script) return;

    // Stop any existing timers
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);

    setTechnique(selectedTechnique);
    setIsActive(true);
    setCurrentCycle(0);
    setCurrentPhase(0);

    // Play introduction
    speak(script.introduction);

    // Start first cycle after introduction
    setTimeout(() => {
      if (isActive) {
        runBreathingCycle(script, 0, 0);
      }
    }, 4000);
  };

  const runBreathingCycle = (script: any, cycleIndex: number, phaseIndex: number) => {
    if (cycleIndex >= script.totalCycles) {
      // Finish the session
      setIsActive(false);
      setCountdown(0);
      setBreathingPhase('');
      speak(script.conclusion);
      return;
    }

    const currentPhaseData = script.cycles[phaseIndex];
    if (!currentPhaseData) {
      // Move to next cycle
      runBreathingCycle(script, cycleIndex + 1, 0);
      return;
    }

    setCurrentCycle(cycleIndex + 1);
    setCurrentPhase(phaseIndex);
    setBreathingPhase(currentPhaseData.instruction);
    setCountdown(currentPhaseData.duration);

    // Speak the instruction
    speak(currentPhaseData.instruction);

    // Start countdown
    let timeLeft = currentPhaseData.duration;
    intervalRef.current = setInterval(() => {
      timeLeft--;
      setCountdown(timeLeft);
      
      if (timeLeft <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        
        // Move to next phase after a brief pause
        phaseTimeoutRef.current = setTimeout(() => {
          const nextPhaseIndex = (phaseIndex + 1) % script.cycles.length;
          const nextCycleIndex = nextPhaseIndex === 0 ? cycleIndex + 1 : cycleIndex;
          runBreathingCycle(script, nextCycleIndex, nextPhaseIndex);
        }, 500);
      }
    }, 1000);
  };

  const stopExercise = () => {
    setIsActive(false);
    setCurrentCycle(0);
    setCurrentPhase(0);
    setCountdown(0);
    setBreathingPhase('');
    stopCurrentAudio();
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
  };

  const resetExercise = () => {
    stopExercise();
    setTechnique('');
  };

  const getBreathingCircleSize = () => {
    if (!isActive) return 'w-80 h-80';
    
    const script = meditationScripts[technique as keyof typeof meditationScripts];
    if (!script) return 'w-80 h-80';
    
    const currentPhaseData = script.cycles[currentPhase];
    if (!currentPhaseData) return 'w-80 h-80';
    
    if (currentPhaseData.phase === 'inhale') {
      return 'w-96 h-96'; // Expand on inhale
    } else if (currentPhaseData.phase === 'exhale') {
      return 'w-64 h-64'; // Contract on exhale
    }
    return 'w-80 h-80'; // Default for hold phases
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
            ${getBreathingCircleSize()} rounded-full border-4 border-cyan-400/50 flex items-center justify-center relative
            transition-all duration-1000 ease-in-out
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
                    Cycle {currentCycle}
                  </div>
                  <div className="text-sm text-cyan-300 mb-2">
                    {breathingPhase}
                  </div>
                  <div className="text-4xl font-bold text-white mb-4">
                    {countdown}
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
                onClick={() => startBreathingCycle('478')}
                className="w-20 h-20 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 transition-all duration-300 hover:scale-105 mb-2"
              >
                <span className="text-xs font-semibold">4-7-8</span>
              </Button>
              <p className="text-xs text-cyan-300 opacity-80">Classic Relaxation</p>
            </div>
            
            <div className="text-center">
              <Button
                onClick={() => startBreathingCycle('box')}
                className="w-20 h-20 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 transition-all duration-300 hover:scale-105 mb-2"
              >
                <span className="text-xs font-semibold">Box</span>
              </Button>
              <p className="text-xs text-blue-300 opacity-80">4-4-4-4 Pattern</p>
            </div>
            
            <div className="text-center">
              <Button
                onClick={() => startBreathingCycle('equal')}
                className="w-20 h-20 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/50 transition-all duration-300 hover:scale-105 mb-2"
              >
                <span className="text-xs font-semibold">Equal</span>
              </Button>
              <p className="text-xs text-purple-300 opacity-80">6-6 Balance</p>
            </div>
            
            <div className="text-center">
              <Button
                onClick={() => startBreathingCycle('triangle')}
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
          <p>Choose a breathing technique above. Each one includes voice guidance and visual countdown to help you follow along perfectly.</p>
        </div>
      </div>
    </div>
  );
};

export default CalmNow;
