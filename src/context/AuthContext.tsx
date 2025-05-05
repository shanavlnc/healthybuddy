import React, { createContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  username: string;
  email: string;
  role: 'parent' | 'child';
  parentEmail?: string; // for child accounts
  nickname?: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (userData: {
    username: string;
    email: string;
    password: string;
    role: 'parent' | 'child';
    nickname?: string;
    parentEmail?: string;
  }) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  loading: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Check for existing session on app start
  React.useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, you would verify credentials with your backend
      // For demo, we'll use mock data
      const mockUsers = [
        {
          id: '1',
          username: 'parent1',
          email: 'parent1@example.com',
          role: 'parent',
          nickname: 'Super Mom',
        },
        {
          id: '2',
          username: 'child1',
          email: 'child1@example.com',
          role: 'child',
          nickname: 'Alex',
          parentEmail: 'parent1@example.com',
        },
      ];

      const foundUser = mockUsers.find(
        (u) => u.username === username && password === 'password123' // Simple demo password
      );

      if (foundUser) {
        setUser(foundUser);
        await AsyncStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: {
    username: string;
    email: string;
    password: string;
    role: 'parent' | 'child';
    nickname?: string;
    parentEmail?: string;
  }) => {
    setLoading(true);
    try {
      // In a real app, you would send this to your backend
      // For demo, we'll just store locally
      const newUser = {
        id: Math.random().toString(36).substring(7),
        ...userData,
      };

      setUser(newUser);
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Signup error', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};