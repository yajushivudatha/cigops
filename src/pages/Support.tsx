
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
      const responses = [
        "Nicotine replacement therapy (NRT) can be very effective. For patches: Start with 21mg if you smoke 10+ cigarettes daily, 14mg for lighter smokers. Apply to clean, dry skin on upper body, rotate location daily. Use for 6-8 weeks, then step down to 14mg, then 7mg. For gum: Use 4mg if you smoke within 30 minutes of waking, otherwise 2mg. Chew slowly until you taste nicotine, then park between cheek and gum. Would you like specific guidance based on your smoking habits?",
        "NRT options include patches, gum, lozenges, and inhalers. Combination therapy (patch + short-acting NRT) increases success rates by 15-20%. Patches provide steady nicotine levels while gum/lozenges handle breakthrough cravings. Start within 24 hours of quitting for best results. Common side effects: skin irritation (patches), jaw soreness (gum), hiccups (lozenges). Which NRT method interests you most?",
        "Evidence shows NRT doubles your chances of quitting successfully. Dosing guidelines: Heavy smokers (20+ daily) start with 21mg patches or 4mg gum. Light smokers (<10 daily) use 14mg patches or 2mg gum. Gradual tapering prevents rebound cravings. Duration: 8-12 weeks typically, some may need longer. Insurance often covers NRT - check your benefits. What's your current smoking pattern?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (input.includes('treatment') || input.includes('rehab')) {
      const responses = [
        "Based on clinical evidence, effective addiction treatment typically includes medical detox, behavioral therapy, and long-term support. I can help you find local treatment centers that offer these evidence-based approaches. Would you like me to search for facilities in your area?",
        "Treatment options vary by intensity: Outpatient counseling (1-3 sessions/week), Intensive outpatient (9+ hours/week), Partial hospitalization (20+ hours/week), or Residential treatment (24/7 care). Success rates improve with longer treatment duration. What level of support do you think you need?",
        "Evidence-based treatments include Cognitive Behavioral Therapy (CBT), Motivational Interviewing, and Contingency Management. Medication options: Varenicline (Chantix), Bupropion (Zyban), or NRT. Combination therapy shows best outcomes. Do you have preferences for therapy type or concerns about medications?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (input.includes('withdrawal') || input.includes('detox')) {
      const responses = [
        "Withdrawal symptoms are normal and temporary. Timeline: Peak intensity 72 hours, most symptoms resolve 2-4 weeks. Physical: irritability, anxiety, difficulty concentrating, increased appetite, sleep disturbances. Psychological: depression, cravings, restlessness. NRT reduces symptoms by 50-70%. Stay hydrated, get rest, use coping strategies. Are you experiencing specific symptoms?",
        "Nicotine withdrawal varies by individual. Factors affecting severity: smoking duration, daily cigarettes, genetics, mental health. Management strategies: Deep breathing, physical activity, support groups, distraction techniques. Severe symptoms warrant medical attention. Timeline improves: Day 3 (peak), Week 1 (physical symptoms ease), Month 1 (psychological symptoms improve). How long since your last cigarette?",
        "Withdrawal intensity correlates with nicotine dependence level. Fagerström Test scores >7 predict more severe symptoms. Non-pharmacological approaches: Exercise (releases endorphins), mindfulness (reduces anxiety), social support (accountability). When symptoms peak, remember: 'This too shall pass.' Cravings last 3-5 minutes on average. What coping strategies have you tried?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (input.includes('craving') || input.includes('urge')) {
      const responses = [
        "Cravings are intense but temporary - they typically last 3-5 minutes. Evidence-based strategies: Use the '4 D's' - Delay (wait 10 minutes), Deep breathe (try the 4-7-8 technique), Drink water, Do something else. The app's breathing exercises are excellent for this. Physical activity, calling support contacts, or nicotine gum can also help. How long have you been smoke-free?",
        "Craving triggers include: stress, alcohol, social situations, specific locations, emotions, or times of day. Identify your personal triggers and develop specific responses. Cognitive techniques: 'Surfing the urge' (observing without acting), thought stopping, reframing. Environmental changes help: remove ashtrays, avoid smoking areas, change routines. What situations trigger your strongest cravings?",
        "Neurologically, cravings result from dopamine pathways seeking reward. Each resisted craving weakens these pathways. Strategies ranked by effectiveness: 1) NRT (immediate relief), 2) Behavioral substitution, 3) Environmental modification, 4) Social support, 5) Mindfulness techniques. Progressive muscle relaxation and guided imagery also help. The urge will pass - you're stronger than the craving."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (input.includes('help') || input.includes('emergency') || input.includes('crisis')) {
      return "If you're in immediate crisis, please call 9152987821 (Crisis Helpline) or 102 (Emergency Services). For non-emergency support, I can provide evidence-based strategies, help you understand nicotine replacement options, or discuss treatment approaches. What specific support do you need right now?";
    }
    
    const generalResponses = [
      "I'm here to provide evidence-based support for your recovery journey. I can help with nicotine replacement therapy guidance, withdrawal management, treatment options, or coping strategies. What would you like to know more about?",
      "Recovery is a process, not a single event. Research shows multiple quit attempts are normal - most successful quitters tried 6-7 times before succeeding permanently. Each attempt teaches valuable lessons. What specific challenges are you facing in your current quit attempt?",
      "Your brain is actively healing right now. Within 20 minutes: heart rate normalizes. 12 hours: carbon monoxide levels drop. 2 weeks: circulation improves. 1 month: lung function increases 30%. These changes are happening whether you feel them or not. How are you supporting your recovery today?",
      "Tobacco addiction affects neurotransmitter systems: dopamine (reward), serotonin (mood), GABA (anxiety), acetylcholine (attention). Recovery involves rebalancing these systems through time, support, and sometimes medication. What aspect of recovery would you like to understand better?",
      "Evidence-based quit strategies include: Setting a quit date, removing triggers, building support systems, learning coping skills, considering medication, planning for setbacks. Success increases with preparation and professional support. Which areas would you like help developing?"
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const generateRegularAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    const responseCategories = {
      emotional: [
        "I hear you, and what you're feeling is completely valid. Recovery isn't linear, and having tough moments doesn't diminish your progress. What's one small thing that might bring you comfort right now?",
        "Those feelings are part of your brain healing. You've already proven you're stronger than you think - you're here, you're fighting, and that matters more than you know. What support do you need in this moment?",
        "It's okay to feel overwhelmed sometimes. Every person in recovery has been exactly where you are right now. You're not alone in this struggle. Would it help to talk about what triggered these feelings?",
        "Your emotions are signals that your body is adjusting to a healthier way of being. That takes courage. What's one thing you can do today to show yourself the same compassion you'd show a good friend?",
        "These difficult moments are temporary, but your strength is permanent. You've survived every tough day so far - that's a 100% success rate. What's helped you get through challenging times before?"
      ],
      practical: [
        "Let's break this down into manageable pieces. What's the most immediate thing bothering you right now? Sometimes addressing one small issue can make everything feel more manageable.",
        "When everything feels chaotic, returning to basics can help: deep breathing, staying hydrated, getting some fresh air. Which of these feels most doable for you right now?",
        "Recovery tools work best when they're specific to your situation. What's your environment like right now? Are you somewhere safe where you can try a quick grounding exercise?",
        "Your past successes are proof of your capability. Think about a time recently when you handled a difficult situation well. What made that different? Can we apply any of those strategies now?",
        "Sometimes we need to change our physical state to change our mental state. Could you try changing your location, playing different music, or doing some gentle movement?"
      ],
      encouraging: [
        "You're doing something incredibly brave by reaching out. That takes self-awareness and strength. Many people struggle alone - but you're actively seeking support, and that's powerful.",
        "Every day you choose recovery, you're literally rewiring your brain for health. The science is on your side, and so are we. Your efforts are creating lasting positive changes.",
        "Recovery is like building muscle - there are days it feels impossible, and days it feels effortless. Both are normal. You're in training for a healthier life, and you're making progress even when you can't see it.",
        "You've already overcome so much to get to this point. That same strength that brought you here will carry you through this moment too. What would you tell someone else going through exactly what you're experiencing?",
        "The fact that you're struggling and still choosing recovery shows incredible resilience. Not everyone has that kind of determination. You should be proud of yourself for not giving up."
      ]
    };

    if (input.includes('sad') || input.includes('depressed') || input.includes('down') || input.includes('hopeless')) {
      return responseCategories.emotional[Math.floor(Math.random() * responseCategories.emotional.length)];
    }
    
    if (input.includes('help') || input.includes('what do i do') || input.includes('how') || input.includes('stressed')) {
      return responseCategories.practical[Math.floor(Math.random() * responseCategories.practical.length)];
    }
    
    if (input.includes('can\'t') || input.includes('hard') || input.includes('difficult') || input.includes('struggling')) {
      return responseCategories.encouraging[Math.floor(Math.random() * responseCategories.encouraging.length)];
    }
    
    // Default varied responses
    const allResponses = [...responseCategories.emotional, ...responseCategories.practical, ...responseCategories.encouraging];
    return allResponses[Math.floor(Math.random() * allResponses.length)];
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
    
    // Use Watson AI if in Watson mode, otherwise use improved regular AI
    setTimeout(() => {
      const aiResponse = {
        type: isWatsonMode ? 'watson' : 'ai',
        text: isWatsonMode ? generateWatsonResponse(newMessage.text) : generateRegularAIResponse(newMessage.text),
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
    <div className="min-h-screen p-4 pt-20 bg-black overflow-y-auto">
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
