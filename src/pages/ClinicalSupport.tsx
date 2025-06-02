import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Phone, Video, Stethoscope, Pills, Heart, Activity } from 'lucide-react';

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
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-serif text-white mb-2 text-glow animate-fade-in">
              Clinical Support 🩺
            </h1>
            <p className="text-cyan-300 text-lg opacity-80 animate-fade-in">
              Connect with healthcare professionals and manage your clinical information.
            </p>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {/* Find a Doctor */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center space-x-2">
                  <Stethoscope className="w-5 h-5 text-blue-400" />
                  <span>Find a Doctor</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Search for healthcare providers and specialists in your area.
                </p>
                <Button variant="secondary" className="mt-4 w-full">
                  Search Now
                </Button>
              </CardContent>
            </Card>

            {/* Schedule Appointment */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-green-400" />
                  <span>Schedule Appointment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Book appointments with your preferred doctors and manage your schedule.
                </p>
                <Button variant="secondary" className="mt-4 w-full">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Appointment Form */}
          <Card className="glass-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                New Appointment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="appointmentDate" className="text-gray-300">
                    Date
                  </Label>
                  <Input
                    type="date"
                    id="appointmentDate"
                    className="bg-transparent text-white"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="appointmentTime" className="text-gray-300">
                    Time
                  </Label>
                  <Input
                    type="time"
                    id="appointmentTime"
                    className="bg-transparent text-white"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-gray-300">
                    Location
                  </Label>
                  <Input
                    type="text"
                    id="location"
                    className="bg-transparent text-white"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Hospital, Clinic, or Online"
                  />
                </div>
                <div>
                  <Label htmlFor="doctorName" className="text-gray-300">
                    Doctor's Name
                  </Label>
                  <Input
                    type="text"
                    id="doctorName"
                    className="bg-transparent text-white"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="Dr. Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="notes" className="text-gray-300">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    className="bg-transparent text-white"
                    placeholder="Add any relevant information for the appointment"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Schedule Now
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Resources and Information */}
          <Card className="glass-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Helpful Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-300 text-sm">
                  <a href="#" className="hover:underline">
                    Understanding Nicotine Addiction
                  </a>
                </p>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-300 text-sm">
                  <a href="#" className="hover:underline">
                    Coping Strategies for Withdrawal Symptoms
                  </a>
                </p>
              </div>
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <p className="text-purple-300 text-sm">
                  <a href="#" className="hover:underline">
                    Finding Support Groups in Your Community
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClinicalSupport;
