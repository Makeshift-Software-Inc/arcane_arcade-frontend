import React from 'react';

import searchIcon from '../../../img/search-bg.png';

import './SearchInput.scss';

const SearchInput = ({
  name, value, onChange, className, ...rest
}) => (
  <div className="search-input flex-row flex-grow align-center">
    <img src={searchIcon} alt="search-icon" className="search-icon" />
    <input
      type="search"
      name={name}
      value={value}
      onChange={onChange}
      placeholder="Search for anything"
      className={`arcane-input ${className || ''}`}
      autoComplete="off"
      {...rest}
    />
  </div>
);

export default SearchInput;
