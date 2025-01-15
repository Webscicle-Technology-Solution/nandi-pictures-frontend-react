// authStore.jsx
import { create } from 'zustand'; // Correct way to import from zustand

// This is our Zustand store where we manage the authentication state
const useAuthStore = create((set) => ({
  // Initial state
  isAuthenticated: false,  // This tracks if the user is logged in or not
  accessToken: null,       // This holds the JWT access token
  refreshToken: null,      // This holds the JWT refresh token
  
  // Action to log the user in (called after login)
  login: (accessToken, refreshToken) => set(() => ({
    isAuthenticated: true,
    accessToken,
    refreshToken,
  })),

  // Action to log the user out
  logout: () => set(() => ({
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
  })),
}));

export default useAuthStore;
