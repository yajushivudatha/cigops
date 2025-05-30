
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UserContext {
  location: string;
  mood: string;
  recentActivity: string;
  cravingCount: number;
  successfulResistances: number;
  lastSuccessfulStrategy: string;
}

interface AICoachResponse {
  message: string;
  strategy: string;
  urgencyLevel: 'low' | 'medium' | 'high';
}

export const useAICoach = () => {
  const [userContext, setUserContext] = useState<UserContext>({
    location: 'home',
    mood: 'neutral',
    recentActivity: 'browsing app',
    cravingCount: 7,
    successfulResistances: 3,
    lastSuccessfulStrategy: 'deep breathing'
  });
  const { toast } = useToast();

  const getContextualAdvice = (trigger?: string): AICoachResponse => {
    const timeOfDay = new Date().getHours();
    const isEvening = timeOfDay >= 18;
    
    // Context-aware responses based on user data
    const responses = {
      craving: {
        message: `Alex, you've successfully resisted ${userContext.successfulResistances} cravings this week! Remember how good you felt after using ${userContext.lastSuccessfulStrategy} on Tuesday?`,
        strategy: userContext.lastSuccessfulStrategy,
        urgencyLevel: 'high' as const
      },
      stress: {
        message: isEvening 
          ? "Evening stress can be tough. Let's use the same technique that helped you this week."
          : "I notice you're feeling stressed. Your breathing exercises worked well before.",
        strategy: 'progressive muscle relaxation',
        urgencyLevel: 'medium' as const
      },
      routine: {
        message: "You're building great habits! Your consistency this week shows real progress.",
        strategy: 'habit reinforcement',
        urgencyLevel: 'low' as const
      }
    };

    return responses[trigger as keyof typeof responses] || responses.routine;
  };

  const updateContext = (updates: Partial<UserContext>) => {
    setUserContext(prev => ({ ...prev, ...updates }));
  };

  const triggerCrisisSupport = async () => {
    const advice = getContextualAdvice('craving');
    toast({
      title: "AI Coach Activated",
      description: advice.message,
      duration: 5000
    });
    return advice;
  };

  return {
    userContext,
    updateContext,
    getContextualAdvice,
    triggerCrisisSupport
  };
};
