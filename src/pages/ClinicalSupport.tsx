import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Star } from 'lucide-react';
import WatsonChat from '@/components/WatsonChat';

const ClinicalSupport = () => {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  const nearbyClinics = [
    {
      name: "Sunrise Recovery Center",
      address: "123 Hope Street, Downtown",
      phone: "(555) 123-4567",
      distance: "0.8 miles",
      rating: 4.8,
      hours: "24/7",
      specialties: ["Addiction Recovery", "Mental Health"],
      emergency: true
    },
    {
      name: "Valley Wellness Clinic",
      address: "456 Healing Ave, Midtown",
      phone: "(555) 234-5678",
      distance: "1.2 miles",
      rating: 4.6,
      hours: "8 AM - 8 PM",
      specialties: ["Outpatient Care", "Counseling"],
      emergency: false
    },
    {
      name: "New Beginnings Rehab",
      address: "789 Recovery Blvd, Uptown",
      phone: "(555) 345-6789",
      distance: "1.5 miles",
      rating: 4.9,
      hours: "24/7",
      specialties: ["Inpatient Care", "Detox"],
      emergency: true
    },
    {
      name: "Peaceful Mind Center",
      address: "321 Serenity Lane, Westside",
      phone: "(555) 456-7890",
      distance: "2.1 miles",
      rating: 4.7,
      hours: "9 AM - 6 PM",
      specialties: ["Therapy", "Support Groups"],
      emergency: false
    },
    {
      name: "Harbor House Treatment",
      address: "654 Anchor Way, Riverside",
      phone: "(555) 567-8901",
      distance: "2.3 miles",
      rating: 4.5,
      hours: "24/7",
      specialties: ["Residential Care", "Family Support"],
      emergency: true
    }
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
          setUserLocation({ lat: 40.7128, lng: -74.0060 });
        }
      );
    }
  }, []);

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/maps?daddr=${encodedAddress}`, '_blank');
  };

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-serif text-white mb-4 text-glow">
            Clinical Support 🏥
          </h1>
          <p className="text-cyan-300 text-lg opacity-80">
            Find immediate professional help near you
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <Card className="glass-card h-96 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-cyan-400" />
                Nearby Clinics & Rehab Centers
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div className="w-full h-64 bg-slate-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-300">
                  <MapPin className="w-12 h-12 mx-auto mb-2 text-cyan-400" />
                  <p>Interactive map would display here</p>
                  <p className="text-sm opacity-60">Showing {nearbyClinics.length} facilities nearby</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Watson AI Chat */}
          <div className="animate-scale-in">
            <WatsonChat />
          </div>

          {/* Emergency Contact */}
          <Card className="glass-card animate-scale-in">
            <CardHeader>
              <CardTitle className="text-red-400">Emergency Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => handleCall('988')}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg"
              >
                <Phone className="w-6 h-6 mr-2" />
                Call 988 - Crisis Lifeline
              </Button>
              <Button
                onClick={() => handleCall('911')}
                variant="outline"
                className="w-full border-red-400 text-red-400 hover:bg-red-400 hover:text-white py-4"
              >
                <Phone className="w-5 h-5 mr-2" />
                Emergency Services - 911
              </Button>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-yellow-300 text-sm">
                  💡 If you're in immediate danger, call 911. For mental health crisis support, call 988.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clinics List */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Treatment Centers Near You</h2>
          <div className="grid gap-4">
            {nearbyClinics.map((clinic, index) => (
              <Card key={index} className="glass-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                        {clinic.name}
                        {clinic.emergency && (
                          <span className="ml-2 px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">24/7</span>
                        )}
                      </h3>
                      <p className="text-gray-300 mb-2 flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-cyan-400" />
                        {clinic.address}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400" />
                          {clinic.rating}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-green-400" />
                          {clinic.hours}
                        </span>
                        <span className="text-cyan-400">{clinic.distance}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-300 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {clinic.specialties.map((specialty, idx) => (
                        <span key={idx} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={() => handleCall(clinic.phone)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                    <Button
                      onClick={() => handleDirections(clinic.address)}
                      variant="outline"
                      className="flex-1 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalSupport;
