import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Czat', path: '/chat', icon: '💬' }, // Placeholder icon converted to text or svg below? 
    // Figma shows: Chat bubble, Magnifying Glass (Search), Pin (Map), Heart (Favorites), Person (Profile)
    { name: 'Szukaj', path: '/home', icon: '🔍' },
    { name: 'Mapa', path: '/map', icon: '📍' },
    { name: 'Polubione', path: '/favorites', icon: '❤️' }, // using emoji for now, replaceable with SVGs
    { name: 'Profil', path: '/settings', icon: '👤' },
  ];

  // Helper for icons based on screenshots
  const getIcon = (name, isActive) => {
    const color = isActive ? '#2B7FFF' : '#8E9BAE';
    if (name === 'Czat')
      return <svg className="w-6 h-6" fill="none" stroke={color} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;

    if (name === 'Szukaj')
      return <svg className="w-6 h-6" fill="none" stroke={color} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;

    if (name === 'Mapa')
      return <svg className="w-6 h-6" fill="none" stroke={color} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

    if (name === 'Polubione') // Heart requires fill if active?
      return <svg className="w-6 h-6" fill={isActive ? color : 'none'} stroke={color} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;

    if (name === 'Profil')
      return <svg className="w-6 h-6" fill="none" stroke={color} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;

    return null;
  }

  return (
    <div className="bg-[#112334] border-t border-[#1A2C42] px-2 py-3 pb-6 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const isActive = location.pathname.startsWith(item.path) || (item.path === '/home' && location.pathname === '/');
        // Hack: Treat root as home for active state

        return (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center w-full gap-1 transition-colors ${isActive ? 'text-[#2B7FFF]' : 'text-[#8E9BAE]'
              }`}
          >
            {getIcon(item.name, isActive)}
            <span className="text-[10px] font-medium tracking-wide">{item.name}</span>
            {isActive && <div className="h-1 w-1 rounded-full bg-[#2B7FFF] absolute bottom-2"></div>}
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;