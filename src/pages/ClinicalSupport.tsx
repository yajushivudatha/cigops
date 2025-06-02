
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Star } from 'lucide-react';

const ClinicalSupport = () => {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  const nearbyClinics = [
    {
      name: "Apollo Wellness Center",
      address: "123 MG Road, Bangalore",
      phone: "+91 80 2674 2222",
      distance: "0.8 km",
      rating: 4.8,
      hours: "24/7",
      specialties: ["Addiction Recovery", "Mental Health"],
      emergency: true
    },
    {
      name: "Manipal Hospital Recovery",
      address: "456 Brigade Road, Bangalore",
      phone: "+91 80 2552 2000",
      distance: "1.2 km",
      rating: 4.6,
      hours: "8 AM - 8 PM",
      specialties: ["Outpatient Care", "Counseling"],
      emergency: false
    },
    {
      name: "NIMHANS De-addiction Centre",
      address: "789 Hosur Road, Bangalore",
      phone: "+91 80 2699 5000",
      distance: "1.5 km",
      rating: 4.9,
      hours: "24/7",
      specialties: ["Inpatient Care", "Detox"],
      emergency: true
    },
    {
      name: "Fortis Mental Health Center",
      address: "321 Bannerghatta Road, Bangalore",
      phone: "+91 80 6621 4444",
      distance: "2.1 km",
      rating: 4.7,
      hours: "9 AM - 6 PM",
      specialties: ["Therapy", "Support Groups"],
      emergency: false
    },
    {
      name: "Cadabams Rehabilitation",
      address: "654 Whitefield Road, Bangalore",
      phone: "+91 97414 76476",
      distance: "2.3 km",
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
          setUserLocation({ lat: 12.9716, lng: 77.5946 }); // Bangalore coordinates
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

  const handleEmergencyCall = (number: string) => {
    window.open(`tel:${number}`);
  };

  return (
    <div className="min-h-screen p-4 pt-20 bg-black">
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

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Interactive Map */}
          <Card className="glass-card h-96 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-cyan-400" />
                Treatment Centers Near You
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div className="w-full h-64 rounded-lg relative overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d248849.8729732977!2d77.49085452503953!3d12.954285118847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1saddiction%20treatment%20centers%20bangalore!5e0!3m2!1sen!2sin!4v1703749281847!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="glass-card animate-scale-in">
            <CardHeader>
              <CardTitle className="text-red-400">Emergency Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => handleEmergencyCall('9152987821')}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg"
              >
                <Phone className="w-6 h-6 mr-2" />
                Crisis Helpline - 9152987821
              </Button>
              <Button
                onClick={() => handleEmergencyCall('102')}
                variant="outline"
                className="w-full border-red-400 text-red-400 hover:bg-red-400 hover:text-white py-4"
              >
                <Phone className="w-5 h-5 mr-2" />
                Emergency Services - 102
              </Button>
              <Button
                onClick={() => handleEmergencyCall('1860-2662-345')}
                variant="outline"
                className="w-full border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white py-4"
              >
                <Phone className="w-5 h-5 mr-2" />
                Mental Health Helpline
              </Button>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-yellow-300 text-sm">
                  💡 If you're in immediate danger, call 102. For mental health crisis support, call the helpline numbers above.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clinics List */}
        <div>
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
