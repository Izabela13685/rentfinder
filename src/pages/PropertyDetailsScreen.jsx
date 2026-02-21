import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { useTheme } from '../context/ThemeContext';
import { MAP_LOADER_OPTIONS } from '../utils/mapConfig';

// Strict Dark Map Style provided by user
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#112334" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8E9BAE" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#112334" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#1A2C42" }] },
  { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#8E9BAE" }] },
  { featureType: "landscape", elementType: "geometry.fill", stylers: [{ color: "#112334" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#1A2C42" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#5a6d82" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#0f1f2e" }] },
  { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#1A2C42" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#5a6d82" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#1e3448" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#243d55" }] },
  { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#2a4560" }] },
  { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#4a5d72" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#1A2C42" }] },
  { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#2B7FFF" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0a1929" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#2B7FFF" }] },
];

const PropertyDetailsScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listings, isFavorite, toggleFavorite } = useData();
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Dynamic options for PropertyDetails (No Map ID, Pure Local Styles)
  const mapOptions = {
    disableDefaultUI: true,
    draggable: false, // Static map for details view
    styles: isDark ? darkMapStyle : [],
    zoomControl: false,
    minZoom: 10,
    maxZoom: 18,
  };

  const property = listings.find(p => p.id === parseInt(id));

  const { isLoaded } = useJsApiLoader(MAP_LOADER_OPTIONS);

  if (!property) {
    return <div className="text-center text-gray-900 dark:text-white py-10">Nie znaleziono oferty.</div>;
  }

  if (!isLoaded) {
    return <div className="min-h-screen bg-gray-50 dark:bg-[#112334] flex items-center justify-center text-gray-500">Loading Map...</div>;
  }

  const favorite = isFavorite(property.id);

  const handleFavoriteClick = () => {
    if (!user || user.isGuest) {
      alert('Zaloguj się, aby dodać do ulubionych');
      return;
    }
    toggleFavorite(property.id);
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link skopiowany!");
  };

  const handleMenu = () => {
    alert("Więcej opcji wkrótce");
  };

  // Theme-Aware Markers (Cyan Default)
  const glowingMarkerDefault = {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#00E5FF;stop-opacity:0.6"/>
            <stop offset="100%" style="stop-color:#00E5FF;stop-opacity:0"/>
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="28" fill="url(#glow)"/>
        <path fill="#00E5FF" d="M32 12c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
      </svg>
    `)}`,
    scaledSize: new window.google.maps.Size(48, 48),
    anchor: new window.google.maps.Point(24, 48),
  };

  const solidMarkerDefault = {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
        <path fill="#00E5FF" d="M32 12c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
      </svg>
    `)}`,
    scaledSize: new window.google.maps.Size(48, 48),
    anchor: new window.google.maps.Point(24, 48),
  };

  const markerIcon = isDark ? glowingMarkerDefault : solidMarkerDefault;

  // Use property.images if available, otherwise fallback to 5 copies of main image for demo
  const images = property.images || [property.image, property.image, property.image, property.image, property.image];

  // Helper for amenity SVG icons
  const getAmenityIcon = (amenity) => {
    const cls = "w-5 h-5 text-[#8E9BAE] dark:text-[#8E9BAE]";
    const lower = amenity.toLowerCase();

    if (lower.includes('światłowód') || lower.includes('internet') || lower.includes('wifi'))
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>;

    if (lower.includes('zwierzęta') || lower.includes('pet'))
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;

    if (lower.includes('klimatyzacja') || lower.includes('cool'))
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>;

    if (lower.includes('garaż') || lower.includes('parking') || lower.includes('miejsce'))
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 19H5V5h14v14z M5 9h14 M9 9v10 M15 9v10" /></svg>;

    if (lower.includes('winda'))
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-9 6l3-3 3 3m-6 6l3 3 3-3" /></svg>;

    if (lower.includes('balkon') || lower.includes('taras'))
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;

    if (lower.includes('meble') || lower.includes('biurko'))
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;

    if (lower.includes('pralka') || lower.includes('zmywarka'))
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v18h14V3H5zm4 4h6M9 11h6m-6 4h6" /></svg>;

    // Default Checkmark
    return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
  };

  return (
    <div className="pb-32 bg-gray-50 dark:bg-[#112334] min-h-screen text-gray-900 dark:text-white transition-colors duration-300">

      {/* 1. Image Gallery with Top Action Overlay */}
      <div className="relative h-[60vh] md:max-h-[600px] w-full overflow-hidden group shadow-sm bg-gray-200 dark:bg-gray-800">
        <img src={images[currentImageIndex]} alt={property.title} className="w-full h-full object-cover transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent"></div>

        {/* Top Overlay Icons - Left & Right */}
        <div className="absolute top-4 left-0 right-0 px-4 flex justify-between items-center z-20">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            aria-label="Wróć"
            className="bg-black/40 backdrop-blur-md p-2 rounded-full text-white w-10 h-10 flex items-center justify-center hover:bg-black/60 transition-colors min-h-[44px] min-w-[44px]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          {/* Right Action Icons: Heart, Share, Menu */}
          <div className="flex gap-3">
            <button
              onClick={handleFavoriteClick}
              aria-label="Dodaj do ulubionych"
              className="bg-black/40 backdrop-blur-md p-2 rounded-full text-white w-10 h-10 flex items-center justify-center hover:bg-black/60 transition-colors min-h-[44px] min-w-[44px]"
            >
              <svg
                className={`w-6 h-6 ${favorite ? 'text-[#00E0FF] fill-current' : 'text-white'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button
              onClick={handleShare}
              aria-label="Udostępnij"
              className="bg-black/40 backdrop-blur-md p-2 rounded-full text-white w-10 h-10 flex items-center justify-center hover:bg-black/60 transition-colors min-h-[44px] min-w-[44px]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button
              onClick={handleMenu}
              aria-label="Więcej opcji"
              className="bg-black/40 backdrop-blur-md p-2 rounded-full text-white w-10 h-10 flex items-center justify-center hover:bg-black/60 transition-colors min-h-[44px] min-w-[44px]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        {/* Left arrow */}
        {currentImageIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex(prev => prev - 1);
            }}
            aria-label="Poprzednie zdjęcie"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/60 z-30 transition-all opacity-0 group-hover:opacity-100 min-h-[44px] min-w-[44px]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
        )}

        {/* Right arrow */}
        {currentImageIndex < images.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex(prev => prev + 1);
            }}
            aria-label="Następne zdjęcie"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/60 z-30 transition-all opacity-0 group-hover:opacity-100 min-h-[44px] min-w-[44px]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        )}

        {/* Counter Badge */}
        <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 z-10">
          <span>📷</span> {currentImageIndex + 1}/{images.length}
        </div>
      </div>

      {/* 2. Thumbnails - Constrained width grid */}
      <div className="max-w-[600px] w-full">
        <div className="grid grid-cols-5 gap-2 px-4 mt-2 mb-6">
          {images.slice(0, 5).map((thumb, i) => (
            <img
              key={i}
              src={thumb}
              alt={`Thumbnail ${i}`}
              onClick={() => setCurrentImageIndex(i)}
              className={`w-full h-20 rounded-lg object-cover cursor-pointer transition-all ${i === currentImageIndex ? 'ring-2 ring-[#00E5FF]' : 'opacity-70 hover:opacity-100'
                }`}
            />
          ))}
        </div>
      </div>

      <div className="px-6">
        {/* Header: Price & Location */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {property.price} zł <span className="text-lg font-normal text-gray-500 dark:text-[#8E9BAE]">/ miesiąc</span>
              </h1>
              <span className="text-sm text-gray-500 dark:text-[#8E9BAE] font-medium">+ 400 zł czynsz</span>
            </div>

            <div className="flex items-center gap-1.5 mt-3 text-gray-500 dark:text-[#8E9BAE] text-base">
              <span className="text-[#2B7FFF] text-xl">📍</span>
              {property.location}
            </div>
          </div>
        </div>

        {/* Details Chips (Horizontal Scroll) */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 mb-8">
          <div className="px-5 py-3 bg-gray-100 dark:bg-[#1A2C42] rounded-full text-base font-medium whitespace-nowrap text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <span className="text-lg">🏠</span> {property.area} m²
          </div>
          <div className="px-5 py-3 bg-gray-100 dark:bg-[#1A2C42] rounded-full text-base font-medium whitespace-nowrap text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <span className="text-lg">🛏</span> {property.rooms} pokoje
          </div>
          <div className="px-5 py-3 bg-gray-100 dark:bg-[#1A2C42] rounded-full text-base font-medium whitespace-nowrap text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <span className="text-lg">🏢</span> 3 piętro
          </div>
          <div className="px-5 py-3 bg-gray-100 dark:bg-[#1A2C42] rounded-full text-base font-medium whitespace-nowrap text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <span className="text-lg">🛁</span> wanna
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Opis</h2>
          <p className="text-gray-600 dark:text-[#8E9BAE] text-base leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Amenities (2-col Grid) - SVG Icons */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Udogodnienia</h2>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            {property.amenities && property.amenities.length > 0 ? (
              property.amenities.map(amenity => (
                <div key={amenity} className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))
            ) : (
              <span className="text-gray-500 dark:text-[#8E9BAE] text-base col-span-2">Brak danych o udogodnieniach.</span>
            )}
          </div>
        </div>

        {/* Map */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Lokalizacja</h2>
        <div
          className="h-[400px] rounded-[24px] overflow-hidden mb-8 border border-gray-200 dark:border-[#2B7FFF]/20 shadow-sm cursor-pointer relative group"
          onClick={() => navigate('/map', { state: { lat: property.lat, lng: property.lng, zoom: 16 } })}
        >
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={{ lat: property.lat, lng: property.lng }}
              zoom={14}
              options={mapOptions}
            >
              <MarkerF
                position={{ lat: property.lat, lng: property.lng }}
                icon={markerIcon}
              />
            </GoogleMap>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-[#112334] text-gray-500">
              Loading Map...
            </div>
          )}

          {/* Overlay Hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center pointer-events-none">
            <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md transition-all transform scale-95 group-hover:scale-100">
              🗺️ Otwórz w mapach
            </span>
          </div>
        </div>
      </div>

      {/* 4. Action Buttons (Compact, Centered) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-[#112334] border-t border-gray-200 dark:border-[#1A2C42] z-50 flex justify-center gap-4">
        {/* Call Button - Solid Cyan */}
        <button className="px-8 py-3 rounded-full bg-[#00E5FF] text-[#112334] font-bold transition-transform active:scale-95 shadow-lg flex items-center justify-center gap-2 hover:bg-[#33ebff]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Zadzwoń
        </button>

        {/* Message Button - Outlined Cyan */}
        <button className="px-8 py-3 rounded-full border border-[#00E5FF] text-[#00E5FF] font-bold transition-transform active:scale-95 shadow-sm flex items-center justify-center gap-2 hover:bg-[#00E5FF]/10 text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Napisz
        </button>
      </div>
    </div>
  );
};

export default PropertyDetailsScreen;
