import React from 'react';
import { observer } from 'mobx-react';

import { useStore } from '../../store';

import RangeSlider from '../Form/Slider/Range';

const AdvancedSearch = () => {
  const {
    forms: { search },
    games,
  } = useStore();

  const sortByOptions = search.sortByOptions();
  const platformOptions = search.platformOptions();
  const genreOptions = search.genreOptions();

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    games.search();
  };

  const handleChange = (e) => {
    search.onChange(e);
    if (e.target.name !== 'query') {
      handleSubmit();
    }
  };

  const setPriceValues = (values) => {
    search.price.setValues(values);
    handleSubmit();
  };

  return (
    <nav
      className="navbar browse-listings flex-column"
      role="navigation"
      aria-label="main-navigation"
    >
      <div id="navbarBasicExample" className="navbar-menu search-filters">
        <div className="navbar-start">
          <div className="navbar-item">
            <label htmlFor="search-sort-by">Sort By</label>

            <div className="select">
              <select
                name="sort_by"
                id="search-sort-by"
                value={search.sort_by}
                onChange={handleChange}
              >
                {Object.keys(sortByOptions).map((option) => (
                  <option key={option} value={option}>
                    {sortByOptions[option]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="navbar-item">
            <label htmlFor="search-platform">Platform</label>

            <div className="select">
              <select
                name="platform"
                id="search-platform"
                value={search.platform}
                onChange={handleChange}
              >
                {Object.keys(platformOptions).map((option) => (
                  <option key={option} value={option}>
                    {platformOptions[option]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleChange}
                value={search.query}
                name="query"
                type="search"
                placeholder="search"
                className="topcoat-search-input"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="flex-row justify-between">
        <div className="navbar-item">
          <label htmlFor="search-genre">Platform</label>
          <div className="select">
            <select
              name="genre"
              id="search-genre"
              value={search.genre}
              onChange={handleChange}
              aria-label="search by genre"
            >
              {genreOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="navbar-item">
          <RangeSlider
            range={search.price.defaultRange()}
            values={search.price.values()}
            setValues={setPriceValues}
          />
        </div>
      </div>
    </nav>
  );
};

export default observer(AdvancedSearch);
