
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';

const MoodSlider = () => {
  const [mood, setMood] = useState([50]);
  
  const getMoodEmoji = (value: number) => {
    if (value < 20) return { emoji: '😢', label: 'Very Low', color: 'text-red-400' };
    if (value < 40) return { emoji: '😟', label: 'Low', color: 'text-orange-400' };
    if (value < 60) return { emoji: '😐', label: 'Neutral', color: 'text-yellow-400' };
    if (value < 80) return { emoji: '😊', label: 'Good', color: 'text-green-400' };
    return { emoji: '😄', label: 'Excellent', color: 'text-cyan-400' };
  };

  const currentMood = getMoodEmoji(mood[0]);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-4xl mb-2 animate-scale-in">{currentMood.emoji}</div>
        <p className={`font-semibold ${currentMood.color}`}>{currentMood.label}</p>
      </div>
      
      <div className="px-2">
        <Slider
          value={mood}
          onValueChange={setMood}
          max={100}
          step={1}
          className="w-full"
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-400">
        <span>😢</span>
        <span>😐</span>
        <span>😄</span>
      </div>
    </div>
  );
};

export default MoodSlider;
