import React, {useState} from 'react';

import { useStore } from '../../../store';

import AdvancedSearch from '../AdvancedSearch';
import RangeSlider from '../../Form/Slider/Range';

import arrowIcon from './../../../img/light-combo-box-bg.png';
import closeIcon from './../../../img/close_white.svg';

import './DropDown.scss';

const DropDown = ({ content, onChange, children, activeTab }) => {

  const {
    forms: { search },
    games,
  } = useStore();

  const sortByOptions = search.sortByOptions();
  const platformOptions = search.platformOptions();
  const genreOptions = search.genreOptions();

  const [close, setClose] = useState(activeTab == "filters" ? false : true);
  const [openModal, setOpenModal] = useState(false);

  const [openSortBy, setOpenSortBy]     = useState(false);
  const [openPlatform, setOpenPlatform] = useState(false);
  const [openGenre, setOpenGenre]       = useState(false);
  const [openPrice, setOpenPrice]       = useState(false);


  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setOpenModal(false);
    games.search();
  };

  const setPriceValues = (values) => {
    search.price.setValues(values);
  };


  return (
    <div className="homepage-dropdown flex-column">
      <div className="flex-column drop-bar">
        <div className="flex-row top">
          <button className="drop-btn flex-row align-center" onClick={() => setClose(!close) }>
            {activeTab}
            <img src={arrowIcon} className={`arrow-icon ${!close ? 'open' : ''}`} alt="arrow-icon"/>
          </button>
          {activeTab === 'discover' && <AdvancedSearch showFilters={false} /> }
        </div>
         {activeTab === 'discover' && 
          <div className="flex-row justify-flex-end align-center filters-btn" onClick={() => setOpenModal(true)}>
            <p>Filters</p>
            <i className="fas fa-sort"></i>
          </div>
        }
      </div>

      {
        !close && 
        <div className="dropdown-content flex-column justify-flex-start" onClick={() => setClose(true) }>
         {children}
        </div> 
      }
      {
          openModal && 
          <div className="filters-modal flex-column justify-flex-start" >

            <div className="filters-tab flex-row justify-between">
              <p>Filters</p>
              <img src={closeIcon} alt="close-icon" onClick={() => setOpenModal(false) }/>
            </div>

            <div className="filters-tab filters-container sortby-mobile flex-column">
              <div className="flex-row justify-between align-center" onClick={() => setOpenSortBy(!openSortBy)}>
                <p>Sort By:</p>
                <img src={arrowIcon} alt="close-icon"/>
              </div>
              {openSortBy &&
                <div className="flex-column filters-list">
                {

                  Object.keys(sortByOptions).map((option) => {
                    return (
                      <div className="filter" onClick={() => search.setSearchParameters("sort_by", option)} key={option}>
                        {sortByOptions[option]}
                      </div>
                    ) 
                  })
                }
                </div> 
              }
            </div>

            <div className="filters-tab filters-container platform-mobile flex-column">
              <div className="flex-row justify-between align-center" onClick={() => setOpenPlatform(!openPlatform)}>
                  <p>Platform:</p>
                <img src={arrowIcon} alt="close-icon"/>
              </div>
               {openPlatform && 
                <div className="flex-column filters-list">
                {

                  Object.keys(platformOptions).map((option) => {
                    return (
                      <div className="filter" onClick={() => search.setSearchParameters("platform", option)} key={option} >
                        {platformOptions[option]}
                      </div>
                    ) 
                  })
                }
                </div>
              }
            </div>

            <div className="filters-tab filters-container genre-mobile flex-column">
              <div className="flex-row justify-between align-center" onClick={() => setOpenGenre(!openGenre)}>
                  <p>Genre:</p>
                <img src={arrowIcon} alt="close-icon"/>
              </div>
              { openGenre &&
                <div className="flex-column filters-list">
                {
                  Object.keys(genreOptions).map((option) => {
                    return (
                      <div className="filter" onClick={() => search.setSearchParameters("genre", option)} key={option}>
                        {genreOptions[option]}
                      </div>
                    ) 
                  })
                }
                </div>
              }
            </div>

            <div className="filters-tab filters-container genre-mobile flex-column">
              <div className="flex-row justify-between align-center" onClick={() => setOpenPrice(!openPrice)}>
                  <p>Range:</p>
                <img src={arrowIcon} alt="close-icon"/>
              </div>
              { openPrice &&
                <div className="flex-column filters-list">
                  <div className="filter">
                    <RangeSlider
                      range={search.price.defaultRange()}
                      values={search.price.values()}
                      setValues={setPriceValues}
                    />
                  </div>
                </div>
              }
            </div>

            <div className="filters-tab filters-container genre-mobile flex-column">
              <button className="dropdown-modal-button button align-self-flex-end" onClick={()  => handleSubmit()}>
                DONE
              </button>
            </div>
            
          </div>
      }
    </div>
)};

export default DropDown;