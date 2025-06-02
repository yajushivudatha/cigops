
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, Heart, Send } from 'lucide-react';

const Support = () => {
  const [message, setMessage] = useState('');
  const [isWatsonMode, setIsWatsonMode] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'user', text: "Feeling really tempted today...", time: "2:30 PM" },
    { type: 'ai', text: "I understand that feeling. You've already come so far - 12 days is amazing! Remember your breathing exercise?", time: "2:31 PM" },
    { type: 'community', text: "You've got this! Day 12 was tough for me too, but it gets easier. 💪", author: "Sarah M.", time: "2:35 PM" },
    { type: 'ai', text: "Sarah's right. Your brain is rewiring itself. Each craving resisted makes you stronger. Want to try a 2-minute breathing session?", time: "2:36 PM" }
  ]);
  
  const generateWatsonResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('nicotine') && (input.includes('patch') || input.includes('gum') || input.includes('replacement'))) {
      return "Nicotine replacement therapy (NRT) can be very effective. For patches: Start with 21mg if you smoke 10+ cigarettes daily, 14mg for lighter smokers. Apply to clean, dry skin on upper body, rotate location daily. Use for 6-8 weeks, then step down to 14mg, then 7mg. For gum: Use 4mg if you smoke within 30 minutes of waking, otherwise 2mg. Chew slowly until you taste nicotine, then park between cheek and gum. Would you like specific guidance based on your smoking habits?";
    }
    
    if (input.includes('treatment') || input.includes('rehab')) {
      return "Based on clinical evidence, effective addiction treatment typically includes a combination of medical detox, behavioral therapy, and long-term support. I can help you find local treatment centers that offer these evidence-based approaches. Would you like me to search for facilities in your area?";
    }
    
    if (input.includes('withdrawal') || input.includes('detox')) {
      return "Withdrawal symptoms are a normal part of recovery. Common symptoms include irritability, anxiety, difficulty concentrating, and cravings. These typically peak within 72 hours and gradually improve over 2-4 weeks. Nicotine replacement therapy can reduce these symptoms by 50-70%. Stay hydrated, get rest, and use coping strategies. Are you experiencing specific withdrawal symptoms?";
    }
    
    if (input.includes('craving') || input.includes('urge')) {
      return "Cravings are intense but temporary - they typically last 3-5 minutes. Evidence-based strategies: Use the '4 D's' - Delay (wait 10 minutes), Deep breathe (try the 4-7-8 technique), Drink water, Do something else. The app's breathing exercises are excellent for this. Physical activity, calling support contacts, or nicotine gum can also help. How long have you been smoke-free?";
    }
    
    if (input.includes('help') || input.includes('emergency') || input.includes('crisis')) {
      return "If you're in immediate crisis, please call 9152987821 (Crisis Helpline) or 102 (Emergency Services). For non-emergency support, I can provide evidence-based strategies, help you understand nicotine replacement options, or discuss treatment approaches. What specific support do you need right now?";
    }
    
    return "I'm here to provide evidence-based support for your recovery journey. I can help with nicotine replacement therapy guidance, withdrawal management, treatment options, or coping strategies. What would you like to know more about?";
  };
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      type: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Use Watson AI if in Watson mode, otherwise use regular AI
    setTimeout(() => {
      const aiResponse = {
        type: isWatsonMode ? 'watson' : 'ai',
        text: isWatsonMode ? generateWatsonResponse(newMessage.text) : "I hear you. Those feelings are completely normal in recovery. What specific situation is triggering this feeling right now?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleEmergencySupport = () => {
    window.open('tel:9152987821');
  };

  const handleAICoach = () => {
    setIsWatsonMode(true);
    const watsonMessage = {
      type: 'watson',
      text: "Hello! I'm Watson, your AI clinical support assistant. I can help you find treatment options, understand addiction recovery, and provide evidence-based guidance including nicotine replacement therapy. How can I assist you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, watsonMessage]);
  };

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
                    Daily Check-in Chat {isWatsonMode && <span className="ml-2 text-sm bg-blue-500/20 px-2 py-1 rounded">Watson AI Active</span>}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {isWatsonMode ? "Watson AI clinical support mode" : "AI-moderated support space"}
                  </p>
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
                          : msg.type === 'watson'
                          ? 'bg-blue-500/20 text-blue-100 border border-blue-500/30'
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
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={isWatsonMode ? "Ask Watson about nicotine patches, treatment options..." : "Share how you're feeling..."}
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                    />
                    <Button
                      onClick={handleSendMessage}
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
                onClick={handleEmergencySupport}
                variant="outline"
                className="glass-card border-white/20 hover:border-red-400/50 hover:bg-red-500/10 h-16"
              >
                <Heart className="w-5 h-5 mr-2 text-red-400" />
                <span>Emergency Support</span>
              </Button>
              <Button
                onClick={handleAICoach}
                variant="outline"
                className="glass-card border-white/20 hover:border-blue-400/50 hover:bg-blue-500/10 h-16"
              >
                <MessageCircle className="w-5 h-5 mr-2 text-blue-400" />
                <span>Talk to AI Coach</span>
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Members */}
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
