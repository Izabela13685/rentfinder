import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const SettingsScreen = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  // Mock Notification Toggle State
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-[#112334] text-gray-900 dark:text-white transition-colors duration-300">
      {/* Header with Back Button */}
      <div className="bg-white dark:bg-[#1A2C42] px-4 py-4 flex items-center shadow-sm sticky top-0 z-10 transition-colors duration-300">
        <button onClick={() => navigate(-1)} aria-label="Wróć" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 min-h-[44px] min-w-[44px] flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold ml-4">Profil i Ustawienia</h1>
      </div>

      <div className="p-6 max-w-lg mx-auto">
        {/* User Card */}
        <div className="bg-gray-50 dark:bg-[#1A2C42] rounded-[24px] p-6 mb-6 flex items-center gap-4 shadow-sm border border-transparent hover:border-[#2B7FFF]/20 transition-all">
          <div className="w-16 h-16 rounded-full bg-[#2B7FFF]/20 flex items-center justify-center text-3xl border border-[#2B7FFF]/50">
            👤
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name || 'Użytkownik'}</h2>
            <p className="text-gray-500 dark:text-[#8E9BAE]">{user?.email}</p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-[#1A2C42] rounded-[24px] overflow-hidden shadow-sm transition-colors duration-300">

          {/* Dark Mode */}
          <div className="p-4 border-b border-gray-200 dark:border-[#112334] flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-[#233a54] transition-colors" onClick={toggleTheme}>
            <div className="flex items-center gap-3">
              <span className="text-xl">🌙</span>
              <span className="text-gray-900 dark:text-white font-medium">Tryb Ciemny</span>
            </div>
            {/* Toggle UI */}
            <div className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${isDark ? 'bg-[#2B7FFF]' : 'bg-gray-400'}`}>
              <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${isDark ? 'translate-x-5' : ''}`}></div>
            </div>
          </div>

          {/* Notifications */}
          <div
            className="p-4 border-b border-gray-200 dark:border-[#112334] flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-[#233a54] transition-colors"
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🔔</span>
              <span className="text-gray-900 dark:text-white font-medium">Powiadomienia</span>
            </div>
            {/* Toggle UI - UNIFIED COLOR (Blue #2B7FFF) */}
            <div className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${notificationsEnabled ? 'bg-[#2B7FFF]' : 'bg-gray-400'}`}>
              <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${notificationsEnabled ? 'translate-x-5' : ''}`}></div>
            </div>
          </div>

          {/* Privacy (New Section) */}
          {!user?.isGuest && (
            <div
              className="p-4 border-b border-gray-200 dark:border-[#112334] flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-[#233a54] transition-colors"
              onClick={() => navigate('/privacy')}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🔒</span>
                <span className="text-gray-900 dark:text-white font-medium">Prywatność i bezpieczeństwo</span>
              </div>
              <span className="text-gray-400 dark:text-[#8E9BAE]"> &gt; </span>
            </div>
          )}

          {/* Logout or Login/Register for Guest */}
          {user?.isGuest ? (
            <button
              onClick={() => {
                logout(); // Clears guest session
                navigate('/login');
              }}
              className="w-full p-4 flex items-center gap-3 text-[#2B7FFF] font-bold hover:bg-[#2B7FFF]/10 transition-colors"
            >
              <span className="text-xl">👋</span>
              Zaloguj się / Zarejestruj się
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="w-full p-4 flex items-center gap-3 text-[#FF0000] font-bold hover:bg-red-900/10 transition-colors"
            >
              <span className="text-xl">🚪</span>
              Wyloguj się
            </button>
          )}
        </div>

        <p className="text-center text-[#8E9BAE]/50 text-xs mt-8">RentFinder v1.2.0 • Build 2026</p>
      </div>
    </div>
  );
};

export default SettingsScreen;
