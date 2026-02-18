import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useData();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!user || user.isGuest) {
      alert('Zaloguj się, aby dodać do ulubionych');
      return;
    }
    toggleFavorite(property.id);
  };

  const favorite = isFavorite(property.id);

  return (
    <div
      onClick={() => navigate(`/details/${property.id}`)}
      className="bg-white dark:bg-[#112334] rounded-[24px] overflow-hidden cursor-pointer group mb-2 hover:bg-gray-50 dark:hover:bg-[#1A2C42] transition-colors shadow-sm dark:shadow-none border border-gray-100 dark:border-transparent"
    >
      <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden">
        <img
          src={property.image}
          alt={property.location}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Heart Icon - Top Right */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm rounded-full p-2.5 transition-all text-white hover:bg-black/50"
        >
          {favorite ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00E0FF]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
      </div>

      <div className="pt-3 pb-2 px-2">
        {/* Flex row for alignment */}
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-gray-900 dark:text-white text-xl font-bold truncate">{property.price} zł <span className="text-gray-500 dark:text-[#8E9BAE] font-normal text-base">/ mc</span></h3>
          <div className="flex items-center bg-gray-100 dark:bg-[#1A2C42] px-2 py-1 rounded-lg">
            <span className="text-xs text-[#00E0FF] font-bold">⭐ 4.8</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-900 dark:text-white text-md font-medium truncate max-w-[60%]">{property.title}</p>
          <p className="text-gray-500 dark:text-[#8E9BAE] text-xs whitespace-nowrap">{property.rooms} pok. • {property.area} m²</p>
        </div>

        <div className="flex items-center gap-1 mt-1 text-gray-500 dark:text-[#8E9BAE]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <p className="text-xs truncate">{property.location}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
