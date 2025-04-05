import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, getCurrentUser, isAdmin } from '@/lib/supabase';

// Mock user for development/testing when auth is disabled
const mockUser: User = {
  id: 'mock-user-id',
  email: 'test@example.com',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdminUser: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  isAdminUser: false,
  refreshUser: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);

  const refreshUser = async () => {
    setIsLoading(true);
    try {
      console.log('Refreshing user...');
      
      // Use mock user for development/testing
      // Comment this line and uncomment the next line for production
      const currentUser = mockUser;
      // const currentUser = await getCurrentUser();
      
      console.log('Current user from refresh:', currentUser);
      setUser(currentUser);
      
      if (currentUser) {
        console.log('User found, checking admin status...');
        // Set admin status to true for testing
        const adminStatus = true;
        // const adminStatus = await isAdmin();
        console.log('Admin status:', adminStatus);
        setIsAdminUser(adminStatus);
      } else {
        console.log('No user found, setting admin status to false');
        setIsAdminUser(false);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      setUser(null);
      setIsAdminUser(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      console.log('Session:', session);
      
      // For development/testing, always use the mock user
      // Comment this block and uncomment the next block for production
      console.log('Using mock user for development');
      setUser(mockUser);
      setIsAdminUser(true);
      setIsLoading(false);
      
      /* Uncomment for production
      if (session?.user) {
        console.log('User from session:', session.user);
        setUser(session.user);
        const adminStatus = await isAdmin();
        console.log('Admin status from auth change:', adminStatus);
        setIsAdminUser(adminStatus);
      } else {
        console.log('No session user, clearing user and admin status');
        setUser(null);
        setIsAdminUser(false);
      }
      setIsLoading(false);
      */
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Function to handle logout
  const logout = async (): Promise<void> => {
    try {
      console.log('Logging out...');
      await supabase.auth.signOut();
      
      // For development/testing with mock user
      // We need to manually clear the user state since we're using a mock user
      console.log('Clearing user state after logout');
      setUser(null);
      setIsAdminUser(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdminUser,
    refreshUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
