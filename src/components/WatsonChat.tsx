import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'watson';
  timestamp: Date;
}

const WatsonChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Watson, your AI clinical support assistant. I can help you find treatment options, understand addiction recovery, and provide evidence-based guidance. How can I assist you today?",
      sender: 'watson',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate Watson AI response - replace with actual Watson API call
      setTimeout(() => {
        const watsonResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: generateWatsonResponse(inputMessage),
          sender: 'watson',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, watsonResponse]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to get response from Watson AI",
        variant: "destructive"
      });
    }
  };

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

  return (
    <Card className="glass-card h-96">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <MessageCircle className="w-5 h-5 mr-2 text-blue-400" />
          Watson AI Clinical Support
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-full flex flex-col">
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                max-w-xs p-3 rounded-lg
                ${message.sender === 'user' 
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-blue-500/20 text-blue-100 border border-blue-500/30'
                }
              `}>
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-blue-500/20 text-blue-100 border border-blue-500/30 max-w-xs p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Watson about treatment options..."
              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-blue-500 hover:bg-blue-600"
              disabled={isLoading || !inputMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WatsonChat;
