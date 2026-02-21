import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { initialListings, initialChats } from '../data/mockData';
// Import useAuth to listen for login/logout changes
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { user } = useAuth(); // Listen to Auth Context
  const [listings, setListings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtering State
  const defaultFilters = {
    priceRange: [0, 10000],
    areaRange: [0, 200],
    rooms: [],
    floor: [],
    amenities: []
  };

  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    // Initial Load of static data
    setListings(initialListings);
    setLoading(false);
  }, []);

  // Watch for User Logout/Guest State & Load User-Specific Data
  useEffect(() => {
    if (!user || user.isGuest) {
      // GUEST or LOGOUT: Clear sensitive data from state
      setFavorites([]);
      setChats([]);
    } else {
      // LOGGED IN: Load data specific to this user
      // distinct key for each user to prevent leakage
      const userKey = `rentfinder_favorites_${user.id}`;
      const storedFavorites = JSON.parse(localStorage.getItem(userKey) || '[]');
      setFavorites(storedFavorites);

      // For MVP, we reload default chats for everyone, 
      // real app would fetch `chats_${user.id}`
      setChats(initialChats);
    }
  }, [user]);

  const toggleFavorite = (id) => {
    // STRICT GATE: Guests cannot toggle favorites
    if (!user || user.isGuest) {
      return; // STOP execution immediately
    }

    let newFavorites;
    if (favorites.includes(id)) {
      newFavorites = favorites.filter(favId => favId !== id);
    } else {
      newFavorites = [...favorites, id];
    }
    setFavorites(newFavorites);

    // Save to User-Specific Key
    const userKey = `rentfinder_favorites_${user.id}`;
    localStorage.setItem(userKey, JSON.stringify(newFavorites));
  };

  const isFavorite = (id) => favorites.includes(id);

  const getChatById = (id) => {
    return chats.find(c => c.id === parseInt(id));
  };

  const addMessageToChat = (chatId, message) => {
    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === parseInt(chatId)) {
        return { ...chat, messages: [...chat.messages, message] };
      }
      return chat;
    }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  // Derived state for filtered listings
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      // 1. Price
      if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) return false;

      // 2. Area
      if (Number(item.area) < Number(filters.areaRange[0]) || Number(item.area) > Number(filters.areaRange[1])) return false;

      // 3. Rooms
      if (filters.rooms.length > 0) {
        // logic: if item.rooms is NOT in filters.rooms, exclude it.
        // Exception: if '4+' is in filters, and rooms >= 4, include it.
        const matchesExact = filters.rooms.includes(item.rooms);
        const matchesPlus = filters.rooms.includes('4+') && item.rooms >= 4;

        if (!matchesExact && !matchesPlus) return false;
      }

      // 4. Floor
      if (filters.floor.length > 0) {
        const matchesExact = filters.floor.includes(item.floor);
        const matchesPlus = filters.floor.includes('5+') && item.floor >= 5;
        if (!matchesExact && !matchesPlus) return false;
      }

      // 5. Amenities
      if (filters.amenities.length > 0) {
        // If item has NO amenities property, exclude if we require some
        if (!item.amenities) return false;

        // Check if EVERY selected amenity is present in item.amenities
        const hasAllAmenities = filters.amenities.every(requiredAmenity =>
          item.amenities.includes(requiredAmenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });
  }, [listings, filters, favorites]);

  return (
    <DataContext.Provider value={{
      listings,
      filteredListings,
      favorites,
      toggleFavorite,
      isFavorite,
      filters,
      setFilters,
      resetFilters,
      chats,
      getChatById,
      addMessageToChat,
      loading
    }}>
      {!loading && children}
    </DataContext.Provider>
  );
};