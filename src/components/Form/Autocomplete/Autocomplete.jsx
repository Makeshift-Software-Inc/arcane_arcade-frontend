import React, { useState, useEffect, useRef } from 'react';

import AutocompleteDropdown from './AutocompleteDropdown';
import SearchInput from '../SearchInput/SearchInput';

console.warn = () => {};

const Autocomplete = ({ searchForm, handleMore }) => {
  const [value, setValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const timeoutRef = useRef(null);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const showMore = () => {
    handleMore(value);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (newValue.trim().length < 3) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        setShowDropdown(false);
      }
      return;
    }
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(true);
      searchForm.search(newValue);
    }, 500);
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') showMore();
  };

  const items = searchForm.searchResults.slice(0, 5);
  const hasMore = searchForm.searchResults.length > 5;

  return (
    <div className="search-autocomplete relative">
      <SearchInput
        onKeyUp={handleKeyUp}
        name="query"
        onChange={handleChange}
        value={value}
      />
      {showDropdown && (
        <AutocompleteDropdown
          items={items}
          showMore={hasMore && showMore}
          searching={searchForm.searching}
        />
      )}
    </div>
  );
};

export default Autocomplete;
