"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{success: boolean; error?: string}>;
  signup: (email: string, password: string, name: string) => Promise<{success: boolean; error?: string}>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user and validate token on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Validate token by fetching current user
          const response = await fetch(`${API_URL}/api/users/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // Token invalid, clear it
            localStorage.removeItem('authToken');
          }
        }
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<{success: boolean; error?: string}> => {
    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token
        localStorage.setItem('authToken', data.access_token);

        // Fetch user info
        const userResponse = await fetch(`${API_URL}/api/users/me`, {
          headers: {
            'Authorization': `Bearer ${data.access_token}`
          }
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
          return { success: true };
        }
      }

      return {
        success: false,
        error: data.detail || 'Login failed. Please check your credentials.'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Network error. Please check your connection and try again.'
      };
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<{success: boolean; error?: string}> => {
    try {
      const response = await fetch(`${API_URL}/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        // Use the token returned directly from signup — no need to call login again
        localStorage.setItem('authToken', data.access_token);
        setUser(data.user);
        return { success: true };
      }

      return {
        success: false,
        error: data.detail || 'Signup failed. Please try again.'
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        error: 'Network error. Please check your connection and try again.'
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      isLoading
    }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper function to get auth token for API calls
export function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}
