
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface VoiceSupportConfig {
  voiceId: string;
  apiKey: string;
}

export const useVoiceSupport = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [config, setConfig] = useState<VoiceSupportConfig | null>(null);
  const { toast } = useToast();

  const initializeVoiceSupport = async (apiKey: string) => {
    try {
      // Check if ElevenLabs API key is valid
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': apiKey
        }
      });

      if (response.ok) {
        setConfig({
          apiKey,
          voiceId: 'EXAVITQu4vr4xnSDxMaL' // Sarah voice
        });
        setIsSupported(true);
        toast({
          title: "Voice Support Ready",
          description: "AI voice coach is now available for crisis support"
        });
      } else {
        throw new Error('Invalid API key');
      }
    } catch (error) {
      toast({
        title: "Voice Support Error", 
        description: "Unable to initialize voice support. Please check your API key.",
        variant: "destructive"
      });
    }
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
      
      // Generate contextual voice message
      const voiceText = `Hello Alex. I'm here to help you through this moment. ${contextMessage} Let's take this one breath at a time. You've got this.`;
      
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + config.voiceId, {
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
    initializeVoiceSupport,
    startVoiceSession,
    endVoiceSession
  };
};
