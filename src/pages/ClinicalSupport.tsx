
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Phone, Video, Stethoscope, Heart, Activity } from 'lucide-react';

const ClinicalSupport = () => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [location, setLocation] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Appointment Details:', {
      appointmentDate,
      appointmentTime,
      location,
      doctorName,
      notes,
    });
    // Reset form fields after submission
    setAppointmentDate('');
    setAppointmentTime('');
    setLocation('');
    setDoctorName('');
    setNotes('');
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif text-white mb-2 text-glow animate-fade-in">
              Clinical Support 🩺
            </h1>
            <p className="text-cyan-300 text-lg opacity-80 animate-fade-in">
              Find immediate professional help near you
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Treatment Centers Near You */}
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                  Treatment Centers Near You
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Map placeholder */}
                <div className="bg-gray-800/50 h-64 rounded-lg mb-4 flex items-center justify-center">
                  <p className="text-gray-400">Map showing nearby treatment centers</p>
                </div>
                
                {/* Treatment Centers List */}
                <div className="space-y-4">
                  <Card className="bg-gray-800/30 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-semibold">Apollo Wellness Center</h4>
                        <Badge className="bg-green-500/20 text-green-400">24/7</Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">📍 123 MG Road, Bangalore</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-300 mb-3">
                        <span>⭐ 4.8</span>
                        <span>⏰ 24/7</span>
                        <span>📏 0.8 km</span>
                      </div>
                      <div className="flex space-x-2 mb-3">
                        <Badge variant="outline" className="text-cyan-400 border-cyan-400 text-xs">Addiction Recovery</Badge>
                        <Badge variant="outline" className="text-blue-400 border-blue-400 text-xs">Mental Health</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button className="bg-green-500 hover:bg-green-600 text-white text-sm">
                          <Phone className="w-3 h-3 mr-1" />
                          Call Now
                        </Button>
                        <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/20 text-sm">
                          <MapPin className="w-3 h-3 mr-1" />
                          Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/30 border-gray-700">
                    <CardContent className="p-4">
                      <h4 className="text-white font-semibold mb-2">Manipal Hospital Recovery</h4>
                      <p className="text-gray-400 text-sm mb-2">📍 456 Brigade Road, Bangalore</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-300 mb-3">
                        <span>⭐ 4.6</span>
                        <span>⏰ 8 AM - 8 PM</span>
                        <span>📏 1.2 km</span>
                      </div>
                      <div className="flex space-x-2 mb-3">
                        <Badge variant="outline" className="text-cyan-400 border-cyan-400 text-xs">Outpatient Care</Badge>
                        <Badge variant="outline" className="text-green-400 border-green-400 text-xs">Counselling</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button className="bg-green-500 hover:bg-green-600 text-white text-sm">
                          <Phone className="w-3 h-3 mr-1" />
                          Call Now
                        </Button>
                        <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/20 text-sm">
                          <MapPin className="w-3 h-3 mr-1" />
                          Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/30 border-gray-700">
                    <CardContent className="p-4">
                      <h4 className="text-white font-semibold mb-2">NIMHANS De-addiction Unit</h4>
                      <p className="text-gray-400 text-sm mb-2">📍 789 Hosur Road, Bangalore</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-300 mb-3">
                        <span>⭐ 4.9</span>
                        <span>⏰ 24/7</span>
                        <span>📏 1.5 km</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button className="bg-green-500 hover:bg-green-600 text-white text-sm">
                          <Phone className="w-3 h-3 mr-1" />
                          Call Now
                        </Button>
                        <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/20 text-sm">
                          <MapPin className="w-3 h-3 mr-1" />
                          Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Support */}
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-red-400">Emergency Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Crisis Helpline - 9152987821
                </Button>
                <Button variant="outline" className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/20">
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Services - 102
                </Button>
                <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/20">
                  <Phone className="w-4 h-4 mr-2" />
                  Mental Health Helpline
                </Button>
                
                <div className="text-yellow-400 text-sm p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  ⚠️ If you're in immediate danger, call 102. For mental health crisis support, call the helpline numbers above.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalSupport;
