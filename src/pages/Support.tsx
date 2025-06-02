
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Phone, Video, Users, Heart, Star } from 'lucide-react';

const Support = () => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted', { name, email, message });
    setSubmitted(true);
    // Reset form after submission
    setName('');
    setEmail('');
    setMessage('');
    // Optionally, reset the submitted state after a delay
    setTimeout(() => setSubmitted(false), 3000);
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
              Support Community 🤝
            </h1>
            <p className="text-cyan-300 text-lg opacity-80 animate-fade-in">
              You're not alone in this journey
            </p>
          </div>

          {/* Daily Check-in Chat */}
          <Card className="glass-card mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white flex items-center">
                <MessageCircle className="w-5 h-5 mr-3 text-cyan-400" />
                Daily Check-in Chat
              </CardTitle>
              <p className="text-cyan-300 text-sm opacity-80">AI-moderated support space</p>
            </CardHeader>
            <CardContent>
              {/* Chat messages */}
              <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                <div className="flex justify-end">
                  <div className="bg-cyan-500/20 text-cyan-100 p-3 rounded-lg max-w-xs">
                    <p className="text-sm">Feeling really tempted today...</p>
                    <p className="text-xs text-cyan-300 mt-1">2:30 PM</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-700/50 text-gray-100 p-3 rounded-lg max-w-xs">
                    <p className="text-sm">I understand that feeling. You've already come so far - 12 days is amazing! Remember your breathing exercise?</p>
                    <p className="text-xs text-gray-400 mt-1">2:31 PM</p>
                  </div>
                </div>
              </div>
              
              {/* Chat input */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Share how you're feeling..."
                  className="bg-black/50 border-gray-700 text-white flex-1"
                />
                <Button className="bg-cyan-500 hover:bg-cyan-600">
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Community Members */}
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <Users className="w-5 h-5 mr-3 text-green-400" />
                  Community Members
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div>
                    <p className="text-white font-medium">Sarah M.</p>
                    <p className="text-gray-400 text-sm">45 days smoke-free</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div>
                    <p className="text-white font-medium">Mike R.</p>
                    <p className="text-gray-400 text-sm">23 days smoke-free</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div>
                    <p className="text-white font-medium">Emma L.</p>
                    <p className="text-gray-400 text-sm">67 days smoke-free</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div>
                    <p className="text-white font-medium">David K.</p>
                    <p className="text-gray-400 text-sm">15 days smoke-free</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Motivation */}
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white">Daily Motivation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-cyan-300 text-lg italic mb-4">
                    "Every day you don't smoke adds 2 hours to your life on average."
                  </p>
                  <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                    Health Fact
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Support */}
          <Card className="glass-card mt-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white text-red-400">Emergency Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                <Phone className="w-4 h-4 mr-2" />
                Crisis Helpline - 9152987821
              </Button>
              <Button variant="outline" className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/20">
                <Phone className="w-4 h-4 mr-2" />
                Emergency Services - 102
              </Button>
              <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/20">
                <Phone className="w-4 h-4 mr-2" />
                Mental Health Helpline
              </Button>
              
              <div className="text-center text-yellow-400 text-sm mt-4">
                ⚠️ If you're in immediate danger, call 102. For mental health crisis support, call the helpline numbers above.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;
