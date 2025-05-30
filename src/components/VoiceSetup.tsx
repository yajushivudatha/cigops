
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Settings } from 'lucide-react';
import { useVoiceSupport } from '@/hooks/useVoiceSupport';

const VoiceSetup = () => {
  const [apiKey, setApiKey] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(false);
  const { isSupported, initializeVoiceSupport } = useVoiceSupport();

  const handleSetup = async () => {
    if (!apiKey.trim()) return;
    
    setIsConfiguring(true);
    await initializeVoiceSupport(apiKey);
    setIsConfiguring(false);
  };

  if (isSupported) {
    return (
      <Card className="glass-card border-green-500/20">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 text-green-400">
            <Mic className="w-5 h-5" />
            <span className="text-sm font-medium">Voice Support Active</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Settings className="w-5 h-5" />
          <span>Voice Crisis Support Setup</span>
        </CardTitle>
        <CardDescription className="text-cyan-300/80">
          Configure ElevenLabs API for personalized voice coaching during cravings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="password"
          placeholder="Enter your ElevenLabs API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="glass-card border-white/20"
        />
        <Button 
          onClick={handleSetup}
          disabled={!apiKey.trim() || isConfiguring}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
        >
          {isConfiguring ? 'Setting up...' : 'Enable Voice Support'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VoiceSetup;
