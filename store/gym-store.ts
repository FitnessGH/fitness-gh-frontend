import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Gym {
  id: string;
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

interface GymState {
  gyms: Gym[];
  selectedGym: Gym | null;
  favorites: string[]; // Gym IDs
  filters: {
    search: string;
    minPrice: number;
    maxPrice: number;
    amenities: string[];
    rating: number;
  };
  isLoading: boolean;
  error: string | null;

  // Actions
  setGyms: (gyms: Gym[]) => void;
  setSelectedGym: (gym: Gym | null) => void;
  toggleFavorite: (gymId: string) => void;
  setFilters: (filters: Partial<GymState['filters']>) => void;
  resetFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearGyms: () => void;
}

const defaultFilters = {
  search: '',
  minPrice: 0,
  maxPrice: 1000,
  amenities: [],
  rating: 0,
};

export const useGymStore = create<GymState>()(
  persist(
    (set, get) => ({
      gyms: [],
      selectedGym: null,
      favorites: [],
      filters: defaultFilters,
      isLoading: false,
      error: null,

      setGyms: (gyms) => set({ gyms, error: null }),

      setSelectedGym: (gym) => set({ selectedGym: gym }),

      toggleFavorite: (gymId) => {
        const { favorites } = get();
        const newFavorites = favorites.includes(gymId)
          ? favorites.filter((id) => id !== gymId)
          : [...favorites, gymId];
        set({ favorites: newFavorites });
      },

      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),

      resetFilters: () => set({ filters: defaultFilters }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      clearGyms: () =>
        set({
          gyms: [],
          selectedGym: null,
          error: null,
        }),
    }),
    {
      name: 'gym-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        filters: state.filters,
      }),
    }
  )
);
