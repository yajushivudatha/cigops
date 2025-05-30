
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const QuoteOfTheDay = () => {
  const quotes = [
    {
      text: "Every moment is a fresh beginning. You have the strength to choose differently.",
      author: "T.S. Eliot"
    },
    {
      text: "The greatest revolution of our generation is the discovery that human beings can alter their lives by altering their attitudes.",
      author: "William James"
    },
    {
      text: "You are braver than you believe, stronger than you seem, and more loved than you know.",
      author: "A.A. Milne"
    },
    {
      text: "Progress, not perfection. Every step forward is a victory worth celebrating.",
      author: "Recovery Wisdom"
    }
  ];

  const [currentQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  return (
    <Card className="glass-card p-6 text-center max-w-2xl mx-auto">
      <CardContent className="p-0">
        <Quote className="w-8 h-8 text-cyan-400 mx-auto mb-4 opacity-60" />
        <blockquote className="text-lg text-white font-serif mb-4 leading-relaxed">
          "{currentQuote.text}"
        </blockquote>
        <cite className="text-cyan-300 text-sm opacity-80">— {currentQuote.author}</cite>
      </CardContent>
    </Card>
  );
};

export default QuoteOfTheDay;
