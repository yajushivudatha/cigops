
export interface MeditationScript {
  introduction: string;
  cycles: Array<{
    phase: 'inhale' | 'hold' | 'exhale' | 'pause';
    duration: number;
    instruction: string;
  }>;
  conclusion: string;
  totalCycles: number;
}

export const meditationScripts = {
  '478': {
    introduction: "Let's begin the 4-7-8 breathing technique. This will help calm your nervous system.",
    cycles: [
      { phase: 'inhale', duration: 4, instruction: 'Breathe in through your nose' },
      { phase: 'hold', duration: 7, instruction: 'Hold your breath' },
      { phase: 'exhale', duration: 8, instruction: 'Exhale slowly through your mouth' }
    ],
    conclusion: "Let your breath return to normal. Notice the calm in your body.",
    totalCycles: 4
  },
  box: {
    introduction: "We'll practice Box Breathing - a technique used by Navy SEALs for focus and calm.",
    cycles: [
      { phase: 'inhale', duration: 4, instruction: 'Breathe in slowly' },
      { phase: 'hold', duration: 4, instruction: 'Hold your breath' },
      { phase: 'exhale', duration: 4, instruction: 'Exhale completely' },
      { phase: 'hold', duration: 4, instruction: 'Hold empty' }
    ],
    conclusion: "Return to natural breathing. Feel the balance and control.",
    totalCycles: 5
  },
  equal: {
    introduction: "Equal Breathing helps balance your nervous system with equal inhale and exhale.",
    cycles: [
      { phase: 'inhale', duration: 6, instruction: 'Breathe in steadily' },
      { phase: 'exhale', duration: 6, instruction: 'Breathe out smoothly' }
    ],
    conclusion: "Continue this rhythm naturally. Feel the harmony in your breath.",
    totalCycles: 8
  },
  triangle: {
    introduction: "Triangle Breathing creates a steady, calming rhythm in three parts.",
    cycles: [
      { phase: 'inhale', duration: 4, instruction: 'Breathe in deeply' },
      { phase: 'hold', duration: 4, instruction: 'Hold with awareness' },
      { phase: 'exhale', duration: 4, instruction: 'Release slowly' }
    ],
    conclusion: "Feel the triangular flow settle into natural breath.",
    totalCycles: 6
  }
};
