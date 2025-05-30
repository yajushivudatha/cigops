
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, Heart, Send } from 'lucide-react';

const Support = () => {
  const [message, setMessage] = useState('');
  
  const messages = [
    { type: 'user', text: "Feeling really tempted today...", time: "2:30 PM" },
    { type: 'ai', text: "I understand that feeling. You've already come so far - 12 days is amazing! Remember your breathing exercise?", time: "2:31 PM" },
    { type: 'community', text: "You've got this! Day 12 was tough for me too, but it gets easier. 💪", author: "Sarah M.", time: "2:35 PM" },
    { type: 'ai', text: "Sarah's right. Your brain is rewiring itself. Each craving resisted makes you stronger. Want to try a 2-minute breathing session?", time: "2:36 PM" }
  ];

  const communityMembers = [
    { name: "Sarah M.", days: 45, status: "online", avatar: "🌟" },
    { name: "Mike R.", days: 23, status: "online", avatar: "💪" },
    { name: "Emma L.", days: 67, status: "away", avatar: "🌸" },
    { name: "David K.", days: 15, status: "online", avatar: "🎯" }
  ];

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-serif text-white mb-4 text-glow">
            Support Community 🤝
          </h1>
          <p className="text-cyan-300 text-lg opacity-80">
            You're not alone in this journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card className="glass-card h-96 animate-scale-in">
              <CardContent className="p-0 h-full flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-xl font-semibold text-white flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-cyan-400" />
                    Daily Check-in Chat
                  </h3>
                  <p className="text-sm text-gray-400">AI-moderated support space</p>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`
                        flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}
                        animate-slide-up
                      `}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`
                        max-w-xs p-3 rounded-lg
                        ${msg.type === 'user' 
                          ? 'bg-cyan-500 text-white' 
                          : msg.type === 'ai'
                          ? 'bg-purple-500/20 text-purple-100 border border-purple-500/30'
                          : 'bg-green-500/20 text-green-100 border border-green-500/30'
                        }
                      `}>
                        {msg.author && (
                          <p className="text-xs opacity-70 mb-1">{msg.author}</p>
                        )}
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs opacity-60 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share how you're feeling..."
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                    />
                    <Button
                      size="sm"
                      className="bg-cyan-500 hover:bg-cyan-600"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Support Actions */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="glass-card border-white/20 hover:border-cyan-400/50 hover:bg-cyan-500/10 h-16"
              >
                <Heart className="w-5 h-5 mr-2 text-red-400" />
                <span>Emergency Support</span>
              </Button>
              <Button
                variant="outline"
                className="glass-card border-white/20 hover:border-green-400/50 hover:bg-green-500/10 h-16"
              >
                <MessageCircle className="w-5 h-5 mr-2 text-green-400" />
                <span>Talk to AI Coach</span>
              </Button>
            </div>
          </div>

          {/* Community Sidebar */}
          <div className="space-y-6">
            {/* Online Members */}
            <Card className="glass-card p-6 animate-scale-in">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-400" />
                  Community Members
                </h3>
                
                <div className="space-y-3">
                  {communityMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="text-2xl">{member.avatar}</div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{member.name}</p>
                        <p className="text-xs text-gray-400">{member.days} days smoke-free</p>
                      </div>
                      <div className={`
                        w-2 h-2 rounded-full
                        ${member.status === 'online' ? 'bg-green-400' : 'bg-gray-400'}
                      `}></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Daily Motivation */}
            <Card className="glass-card p-6 animate-scale-in">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-white mb-4">Daily Motivation</h3>
                <blockquote className="text-cyan-300 italic mb-3">
                  "Every person who quits smoking adds 14 years to their life on average."
                </blockquote>
                <cite className="text-sm text-gray-400">— Health Research</cite>
                
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-300 text-sm">
                    🎉 Community milestone: 1,247 total days smoke-free!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
