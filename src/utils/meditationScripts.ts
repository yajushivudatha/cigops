
export interface MeditationScript {
  introduction: string;
  cycles: string[];
  conclusion: string;
}

export const meditationScripts = {
  '478': {
    introduction: "Begin.",
    cycles: [
      "Inhale — 2, 3, 4. Hold — 2, 3, 4, 5, 6, 7. Exhale — 2, 3, 4, 5, 6, 7, 8.",
      "Again. Inhale — 2, 3, 4. Hold — 2, 3, 4, 5, 6, 7. Exhale — 2, 3, 4, 5, 6, 7, 8.",
      "Keep going. Inhale — 2, 3, 4. Hold — 2, 3, 4, 5, 6, 7. Exhale — 2, 3, 4, 5, 6, 7, 8.",
      "One more. Inhale — 2, 3, 4. Hold — 2, 3, 4, 5, 6, 7. Exhale — 2, 3, 4, 5, 6, 7, 8."
    ],
    conclusion: "Let your breath return to normal. Stay still. Notice the calm."
  },
  box: {
    introduction: "We will begin Box Breathing.",
    cycles: [
      "Inhale — 2, 3, 4. Hold — 2, 3, 4. Exhale — 2, 3, 4. Hold — 2, 3, 4.",
      "Inhale — 2, 3, 4. Hold — 2, 3, 4. Exhale — 2, 3, 4. Hold — 2, 3, 4.",
      "Repeat this cycle. Keep your breath steady. Focus on the count.",
      "Continue for five minutes."
    ],
    conclusion: "Now return to normal breathing."
  },
  equal: {
    introduction: "We will now begin Equal Breathing.",
    cycles: [
      "Inhale — 2, 3, 4, 5, 6. Exhale — 2, 3, 4, 5, 6.",
      "Inhale — 2, 3, 4, 5, 6. Exhale — 2, 3, 4, 5, 6.",
      "Keep the breath smooth. No pauses.",
      "Repeat for five minutes."
    ],
    conclusion: "Return to natural breath."
  },
  triangle: {
    introduction: "We now begin Triangle Breathing.",
    cycles: [
      "Inhale — 2, 3, 4. Hold — 2, 3, 4. Exhale — 2, 3, 4.",
      "Inhale — 2, 3, 4. Hold — 2, 3, 4. Exhale — 2, 3, 4.",
      "Maintain rhythm.",
      "Repeat for five minutes."
    ],
    conclusion: "Return to normal breathing."
  }
};
