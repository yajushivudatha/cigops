
import React, { useState, useEffect } from 'react';
import { Heart, Zap, Calendar, Users, FileText, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import MoodSlider from './MoodSlider';
import CalmNowButton from './CalmNowButton';
import QuoteOfTheDay from './QuoteOfTheDay';
import ProgressRing from './ProgressRing';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName] = useState("Alex");
  const [cravingsToday] = useState(3);
  const [daysSmokeFreeCurrent] = useState(12);
  const [daysSmokeFreeFull] = useState(90);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const navigationItems = [
    { icon: Calendar, label: "Quit Plan", path: "/plan" },
    { icon: Users, label: "Support", path: "/support" },
    { icon: FileText, label: "PDF Analyzer", path: "/analyzer" },
    { icon: ShoppingBag, label: "Marketplace", path: "/marketplace" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/10 rounded-full animate-pulse-glow"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-blue-500/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full animate-breathe"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-serif text-white mb-2 text-glow">
            {getGreeting()}, {userName} 💙
          </h1>
          <p className="text-cyan-300 text-lg opacity-80">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

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

          {/* Center Column - Calm Now */}
          <div className="flex items-center justify-center">
            <CalmNowButton />
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-6">
            {/* Today's Stats */}
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

            {/* Quick Actions */}
            <Card className="glass-card p-6 animate-scale-in">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {navigationItems.map((item, index) => (
                    <Button
                      key={item.label}
                      variant="outline"
                      size="sm"
                      className="glass-card border-white/20 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-300 h-12"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      <span className="text-xs">{item.label}</span>
                    </Button>
                  ))}
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
