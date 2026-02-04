'use client';

import { BebasFont } from '@/constant';
import { cn } from '@/lib/utils';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import {
  ChevronRight,
  Dumbbell,
  Loader2,
  Locate,
  MapPin,
  Search,
  Sparkles,
  Star,
  Users,
  Waves,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useCallback, useState } from 'react';

interface Gym {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  distance: number;
  amenities: string[];
  image: string;
  lat: number;
  lng: number;
}

const MOCK_GYMS: Gym[] = [
  {
    id: 1,
    name: 'FitClub Downtown',
    location: 'Osu, Accra',
    price: 89,
    rating: 4.8,
    reviews: 342,
    distance: 0.8,
    amenities: ['Weights', 'Cardio', 'Pool', 'Yoga'],
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
    lat: 5.556,
    lng: -0.182,
  },
  {
    id: 2,
    name: 'PowerLift Gym',
    location: 'East Legon, Accra',
    price: 79,
    rating: 4.6,
    reviews: 289,
    distance: 1.2,
    amenities: ['Weightlifting', 'CrossFit', 'Personal Training'],
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&q=80',
    lat: 5.635,
    lng: -0.154,
  },
  {
    id: 3,
    name: 'Yoga & Wellness Center',
    location: 'Labone, Accra',
    price: 59,
    rating: 4.9,
    reviews: 456,
    distance: 1.5,
    amenities: ['Yoga', 'Pilates', 'Meditation', 'Spa'],
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
    lat: 5.571,
    lng: -0.178,
  },
  {
    id: 4,
    name: 'Elite Sports Complex',
    location: 'Airport Residential, Accra',
    price: 119,
    rating: 4.7,
    reviews: 523,
    distance: 2.3,
    amenities: ['All Equipment', 'Olympic Pool', 'Basketball', 'Climbing'],
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop',
    lat: 5.605,
    lng: -0.171,
  },
  {
    id: 5,
    name: 'Iron Temple Fitness',
    location: 'Cantonments, Accra',
    price: 95,
    rating: 4.5,
    reviews: 198,
    distance: 2.8,
    amenities: ['Bodybuilding', 'Sauna', 'Supplements'],
    image:
      'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=600&h=400&fit=crop',
    lat: 5.577,
    lng: -0.168,
  },
  {
    id: 6,
    name: 'CrossFit Accra',
    location: 'Ridge, Accra',
    price: 110,
    rating: 4.8,
    reviews: 312,
    distance: 3.1,
    amenities: ['CrossFit', 'HIIT', 'Nutrition'],
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop',
    lat: 5.562,
    lng: -0.201,
  },
];

const AMENITY_ICONS: Record<string, typeof Dumbbell> = {
  Weights: Dumbbell,
  Weightlifting: Dumbbell,
  Bodybuilding: Dumbbell,
  Pool: Waves,
  'Olympic Pool': Waves,
  CrossFit: Zap,
  HIIT: Zap,
  Cardio: Zap,
  default: Sparkles,
};

function getAmenityIcon(amenity: string) {
  return AMENITY_ICONS[amenity] || AMENITY_ICONS.default;
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function FindGymSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [gyms, setGyms] = useState<Gym[]>(MOCK_GYMS.slice(0, 3));

  const sortGymsByDistance = useCallback((userLat: number, userLng: number) => {
    const sorted = [...MOCK_GYMS]
      .map((gym) => ({
        ...gym,
        distance: calculateDistance(userLat, userLng, gym.lat, gym.lng),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);
    setGyms(sorted);
  }, []);

  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        sortGymsByDistance(latitude, longitude);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError(
              'Please enable location access to find nearby gyms',
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information unavailable');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out');
            break;
          default:
            setLocationError('Unable to get your location');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    );
  }, [sortGymsByDistance]);

  const filteredGyms = gyms.filter(
    (gym) =>
      gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gym.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section className="relative px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(50,176,176,0.12),transparent_60%)]" />
      <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2
            className={cn(
              BebasFont.className,
              'text-5xl md:text-6xl lg:text-7xl leading-[0.95]',
            )}
          >
            Stay healthy, energetic
            <br />
            <span className="text-primary">& fit</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Discover gyms near you with world-class equipment, expert trainers,
            and vibrant communities ready to help you reach your goals.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by gym name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-2xl border border-border bg-card/80 backdrop-blur text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
            <Button
              onClick={getUserLocation}
              disabled={isLocating}
              className={cn(
                'h-14 px-6 rounded-2xl gap-2 font-medium transition-all',
                userLocation
                  ? 'bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30'
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground',
              )}
            >
              {isLocating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Locate className="w-5 h-5" />
              )}
              <span className="hidden sm:inline">
                {userLocation ? 'Location found' : 'Use my location'}
              </span>
            </Button>
          </div>

          {locationError && (
            <p className="text-sm text-destructive mt-3 text-center">
              {locationError}
            </p>
          )}

          {userLocation && (
            <p className="text-sm text-primary mt-3 text-center flex items-center justify-center gap-1">
              <MapPin className="w-4 h-4" />
              Showing gyms nearest to your location
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredGyms.map((gym, idx) => (
            <div
              key={gym.id}
              className="group relative rounded-3xl border border-border bg-card/70 backdrop-blur overflow-hidden transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(50,176,176,0.2)]"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={gym.image}
                  alt={gym.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />

                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-border">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold">{gym.rating}</span>
                </div>

                <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-sm font-medium">
                    {gym.distance.toFixed(1)} km
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {gym.name}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                    <MapPin className="w-4 h-4 text-primary/70" />
                    {gym.location}
                  </p>
                </div>

                <div className="flex items-center justify-between py-3 border-y border-border/50">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-primary/70" />
                    {gym.reviews} reviews
                  </div>
                  <div
                    className={cn(BebasFont.className, 'text-2xl text-primary')}
                  >
                    GH₵{gym.price}
                    <span className="text-sm text-muted-foreground font-sans">
                      /mo
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {gym.amenities.slice(0, 3).map((amenity) => {
                    const Icon = getAmenityIcon(amenity);
                    return (
                      <Badge
                        key={amenity}
                        variant="outline"
                        className="gap-1.5 px-2.5 py-1 text-xs border-border/70 text-muted-foreground"
                      >
                        <Icon className="w-3 h-3" />
                        {amenity}
                      </Badge>
                    );
                  })}
                  {gym.amenities.length > 3 && (
                    <Badge
                      variant="outline"
                      className="px-2.5 py-1 text-xs border-primary/40 text-primary"
                    >
                      +{gym.amenities.length - 3}
                    </Badge>
                  )}
                </div>

                <Link href={`/gyms/${gym.id}`}>
                  <Button className="w-full h-12 rounded-xl bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all group/btn">
                    View Gym
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/browse-gyms">
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-10 rounded-2xl border-primary/40 text-foreground hover:bg-primary/10 hover:border-primary gap-2 group"
            >
              Explore All Gyms
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
