import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import BottomNav from './BottomNav';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Hide BottomNav on these routes
  const hideBottomNavRoutes = ['/login', '/register', '/', '/splash', '/chat/', '/details/', '/filters']; // Added details/ chat/ filters sub-routes check

  // Check if current path starts with any of the hidden base paths (for dynamic routes like /chat/1)
  const shouldHideBottomNav = hideBottomNavRoutes.some(route => {
    if (route === '/') return location.pathname === '/'; // Exact match for root
    if (route.endsWith('/')) return location.pathname.startsWith(route);
    return location.pathname === route;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#112334] transition-colors duration-300">

      {/* Desktop Top Navigation */}
      <nav className="hidden md:flex items-center justify-between px-5 py-4 bg-white dark:bg-[#1A2C42] border-b border-gray-200 dark:border-[#2B7FFF]/20 sticky top-0 z-50 transition-colors duration-300">
        {/* ... (keep nav content same, just ensuring wrapper handles body bg) */}
        <Link to="/home" className="flex items-center gap-2">
          <img
            src={isDark
              ? "/images/Znajdź mieszkanie, które naprawdę pasuje.png"
              : "/images/Znajdź mieszkanie, które naprawdę pasuje 2.png"
            }
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-bold text-gray-900 dark:text-white tracking-wide">Rent<span className="text-[#00E0FF]">Finder</span></span>
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/home" className="text-gray-600 dark:text-white hover:text-[#2B7FFF] dark:hover:text-[#00E0FF] transition-colors font-medium">Szukaj</Link>
          <Link to="/map" className="text-gray-600 dark:text-white hover:text-[#2B7FFF] dark:hover:text-[#00E0FF] transition-colors font-medium">Mapa</Link>
          <Link to="/chat" className="text-gray-600 dark:text-white hover:text-[#2B7FFF] dark:hover:text-[#00E0FF] transition-colors font-medium">Wiadomości</Link>
          <Link to="/favorites" className="text-gray-600 dark:text-white hover:text-[#2B7FFF] dark:hover:text-[#00E0FF] transition-colors font-medium">Ulubione</Link>
          <Link to="/settings" className="flex items-center gap-2 text-gray-600 dark:text-white hover:text-[#2B7FFF] dark:hover:text-[#00E0FF] transition-colors font-medium">
            <div className="w-8 h-8 rounded-full bg-[#2B7FFF] flex items-center justify-center text-xs text-white">👤</div>
            Profil
          </Link>
        </div>
      </nav>

      {/* Main Content Wrapper - STRICT 20px PADDING & MAX WIDTH */}
      <div className={`w-full mx-auto ${location.pathname === '/map' ? '' : 'px-[20px] pb-20'}`}>
        <Outlet />
      </div>

      {!shouldHideBottomNav && (
        <div className="md:hidden fixed bottom-0 w-full z-50">
          <BottomNav />
        </div>
      )}
    </div>
  );
};

export default Layout;