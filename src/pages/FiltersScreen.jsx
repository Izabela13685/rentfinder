import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';

const FiltersScreen = () => {
  const navigate = useNavigate();
  const { setFilters, filters: initialFilters } = useData();
  const location = useLocation();

  const [localFilters, setLocalFilters] = useState(initialFilters);
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'amenities');

  // Simple Line SVGs for Amenities
  const activeIconClass = "text-white";
  const inactiveIconClass = "text-white"; // Changed to white as requested (differentiation via bg color)

  const getIcon = (name, active) => {
    const cls = `w-8 h-8 md:w-5 md:h-5 ${active ? activeIconClass : inactiveIconClass}`;
    const strokeWidth = 2.5; // Thicker stroke as requested

    switch (name) {
      case 'Zwierzęta': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
      case 'Balkon': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
      case 'Garaż': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M19 19H5V5h14v14z M5 9h14 M9 9v10 M15 9v10" /></svg>;
      case 'Światłowód': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>;
      case 'Biurko': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
      case 'Klimatyzacja': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>;
      case 'Zmywarka': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M5 3v18h14V3H5zm4 4h6M9 11h6m-6 4h6" /></svg>;
      case 'Winda': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-9 6l3-3 3 3m-6 6l3 3 3-3" /></svg>;
      case 'Smart Home': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
      case 'Student': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>;
      case 'Niepalący': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>;
      case 'Dostępność': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>;
      default: return null;
    }
  };

  const amenitiesList = [
    'Zwierzęta', 'Balkon', 'Garaż', 'Światłowód',
    'Biurko', 'Klimatyzacja', 'Zmywarka', 'Winda',
    'Smart Home', 'Student', 'Niepalący', 'Dostępność'
  ];

  const isAmenityActive = (name) => localFilters.amenities.includes(name);

  const toggleAmenity = (name) => {
    setLocalFilters(prev => {
      const exists = prev.amenities.includes(name);
      return {
        ...prev,
        amenities: exists ? prev.amenities.filter(a => a !== name) : [...prev.amenities, name]
      };
    });
  };

  const roomOptions = [1, 2, 3, '4+'];

  const isRoomActive = (value) => localFilters.rooms.includes(value);

  const toggleRoom = (value) => {
    setLocalFilters(prev => {
      const exists = prev.rooms.includes(value);
      return {
        ...prev,
        rooms: exists ? prev.rooms.filter(r => r !== value) : [...prev.rooms, value]
      };
    });
  };

  const handleApply = () => {
    setFilters(localFilters);
    navigate('/home');
  };

  const handleClear = () => {
    setLocalFilters((prev) => {
      const newState = { ...prev };
      if (activeTab === 'price') newState.priceRange = [0, 10000];
      else if (activeTab === 'area') newState.areaRange = [0, 200];
      else if (activeTab === 'rooms') newState.rooms = [];
      else if (activeTab === 'amenities') newState.amenities = [];
      return newState;
    });
  };

  return (
    <div className="min-h-screen bg-[#112334] text-white flex flex-col font-sans">
      {/* Header */}
      <div className="bg-[#1A2C42] px-4 py-4 flex items-center shadow-sm z-10">
        <button onClick={() => navigate(-1)} aria-label="Wróć" className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white min-h-[44px] min-w-[44px] flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold ml-4">
          {activeTab === 'price' && 'Cena'}
          {activeTab === 'area' && 'Metraż'}
          {activeTab === 'rooms' && 'Pokoje'}
          {activeTab === 'amenities' && 'Udogodnienia'}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 pb-40">
        <div className="tab-content-container">
          {activeTab === 'price' && (
            <div id="cena-content" className="animate-fade-in">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs text-[#8E9BAE] mb-1 block">Od</label>
                  <input
                    type="number"
                    value={localFilters.priceRange[0]}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, priceRange: [Number(e.target.value), prev.priceRange[1]] }))}
                    className="w-full bg-[#1A2C42] p-3 rounded-xl border border-transparent focus:border-[#2B7FFF] outline-none text-white transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-[#8E9BAE] mb-1 block">Do</label>
                  <input
                    type="number"
                    value={localFilters.priceRange[1]}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], Number(e.target.value)] }))}
                    className="w-full bg-[#1A2C42] p-3 rounded-xl border border-transparent focus:border-[#2B7FFF] outline-none text-white transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'area' && (
            <div id="metraz-content" className="animate-fade-in">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs text-[#8E9BAE] mb-1 block">Od</label>
                  <input
                    type="number"
                    value={localFilters.areaRange[0]}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, areaRange: [Number(e.target.value), prev.areaRange[1]] }))}
                    className="w-full bg-[#1A2C42] p-3 rounded-xl border border-transparent focus:border-[#2B7FFF] outline-none text-white transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-[#8E9BAE] mb-1 block">Do</label>
                  <input
                    type="number"
                    value={localFilters.areaRange[1]}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, areaRange: [prev.areaRange[0], Number(e.target.value)] }))}
                    className="w-full bg-[#1A2C42] p-3 rounded-xl border border-transparent focus:border-[#2B7FFF] outline-none text-white transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rooms' && (
            <div id="pokoje-content" className="animate-fade-in">
              <p className="text-sm text-[#8E9BAE] mb-4">Wybierz liczbę pokoi</p>
              <div className="flex gap-3">
                {roomOptions.map((value) => {
                  const active = isRoomActive(value);
                  return (
                    <button
                      key={value}
                      onClick={() => toggleRoom(value)}
                      className={`flex-1 py-4 rounded-2xl text-lg font-bold transition-all duration-200 border ${active
                        ? 'bg-[#2B7FFF] border-[#2B7FFF] text-white shadow-[0_4px_12px_rgba(43,127,255,0.4)]'
                        : 'bg-[#1A2C42] border-[#2B7FFF]/10 text-white hover:bg-[#233a54]'
                        }`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'amenities' && (
            <div id="udogodnienia-content" className="animate-fade-in flex flex-col items-center">
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-2 w-full">
                {amenitiesList.map((name) => {
                  const active = isAmenityActive(name);
                  return (
                    <button
                      key={name}
                      onClick={() => toggleAmenity(name)}
                      className={`aspect-square flex flex-col items-center justify-center p-2 md:p-1.5 rounded-2xl md:rounded-xl transition-all duration-200 border ${active
                        ? 'bg-[#2B7FFF] border-[#2B7FFF] shadow-[0_4px_12px_rgba(43,127,255,0.4)]'
                        : 'bg-[#1A2C42] border-[#2B7FFF]/10 hover:bg-[#233a54]'
                        }`}
                    >
                      <div className="mb-2 md:mb-1">
                        {getIcon(name, active)}
                      </div>
                      <span className="text-xs md:text-[10px] font-bold text-center leading-tight text-white">
                        {name}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions - Stacked Vertical */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#112334] border-t border-[#1A2C42] z-50 flex flex-col gap-4 items-center">
        <button
          onClick={handleClear}
          className="px-8 py-3 rounded-full border border-white/30 text-white text-sm font-bold hover:bg-white/10 transition-colors"
        >
          Wyczyść
        </button>
        <button
          onClick={handleApply}
          className="w-full bg-[#2B7FFF] text-white font-bold py-3 rounded-full shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
        >
          Pokaż wynik
        </button>
      </div>
    </div>
  );
};

export default FiltersScreen;
