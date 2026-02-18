import React, { useState, useMemo } from 'react';
import PropertyCard from '../components/PropertyCard';
import FilterChip from '../components/FilterChip';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { filteredListings, filters, resetFilters } = useData(); // Get filters and reset function
  const [searchTerm, setSearchTerm] = useState('');

  // Helpers to check if specific filters are active
  const isPriceActive = filters.priceRange[0] > 0 || filters.priceRange[1] < 10000;
  const isAreaActive = filters.areaRange[0] > 0 || filters.areaRange[1] < 200;
  const isAmenitiesActive = filters.amenities.length > 0;

  const [activeFilter, setActiveFilter] = useState('Wszystkie');
  const typeFilters = ['Wszystkie', 'Apartament', 'Mieszkanie', 'Kawalerka', 'Studio', 'Loft', 'Penthouse'];

  const finalDisplayList = useMemo(() => {
    return filteredListings.filter(item => {
      // Filter by chip (Type)
      const matchesType = activeFilter === 'Wszystkie' || item.type === activeFilter;

      // Filter by search text
      const matchesSearch = (item.location?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (item.title?.toLowerCase() || '').includes(searchTerm.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [filteredListings, activeFilter, searchTerm]);

  return (
    <div className="pb-24 pt-0">

      {/* Search Header */}
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Gdzie chcesz zamieszkać?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-100 dark:bg-[#1A2C42] text-gray-900 dark:text-white px-5 py-4 rounded-xl shadow-sm border border-transparent focus:border-[#00E0FF] outline-none pl-12 transition-all placeholder-gray-500 dark:placeholder-[#8E9BAE]"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-[#8E9BAE]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        {/* Collapse icon / Filter trigger */}
        <button className="absolute right-4 top-1/2 -translate-y-1/2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E9BAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 dark:text-[#8E9BAE]">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* Main Filter Buttons (Cena, Metraż, Udogodnienia) */}
      <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide py-2">
        <button
          onClick={() => navigate('/filters', { state: { tab: 'price' } })}
          className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors shadow-sm ${isPriceActive
            ? 'bg-[#2B7FFF] text-white shadow-blue-500/20'
            : 'bg-white dark:bg-[#1A2C42] text-gray-600 dark:text-[#8E9BAE] hover:bg-gray-100 dark:hover:bg-[#233a54]'
            }`}
        >
          Cena
        </button>
        <button
          onClick={() => navigate('/filters', { state: { tab: 'area' } })}
          className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors shadow-sm ${isAreaActive
            ? 'bg-[#2B7FFF] text-white shadow-blue-500/20'
            : 'bg-white dark:bg-[#1A2C42] text-gray-600 dark:text-[#8E9BAE] hover:bg-gray-100 dark:hover:bg-[#233a54]'
            }`}
        >
          Metraż
        </button>
        <button
          onClick={() => navigate('/filters', { state: { tab: 'amenities' } })}
          className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors shadow-sm ${isAmenitiesActive
            ? 'bg-[#2B7FFF] text-white shadow-blue-500/20'
            : 'bg-white dark:bg-[#1A2C42] text-gray-600 dark:text-[#8E9BAE] hover:bg-gray-100 dark:hover:bg-[#233a54]'
            }`}
        >
          Udogodnienia
        </button>
      </div>

      {/* "Propozycje dla Ciebie" Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-900 dark:text-white font-bold text-lg">Propozycje dla Ciebie</h2>
        <button
          onClick={() => resetFilters()}
          className="text-[#2B7FFF] text-xs font-medium hover:underline"
        >
          Zobacz wszystkie
        </button>
      </div>

      {/* Listings Grid - Mobile First Layout (1 col) matching Screenshot 02 */}
      {/* Figma shows 1 big card per row on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {finalDisplayList.length > 0 ? (
          finalDisplayList.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-[#8E9BAE]">
            <p>Nie znaleziono ofert.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;