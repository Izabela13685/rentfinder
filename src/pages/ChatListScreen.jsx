import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const ChatListScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { chats, listings } = useData();

  if (!user || user.isGuest) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-[#112334] p-6 text-center transition-colors duration-300">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-gray-900 dark:text-white text-2xl font-bold mb-2">Funkcja dostępna po zalogowaniu</h2>
        <p className="text-gray-500 dark:text-[#8E9BAE] mb-6">Jako gość nie masz dostępu do tej sekcji.</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-[#2B7FFF] text-white px-8 py-3 rounded-2xl font-bold"
        >
          Zaloguj się teraz
        </button>
      </div>
    );
  }

  const getChatProperty = (propertyId) => {
    return listings.find(l => l.id === propertyId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#112334] text-gray-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-[#1A2C42] px-4 py-4 flex items-center shadow-sm sticky top-0 z-10 transition-colors duration-300">
        <button onClick={() => navigate(-1)} aria-label="Wróć" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold ml-4">Wiadomości</h1>
      </div>

      <div className="px-5 py-6 max-w-3xl mx-auto space-y-4">
        {chats.map((chat) => {
          const property = getChatProperty(chat.propertyId);
          const lastMessage = chat.messages[chat.messages.length - 1];

          return (
            <div
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="bg-white dark:bg-[#1A2C42] rounded-[16px] p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#233a54] transition-all flex items-start gap-4 border border-transparent hover:border-[#2B7FFF]/30 shadow-sm"
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover border border-[#2B7FFF]"
              />

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                      {chat.name}
                    </h3>
                    <div className="w-2 h-2 bg-[#2B7FFF] rounded-full"></div>
                  </div>
                  <span className="text-gray-400 dark:text-[#8E9BAE] text-xs">{lastMessage.time}</span>
                </div>

                <p className="text-gray-500 dark:text-[#8E9BAE] text-sm mb-2 truncate">
                  {lastMessage.text}
                </p>

                {property && (
                  <div className="text-[#2B7FFF] text-xs font-medium truncate">
                    {property.type} • {property.location} • {property.area} m²
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatListScreen;
