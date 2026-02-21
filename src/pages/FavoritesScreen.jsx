import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const FavoritesScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Needed for guest check
  const { listings, favorites } = useData();

  // GUEST LOGIC - STRICT GATE
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

  const favoriteListings = listings.filter(listing =>
    favorites.includes(listing.id)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#112334] text-gray-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-[#1A2C42] px-4 py-4 flex items-center shadow-sm sticky top-0 z-10 transition-colors duration-300">
        <button onClick={() => navigate(-1)} aria-label="Wróć" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold ml-4 flex-1 text-center pr-10">Polubione</h1>
      </div>

      <div className="px-5 py-6 max-w-7xl mx-auto">
        {favoriteListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* We need to import PropertyCard, oops - better import it at top */}
            {/* Added dynamic import fix or assume it's imported. I will verify imports in the tool output */}
            {/* Wait, I can't leave broken imports. I'll add the import line in execution. */}
            {favoriteListings.map((property) => (
              // Correctly rendering card
              // PropertyCard is needed here.
              <div key={property.id} onClick={() => navigate(`/details/${property.id}`)} className="bg-white dark:bg-[#1A2C42] rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all">
                <div className="relative aspect-[4/3]">
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-bold text-lg">{property.price} PLN</p>
                    <p className="text-white/80 text-sm">{property.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 flex flex-col items-center">
            <div className="w-20 h-20 bg-white dark:bg-[#1A2C42] rounded-full flex items-center justify-center mb-6 shadow-sm">
              <svg className="w-10 h-10 text-gray-400 dark:text-[#8E9BAE]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <h2 className="text-gray-900 dark:text-white text-xl font-bold mb-2">
              Jeszcze nic nie polubiłeś
            </h2>
            <p className="text-gray-500 dark:text-[#8E9BAE] text-sm max-w-xs leading-relaxed">
              Przeglądaj oferty i kliknij serduszko, aby zapisać swoje ulubione miejsca na później.
            </p>
            <button
              onClick={() => navigate('/home')}
              className="mt-8 bg-[#2B7FFF] text-white font-bold py-3 px-8 rounded-2xl hover:bg-blue-600 transition-colors"
            >
              Przeglądaj oferty
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesScreen;
