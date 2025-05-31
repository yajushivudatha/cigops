
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
    
    if (input.includes('treatment') || input.includes('rehab')) {
      return "Based on clinical evidence, effective addiction treatment typically includes a combination of medical detox, behavioral therapy, and long-term support. I can help you find local treatment centers that offer these evidence-based approaches. Would you like me to search for facilities in your area?";
    }
    
    if (input.includes('withdrawal') || input.includes('detox')) {
      return "Withdrawal symptoms are a normal part of recovery. Medical supervision during detox is recommended for safety. Symptoms typically peak within 72 hours and gradually improve. I can provide information about medically-assisted detox programs near you. Are you experiencing withdrawal symptoms now?";
    }
    
    if (input.includes('relapse') || input.includes('craving')) {
      return "Cravings are a normal part of recovery. Evidence-based strategies include: mindfulness techniques, reaching out to support networks, engaging in physical activity, and using coping skills from therapy. If cravings are intense, consider contacting your treatment provider or calling a crisis line. Would you like specific coping strategies?";
    }
    
    if (input.includes('help') || input.includes('emergency')) {
      return "If you're in immediate crisis, please call 988 (Suicide & Crisis Lifeline) or 911. For non-emergency support, I can help you find local treatment resources, provide information about addiction recovery, or discuss evidence-based treatment options. What specific support do you need?";
    }
    
    return "I understand you're looking for support. As your AI clinical assistant, I can provide evidence-based information about addiction treatment, help you find local resources, or discuss recovery strategies. Could you tell me more specifically how I can help you today?";
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
