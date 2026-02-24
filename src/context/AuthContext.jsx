import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('rentfinder_users');
    return storedUsers ? JSON.parse(storedUsers) : initialUsers;
  });
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
    // Simple mock login against users state
    const foundUser = users.find(u => u.email === email && u.password === password);
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
    // Mock registration - add to users state and persist
    const newUser = { id: Date.now(), name, email, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('rentfinder_users', JSON.stringify(updatedUsers));

    // Log them in immediately
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