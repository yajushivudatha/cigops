
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2 } from 'lucide-react';
import { useVoiceSupport } from '@/hooks/useVoiceSupport';
import { useToast } from '@/hooks/use-toast';

const CalmNow = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathCount, setBreathCount] = useState(0);
  const [currentExercise, setCurrentExercise] = useState('normal');
  const { isConnected, startVoiceSession, endVoiceSession } = useVoiceSupport();
  const { toast } = useToast();

  const handleStartBreathing = () => {
    setIsBreathing(true);
    setBreathCount(0);
    startVoiceSession("I notice you need some calm right now. Let's do some breathing exercises together.");
  };

  const handleStopBreathing = () => {
    setIsBreathing(false);
    if (isConnected) {
      endVoiceSession();
    }
  };

  const start478Breathing = () => {
    setCurrentExercise('4-7-8');
    setIsBreathing(true);
    setBreathCount(0);
    startVoiceSession("Let's try the 4-7-8 breathing technique. Inhale for 4, hold for 7, exhale for 8.");
    toast({
      title: "4-7-8 Breathing Started",
      description: "Inhale for 4, hold for 7, exhale for 8 seconds"
    });
  };

  const startBoxBreathing = () => {
    setCurrentExercise('box');
    setIsBreathing(true);
    setBreathCount(0);
    startVoiceSession("Let's practice box breathing. 4 counts in, hold 4, out 4, hold 4.");
    toast({
      title: "Box Breathing Started",
      description: "4 counts in, hold 4, out 4, hold 4"
    });
  };

  const startQuickReset = () => {
    setCurrentExercise('quick');
    setIsBreathing(true);
    setBreathCount(0);
    startVoiceSession("Let's do a quick reset with 3 deep breaths to center yourself.");
    toast({
      title: "Quick Reset Started",
      description: "3 deep breaths to center yourself"
    });
  };

  React.useEffect(() => {
    if (isBreathing) {
      const interval = setInterval(() => {
        setBreathCount(prev => prev + 1);
        if (currentExercise === 'quick' && breathCount >= 6) {
          setIsBreathing(false);
          if (isConnected) {
            endVoiceSession();
          }
        }
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isBreathing, breathCount, currentExercise, isConnected, endVoiceSession]);

  const getBreathingText = () => {
    switch (currentExercise) {
      case '4-7-8':
        const cycle478 = breathCount % 3;
        return cycle478 === 0 ? 'Inhale (4s)' : cycle478 === 1 ? 'Hold (7s)' : 'Exhale (8s)';
      case 'box':
        const cycleBox = breathCount % 4;
        return cycleBox === 0 ? 'Inhale (4s)' : cycleBox === 1 ? 'Hold (4s)' : cycleBox === 2 ? 'Exhale (4s)' : 'Hold (4s)';
      case 'quick':
        return breathCount % 2 === 0 ? 'Deep Inhale' : 'Deep Exhale';
      default:
        return breathCount % 2 === 0 ? 'Breathe In' : 'Breathe Out';
    }
  };

  return (
    <div className="min-h-screen p-4 pt-20 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-serif text-white mb-4 text-glow">
            Calm Your Mind 🧘‍♀️
          </h1>
          <p className="text-cyan-300 text-lg opacity-80">
            You've resisted 3 cravings this week. Let's breathe together.
          </p>
        </div>

        {/* Main Breathing Exercise - Centered */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            {/* Breathing Animation Rings */}
            <div className={`
              absolute inset-0 w-80 h-80 rounded-full border-2 border-cyan-400/30 flex items-center justify-center
              transition-all duration-4000 ease-in-out
              ${isBreathing ? 'scale-110 border-cyan-400/60 animate-breathe' : 'scale-100'}
            `}></div>
            <div className={`
              absolute inset-4 w-72 h-72 rounded-full border border-cyan-400/20 flex items-center justify-center
              transition-all duration-4000 ease-in-out
              ${isBreathing ? 'scale-110 border-cyan-400/40' : 'scale-100'}
            `}></div>
            
            {/* Main Button */}
            <Button
              onClick={isBreathing ? handleStopBreathing : handleStartBreathing}
              className={`
                relative z-10 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 
                hover:from-cyan-400 hover:to-blue-500 border-0 shadow-2xl transition-all duration-300
                ${isBreathing ? 'animate-pulse-glow scale-110' : 'hover:scale-105'}
              `}
            >
              <div className="flex flex-col items-center">
                {isBreathing ? (
                  <Pause className="w-12 h-12 mb-3" />
                ) : (
                  <Play className="w-12 h-12 mb-3" />
                )}
                <span className="text-lg font-semibold mb-2">
                  {isBreathing ? 'Stop' : 'Begin'}
                </span>
                {isBreathing && (
                  <div className="text-center">
                    <p className="text-sm">{getBreathingText()}</p>
                    <p className="text-xs opacity-80 mt-1">
                      {currentExercise === 'quick' 
                        ? `Breath ${Math.floor(breathCount / 2) + 1}/3`
                        : `Breath ${Math.floor(breathCount / 2) + 1}`
                      }
                    </p>
                  </div>
                )}
              </div>
            </Button>

            {isConnected && (
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-green-400">
                <Volume2 className="w-5 h-5" />
                <span className="text-sm">Voice guidance active</span>
              </div>
            )}
          </div>
        </div>

        {/* Reset Button */}
        {isBreathing && (
          <div className="text-center mb-8">
            <Button
              onClick={() => {
                setIsBreathing(false);
                setCurrentExercise('normal');
                if (isConnected) endVoiceSession();
              }}
              variant="outline"
              className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black"
            >
              Reset
            </Button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="glass-card animate-slide-up">
            <CardHeader>
              <CardTitle className="text-white text-lg">4-7-8 Breathing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-4">
                Inhale for 4, hold for 7, exhale for 8 seconds
              </p>
              <Button 
                onClick={start478Breathing}
                variant="outline" 
                className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
              >
                Try Now
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="text-white text-lg">Box Breathing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-4">
                4 counts in, hold 4, out 4, hold 4
              </p>
              <Button 
                onClick={startBoxBreathing}
                variant="outline" 
                className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
              >
                Try Now
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-white text-lg">Quick Reset</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-4">
                3 deep breaths to center yourself
              </p>
              <Button 
                onClick={startQuickReset}
                variant="outline" 
                className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
              >
                Try Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalmNow;
