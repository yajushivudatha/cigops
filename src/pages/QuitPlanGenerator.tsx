import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Target, Heart } from 'lucide-react';

const QuitPlanGenerator = () => {
  const [startDate, setStartDate] = useState('');
  const [quitTime, setQuitTime] = useState('');
  const [reason, setReason] = useState('');
  const [triggers, setTriggers] = useState('');
  const [strategies, setStrategies] = useState('');
  const [supportSystem, setSupportSystem] = useState('');
  const [reward, setReward] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', {
      startDate,
      quitTime,
      reason,
      triggers,
      strategies,
      supportSystem,
      reward,
    });
  };

  return (
    <div className="min-h-screen bg-black relative overflow-y-auto pb-16">
      {/* Breathing Bubbles Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/20 rounded-full animate-breathe"></div>
        <div className="absolute top-1/3 right-32 w-24 h-24 bg-blue-500/15 rounded-full animate-breathe" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full animate-breathe" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-teal-500/15 rounded-full animate-breathe" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-indigo-500/10 rounded-full animate-breathe" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 p-4">
        <div className="max-w-3xl mx-auto">
          <Card className="glass-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white">
                <Target className="mr-2 inline-block h-6 w-6 text-cyan-400 align-middle" />
                Create Your Personalized Quit Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="startDate" className="text-gray-300">
                    <Calendar className="mr-2 inline-block h-4 w-4 text-cyan-300 align-middle" />
                    Start Date
                  </Label>
                  <Input
                    type="date"
                    id="startDate"
                    className="bg-black/50 border-cyan-500 text-white"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="quitTime" className="text-gray-300">
                    <Clock className="mr-2 inline-block h-4 w-4 text-cyan-300 align-middle" />
                    Quit Time
                  </Label>
                  <Input
                    type="time"
                    id="quitTime"
                    className="bg-black/50 border-cyan-500 text-white"
                    value={quitTime}
                    onChange={(e) => setQuitTime(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="reason" className="text-gray-300">
                    <Heart className="mr-2 inline-block h-4 w-4 text-cyan-300 align-middle" />
                    Your Reason for Quitting
                  </Label>
                  <Textarea
                    id="reason"
                    className="bg-black/50 border-cyan-500 text-white resize-none"
                    placeholder="Write down your most important reasons for quitting."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="triggers" className="text-gray-300">
                    <Zap className="mr-2 inline-block h-4 w-4 text-cyan-300 align-middle" />
                    Identify Your Triggers
                  </Label>
                  <Textarea
                    id="triggers"
                    className="bg-black/50 border-cyan-500 text-white resize-none"
                    placeholder="List situations, feelings, or people that trigger your cravings."
                    value={triggers}
                    onChange={(e) => setTriggers(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="strategies" className="text-gray-300">
                    <Brain className="mr-2 inline-block h-4 w-4 text-cyan-300 align-middle" />
                    Coping Strategies
                  </Label>
                  <Textarea
                    id="strategies"
                    className="bg-black/50 border-cyan-500 text-white resize-none"
                    placeholder="Describe strategies to cope with cravings and triggers."
                    value={strategies}
                    onChange={(e) => setStrategies(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="supportSystem" className="text-gray-300">
                    <Users className="mr-2 inline-block h-4 w-4 text-cyan-300 align-middle" />
                    Your Support System
                  </Label>
                  <Textarea
                    id="supportSystem"
                    className="bg-black/50 border-cyan-500 text-white resize-none"
                    placeholder="List people who will support you during this process."
                    value={supportSystem}
                    onChange={(e) => setSupportSystem(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="reward" className="text-gray-300">
                    <Gift className="mr-2 inline-block h-4 w-4 text-cyan-300 align-middle" />
                    Your Reward
                  </Label>
                  <Textarea
                    id="reward"
                    className="bg-black/50 border-cyan-500 text-white resize-none"
                    placeholder="What will you reward yourself with when you reach milestones?"
                    value={reward}
                    onChange={(e) => setReward(e.target.value)}
                    required
                  />
                </div>
                <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-white">
                  Generate My Quit Plan
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuitPlanGenerator;

// Dummy components for icons
const Zap = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><polygon points="13 2 3 14 11 14 11 22 21 10 13 10 13 2"/></svg>;
const Brain = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain"><path d="M15 13v-1.5a2.5 2.5 0 0 0-5 0V13"/><path d="M2 9a5 5 0 0 1 5-5l2 3a3 3 0 0 0 6 0l2-3a5 5 0 0 1 5 5v3.5a5.5 5.5 0 0 1-3 5.1L12 22l-6.1-3.4A5.5 5.5 0 0 1 2 12.5V9Z"/></svg>;
const Users = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const Gift = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gift"><rect width="20" height="12" x="2" y="7"/><path d="M12 22v-5"/><path d="M2 17h20"/><path d="M7 2a5 5 0 0 1 10 0"/></svg>;
