import { create } from 'zustand';

interface UIState {
  // Sidebar state
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;

  // Modal/Dialog states
  modals: Record<string, boolean>;

  // Toast notifications (if you want to manage them globally)
  notifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  }>;

  // Loading states
  globalLoading: boolean;
  loadingStates: Record<string, boolean>;

  // Actions
  setSidebarOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;

  // Modal actions
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  toggleModal: (modalId: string) => void;

  // Loading actions
  setGlobalLoading: (loading: boolean) => void;
  setLoading: (key: string, loading: boolean) => void;
  isLoading: (key: string) => boolean;

  // Notification actions
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarOpen: true,
  mobileMenuOpen: false,
  modals: {},
  notifications: [],
  globalLoading: false,
  loadingStates: {},

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  toggleMobileMenu: () =>
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  openModal: (modalId) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: true },
    })),

  closeModal: (modalId) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: false },
    })),

  toggleModal: (modalId) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalId]: !state.modals[modalId],
      },
    })),

  setGlobalLoading: (loading) => set({ globalLoading: loading }),

  setLoading: (key, loading) =>
    set((state) => ({
      loadingStates: { ...state.loadingStates, [key]: loading },
    })),

  isLoading: (key) => get().loadingStates[key] || false,

  addNotification: (notification) => {
    const id = `notification-${Date.now()}-${Math.random()}`;
    set((state) => ({
      notifications: [...state.notifications, { ...notification, id }],
    }));
    // Auto-remove after 5 seconds
    setTimeout(() => {
      get().removeNotification(id);
    }, 5000);
  },

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearNotifications: () => set({ notifications: [] }),
}));
