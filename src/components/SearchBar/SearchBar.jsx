import React from 'react';

import SearchInput from '../Form/SearchInput/SearchInput';

const SearchBar = ({ children, show = true }) => (
  <div className="flex-row justify-between justify-flex-start flex-grow align-center top-search-bar">

    {children}

    { 
      show &&
      <div className="flex-row flex-grow justify-flex-end">
        <form>
          <SearchInput />
        </form>
      </div>
    }

  </div>
);

export default SearchBar;
