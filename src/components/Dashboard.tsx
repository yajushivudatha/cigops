
import React, { useState, useEffect } from 'react';
import { Heart, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import MoodSlider from './MoodSlider';
import QuoteOfTheDay from './QuoteOfTheDay';
import ProgressRing from './ProgressRing';

const Dashboard = () => {
  const [cravingsToday] = useState(3);
  const [daysSmokeFreeCurrent] = useState(12);
  const [daysSmokeFreeFull] = useState(90);

  return (
    <div className="p-4 pb-32">
      <div className="max-w-6xl mx-auto">
        {/* Quote of the Day */}
        <div className="mb-8 animate-scale-in">
          <QuoteOfTheDay />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Progress & Mood */}
          <div className="space-y-6">
            {/* Progress Ring */}
            <Card className="glass-card p-6 text-center animate-scale-in">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-white mb-4">Recovery Progress</h3>
                <ProgressRing 
                  current={daysSmokeFreeCurrent} 
                  total={daysSmokeFreeFull}
                  label="Days Smoke-Free"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Current Streak</span>
                    <span className="text-cyan-400 font-semibold">{daysSmokeFreeCurrent} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Goal</span>
                    <span className="text-green-400 font-semibold">{daysSmokeFreeFull} days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mood Check-in */}
            <Card className="glass-card p-6 animate-scale-in">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-white mb-4">How are you feeling?</h3>
                <MoodSlider />
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Quick Stats */}
          <div className="space-y-6">
            <Card className="glass-card p-6 animate-scale-in">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-white mb-4">Today's Journey</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-orange-400" />
                      <span className="text-gray-300">Cravings Resisted</span>
                    </div>
                    <span className="text-orange-400 font-bold text-lg">{cravingsToday}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-400" />
                      <span className="text-gray-300">Health Score</span>
                    </div>
                    <span className="text-green-400 font-bold text-lg">85%</span>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Weekly Progress</span>
                      <span className="text-cyan-400">6/7 days</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Money Saved & Health */}
          <div className="space-y-6">
            <Card className="glass-card p-6 animate-scale-in">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-white mb-4">Your Achievements</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-400 mb-1">$120</div>
                    <p className="text-green-300 text-sm">Money saved this week</p>
                  </div>
                  
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400 mb-1">15%</div>
                    <p className="text-blue-300 text-sm">Breathing improvement</p>
                  </div>
                  
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400 mb-1">72h</div>
                    <p className="text-purple-300 text-sm">Since last craving</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Motivation Feed */}
        <Card className="glass-card p-6 animate-fade-in">
          <CardContent className="p-0">
            <h3 className="text-xl font-semibold text-white mb-4">Your Recovery Journey</h3>
            <div className="space-y-3">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-300 text-sm">🎉 Milestone achieved: 10+ days smoke-free!</p>
              </div>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-300 text-sm">💡 Your breathing capacity has improved by 15%</p>
              </div>
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <p className="text-purple-300 text-sm">🌟 You've saved $120 this week - treat yourself!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
