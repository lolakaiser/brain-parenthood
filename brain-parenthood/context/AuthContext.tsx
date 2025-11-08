"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded users (in a real app, this would be in a database)
const USERS = [
  { username: 'lola', password: '1234' }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const foundUser = USERS.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const userObj = { username: foundUser.username };
      setUser(userObj);
      localStorage.setItem('user', JSON.stringify(userObj));
      return true;
    }
    return false;
  };

  const signup = (username: string, password: string): boolean => {
    // Check if user already exists
    const existingUser = USERS.find(u => u.username === username);
    if (existingUser) {
      return false;
    }

    // In a real app, you would save this to a database
    // For now, we'll just add it to the array
    USERS.push({ username, password });
    const userObj = { username };
    setUser(userObj);
    localStorage.setItem('user', JSON.stringify(userObj));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Don't render until we've checked localStorage
  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
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
