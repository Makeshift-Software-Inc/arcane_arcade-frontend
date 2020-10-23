import React from 'react';

import SearchInput from '../Form/SearchInput/SearchInput';

const SearchBar = ({ children }) => (
  <div className="flex-row justify-between align-center top-search-bar">

    {children}

    <div className="flex-row flex-grow justify-flex-end">
      <form>
        <SearchInput />
      </form>
    </div>
  </div>
);

export default SearchBar;
