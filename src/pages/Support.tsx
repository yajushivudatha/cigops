
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Phone, Video, Users, Heart, Star } from 'lucide-react';

const Support = () => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted', { name, email, message });
    setSubmitted(true);
    // Reset form after submission
    setName('');
    setEmail('');
    setMessage('');
    // Optionally, reset the submitted state after a delay
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-y-auto pb-16">
      {/* Breathing Bubbles Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/20 rounded-full animate-breathe"></div>
        <div className="absolute top-1/3 right-32 w-24 h-24 bg-blue-500/15 rounded-full animate-breathe" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full animate-breathe" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-teal-500/15 rounded-full animate-breathe" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-indigo-500/10 rounded-full animate-breathe" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 p-4">
        <div className="max-w-4xl mx-auto py-12">
          <Card className="glass-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white">
                We're here to support you 💙
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4">
                {/* Support Channels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card className="glass-card p-4 hover:scale-105 transition-transform duration-200">
                    <CardContent className="flex items-center space-x-4 p-0">
                      <MessageCircle className="text-cyan-400 w-6 h-6" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Chat with us</h3>
                        <p className="text-sm text-gray-400">Available 24/7</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card p-4 hover:scale-105 transition-transform duration-200">
                    <CardContent className="flex items-center space-x-4 p-0">
                      <Phone className="text-blue-400 w-6 h-6" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Call our hotline</h3>
                        <p className="text-sm text-gray-400">Mon-Fri, 9am-5pm</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card p-4 hover:scale-105 transition-transform duration-200">
                    <CardContent className="flex items-center space-x-4 p-0">
                      <Video className="text-purple-400 w-6 h-6" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Video consultation</h3>
                        <p className="text-sm text-gray-400">Book an appointment</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card p-4 hover:scale-105 transition-transform duration-200">
                    <CardContent className="flex items-center space-x-4 p-0">
                      <Users className="text-green-400 w-6 h-6" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Join our community</h3>
                        <p className="text-sm text-gray-400">Share your journey</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Form */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-white mb-4">
                    Or send us a message:
                  </h4>
                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-black/50 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300">
                        Your Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black/50 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-gray-300">
                        Your Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="bg-black/50 border-gray-700 text-white resize-none"
                        required
                      />
                    </div>
                    <Button type="submit" disabled={submitted}>
                      {submitted ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </div>

                {/* Success Message */}
                {submitted && (
                  <div className="text-green-500">
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}

                {/* Testimonials */}
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">
                    What others are saying:
                  </h4>
                  <div className="space-y-4">
                    <Card className="glass-card p-4">
                      <CardContent className="p-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <Heart className="text-red-400 w-4 h-4" />
                          <Heart className="text-red-400 w-4 h-4" />
                          <Heart className="text-red-400 w-4 h-4" />
                          <Heart className="text-red-400 w-4 h-4" />
                          <Star className="text-gray-400 w-4 h-4" />
                        </div>
                        <p className="text-gray-300 text-sm">
                          "This app has been a lifesaver. The support team is
                          amazing and always ready to help."
                        </p>
                        <p className="text-gray-400 text-xs mt-2">
                          - Alex M.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="glass-card p-4">
                      <CardContent className="p-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <Heart className="text-red-400 w-4 h-4" />
                          <Heart className="text-red-400 w-4 h-4" />
                          <Heart className="text-red-400 w-4 h-4" />
                          <Heart className="text-red-400 w-4 h-4" />
                          <Heart className="text-red-400 w-4 h-4" />
                        </div>
                        <p className="text-gray-300 text-sm">
                          "I've never felt so supported in my recovery journey.
                          Thank you for everything!"
                        </p>
                        <p className="text-gray-400 text-xs mt-2">
                          - Jordan L.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;
