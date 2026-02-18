import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivacyScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Guest Protection
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

  // --- State Management ---
  const [toggles, setToggles] = useState({
    twoFactor: false,
    profileVisibility: false, // false = Public, true = Private
    searchHistory: true,
    recommendations: true,
  });

  const [modals, setModals] = useState({
    password: false,
    email: false,
    clearHistory: false,
    clearCache: false,
    deactivate: false,
    deleteAccount: false,
  });

  const [expanded, setExpanded] = useState({
    privacy: false,
    terms: false,
    licenses: false,
  });

  // --- Handlers ---
  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const openModal = (key) => {
    setModals(prev => ({ ...prev, [key]: true }));
  };

  const closeModal = (key) => {
    setModals(prev => ({ ...prev, [key]: false }));
  };

  const toggleSection = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAction = (message, modalKey) => {
    // Simulate API call
    setTimeout(() => {
      if (modalKey) closeModal(modalKey);
      alert(message);
    }, 300);
  };

  // --- UI Components ---
  const Section = ({ title, children, isDanger }) => (
    <div className={`mb-6 rounded-2xl overflow-hidden border ${isDanger ? 'border-red-500/20 bg-red-50/50 dark:bg-red-900/10' : 'border-transparent bg-white dark:bg-[#1A2C42] shadow-sm'}`}>
      <div className={`px-5 py-4 border-b ${isDanger ? 'border-red-500/10' : 'border-gray-100 dark:border-[#112334]'}`}>
        <h2 className={`font-bold text-lg ${isDanger ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{title}</h2>
      </div>
      <div className="p-2">
        {children}
      </div>
    </div>
  );

  const Toggle = ({ checked, onChange }) => (
    <div
      onClick={onChange}
      className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 cursor-pointer ${checked ? 'bg-[#2B7FFF]' : 'bg-gray-300 dark:bg-gray-600'}`}
    >
      <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${checked ? 'translate-x-5' : ''}`} />
    </div>
  );

  const Arrow = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#112334] text-gray-900 dark:text-white transition-colors duration-300 pb-10">
      {/* Header */}
      <div className="bg-white dark:bg-[#1A2C42] px-4 py-4 flex items-center shadow-sm sticky top-0 z-10 transition-colors duration-300">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold ml-4">Prywatność i bezpieczeństwo</h1>
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto">

        {/* Section 1: Konto */}
        <Section title="Konto">
          <div className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-[#112334] rounded-xl" onClick={() => openModal('password')}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2B7FFF]/10 text-[#2B7FFF] flex items-center justify-center text-xl">🔑</div>
              <span className="font-medium">Zmień hasło</span>
            </div>
            <Arrow />
          </div>
          <div className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-[#112334] rounded-xl" onClick={() => openModal('email')}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2B7FFF]/10 text-[#2B7FFF] flex items-center justify-center text-xl">📧</div>
              <span className="font-medium">Zmień email</span>
            </div>
            <Arrow />
          </div>
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2B7FFF]/10 text-[#2B7FFF] flex items-center justify-center text-xl">🛡️</div>
              <span className="font-medium">Weryfikacja dwuetapowa</span>
            </div>
            <Toggle checked={toggles.twoFactor} onChange={() => handleToggle('twoFactor')} />
          </div>
        </Section>

        {/* Section 2: Prywatność */}
        <Section title="Prywatność">
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2B7FFF]/10 text-[#2B7FFF] flex items-center justify-center text-xl">👁️</div>
              <div>
                <div className="font-medium">Widoczność profilu</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{toggles.profileVisibility ? 'Prywatny' : 'Publiczny'}</div>
              </div>
            </div>
            <Toggle checked={toggles.profileVisibility} onChange={() => handleToggle('profileVisibility')} />
          </div>
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2B7FFF]/10 text-[#2B7FFF] flex items-center justify-center text-xl">🕒</div>
              <span className="font-medium">Udostępniaj historię wyszukiwania</span>
            </div>
            <Toggle checked={toggles.searchHistory} onChange={() => handleToggle('searchHistory')} />
          </div>
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2B7FFF]/10 text-[#2B7FFF] flex items-center justify-center text-xl">✨</div>
              <span className="font-medium">Personalizowane rekomendacje</span>
            </div>
            <Toggle checked={toggles.recommendations} onChange={() => handleToggle('recommendations')} />
          </div>
        </Section>

        {/* Section 3: Dane i pamięć */}
        <Section title="Dane i pamięć">
          <div className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-[#112334] rounded-xl" onClick={() => openModal('clearHistory')}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2B7FFF]/10 text-[#2B7FFF] flex items-center justify-center text-xl">🗑️</div>
              <span className="font-medium">Wyczyść historię wyszukiwania</span>
            </div>
          </div>
          <div className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-[#112334] rounded-xl" onClick={() => openModal('clearCache')}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2B7FFF]/10 text-[#2B7FFF] flex items-center justify-center text-xl">🧹</div>
              <span className="font-medium">Wyczyść pamięć podręczną</span>
            </div>
          </div>
          <div className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-[#112334] rounded-xl" onClick={() => handleAction('Twoje dane zostały wysłane na adres email powiązany z kontem.')}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2B7FFF]/10 text-[#2B7FFF] flex items-center justify-center text-xl">📥</div>
              <span className="font-medium">Pobierz moje dane</span>
            </div>
          </div>
        </Section>

        {/* Section 4: Informacje prawne */}
        <Section title="Informacje prawne">
          {['privacy', 'terms', 'licenses'].map((key) => (
            <div key={key} className="border-b border-gray-100 dark:border-[#112334] last:border-0">
              <div
                className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-[#112334] rounded-xl"
                onClick={() => toggleSection(key)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2B7FFF]/10 text-[#2B7FFF] flex items-center justify-center text-xl">
                    {key === 'privacy' && '🔒'}
                    {key === 'terms' && '📜'}
                    {key === 'licenses' && '⚖️'}
                  </div>
                  <span className="font-medium">
                    {key === 'privacy' && 'Polityka prywatności'}
                    {key === 'terms' && 'Regulamin'}
                    {key === 'licenses' && 'Licencje open source'}
                  </span>
                </div>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${expanded[key] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
              {expanded[key] && (
                <div className="p-4 text-sm text-gray-500 dark:text-[#8E9BAE] bg-gray-50 dark:bg-[#112334]/50 mx-2 mb-2 rounded-lg leading-relaxed">
                  {key === 'privacy' ? (
                    <>
                      <strong>1. Gromadzenie danych:</strong> Zbieramy podstawowe dane użytkownika w celu świadczenia usług.<br /><br />
                      <strong>2. Pliki cookies:</strong> Używamy plików cookies do poprawy jakości działania serwisu.<br /><br />
                      <strong>3. Bezpieczeństwo:</strong> Stosujemy najnowsze standardy szyfrowania.
                    </>
                  ) : key === 'terms' ? (
                    <>
                      <strong>1. Akceptacja warunków:</strong> Korzystanie z aplikacji oznacza akceptację regulaminu.<br /><br />
                      <strong>2. Odpowiedzialność:</strong> RentFinder nie ponosi odpowiedzialności za treść ofert dodawanych przez użytkowników.<br /><br />
                      <strong>3. Zmiany:</strong> Zastrzegamy sobie prawo do zmian w regulaminie.
                    </>
                  ) : (
                    <>
                      • <strong>React</strong> (MIT License)<br />
                      • <strong>Tailwind CSS</strong> (MIT License)<br />
                      • <strong>Google Maps API</strong> (Commercial)<br />
                      • <strong>React Router</strong> (MIT License)
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </Section>

        {/* Section 5: Strefa zagrożenia */}
        <Section title="Strefa zagrożenia" isDanger>
          <div className="p-3 flex items-center justify-between cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl" onClick={() => openModal('deactivate')}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 text-red-500 flex items-center justify-center text-xl">⚠️</div>
              <span className="font-medium text-red-500">Dezaktywuj konto</span>
            </div>
          </div>
          <div className="p-3 flex items-center justify-between cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl mt-2 border border-red-500/20" onClick={() => openModal('deleteAccount')}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 text-red-500 flex items-center justify-center text-xl">☠️</div>
              <span className="font-medium text-red-500">Usuń konto i dane</span>
            </div>
          </div>
        </Section>

      </div>

      {/* --- MODALS --- */}

      {/* Password Modal */}
      {modals.password && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#1A2C42] w-full max-w-md rounded-2xl p-6 shadow-xl animate-in zoom-in-95 border border-gray-100 dark:border-white/10">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Zmień hasło</h3>
            <div className="space-y-4">
              <input type="password" placeholder="Obecne hasło" className="w-full bg-gray-100 dark:bg-[#112334] p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#2B7FFF] dark:text-white border border-transparent focus:border-transparent transition-all" />
              <input type="password" placeholder="Nowe hasło" className="w-full bg-gray-100 dark:bg-[#112334] p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#2B7FFF] dark:text-white border border-transparent focus:border-transparent transition-all" />
              <input type="password" placeholder="Potwierdź nowe hasło" className="w-full bg-gray-100 dark:bg-[#112334] p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#2B7FFF] dark:text-white border border-transparent focus:border-transparent transition-all" />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => closeModal('password')} className="px-4 py-2 font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors">Anuluj</button>
              <button onClick={() => handleAction('Hasło zostało zmienione pomyślnie.', 'password')} className="px-6 py-2 bg-[#2B7FFF] text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30">Zapisz</button>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {modals.email && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#1A2C42] w-full max-w-md rounded-2xl p-6 shadow-xl animate-in zoom-in-95 border border-gray-100 dark:border-white/10">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Zmień adres email</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Wprowadź nowy adres email. Wyślemy na niego link weryfikacyjny.</p>
            <input type="email" placeholder="Nowy adres email" className="w-full bg-gray-100 dark:bg-[#112334] p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#2B7FFF] dark:text-white border border-transparent focus:border-transparent transition-all" />
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => closeModal('email')} className="px-4 py-2 font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors">Anuluj</button>
              <button onClick={() => handleAction('Email został zaktualizowany.', 'email')} className="px-6 py-2 bg-[#2B7FFF] text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30">Zapisz</button>
            </div>
          </div>
        </div>
      )}

      {/* Generic Confirmation Modal */}
      {(modals.clearHistory || modals.clearCache || modals.deactivate || modals.deleteAccount) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#1A2C42] w-full max-w-md rounded-2xl p-6 shadow-xl animate-in zoom-in-95 border border-gray-100 dark:border-white/10">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${modals.deleteAccount || modals.deactivate ? 'bg-red-100 dark:bg-red-900/20 text-red-500' : 'bg-blue-100 dark:bg-blue-900/20 text-[#2B7FFF]'}`}>
              <span className="text-2xl">
                {modals.deleteAccount ? '☠️' : modals.deactivate ? '⚠️' : '🗑️'}
              </span>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${modals.deleteAccount || modals.deactivate ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
              {modals.deleteAccount ? 'Usunąć konto?' : modals.deactivate ? 'Dezaktywować konto?' : 'Wyczyścić dane?'}
            </h3>
            <p className="text-gray-600 dark:text-[#8E9BAE] mb-6 leading-relaxed">
              {modals.deleteAccount ? 'Tej operacji nie można cofnąć. Wszystkie Twoje dane, historia wyszukiwania i ulubione oferty zostaną trwale usunięte.' :
                modals.deactivate ? 'Twoje konto zostanie ukryte dla innych użytkowników. Możesz je przywrócić logując się ponownie w dowolnym momencie.' :
                  'Czy na pewno chcesz kontynuować? Ta operacja usunie dane lokalne aplikacji.'}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModals(prev => ({ ...prev, clearHistory: false, clearCache: false, deactivate: false, deleteAccount: false }))}
                className="px-4 py-2 font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                Anuluj
              </button>
              <button
                onClick={() => {
                  if (modals.deleteAccount) handleAction('Konto zostało trwale usunięte.', 'deleteAccount');
                  else if (modals.deactivate) handleAction('Konto zostało dezaktywowane.', 'deactivate');
                  else if (modals.clearHistory) handleAction('Historia wyszukiwania została wyczyszczona.', 'clearHistory');
                  else if (modals.clearCache) handleAction('Pamięć podręczna została wyczyszczona.', 'clearCache');
                }}
                className={`px-6 py-2 text-white rounded-xl font-bold shadow-lg transition-colors ${modals.deleteAccount || modals.deactivate ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30' : 'bg-[#2B7FFF] hover:bg-blue-600 shadow-blue-500/30'}`}
              >
                {modals.deleteAccount ? 'Usuń bezpowrotnie' : 'Potwierdź'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PrivacyScreen;
