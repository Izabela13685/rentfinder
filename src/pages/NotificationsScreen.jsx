import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationsScreen = () => {
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: 'Nowa wiadomość', text: 'Maja Wiśniewska odpowiedziała na Twoją wiadomość', time: '2 godz. temu', unread: true },
    { id: 2, title: 'Nowe mieszkanie', text: 'Nowe mieszkanie w Twojej okolicy spełnia Twoje kryteria', time: '5 godz. temu', unread: true },
    { id: 3, title: 'Przypomnienie', text: 'Masz umówione oglądanie mieszkania jutro o 15:00', time: 'Wczoraj', unread: false },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="px-5 py-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate('/settings')}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-900 dark:text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-gray-900 dark:text-white text-2xl font-bold">Powiadomienia</h1>
        </div>

        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`bg-surface-light dark:bg-surface-dark rounded-button p-4 ${
                notif.unread ? 'border-l-4 border-primary' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-900 dark:text-white font-semibold">{notif.title}</h3>
                <span className="text-textGrey text-xs">{notif.time}</span>
              </div>
              <p className="text-textGrey text-sm">{notif.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsScreen;
