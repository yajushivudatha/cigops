
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Target, Trophy, TrendingUp } from 'lucide-react';
import ProgressRing from '@/components/ProgressRing';

const QuitPlan = () => {
  const [currentStreak] = useState(12);
  const [goalDays] = useState(90);
  
  const milestones = [
    { day: 1, title: "First Day Victory", achieved: true, reward: "🎉 You did it!" },
    { day: 7, title: "One Week Strong", achieved: true, reward: "💪 Breathing improves" },
    { day: 14, title: "Two Weeks Free", achieved: false, reward: "❤️ Heart rate normalizes" },
    { day: 30, title: "One Month Champion", achieved: false, reward: "🌟 Energy levels boost" },
    { day: 90, title: "Three Month Warrior", achieved: false, reward: "🏆 Full lung recovery" }
  ];

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-serif text-white mb-4 text-glow">
            Your Quit Journey 📈
          </h1>
          <p className="text-cyan-300 text-lg opacity-80">
            Track your progress and celebrate every milestone
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Current Progress */}
          <Card className="glass-card p-8 text-center animate-scale-in">
            <CardContent className="p-0">
              <h3 className="text-2xl font-semibold text-white mb-6">Current Progress</h3>
              <ProgressRing 
                current={currentStreak} 
                total={goalDays}
                label="Days Smoke-Free"
              />
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Current Streak</span>
                  <span className="text-cyan-400 font-semibold">{currentStreak} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Goal Target</span>
                  <span className="text-green-400 font-semibold">{goalDays} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Progress</span>
                  <span className="text-purple-400 font-semibold">{Math.round((currentStreak / goalDays) * 100)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Improvements */}
          <Card className="glass-card p-8 animate-scale-in">
            <CardContent className="p-0">
              <h3 className="text-2xl font-semibold text-white mb-6">Health Improvements</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-green-300">Breathing capacity improved</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-300">Blood circulation better</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-purple-300">Energy levels rising</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-yellow-300">Taste & smell returning</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <p className="text-cyan-300 text-sm">
                  💰 Money saved: <span className="font-bold text-cyan-400">$120</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Milestones Timeline */}
        <Card className="glass-card p-8 animate-fade-in">
          <CardContent className="p-0">
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center">
              <Trophy className="w-6 h-6 mr-3 text-yellow-400" />
              Milestone Timeline
            </h3>
            
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.day}
                  className={`
                    flex items-center space-x-4 p-4 rounded-lg transition-all duration-300
                    ${milestone.achieved 
                      ? 'bg-green-500/10 border border-green-500/20' 
                      : milestone.day <= currentStreak + 2
                      ? 'bg-yellow-500/10 border border-yellow-500/20'
                      : 'bg-gray-500/10 border border-gray-500/20'
                    }
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold
                    ${milestone.achieved 
                      ? 'bg-green-500 text-white' 
                      : milestone.day <= currentStreak + 2
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-600 text-gray-300'
                    }
                  `}>
                    {milestone.day}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`
                      font-semibold
                      ${milestone.achieved 
                        ? 'text-green-300' 
                        : milestone.day <= currentStreak + 2
                        ? 'text-yellow-300'
                        : 'text-gray-300'
                      }
                    `}>
                      {milestone.title}
                    </h4>
                    <p className="text-sm text-gray-400">{milestone.reward}</p>
                  </div>
                  
                  {milestone.achieved && (
                    <div className="text-green-400">
                      <Target className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuitPlan;
