
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Star, Heart } from 'lucide-react';

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items', emoji: '🛍️' },
    { id: 'wellness', name: 'Wellness', emoji: '🧘‍♀️' },
    { id: 'nutrition', name: 'Nutrition', emoji: '🥗' },
    { id: 'habits', name: 'Habit Tools', emoji: '📝' },
    { id: 'comfort', name: 'Comfort', emoji: '☕' }
  ];

  const products = [
    {
      id: 1,
      name: "Calming Herbal Tea Blend",
      price: 24.99,
      rating: 4.8,
      category: 'wellness',
      image: '🍵',
      description: "Specially formulated to reduce cravings and calm nerves",
      bestFor: "Week 1-2",
      reviews: 156
    },
    {
      id: 2,
      name: "Mindfulness Journal",
      price: 19.99,
      rating: 4.9,
      category: 'habits',
      image: '📖',
      description: "Track your progress and thoughts during recovery",
      bestFor: "All stages",
      reviews: 203
    },
    {
      id: 3,
      name: "Stress Relief Fidget Kit",
      price: 15.99,
      rating: 4.7,
      category: 'comfort',
      image: '🎯',
      description: "Keep your hands busy during cravings",
      bestFor: "Week 1-4",
      reviews: 89
    },
    {
      id: 4,
      name: "Lung Detox Smoothie Mix",
      price: 32.99,
      rating: 4.6,
      category: 'nutrition',
      image: '🥤',
      description: "Antioxidant-rich blend to support lung healing",
      bestFor: "Month 1-3",
      reviews: 127
    },
    {
      id: 5,
      name: "Aromatherapy Essential Oils",
      price: 29.99,
      rating: 4.8,
      category: 'wellness',
      image: '🌿',
      description: "Lavender & eucalyptus for deep breathing exercises",
      bestFor: "All stages",
      reviews: 178
    },
    {
      id: 6,
      name: "Recovery Milestone Rewards",
      price: 12.99,
      rating: 4.9,
      category: 'comfort',
      image: '🏆',
      description: "Celebrate your achievements with these treats",
      bestFor: "Milestones",
      reviews: 234
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-serif text-white mb-4 text-glow">
            Recovery Marketplace 🛍️
          </h1>
          <p className="text-cyan-300 text-lg opacity-80">
            Curated products to support your smoke-free journey
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-scale-in">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant="outline"
              className={`
                glass-card border-white/20 transition-all duration-300
                ${selectedCategory === category.id
                  ? 'border-cyan-400/50 bg-cyan-500/20 text-cyan-300'
                  : 'hover:border-cyan-400/30 hover:bg-cyan-500/10'
                }
              `}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="glass-card hover:scale-105 transition-all duration-300 cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Product Image */}
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{product.image}</div>
                  <div className={`
                    inline-block px-3 py-1 rounded-full text-xs font-medium
                    ${product.bestFor.includes('Week') 
                      ? 'bg-yellow-500/20 text-yellow-300' 
                      : product.bestFor.includes('Month')
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-purple-500/20 text-purple-300'
                    }
                  `}>
                    Best for: {product.bestFor}
                  </div>
                </div>

                {/* Product Info */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-300 mb-3">{product.description}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center space-x-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 text-sm font-medium">{product.rating}</span>
                    <span className="text-gray-400 text-sm">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="text-2xl font-bold text-cyan-400 mb-4">
                    ${product.price}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full glass-card border-white/20 hover:border-red-400/50 hover:bg-red-500/10"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Save for Later
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Shopping Cart Summary */}
        <Card className="glass-card p-6 animate-fade-in">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Your Recovery Kit</h3>
                <p className="text-gray-300 text-sm">Items: 0 • Total: $0.00</p>
              </div>
              <Button className="bg-green-500 hover:bg-green-600">
                <ShoppingBag className="w-4 h-4 mr-2" />
                View Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Marketplace;
