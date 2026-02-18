import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: '⚙️', label: 'Ustawienia', path: '/settings' },
    { icon: '🔔', label: 'Powiadomienia', path: '/notifications' },
    { icon: '🛡️', label: 'Prywatność', path: '/privacy' },
    { icon: '🚪', label: 'Wyloguj się', action: handleLogout, danger: true },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="px-5 py-8 max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-bold">
            {currentUser?.name?.charAt(0) || 'U'}
          </div>
          <h2 className="text-gray-900 dark:text-white text-xl font-bold mb-1">
            {currentUser?.name || 'Użytkownik'}
          </h2>
          <p className="text-textGrey text-sm">{currentUser?.email || 'email@example.com'}</p>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => item.action ? item.action() : navigate(item.path)}
              className="w-full bg-surface-light dark:bg-surface-dark rounded-button p-4 flex items-center justify-between hover:scale-[1.01] transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span
                  className={`font-semibold ${
                    item.danger ? 'text-red-500' : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {item.label}
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${item.danger ? 'text-red-500' : 'text-textGrey'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
