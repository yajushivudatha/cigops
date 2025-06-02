
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface VoiceSupportConfig {
  voiceId: string;
  apiKey: string;
}

export const useVoiceSupport = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [config] = useState<VoiceSupportConfig>({
    apiKey: 'sk_25f0209ce664221af67eb5ebf6ea445adcd5d2068d588a03',
    voiceId: '2WM58lWaTXuuBkN1puHx'
  });
  const { toast } = useToast();

  const speak = async (text: string) => {
    if (!config) return;

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${config.voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': config.apiKey
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.play();
        
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
        };
      }
    } catch (error) {
      console.log('Voice error:', error);
    }
  };

  const initializeVoiceSupport = async (apiKey: string) => {
    return Promise.resolve();
  };

  const startVoiceSession = async (contextMessage: string) => {
    if (!config) {
      toast({
        title: "Setup Required",
        description: "Please configure your ElevenLabs API key first",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsConnected(true);
      
      const voiceText = `Hello Alex. I'm here to help you through this moment. ${contextMessage} Let's take this one breath at a time. You've got this.`;
      
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${config.voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': config.apiKey
        },
        body: JSON.stringify({
          text: voiceText,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.play();
        
        toast({
          title: "Voice Session Active",
          description: "Your AI coach is speaking with you now"
        });

        audio.onended = () => {
          setIsConnected(false);
          URL.revokeObjectURL(audioUrl);
        };
      } else {
        throw new Error('Failed to generate voice');
      }
    } catch (error) {
      setIsConnected(false);
      toast({
        title: "Connection Error",
        description: "Unable to start voice session. Please try again.",
        variant: "destructive"
      });
    }
  };

  const endVoiceSession = () => {
    setIsConnected(false);
    toast({
      title: "Session Ended",
      description: "Voice support session has ended"
    });
  };

  return {
    isConnected,
    isSupported,
    speak,
    initializeVoiceSupport,
    startVoiceSession,
    endVoiceSession
  };
};
