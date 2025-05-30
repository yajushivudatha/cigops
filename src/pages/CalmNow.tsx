
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAICoach } from '@/hooks/useAICoach';
import { useVoiceSupport } from '@/hooks/useVoiceSupport';
import VoiceSetup from '@/components/VoiceSetup';

const CalmNow = () => {
  const [isActive, setIsActive] = useState(false);
  const [breatheCount, setBreatheCount] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const { toast } = useToast();
  const { triggerCrisisSupport, userContext } = useAICoach();
  const { isConnected, isSupported, startVoiceSession, endVoiceSession } = useVoiceSupport();

  React.useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isActive) {
      interval = setInterval(() => {
        setSessionTime(time => time + 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive]);

  const handleCalmNow = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setBreatheCount(breatheCount + 1);
      console.log('Calm Now session started!');
      toast({
        title: "Session started",
        description: "Focus on your breathing. You've got this!"
      });
    } else {
      console.log('Calm Now session paused!');
      toast({
        title: "Session paused",
        description: `Great job! You breathed mindfully for ${Math.floor(sessionTime / 60)}:${(sessionTime % 60).toString().padStart(2, '0')}`
      });
    }
  };

  const handleVoiceCrisisSupport = async () => {
    if (isConnected) {
      endVoiceSession();
      return;
    }

    const advice = await triggerCrisisSupport();
    if (isSupported) {
      await startVoiceSession(advice.message);
    }
  };

  const resetSession = () => {
    setIsActive(false);
    setBreatheCount(0);
    setSessionTime(0);
    console.log('Session reset');
    toast({
      title: "Session reset",
      description: "Ready for a fresh start!"
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            You've resisted {userContext.successfulResistances} cravings this week. Let's breathe together.
          </p>
        </div>

        {/* Voice Setup */}
        <div className="mb-8">
          <VoiceSetup />
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

        {/* Crisis Voice Support Button */}
        {isSupported && (
          <div className="mb-8">
            <Button
              onClick={handleVoiceCrisisSupport}
              variant="outline"
              size="lg"
              className={`
                glass-card border-red-400/40 hover:border-red-400/60 hover:bg-red-500/10
                ${isConnected ? 'bg-red-500/20 animate-pulse' : ''}
              `}
            >
              <Phone className="w-5 h-5 mr-2" />
              {isConnected ? 'End Voice Session' : 'Crisis Voice Support'}
            </Button>
          </div>
        )}

        {/* Breathing Instructions */}
        {isActive && (
          <div className="mb-8 animate-fade-in">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl text-white mb-3">Breathe with the circle</h3>
              <p className="text-cyan-300 text-sm opacity-80 mb-4">
                Inhale as it expands, exhale as it contracts
              </p>
              <div className="flex justify-between items-center">
                <div className="text-2xl text-cyan-400 font-bold">
                  Session {breatheCount}
                </div>
                <div className="text-lg text-white">
                  {formatTime(sessionTime)}
                </div>
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
