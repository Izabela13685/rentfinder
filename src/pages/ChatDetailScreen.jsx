import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

const ChatDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getChatById, addMessageToChat, listings } = useData();
  const [newMessage, setNewMessage] = useState('');

  const chat = getChatById(id);

  if (!chat) {
    return (
      <div className="min-h-screen bg-[#112334] flex items-center justify-center">
        <p className="text-white">Czat nie znaleziony</p>
      </div>
    );
  }

  const property = listings.find(l => l.id === chat.propertyId);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      from: 'user',
      text: newMessage,
      time: new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
    };

    addMessageToChat(id, message);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[100dvh] md:h-[calc(100vh-80px)] bg-gray-50 dark:bg-[#112334] text-gray-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-[#1A2C42] px-4 py-3 flex items-center gap-3 shadow-sm sticky top-0 z-10 border-b border-gray-200 dark:border-[#233a54] transition-colors duration-300">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <img
          src={chat.avatar}
          alt={chat.name}
          className="w-10 h-10 rounded-full object-cover border border-[#2B7FFF]"
        />

        <div className="flex-1">
          <h2 className="font-bold text-gray-900 dark:text-white text-sm">{chat.name}</h2>
          {property && (
            <p className="text-gray-500 dark:text-[#8E9BAE] text-xs truncate">
              {property.location}
            </p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
        {chat.messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] px-5 py-3 rounded-[20px] shadow-sm ${message.from === 'user'
                ? 'bg-[#2B7FFF] text-white rounded-tr-sm'
                : 'bg-white dark:bg-[#1A2C42] text-gray-900 dark:text-white rounded-tl-sm'
                }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-[10px] mt-1 text-right ${message.from === 'user' ? 'text-white/70' : 'text-gray-400 dark:text-[#8E9BAE]'
                }`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="mt-auto bg-white dark:bg-[#1A2C42] px-4 py-3 pb-6 border-t border-gray-200 dark:border-[#233a54] flex gap-3 transition-colors duration-300"
      >
        <input
          type="text"
          placeholder="Napisz wiadomość..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-gray-100 dark:bg-[#112334] text-gray-900 dark:text-white px-5 py-3 rounded-full border border-transparent focus:border-[#2B7FFF] outline-none placeholder-gray-500 dark:placeholder-[#8E9BAE] transition-colors"
        />
        <button
          type="submit"
          className="bg-[#2B7FFF] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#00c2dd] transition-all shadow-lg active:scale-95"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatDetailScreen;
