import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Importy stron
import SplashScreen from './pages/SplashScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import HomeScreen from './pages/HomeScreen';
import MapScreen from './pages/MapScreen';
import SettingsScreen from './pages/SettingsScreen';
import PropertyDetailsScreen from './pages/PropertyDetailsScreen';
import FavoritesScreen from './pages/FavoritesScreen';
import FiltersScreen from './pages/FiltersScreen'; // Added support for filters page if needed independently
import ChatListScreen from './pages/ChatListScreen';
import ChatDetailScreen from './pages/ChatDetailScreen';
import PrivacyScreen from './pages/PrivacyScreen';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Ekran startowy */}
              <Route path="/" element={<SplashScreen />} />

              {/* Logowanie i Rejestracja */}
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />

              {/* Ścieżki chronione (tylko dla zalogowanych - w tym Gość) */}
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/map" element={<MapScreen />} />
                <Route path="/favorites" element={<FavoritesScreen />} />
                <Route path="/filters" element={<FiltersScreen />} />
                <Route path="/chat" element={<ChatListScreen />} />
                <Route path="/chat/:id" element={<ChatDetailScreen />} />
                <Route path="/settings" element={<SettingsScreen />} />
                <Route path="/privacy" element={<PrivacyScreen />} />
                <Route path="/details/:id" element={<PropertyDetailsScreen />} />
              </Route>

              {/* Jeśli ktoś wpisze głupoty, wraca na start */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;