import React from 'react';

const FilterChip = ({ label, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-button text-sm font-semibold transition-all ${
        active
          ? 'bg-primary text-white'
          : 'bg-surface-light dark:bg-surface-dark text-gray-700 dark:text-textGrey'
      }`}
    >
      {label}
    </button>
  );
};

export default FilterChip;

