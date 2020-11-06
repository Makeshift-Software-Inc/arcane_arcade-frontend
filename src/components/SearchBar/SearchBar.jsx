import React from 'react';

import AdvancedSearch from '../Home/AdvancedSearch';

const SearchBar = ({ children, show = true }) => (
  <div className="flex-row justify-between flex-grow align-center top-search-bar">

    {children}

    {
      show
      && (
      <div className="flex-row flex-grow justify-flex-end advanced-search">

        <AdvancedSearch showFilters={false} />

      </div>
      )
    }

  </div>
);

export default SearchBar;
