
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Target, User, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QuitPlanGenerator = () => {
  const [formData, setFormData] = useState({
    name: 'Alex',
    currentUsage: '',
    quitDate: '',
    motivation: '',
    triggers: '',
    supportSystem: ''
  });
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePlan = async () => {
    if (!formData.currentUsage || !formData.quitDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in your current usage and quit date.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Generate actual personalized plan based on user input
    setTimeout(() => {
      const quitDateObj = new Date(formData.quitDate);
      const today = new Date();
      const daysUntilQuit = Math.ceil((quitDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      const plan = {
        quitDate: formData.quitDate,
        name: formData.name,
        currentUsage: formData.currentUsage,
        motivation: formData.motivation,
        phases: [
          {
            phase: "Preparation Phase",
            duration: `${Math.max(1, daysUntilQuit)} days before quit date`,
            tasks: [
              `Remove all smoking materials from home and car`,
              `Tell ${formData.supportSystem || 'family and friends'} about your quit date: ${formData.quitDate}`,
              `Stock up on nicotine patches/gum if planning to use them`,
              `Prepare alternatives for your triggers: ${formData.triggers || 'stress and social situations'}`,
              `Practice breathing exercises daily using this app`,
              `Write down your motivation: "${formData.motivation || 'better health'}"`
            ]
          },
          {
            phase: "Quit Day",
            duration: "Day 1",
            tasks: [
              `Start your morning with meditation and remember: "${formData.motivation}"`,
              `Use this app's voice guidance feature whenever you feel cravings`,
              `Stay hydrated - drink 8 glasses of water`,
              `Contact ${formData.supportSystem || 'your support person'} when tempted`,
              `Celebrate each hour smoke-free - you're doing this!`,
              `If using nicotine patches, apply your first one in the morning`
            ]
          },
          {
            phase: "Early Recovery",
            duration: "Days 2-7",
            tasks: [
              `Continue using voice coaching during strong cravings`,
              `Take short walks when facing your triggers: ${formData.triggers || 'stress'}`,
              `Practice the 4-7-8 breathing technique from the app`,
              `Check in with ${formData.supportSystem || 'your support network'} daily`,
              `Reward yourself for each smoke-free day`,
              `If using nicotine replacement, follow the recommended schedule`
            ]
          },
          {
            phase: "Stabilization",
            duration: "Weeks 2-4",
            tasks: [
              `Establish new routines to replace smoking habits`,
              `Continue using this app for motivation and support`,
              `Exercise regularly to manage stress and improve health`,
              `Avoid or modify situations related to: ${formData.triggers || 'your triggers'}`,
              `Consider professional counseling if cravings are intense`,
              `Gradually reduce nicotine replacement if using`
            ]
          }
        ],
        emergencyContacts: [
          "Crisis Helpline: 9152987821",
          `Your Support Person: ${formData.supportSystem || '(Add contact)'}`,
          "Mental Health Helpline: 1860-2662-345"
        ],
        dailyGoals: [
          "Use breathing exercises 3 times daily",
          "Log mood and cravings in the app",
          "Drink 8 glasses of water",
          "Take a 15-minute walk",
          `Remember your motivation: "${formData.motivation || 'your health and future'}"`
        ],
        nicotineAdvice: `Since you currently use ${formData.currentUsage}, consider nicotine patches or gum to manage withdrawal. Start with the highest strength and gradually reduce over 8-12 weeks. Patches provide steady nicotine release, while gum gives you control during cravings.`
      };
      
      setGeneratedPlan(plan);
      setIsGenerating(false);
      
      toast({
        title: "Personalized Plan Generated!",
        description: `Your custom quit plan for ${formData.name} is ready.`
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen p-4 pt-20 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-serif text-white mb-4 text-glow">
            Quit Plan Generator 📋
          </h1>
          <p className="text-cyan-300 text-lg opacity-80">
            Create your personalized recovery roadmap
          </p>
        </div>

        {!generatedPlan ? (
          /* Form Section */
          <Card className="glass-card p-8 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <User className="w-6 h-6 mr-3 text-cyan-400" />
                Tell us about your journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="glass-card border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="usage" className="text-white">Current usage (per day)</Label>
                  <Input
                    id="usage"
                    placeholder="e.g., 10 cigarettes, 2 vapes"
                    value={formData.currentUsage}
                    onChange={(e) => handleInputChange('currentUsage', e.target.value)}
                    className="glass-card border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="quitDate" className="text-white">Target Quit Date</Label>
                <Input
                  id="quitDate"
                  type="date"
                  value={formData.quitDate}
                  onChange={(e) => handleInputChange('quitDate', e.target.value)}
                  className="glass-card border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="motivation" className="text-white">What motivates you to quit?</Label>
                <Input
                  id="motivation"
                  placeholder="e.g., Health, family, money"
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  className="glass-card border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="triggers" className="text-white">What are your main triggers?</Label>
                <Input
                  id="triggers"
                  placeholder="e.g., Stress, social situations, after meals"
                  value={formData.triggers}
                  onChange={(e) => handleInputChange('triggers', e.target.value)}
                  className="glass-card border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="support" className="text-white">Who's in your support system?</Label>
                <Input
                  id="support"
                  placeholder="e.g., Family, friends, counselor"
                  value={formData.supportSystem}
                  onChange={(e) => handleInputChange('supportSystem', e.target.value)}
                  className="glass-card border-white/20 text-white"
                />
              </div>

              <Button
                onClick={generatePlan}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 py-6 text-lg"
              >
                {isGenerating ? (
                  <>
                    <Lightbulb className="w-5 h-5 mr-2 animate-pulse" />
                    Generating Your Plan...
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5 mr-2" />
                    Generate My Quit Plan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Generated Plan Display */
          <div className="space-y-6 animate-fade-in">
            <Card className="glass-card p-6">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-green-400" />
                  {generatedPlan.name}'s Personalized Quit Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <p className="text-cyan-300">
                    Quit Date: <span className="font-bold text-white">{generatedPlan.quitDate}</span>
                  </p>
                  <p className="text-cyan-300">
                    Current Usage: <span className="font-bold text-white">{generatedPlan.currentUsage}</span>
                  </p>
                </div>
                
                {/* Nicotine Replacement Advice */}
                <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h3 className="text-blue-300 font-semibold mb-3">💊 Nicotine Replacement Therapy Guide</h3>
                  <p className="text-white text-sm">{generatedPlan.nicotineAdvice}</p>
                </div>
                
                {/* Daily Goals */}
                <div className="mb-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <h3 className="text-cyan-300 font-semibold mb-3">🎯 Daily Goals</h3>
                  <ul className="space-y-2">
                    {generatedPlan.dailyGoals.map((goal, index) => (
                      <li key={index} className="text-white flex items-center">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Emergency Contacts */}
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h3 className="text-red-300 font-semibold mb-3">🚨 Emergency Contacts</h3>
                  <ul className="space-y-2">
                    {generatedPlan.emergencyContacts.map((contact, index) => (
                      <li key={index} className="text-white">
                        {contact}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Plan Phases */}
            {generatedPlan.phases.map((phase, index) => (
              <Card key={index} className="glass-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </div>
                    {phase.phase}
                    <span className="ml-auto text-sm text-cyan-400">{phase.duration}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="text-gray-300 flex items-start">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        {task}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            <Button
              onClick={() => setGeneratedPlan(null)}
              variant="outline"
              className="w-full glass-card border-white/20 hover:border-cyan-400/50 hover:bg-cyan-500/10"
            >
              Create New Plan
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuitPlanGenerator;
