import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

const COOKIE_CONFIG = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === "production", // Ensure cookies are sent over HTTPS
  sameSite: "strict", // CSRF protection
};

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: null, // Store only the access token here temporarily

      // Login function
      login: async (email, password) => {
        try {
          const response = await fetch(`${apiBaseUrl}/auth/login`, {
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

          const { accessToken } = data;

          // Set tokens in cookies (refresh token is set by backend in HttpOnly cookie)
          Cookies.set('accessToken', accessToken, COOKIE_CONFIG);

          // Update Zustand store (only store the access token)
          set({
            isAuthenticated: true,
            accessToken,
          });

          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error.message || "An error occurred",
          };
        }
      },

      // Register function
      register: async (name,phone, emailID,confirmPass, password) => {
        try {
          const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name,phone: phone, email: emailID, newpassword: password,confirmpassword: confirmPass}),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Registration failed");
          }

          const { accessToken } = data;

          // Set tokens in cookies (refresh token is set by backend in HttpOnly cookie)
          Cookies.set('accessToken', accessToken, COOKIE_CONFIG);

          // Update Zustand store (only store the access token)
          set({
            isAuthenticated: true,
            accessToken,
          });

          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error.message || "An error occurred",
          };
        }
      },

      // Logout function
      logout: () => {
        // Clear cookies
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken"); // Optional: You can remove the refresh token here as well (though it's HttpOnly)

        // Reset Zustand store
        set({
          isAuthenticated: false,
          accessToken: null,
        });
      },

      // Initialize store from cookies if they exist
      initializeFromCookies: () => {
        const accessToken = Cookies.get("accessToken");

        if (accessToken) {
          set({
            isAuthenticated: true,
            accessToken,
          });
        }
      },

      // Token refresh function (using the refresh token stored in cookie)
      refreshAccessToken: async () => {
        const refreshToken = Cookies.get("refreshToken");

        if (!refreshToken) {
          console.error("Refresh token not found");
          return false;
        }

        try {
          const response = await fetch(`${apiBaseUrl}/auth/checkauth`, {
            method: "POST",
            headers: {
              "token": `${accessToken}`, // Send access token to the backend
            },
            credentials: "include", // Ensure cookies (RT) are sent with the request
          });

          if (!response.ok) {
            throw new Error("Failed to refresh token");
          }

          const data = await response.json();
          const { accessToken } = data;

          // Update the access token in the cookie and Zustand store
          Cookies.set('accessToken', accessToken, COOKIE_CONFIG);
          set({ accessToken });

          return true;

        } catch (error) {
          console.error("Error while refreshing access token:", error);
          return false;
        }
      },

      // Check if the access token is expired and refresh it
      checkAuth: async () => {
        const accessToken = Cookies.get("accessToken");

        if (!accessToken) {
          return false;
        }

        try {
          const response = await fetch(`${apiBaseUrl}/auth/checkauth`, {
            method: "GET",
            headers: {
              "token": `${accessToken}`,
            },
          });
          
          const data = await response.json();

          if (response.ok) {
            return data;
          }


          return response;
        } catch (error) {
          console.error("Error in checkauth:", error);
          return false;
        }
      },
    }),
    {
      name: "auth-storage", // Unique name for localStorage
      storage: createJSONStorage(() => localStorage), // Persist only non-sensitive data in localStorage
    }
  )
);

// Initialize store state from cookies (this happens on app load)
useAuthStore.getState().initializeFromCookies();

export default useAuthStore;
