import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('rentfinder_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simple mock login against initialUsers or stored registered users
    // For MVP, we'll just check against initialUsers + localStorage "registered" ones if we were building that.
    // Here we just check initialUsers.
    const foundUser = initialUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('rentfinder_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const guestLogin = () => {
    const guestUser = { id: 'guest', name: 'Gość', email: 'guest@rentfinder.pl', isGuest: true };
    setUser(guestUser);
    localStorage.setItem('rentfinder_user', JSON.stringify(guestUser));
  };

  const register = (name, email, password) => {
    // Mock registration - just log them in immediately as if it worked
    const newUser = { id: Date.now(), name, email };
    setUser(newUser);
    localStorage.setItem('rentfinder_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rentfinder_user');
    // HARD RESET: Force reload to clear all React states and DataContext
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, guestLogin, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};