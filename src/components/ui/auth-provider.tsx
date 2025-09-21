"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/lib/types';
import { mockUsers } from '@/lib/data';
import { usePathname, useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  loading: boolean;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const protectedRoutes = [
    '/dashboard',
    '/explore',
    '/my-crafts',
    '/notifications',
    '/profile',
    '/social',
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('madebyhand-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('madebyhand-user');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
      if (!user && isProtectedRoute) {
        router.push('/login');
      }
      if (user && (pathname === '/login' || pathname === '/signup')) {
        router.push('/dashboard');
      }
    }
  }, [user, loading, pathname, router]);


  const login = (email: string, role?: UserRole) => {
    // In a real app, you'd verify credentials. Here, we'll find a mock user.
    let foundUser = mockUsers.find(u => u.email === email);
    if (role && foundUser) {
      foundUser = {...foundUser, role};
    }
    
    // If signing up, create a temporary user
    if (!foundUser && role) {
        foundUser = {
            id: `new-user-${Date.now()}`,
            name: "New " + (role === 'artisan' ? "Artisan" : "Explorer"),
            email: email,
            avatarUrl: "https://picsum.photos/seed/newuser/200/200",
            role: role
        }
    }

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('madebyhand-user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('madebyhand-user');
    router.push('/');
  };
  
  const switchRole = (role: UserRole) => {
    // This is a mock function to easily switch between user types for demo.
    const userToSwitch = mockUsers.find(u => u.role === role);
    if (userToSwitch) {
        setUser(userToSwitch);
        localStorage.setItem('madebyhand-user', JSON.stringify(userToSwitch));
        router.push('/dashboard');
    }
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-background"><p>Loading...</p></div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
