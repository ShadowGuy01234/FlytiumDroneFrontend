import React, { useState, useEffect } from 'react';
import styles from './Filter.module.css';

const FilterComponent = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFilterChange = (filter) => {
    const newSelectedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((f) => f !== filter)
      : [...selectedFilters, filter];

    setSelectedFilters(newSelectedFilters);
    onFilterChange(newSelectedFilters);
  };

  const toggleFilterModal = () => setShowFilterModal((prev) => !prev);

  return (
    <>
      {isMobile && !showFilterModal && (
        <div className={styles.filterBar}>
          <div className={styles.filterIcon}>
            <button className={styles.filterButton} onClick={toggleFilterModal}>
              <img src="/filter.svg" alt="Filter Icon" className={styles.filterIcon} />
              Filter 
            </button>
            <button className={styles.filterButton} onClick={toggleFilterModal}>
               <img src="/sort.svg" alt="Filter Icon" className={styles.filterIcon} />
               Sort
            </button>
            
          </div>
        </div>
      )}

      {isMobile && showFilterModal && (
        <div className={styles.filterModal}>
          <div className={styles.modalContent}>
            <h2 className={styles.title}>Filters</h2>
            <button className={styles.closeButton} onClick={toggleFilterModal}>X</button>
            <FilterOptions selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
          </div>
        </div>
      )}

      {!isMobile && (
        <div className={styles.filterContainer}>
          <h2 className={styles.title}>Filters</h2>
          <FilterOptions selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
        </div>
      )}
    </>
  );
};

const FilterOptions = ({ selectedFilters, onFilterChange }) => (
  <>
    <div className={styles.filterSection}>
      <h3>Deals</h3>
      <ul>
        {['Recommended', 'All'].map((deal) => (
          <li key={deal} className={styles.filterItem}>
            <label>
              <input
                type="checkbox"
                checked={selectedFilters.includes(deal)}
                onChange={() => onFilterChange(deal)}
              />
              {deal}
            </label>
          </li>
        ))}
      </ul>
    </div>
    <div className={styles.filterSection}>
      <h3>Type</h3>
      <ul>
        {['Smartphones', 'Tablets', 'Laptops', 'Monitors', 'Home Audio', 'Sound Tower', 'Wearables', 'Televisions', 'Refrigerators', 'Washing Machines & Dryers', 'Microwave Ovens', 'Vacuum Cleaners'].map((type) => (
          <li key={type} className={styles.filterItem}>
            <label>
              <input
                type="checkbox"
                checked={selectedFilters.includes(type)}
                onChange={() => onFilterChange(type)}
              />
              {type}
            </label>
          </li>
        ))}
      </ul>
    </div>
  </>
);

export default FilterComponent;
