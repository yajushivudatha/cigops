
import React from 'react';

interface ProgressRingProps {
  current: number;
  total: number;
  label: string;
}

const ProgressRing = ({ current, total, label }: ProgressRingProps) => {
  const percentage = Math.min((current / total) * 100, 100);
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          className="text-gray-600"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-cyan-400 transition-all duration-1000 ease-out"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))'
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{current}</span>
        <span className="text-xs text-gray-300 text-center px-2">{label}</span>
      </div>
    </div>
  );
};

export default ProgressRing;
