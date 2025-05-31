
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2 } from 'lucide-react';
import { useVoiceSupport } from '@/hooks/useVoiceSupport';

const CalmNow = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathCount, setBreathCount] = useState(0);
  const { isConnected, startVoiceSession, endVoiceSession } = useVoiceSupport();

  const handleStartBreathing = () => {
    setIsBreathing(true);
    setBreathCount(0);
    // Start voice guidance
    startVoiceSession("I notice you need some calm right now. Let's do some breathing exercises together.");
  };

  const handleStopBreathing = () => {
    setIsBreathing(false);
    if (isConnected) {
      endVoiceSession();
    }
  };

  React.useEffect(() => {
    if (isBreathing) {
      const interval = setInterval(() => {
        setBreathCount(prev => prev + 1);
      }, 4000); // 4 seconds per breath cycle

      return () => clearInterval(interval);
    }
  }, [isBreathing]);

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-serif text-white mb-4 text-glow">
            Calm Now 🧘‍♀️
          </h1>
          <p className="text-cyan-300 text-lg opacity-80">
            Take a moment to breathe and center yourself
          </p>
        </div>

        {/* Main Breathing Exercise */}
        <Card className="glass-card mb-8 animate-scale-in">
          <CardContent className="p-12">
            <div className="text-center">
              {/* Breathing Circle */}
              <div className="relative mx-auto mb-8">
                <div className={`
                  w-64 h-64 rounded-full border-4 border-cyan-400/30 flex items-center justify-center
                  transition-all duration-4000 ease-in-out
                  ${isBreathing ? 'scale-110 border-cyan-400/60 animate-breathe' : 'scale-100'}
                `}>
                  <div className={`
                    w-48 h-48 rounded-full border-2 border-cyan-400/20 flex items-center justify-center
                    transition-all duration-4000 ease-in-out
                    ${isBreathing ? 'scale-110 border-cyan-400/40' : 'scale-100'}
                  `}>
                    <div className="text-center">
                      <div className="text-6xl mb-2">🫁</div>
                      <p className="text-cyan-300 text-lg">
                        {isBreathing ? (breathCount % 2 === 0 ? 'Breathe In' : 'Breathe Out') : 'Ready?'}
                      </p>
                      {isBreathing && (
                        <p className="text-gray-400 text-sm mt-2">
                          Breath {Math.floor(breathCount / 2) + 1}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                <Button
                  onClick={isBreathing ? handleStopBreathing : handleStartBreathing}
                  size="lg"
                  className={`
                    w-48 h-16 text-lg font-semibold rounded-full transition-all duration-300
                    ${isBreathing 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white'
                    }
                  `}
                >
                  {isBreathing ? (
                    <>
                      <Pause className="w-6 h-6 mr-2" />
                      Stop Session
                    </>
                  ) : (
                    <>
                      <Play className="w-6 h-6 mr-2" />
                      Start Breathing
                    </>
                  )}
                </Button>

                {isConnected && (
                  <div className="flex items-center justify-center space-x-2 text-green-400">
                    <Volume2 className="w-5 h-5" />
                    <span className="text-sm">Voice guidance active</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

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
              <Button variant="outline" className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
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
              <Button variant="outline" className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
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
              <Button variant="outline" className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
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
