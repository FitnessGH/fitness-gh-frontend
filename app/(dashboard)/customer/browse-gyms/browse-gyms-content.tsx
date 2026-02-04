'use client';

import { BebasFont } from '@/constant';
import { cn } from '@/lib/utils';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import {
  ChevronRight,
  Clock,
  Dumbbell,
  Filter,
  Flame,
  Grid3X3,
  Heart,
  LayoutList,
  Loader2,
  Locate,
  MapPin,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Waves,
  X,
  Zap,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface Gym {
  id: number;
  name: string;
  location: string;
  area: string;
  price: number;
  rating: number;
  reviews: number;
  members: number;
  distance: number;
  amenities: string[];
  image: string;
  featured: boolean;
  openNow: boolean;
  lat: number;
  lng: number;
}

const MOCK_GYMS: Gym[] = [
  {
    id: 1,
    name: 'FitClub Downtown',
    location: '123 Oxford Street',
    area: 'Osu, Accra',
    price: 89,
    rating: 4.8,
    reviews: 342,
    members: 1240,
    distance: 0.8,
    amenities: ['Weights', 'Cardio', 'Pool', 'Yoga', 'Sauna'],
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    featured: true,
    openNow: true,
    lat: 5.556,
    lng: -0.182,
  },
  {
    id: 2,
    name: 'PowerLift Gym',
    location: '45 American House Road',
    area: 'East Legon, Accra',
    price: 79,
    rating: 4.6,
    reviews: 289,
    members: 856,
    distance: 1.2,
    amenities: [
      'Weightlifting',
      'CrossFit',
      'Personal Training',
      'Supplements',
    ],
    image:
      'https://images.unsplash.com/photo-1540497905703-29efb88a5602?w=800&h=600&fit=crop',
    featured: false,
    openNow: true,
    lat: 5.635,
    lng: -0.154,
  },
  {
    id: 3,
    name: 'Yoga & Wellness Center',
    location: '12 Fifth Circular Road',
    area: 'Labone, Accra',
    price: 59,
    rating: 4.9,
    reviews: 456,
    members: 645,
    distance: 1.5,
    amenities: ['Yoga', 'Pilates', 'Meditation', 'Spa', 'Juice Bar'],
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    featured: true,
    openNow: true,
    lat: 5.571,
    lng: -0.178,
  },
  {
    id: 4,
    name: 'Elite Sports Complex',
    location: '8 Airport Bypass Road',
    area: 'Airport Residential, Accra',
    price: 119,
    rating: 4.7,
    reviews: 523,
    members: 2100,
    distance: 2.3,
    amenities: [
      'Full Equipment',
      'Olympic Pool',
      'Basketball',
      'Climbing Wall',
      'Steam Room',
    ],
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
    featured: true,
    openNow: false,
    lat: 5.605,
    lng: -0.171,
  },
  {
    id: 5,
    name: 'Iron Temple Fitness',
    location: '67 Josif Broz Tito Avenue',
    area: 'Cantonments, Accra',
    price: 95,
    rating: 4.5,
    reviews: 198,
    members: 520,
    distance: 2.8,
    amenities: ['Bodybuilding', 'Sauna', 'Supplements', 'Personal Training'],
    image:
      'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800&h=600&fit=crop',
    featured: false,
    openNow: true,
    lat: 5.577,
    lng: -0.168,
  },
  {
    id: 6,
    name: 'CrossFit Accra',
    location: '23 Ring Road Central',
    area: 'Ridge, Accra',
    price: 110,
    rating: 4.8,
    reviews: 312,
    members: 780,
    distance: 3.1,
    amenities: ['CrossFit', 'HIIT', 'Nutrition Coaching', 'Group Classes'],
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
    featured: false,
    openNow: true,
    lat: 5.562,
    lng: -0.201,
  },
  {
    id: 7,
    name: 'Aqua Fitness Hub',
    location: '15 Liberation Road',
    area: 'Adabraka, Accra',
    price: 75,
    rating: 4.4,
    reviews: 167,
    members: 430,
    distance: 3.5,
    amenities: ['Swimming', 'Aqua Aerobics', 'Cardio', 'Steam Room'],
    image:
      'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&h=600&fit=crop',
    featured: false,
    openNow: true,
    lat: 5.551,
    lng: -0.215,
  },
  {
    id: 8,
    name: 'Urban Athletics',
    location: '33 Spintex Road',
    area: 'Spintex, Accra',
    price: 85,
    rating: 4.6,
    reviews: 234,
    members: 920,
    distance: 4.2,
    amenities: ['Functional Training', 'Boxing', 'Cardio', 'Recovery Zone'],
    image:
      'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=600&fit=crop',
    featured: false,
    openNow: false,
    lat: 5.629,
    lng: -0.109,
  },
];

const AMENITY_FILTERS = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'weights', label: 'Weights', icon: Dumbbell },
  { id: 'cardio', label: 'Cardio', icon: Zap },
  { id: 'pool', label: 'Pool', icon: Waves },
  { id: 'yoga', label: 'Yoga', icon: Flame },
  { id: 'crossfit', label: 'CrossFit', icon: TrendingUp },
];

const SORT_OPTIONS = [
  { id: 'distance', label: 'Nearest' },
  { id: 'rating', label: 'Top Rated' },
  { id: 'price-low', label: 'Price: Low' },
  { id: 'price-high', label: 'Price: High' },
  { id: 'popular', label: 'Most Popular' },
];

const AMENITY_ICONS: Record<string, typeof Dumbbell> = {
  Weights: Dumbbell,
  Weightlifting: Dumbbell,
  Bodybuilding: Dumbbell,
  Pool: Waves,
  'Olympic Pool': Waves,
  Swimming: Waves,
  CrossFit: Zap,
  HIIT: Zap,
  Cardio: Zap,
  'Functional Training': Zap,
  Yoga: Flame,
  Pilates: Flame,
  Meditation: Flame,
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

export function BrowseGymsContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [gyms, setGyms] = useState<Gym[]>(MOCK_GYMS);

  const sortGymsByDistance = useCallback((userLat: number, userLng: number) => {
    const sorted = [...MOCK_GYMS].map((gym) => ({
      ...gym,
      distance: calculateDistance(userLat, userLng, gym.lat, gym.lng),
    }));
    setGyms(sorted);
  }, []);

  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) return;

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        sortGymsByDistance(latitude, longitude);
        setIsLocating(false);
      },
      () => setIsLocating(false),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    );
  }, [sortGymsByDistance]);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  const toggleFavorite = (gymId: number) => {
    setFavorites((prev) =>
      prev.includes(gymId)
        ? prev.filter((id) => id !== gymId)
        : [...prev, gymId],
    );
  };

  const filteredGyms = gyms
    .filter((gym) => {
      const matchesSearch =
        gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gym.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gym.area.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === 'all' ||
        gym.amenities.some((a) =>
          a.toLowerCase().includes(activeFilter.toLowerCase()),
        );

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popular':
          return b.members - a.members;
        default:
          return 0;
      }
    });

  const featuredGyms = filteredGyms.filter((g) => g.featured);
  const regularGyms = filteredGyms.filter((g) => !g.featured);

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(50,176,176,0.15),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-75 h-75 bg-primary/8 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />

        <div className="absolute top-8 right-8 w-32 h-32 border border-primary/20 rotate-45 opacity-40" />
        <div className="absolute top-12 right-12 w-24 h-24 border border-primary/10 rotate-45 opacity-30" />

        <div className="relative px-6 py-10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary tracking-wide uppercase">
                  {userLocation ? 'Location Active' : 'Discover Nearby'}
                </span>
              </div>
              <h1
                className={cn(
                  BebasFont.className,
                  'text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.9]',
                )}
              >
                Find Your
                <br />
                <span className="text-primary">Perfect Gym</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-md">
                Discover {gyms.length}+ fitness centers with world-class
                equipment and expert trainers
              </p>
            </div>

            {/* Stats Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-card/80 border border-border/50 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Dumbbell className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p
                    className={cn(BebasFont.className, 'text-xl leading-none')}
                  >
                    {gyms.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Gyms</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-card/80 border border-border/50 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-500" />
                </div>
                <div>
                  <p
                    className={cn(BebasFont.className, 'text-xl leading-none')}
                  >
                    4.7
                  </p>
                  <p className="text-xs text-muted-foreground">Avg Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-card/80 border border-border/50 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p
                    className={cn(BebasFont.className, 'text-xl leading-none')}
                  >
                    7.5K+
                  </p>
                  <p className="text-xs text-muted-foreground">Members</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by gym name, location, or area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <Button
              onClick={getUserLocation}
              disabled={isLocating}
              className={cn(
                'h-14 px-6 rounded-2xl gap-2 font-medium transition-all',
                userLocation
                  ? 'bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25'
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground',
              )}
            >
              {isLocating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Locate className="w-5 h-5" />
              )}
              <span className="hidden sm:inline">
                {userLocation ? 'Location Found' : 'Use Location'}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border/40">
        <div className="px-6 py-4 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Amenity Filters */}
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2">
                {AMENITY_FILTERS.map((filter) => {
                  const Icon = filter.icon;
                  const isActive = activeFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                          : 'bg-card/80 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50',
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none h-11 pl-4 pr-10 rounded-xl bg-card/80 border border-border/50 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option
                      key={option.id}
                      value={option.id}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rotate-90 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="flex items-center rounded-xl bg-card/80 border border-border/50 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded-lg transition-all',
                    viewMode === 'grid'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded-lg transition-all',
                    viewMode === 'list'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="h-11 px-4 rounded-xl border-border/50 gap-2"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{' '}
              <span className="text-foreground font-medium">
                {filteredGyms.length}
              </span>{' '}
              gyms
              {userLocation && <span className="ml-1">near your location</span>}
            </p>
            {favorites.length > 0 && (
              <button className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                <Heart className="w-4 h-4 fill-primary" />
                {favorites.length} saved
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-8 max-w-7xl mx-auto">
        {featuredGyms.length > 0 && activeFilter === 'all' && !searchQuery && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <h2 className={cn(BebasFont.className, 'text-2xl')}>
                  Featured Gyms
                </h2>
                <p className="text-sm text-muted-foreground">
                  Top-rated fitness centers
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredGyms.slice(0, 2).map((gym, idx) => (
                <FeaturedGymCard
                  key={gym.id}
                  gym={gym}
                  isFavorite={favorites.includes(gym.id)}
                  onToggleFavorite={() => toggleFavorite(gym.id)}
                  delay={idx * 100}
                />
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {featuredGyms.length > 0 &&
            activeFilter === 'all' &&
            !searchQuery && (
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                  <Dumbbell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className={cn(BebasFont.className, 'text-2xl')}>
                    All Gyms
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Browse all fitness centers
                  </p>
                </div>
              </div>
            )}

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {(activeFilter === 'all' && !searchQuery
                ? regularGyms
                : filteredGyms
              ).map((gym, idx) => (
                <GymCard
                  key={gym.id}
                  gym={gym}
                  isFavorite={favorites.includes(gym.id)}
                  onToggleFavorite={() => toggleFavorite(gym.id)}
                  delay={idx * 50}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {(activeFilter === 'all' && !searchQuery
                ? regularGyms
                : filteredGyms
              ).map((gym, idx) => (
                <GymListItem
                  key={gym.id}
                  gym={gym}
                  isFavorite={favorites.includes(gym.id)}
                  onToggleFavorite={() => toggleFavorite(gym.id)}
                  delay={idx * 50}
                />
              ))}
            </div>
          )}
        </div>

        {filteredGyms.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className={cn(BebasFont.className, 'text-2xl mb-2')}>
              No Gyms Found
            </h3>
            <p className="text-muted-foreground max-w-md mb-6">
              We couldn't find any gyms matching your search criteria. Try
              adjusting your filters or search term.
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              variant="outline"
              className="rounded-xl"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function FeaturedGymCard({
  gym,
  isFavorite,
  onToggleFavorite,
  delay,
}: {
  gym: Gym;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  delay: number;
}) {
  return (
    <div
      className="group relative rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(50,176,176,0.25)] animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={gym.image}
          alt={gym.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent" />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-linear-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold">
            <Sparkles className="w-3 h-3" />
            Featured
          </div>
          {gym.openNow && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/90 text-white text-xs font-semibold">
              <Clock className="w-3 h-3" />
              Open Now
            </div>
          )}
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={onToggleFavorite}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center transition-all',
              isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-background/80 backdrop-blur-sm text-foreground hover:bg-background',
            )}
          >
            <Heart className={cn('w-5 h-5', isFavorite && 'fill-current')} />
          </button>
        </div>

        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
            <MapPin className="w-4 h-4" />
            {gym.distance.toFixed(1)} km away
          </div>
        </div>

        <div className="absolute bottom-4 right-4">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-background/90 backdrop-blur-sm text-sm font-semibold">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            {gym.rating}
            <span className="text-muted-foreground font-normal">
              ({gym.reviews})
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3
            className={cn(
              BebasFont.className,
              'text-2xl group-hover:text-primary transition-colors',
            )}
          >
            {gym.name}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
            <MapPin className="w-4 h-4 text-primary/70" />
            {gym.location}, {gym.area}
          </p>
        </div>

        <div className="flex items-center gap-4 py-3 border-y border-border/50">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-primary/70" />
            <span className="text-sm">
              {gym.members.toLocaleString()} members
            </span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className={cn(BebasFont.className, 'text-2xl text-primary')}>
            GH₵{gym.price}
            <span className="text-sm text-muted-foreground font-sans">/mo</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {gym.amenities.slice(0, 4).map((amenity) => {
            const Icon = getAmenityIcon(amenity);
            return (
              <Badge
                key={amenity}
                variant="outline"
                className="gap-1.5 px-3 py-1.5 text-xs border-border/50 bg-muted/30"
              >
                <Icon className="w-3 h-3" />
                {amenity}
              </Badge>
            );
          })}
          {gym.amenities.length > 4 && (
            <Badge
              variant="outline"
              className="px-3 py-1.5 text-xs border-primary/40 text-primary bg-primary/10"
            >
              +{gym.amenities.length - 4} more
            </Badge>
          )}
        </div>

        <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 group/btn">
          View Gym Details
          <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}

function GymCard({
  gym,
  isFavorite,
  onToggleFavorite,
  delay,
}: {
  gym: Gym;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  delay: number;
}) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden bg-card/70 border border-border/50 hover:border-primary/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(50,176,176,0.2)] animate-in fade-in slide-in-from-bottom-3"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={gym.image}
          alt={gym.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          {gym.openNow ? (
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-medium">
              Open
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-muted/90 text-muted-foreground text-xs font-medium">
              Closed
            </span>
          )}
        </div>

        <button
          onClick={onToggleFavorite}
          className={cn(
            'absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all',
            isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-background/70 backdrop-blur-sm text-foreground hover:bg-background',
          )}
        >
          <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
        </button>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-background/90 backdrop-blur-sm text-sm font-medium">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            {gym.rating}
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/90 text-primary-foreground text-sm font-medium">
            <MapPin className="w-3.5 h-3.5" />
            {gym.distance.toFixed(1)} km
          </div>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {gym.name}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {gym.area}
          </p>
        </div>

        <div className="flex items-center justify-between py-2.5 border-y border-border/40">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            {gym.members}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4" />
            {gym.reviews} reviews
          </div>
          <div className={cn(BebasFont.className, 'text-xl text-primary')}>
            GH₵{gym.price}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {gym.amenities.slice(0, 3).map((amenity) => (
            <Badge
              key={amenity}
              variant="outline"
              className="px-2 py-0.5 text-[10px] border-border/40"
            >
              {amenity}
            </Badge>
          ))}
          {gym.amenities.length > 3 && (
            <Badge
              variant="outline"
              className="px-2 py-0.5 text-[10px] border-primary/30 text-primary"
            >
              +{gym.amenities.length - 3}
            </Badge>
          )}
        </div>

        <Button
          variant="outline"
          className="w-full h-10 rounded-xl border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all gap-1.5 group/btn"
        >
          View Details
          <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
        </Button>
      </div>
    </div>
  );
}

function GymListItem({
  gym,
  isFavorite,
  onToggleFavorite,
  delay,
}: {
  gym: Gym;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  delay: number;
}) {
  return (
    <div
      className="group flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-card/70 border border-border/50 hover:border-primary/40 backdrop-blur-sm transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-left-3"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="relative w-full sm:w-48 h-36 sm:h-32 rounded-xl overflow-hidden shrink-0">
        <img
          src={gym.image}
          alt={gym.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          {gym.openNow ? (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/90 text-white text-xs font-medium">
              Open
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-muted/90 text-muted-foreground text-xs font-medium">
              Closed
            </span>
          )}
        </div>
        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/90 text-primary-foreground text-xs font-medium">
          <MapPin className="w-3 h-3" />
          {gym.distance.toFixed(1)} km
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {gym.name}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {gym.location}, {gym.area}
              </p>
            </div>
            <button
              onClick={onToggleFavorite}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all',
                isFavorite
                  ? 'bg-red-500 text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80',
              )}
            >
              <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{gym.rating}</span>
              <span className="text-muted-foreground">({gym.reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              {gym.members.toLocaleString()} members
            </div>
            <div className="flex flex-wrap gap-1.5">
              {gym.amenities.slice(0, 3).map((amenity) => (
                <Badge
                  key={amenity}
                  variant="outline"
                  className="px-2 py-0.5 text-[10px]"
                >
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
          <div className={cn(BebasFont.className, 'text-2xl text-primary')}>
            GH₵{gym.price}
            <span className="text-sm text-muted-foreground font-sans">/mo</span>
          </div>
          <Button className="h-9 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium gap-1.5 group/btn">
            View Details
            <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
