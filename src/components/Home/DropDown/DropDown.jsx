import React, { useState } from 'react';

import { useStore } from '../../../store';

import AdvancedSearch from '../AdvancedSearch';
import RangeSlider from '../../Form/Slider/Range';

import arrowIcon from '../../../img/light-combo-box-bg.png';
import closeIcon from '../../../img/close_white.svg';

import './DropDown.scss';

const DropDown = ({
  children, activeTab,
}) => {
  const {
    forms: { search },
    games,
  } = useStore();

  const sortByOptions = search.sortByOptions();
  const platformOptions = search.platformOptions();
  const genreOptions = search.genreOptions();

  const [close, setClose] = useState(activeTab !== 'filters');
  const [openModal, setOpenModal] = useState(false);

  const [openSortBy, setOpenSortBy] = useState(false);
  const [openPlatform, setOpenPlatform] = useState(false);
  const [openGenre, setOpenGenre] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);

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
          <button className="drop-btn flex-row align-center" type="button" onClick={() => setClose(!close)}>
            {activeTab}
            <img src={arrowIcon} className={`arrow-icon ${!close ? 'open' : ''}`} alt="arrow-icon" />
          </button>
          {activeTab === 'discover' && <AdvancedSearch showFilters={false} /> }
        </div>
        {/* eslint-disable jsx-a11y/click-events-have-key-events */}
        {activeTab === 'discover'
          && (
          <div
            className="flex-row justify-flex-end align-center filters-btn"
            onClick={() => setOpenModal(true)}
            role="button"
            tabIndex={0}
          >
            <p>Filters</p>
            <i className="fas fa-sort" />
          </div>
          )}
        {/* eslint-enable jsx-a11y/click-events-have-key-events */}
      </div>
      {/* eslint-disable jsx-a11y/click-events-have-key-events */}
      {
        !close
        && (
        <div
          className="dropdown-content flex-column justify-flex-start"
          onClick={() => setClose(true)}
          role="button"
          tabIndex={0}
        >
          {children}
        </div>
        )
      }
      {/* eslint-enable jsx-a11y/click-events-have-key-events */}
      {
          openModal
          && (
          <div className="filters-modal flex-column justify-flex-start">
            <div className="flex-column flex-grow">
              <div className="filters-tab flex-row justify-between">
                <p>Filters</p>
                {/* eslint-disable jsx-a11y/click-events-have-key-events */}
                {/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */}
                <img
                  src={closeIcon}
                  alt="close-icon"
                  onClick={() => setOpenModal(false)}
                  role="button"
                  tabIndex={0}
                />
                {/* eslint-enable jsx-a11y/click-events-have-key-events */}
                {/* eslint-enable jsx-a11y/no-noninteractive-element-to-interactive-role */}
              </div>

              <div className="filters-tab filters-container sortby-mobile flex-column">
                {/* eslint-disable jsx-a11y/click-events-have-key-events */}
                <div
                  className="flex-row justify-between align-center"
                  onClick={() => setOpenSortBy(!openSortBy)}
                  role="button"
                  tabIndex={0}
                >
                  <p>Sort By:</p>
                  <img src={arrowIcon} alt="close-icon" />
                </div>
                {/* eslint-enable jsx-a11y/click-events-have-key-events */}
                {openSortBy
                && (
                <div className="flex-column filters-list">
                  {/* eslint-disable jsx-a11y/click-events-have-key-events */}
                  {Object.keys(sortByOptions).map((option) => (
                    <div
                      className="filter"
                      onClick={() => search.setSearchParameters('sort_by', option)}
                      key={option}
                      role="button"
                      tabIndex={0}
                    >
                      {sortByOptions[option]}
                    </div>
                  ))}
                  {/* eslint-enable jsx-a11y/click-events-have-key-events */}
                </div>
                )}
              </div>

              <div className="filters-tab filters-container platform-mobile flex-column">
                {/* eslint-disable jsx-a11y/click-events-have-key-events */}
                <div
                  className="flex-row justify-between align-center"
                  onClick={() => setOpenPlatform(!openPlatform)}
                  role="button"
                  tabIndex={0}
                >
                  {/* eslint-enable jsx-a11y/click-events-have-key-events */}
                  <p>Platform:</p>
                  <img src={arrowIcon} alt="close-icon" />
                </div>
                {openPlatform
                && (
                <div className="flex-column filters-list">
                  {/* eslint-disable jsx-a11y/click-events-have-key-events */}
                  {Object.keys(platformOptions).map((option) => (
                    <div
                      className="filter"
                      onClick={() => search.setSearchParameters('platform', option)}
                      key={option}
                      role="button"
                      tabIndex={0}
                    >
                      {platformOptions[option]}
                    </div>
                  ))}
                  {/* eslint-enable jsx-a11y/click-events-have-key-events */}
                </div>
                )}
              </div>

              <div className="filters-tab filters-container genre-mobile flex-column">
                {/* eslint-disable jsx-a11y/click-events-have-key-events */}
                <div
                  className="flex-row justify-between align-center"
                  onClick={() => setOpenGenre(!openGenre)}
                  role="button"
                  tabIndex={0}
                >
                  {/* eslint-enable jsx-a11y/click-events-have-key-events */}
                  <p>Genre:</p>
                  <img src={arrowIcon} alt="close-icon" />
                </div>
                { openGenre
                && (
                <div className="flex-column filters-list">
                  {/* eslint-disable jsx-a11y/click-events-have-key-events */}
                  {Object.keys(genreOptions).map((option) => (
                    <div
                      className="filter"
                      onClick={() => search.setSearchParameters('genre', option)}
                      key={option}
                      role="button"
                      tabIndex={0}
                    >
                      {genreOptions[option]}
                    </div>
                  ))}
                  {/* eslint-enable jsx-a11y/click-events-have-key-events */}
                </div>
                )}
              </div>

              <div className="filters-tab filters-container genre-mobile flex-column">
                {/* eslint-disable jsx-a11y/click-events-have-key-events */}
                <div
                  className="flex-row justify-between align-center"
                  onClick={() => setOpenPrice(!openPrice)}
                  role="button"
                  tabIndex={0}
                >
                  {/* eslint-enable jsx-a11y/click-events-have-key-events */}
                  <p>Range:</p>
                  <img src={arrowIcon} alt="close-icon" />
                </div>
                { openPrice
                && (
                <div className="flex-column filters-list">
                  <div className="filter">
                    <RangeSlider
                      range={search.price.defaultRange()}
                      values={search.price.values()}
                      setValues={setPriceValues}
                    />
                  </div>
                </div>
                )}
              </div>
            </div>

            <div className="flex-row">
              <button
                className="dropdown-modal-button button align-self-flex-end"
                onClick={() => handleSubmit()}
                type="button"
              >
                DONE
              </button>
            </div>

          </div>
          )
      }
    </div>
  );
};

export default DropDown;
