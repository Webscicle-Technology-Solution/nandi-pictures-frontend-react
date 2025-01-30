import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

// Cookie configuration
const COOKIE_CONFIG = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      subscriptionPlan: null, // Add subscriptionPlan state
      user: null,

      login: async (email, password) => {
        try {
          const response = await fetch(`http://localhost:3001/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Login failed");
          }

          const { accessToken, refreshToken, user } = data;

          // Save to cookies
          Cookies.set('accessToken', accessToken, COOKIE_CONFIG);
          Cookies.set('refreshToken', refreshToken, COOKIE_CONFIG);

          // Update store with subscriptionPlan as well
          set({
            isAuthenticated: true,
            accessToken,
            refreshToken,
            subscriptionPlan: user?.subscriptionPlan || null,
            user
          });

          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error.message || "An error occurred",
          };
        }
      },

      logout: () => {
        // Clear cookies
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");

        // Reset store
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          subscriptionPlan: null, // Clear subscriptionPlan on logout
          user: null
        });
      },

      // Initialize the store with cookies if they exist
      initializeFromCookies: () => {
        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");

        if (accessToken) {
          set({
            isAuthenticated: true,
            accessToken,
            refreshToken,
          });
        }
      },
    }),
    {
      name: "auth-storage", // unique name for localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Initialize from cookies when the store is created
useAuthStore.getState().initializeFromCookies();

export default useAuthStore;
