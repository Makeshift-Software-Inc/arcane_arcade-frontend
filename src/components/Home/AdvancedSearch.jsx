import React from 'react';
import { observer } from 'mobx-react';

import { useStore } from '../../store';

import RangeSlider from '../Form/Slider/Range';
import SearchInput from '../Form/SearchInput/SearchInput';
import Select from './Input/Select';



const AdvancedSearch = ({showFilters = true}) => {
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
    <div className="browse-listings flex-column flex-grow advanced-search">
      <div className="flex-row flex-grow justify-flex-end search-filters">

       
      
        <div className={`navbar-start flex-column flex-grow ${ !showFilters ? 'display-none' : ''}`}>

          <div className="flex-row flex-grow">
            <div className="search-item flex-row align-center">
              <label htmlFor="search-sort-by">Sort By:</label>
              <Select 
                name="sort_by"
                id="search-sort-by"
                value={search.sort_by}
                onChange={handleChange}  
                options={sortByOptions}
                keys={true}
              />
            </div>

            <div className="search-item flex-row align-center">
              <label htmlFor="search-platform">Platform:</label>
              <Select 
                name="platform"
                id="search-platform"
                value={search.platform}
                onChange={handleChange} 
                options={platformOptions}
                keys={true}
              />
            </div>
          </div>

          <div className="flex-row more-filters align-center">
            <div className="search-item">
              <label htmlFor="search-genre">Genre:</label>
              <Select 
                name="genre"
                id="search-genre"
                value={search.genre}
                onChange={handleChange}
                options={genreOptions}
                keys={false}
              />
            </div>

            <div className="search-item flex-row align-center">
              <label htmlFor="price-range">Price Range:</label>
              <RangeSlider
                range={search.price.defaultRange()}
                values={search.price.values()}
                setValues={setPriceValues}
              />
            </div>
          </div>

        </div>


  

        <div className="flex-row align-center justify-flex-end">
            <form onSubmit={handleSubmit}>
              <SearchInput onChange={handleChange} value={search.query}  name="query"/>
            </form>
        </div>


      </div>

      
    </div>
  );
};

export default observer(AdvancedSearch);
