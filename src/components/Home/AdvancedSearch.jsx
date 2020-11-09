import React from 'react';
import { observer } from 'mobx-react';

import { useStore } from '../../store';

import RangeSlider from '../Form/Slider/Range';
import SearchInput from '../Form/SearchInput/SearchInput';
import Select from './Input/Select';

const AdvancedSearch = ({ goToExploreTab, showFilters = true }) => {
  const {
    forms: { search },
    games,
  } = useStore();

  const sortByOptions = search.sortByOptions();
  const platformOptions = search.platformOptions();
  const genreOptions = search.genreOptions();

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (goToExploreTab) goToExploreTab();
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
    <div className="browse-listings flex-row flex-grow advanced-search search-filters">
      <div
        className={`navbar-start flex-column ${
          !showFilters ? 'display-none' : ''
        }`}
      >
        <div className="flex-row flex-grow flex-wrap">
          <div className="search-item flex-row flex-wrap align-center">
            <label htmlFor="search-sort-by">Sort By:</label>
            <Select
              name="sort_by"
              className="search-sort-by"
              id="search-sort-by"
              value={search.sort_by}
              onChange={handleChange}
              options={sortByOptions}
              keys
            />
          </div>

          <div className="search-item flex-row flex-wrap align-center">
            <label htmlFor="search-platform">Platform:</label>
            <Select
              name="platform"
              className="search-platform"
              id="search-platform"
              value={search.platform}
              onChange={handleChange}
              options={platformOptions}
              keys
            />
          </div>

          <div className="search-item flex-row flex-wrap align-center">
            <label htmlFor="search-genre">Genre:</label>
            <Select
              name="genre"
              className="search-genre"
              id="search-genre"
              value={search.genre}
              onChange={handleChange}
              options={genreOptions}
              keys={false}
            />
          </div>

          <div className="search-item flex-row flex-wrap align-center">
            <label htmlFor="price-range">Price Range:</label>
            <RangeSlider
              range={search.price.defaultRange()}
              values={search.price.values()}
              setValues={setPriceValues}
              maxValue={60}
            />
          </div>
        </div>
      </div>

      <div className="flex-row align-center justify-flex-end flex-grow">
        <form onSubmit={handleSubmit}>
          <SearchInput
            onChange={handleChange}
            value={search.query}
            name="query"
          />
        </form>
      </div>
    </div>
  );
};

export default observer(AdvancedSearch);
