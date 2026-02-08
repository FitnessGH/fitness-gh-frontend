import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Membership } from '@/lib/api/subscriptions';

interface MembershipState {
  memberships: Membership[];
  activeMembership: Membership | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setMemberships: (memberships: Membership[]) => void;
  setActiveMembership: (membership: Membership | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearMemberships: () => void;
}

export const useMembershipStore = create<MembershipState>()(
  persist(
    (set) => ({
      memberships: [],
      activeMembership: null,
      isLoading: false,
      error: null,

      setMemberships: (memberships) => {
        const active = memberships.find((m) => m.status === 'ACTIVE') || null;
        set({ memberships, activeMembership: active, error: null });
      },

      setActiveMembership: (membership) => set({ activeMembership: membership }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      clearMemberships: () =>
        set({
          memberships: [],
          activeMembership: null,
          error: null,
        }),
    }),
    {
      name: 'membership-storage', // localStorage key
      partialize: (state) => ({
        memberships: state.memberships,
        activeMembership: state.activeMembership,
      }),
    }
  )
);
