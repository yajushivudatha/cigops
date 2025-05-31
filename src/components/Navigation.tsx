
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Calendar, Users, FileText, ShoppingBag, Zap, MapPin, Target } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const navigationItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Zap, label: "Calm Now", path: "/calm" },
    { icon: Calendar, label: "Quit Plan", path: "/plan" },
    { icon: Target, label: "Plan Generator", path: "/plan-generator" },
    { icon: Users, label: "Support", path: "/support" },
    { icon: MapPin, label: "Clinical", path: "/clinical" },
    { icon: FileText, label: "PDF Analyzer", path: "/analyzer" },
    { icon: ShoppingBag, label: "Marketplace", path: "/marketplace" }
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="glass-card px-4 py-3 rounded-full">
        <div className="flex space-x-4">
          {navigationItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center space-y-1 p-2 rounded-full transition-all duration-300
                ${location.pathname === item.path 
                  ? 'bg-cyan-500/20 text-cyan-400 scale-110' 
                  : 'text-gray-400 hover:text-cyan-300 hover:scale-105'
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
