
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User } from 'lucide-react';

const QuitPlanGenerator = () => {
  const [name, setName] = useState('Alex');
  const [currentUsage, setCurrentUsage] = useState('');
  const [quitDate, setQuitDate] = useState('22-07-2025');
  const [motivation, setMotivation] = useState('Family');
  const [triggers, setTriggers] = useState('Stress');
  const [strategies, setStrategies] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', {
      name,
      currentUsage,
      quitDate,
      motivation,
      triggers,
      strategies,
      notes,
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif text-white mb-2 text-glow animate-fade-in">
              Quit Plan Generator 📋
            </h1>
            <p className="text-cyan-300 text-lg opacity-80 animate-fade-in">
              Create your personalized recovery roadmap
            </p>
          </div>

          {/* Main Form Card */}
          <Card className="glass-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white flex items-center">
                <User className="w-5 h-5 mr-3 text-cyan-400" />
                Tell us about your journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-300 mb-2 block">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="currentUsage" className="text-gray-300 mb-2 block">
                      Current usage (per day)
                    </Label>
                    <Input
                      id="currentUsage"
                      type="text"
                      value={currentUsage}
                      onChange={(e) => setCurrentUsage(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white"
                      placeholder="e.g., 10 cigarettes, 2 vapes"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="quitDate" className="text-gray-300 mb-2 block">
                    Target Quit Date
                  </Label>
                  <Input
                    id="quitDate"
                    type="text"
                    value={quitDate}
                    onChange={(e) => setQuitDate(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white"
                    placeholder="DD-MM-YYYY"
                  />
                </div>

                <div>
                  <Label htmlFor="motivation" className="text-gray-300 mb-2 block">
                    What motivates you to quit?
                  </Label>
                  <Textarea
                    id="motivation"
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white resize-none"
                    placeholder="Family, health, money, etc."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="triggers" className="text-gray-300 mb-2 block">
                    What are your main triggers?
                  </Label>
                  <Textarea
                    id="triggers"
                    value={triggers}
                    onChange={(e) => setTriggers(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white resize-none"
                    placeholder="Stress, social situations, work breaks, etc."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="strategies" className="text-gray-300 mb-2 block">
                    What strategies will you use?
                  </Label>
                  <Textarea
                    id="strategies"
                    value={strategies}
                    onChange={(e) => setStrategies(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white resize-none"
                    placeholder="Breathing exercises, gum, support groups, etc."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="text-gray-300 mb-2 block">
                    Additional notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white resize-none"
                    placeholder="Any other thoughts or goals..."
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
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
