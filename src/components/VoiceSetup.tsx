
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Settings } from 'lucide-react';
import { useVoiceSupport } from '@/hooks/useVoiceSupport';

const VoiceSetup = () => {
  const { isSupported, initializeVoiceSupport } = useVoiceSupport();

  useEffect(() => {
    // Auto-initialize with your API key
    const autoSetup = async () => {
      if (!isSupported) {
        await initializeVoiceSupport('sk_25f0209ce664221af67eb5ebf6ea445adcd5d2068d588a03');
      }
    };
    autoSetup();
  }, [initializeVoiceSupport, isSupported]);

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

  return null;
};

export default VoiceSetup;
