import React, { useState, useRef } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { useData } from '../context/DataContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { MAP_LOADER_OPTIONS } from '../utils/mapConfig';

const defaultCenter = { lat: 52.2297, lng: 21.0122 };


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

// Stable options object (No Map ID, Pure Local Styles)


const MapScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { filteredListings } = useData();
  const { isDark } = useTheme();
  const [selectedListing, setSelectedListing] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  // Handle passed location state
  const passedLocation = location.state;
  const initialCenter = passedLocation
    ? { lat: passedLocation.lat, lng: passedLocation.lng }
    : defaultCenter;
  const initialZoom = passedLocation?.zoom || 12;

  // Dynamic options object (No Map ID, Pure Local Styles)
  const mapOptions = {
    disableDefaultUI: true,
    styles: isDark ? darkMapStyle : [],
    zoomControl: true,
    minZoom: 6, // 2. Map is too zoomed out (fixed)
    maxZoom: 18,
  };

  const { isLoaded } = useJsApiLoader(MAP_LOADER_OPTIONS);

  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const onUnmount = () => {
    mapRef.current = null;
  };

  const onPlaceChanged = () => {
    const autocomplete = autocompleteRef.current;
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place?.name) setSearchValue(place.name);

      if (place?.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchValue('');
    if (mapRef.current) {
      mapRef.current.panTo(defaultCenter);
      mapRef.current.setZoom(12);
    }
  };

  const onAutocompleteLoad = (autocompleteInstance) => {
    autocompleteRef.current = autocompleteInstance;
  };

  if (!isLoaded) {
    return <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-[#112334] text-gray-500">Loading Map...</div>;
  }

  // 1. Defined SVGs for Markers (Scaled & Sharp)
  // Removed width/height from SVG string to rely on scaledSize (Fixes 3. White box issue)
  // 1. Defined SVGs for Markers (Theme-Aware)
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

  const glowingMarkerSelected = {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
        <defs>
          <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#2B7FFF;stop-opacity:0.8"/>
            <stop offset="100%" style="stop-color:#2B7FFF;stop-opacity:0"/>
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="28" fill="url(#glow2)"/>
        <path fill="#2B7FFF" d="M32 12c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
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

  const solidMarkerSelected = {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
        <path fill="#2B7FFF" d="M32 12c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
      </svg>
    `)}`,
    scaledSize: new window.google.maps.Size(48, 48),
    anchor: new window.google.maps.Point(24, 48),
  };

  const defaultMarkerIcon = isDark ? glowingMarkerDefault : solidMarkerDefault;
  const selectedMarkerIcon = isDark ? glowingMarkerSelected : solidMarkerSelected;

  return (
    <div className="relative h-full w-full bg-gray-50 dark:bg-[#112334] transition-colors duration-300">
      {/* Back Button Overlay */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-50 bg-white/80 dark:bg-[#1A2C42]/80 p-3 rounded-full text-gray-900 dark:text-white backdrop-blur-md hover:bg-blue-100 dark:hover:bg-[#2B7FFF] transition-colors shadow-lg"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      {/* 2. Floating Search Bar Overlay */}
      <style>
        {`
          .pac-container {
            background-color: #1A2C42 !important; /* Dark background */
            font-family: inherit;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            margin-top: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 99999 !important;
            pointer-events: auto !important;
          }
          .pac-item {
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            padding: 12px 16px;
            color: #fff;
            cursor: pointer;
          }
          .pac-item:hover {
            background-color: rgba(43, 127, 255, 0.2); /* Blue hover */
          }
          .pac-item-query {
            color: #fff;
            font-weight: bold;
          }
          .pac-icon {
            filter: invert(1); /* White icons */
          }
        `}
      </style>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-sm z-50">
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md rounded-full px-4 py-3 border border-white/10 shadow-lg">
          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {isLoaded && (
            <Autocomplete
              onLoad={onAutocompleteLoad}
              onPlaceChanged={onPlaceChanged}
              className="flex-1 w-full"
            >
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Gdzie chcesz zamieszkać?"
                className="bg-transparent border-none outline-none text-white placeholder-gray-300 text-sm flex-1 w-full"
              />
            </Autocomplete>
          )}

          {searchValue.length > 0 && (
            <button
              onClick={handleClearSearch}
              className="text-gray-400 hover:text-white focus:outline-none transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={initialCenter}
          zoom={initialZoom}
          options={mapOptions} // Using pure local styles options
          onClick={() => setSelectedListing(null)}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {filteredListings.map(listing => (
            <MarkerF
              key={listing.id}
              position={{ lat: listing.lat, lng: listing.lng }}
              onClick={(e) => {
                if (e && e.stop) e.stop();
                setSelectedListing(listing);
              }}
              icon={selectedListing?.id === listing.id ? selectedMarkerIcon : defaultMarkerIcon}
            />
          ))}
        </GoogleMap>

        {/* 3. Frosted Glass Popup Card */}
        {selectedListing && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md bg-black/50 backdrop-blur-md rounded-2xl p-4 z-50 border border-white/10 transition-all duration-300 animate-in slide-in-from-bottom-5">

            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedListing(null);
              }}
              className="absolute top-2 right-2 bg-white/10 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors z-10"
            >
              ✕
            </button>

            <div
              className="flex gap-4 cursor-pointer items-center"
              onClick={() => navigate(`/details/${selectedListing.id}`)}
            >
              <img
                src={selectedListing.image}
                alt={selectedListing.title}
                className="w-24 h-24 object-cover rounded-xl shadow-sm bg-gray-200"
              />

              <div className="flex flex-col flex-1 pr-6 justify-center text-white">
                <h3 className="font-bold text-white text-base leading-tight line-clamp-2">
                  {selectedListing.title}
                </h3>
                <p className="text-[#2B7FFF] font-bold text-lg mt-1">
                  {selectedListing.price} PLN <span className="text-xs text-gray-300 font-normal">/ mc</span>
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-300">
                  <span className="bg-white/10 px-2 py-1 rounded-md">{selectedListing.rooms} pok.</span>
                  <span className="bg-white/10 px-2 py-1 rounded-md">{selectedListing.area} m²</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapScreen;