
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import GreetingScreen from './GreetingScreen';

const Layout = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName] = useState("Alex");
  const [showGreeting, setShowGreeting] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleGreetingTransition = () => {
    setShowGreeting(false);
  };

  const isHomePage = location.pathname === '/';

  if (showGreeting && isHomePage) {
    return <GreetingScreen onTransition={handleGreetingTransition} />;
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Breathing Bubbles Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/20 rounded-full animate-breathe"></div>
        <div className="absolute top-1/3 right-32 w-24 h-24 bg-blue-500/15 rounded-full animate-breathe" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full animate-breathe" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-teal-500/15 rounded-full animate-breathe" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-indigo-500/10 rounded-full animate-breathe" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Header */}
      {isHomePage && (
        <div className="relative z-10 text-center pt-12 pb-8 animate-fade-in">
          <h1 className="text-5xl font-serif text-white mb-2 text-glow">
            {getGreeting()}, {userName} 💙
          </h1>
          <p className="text-cyan-300 text-lg opacity-80">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      )}

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
