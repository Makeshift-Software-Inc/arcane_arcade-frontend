import React from 'react';

import searchIcon from './../../../img/search-bg.png';

import './SearchInput.scss';

const SearchInput = ({
  name, value, onChange,  placeholder, labelClass, className,
}) => (
  <div className="search-input flex-row flex-grow align-center">
    <img src={searchIcon} alt="search-icon" className="search-icon"/>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder="Search for anything"
      className={`arcane-input ${className}`}
    />
  </div>
);

export default SearchInput;