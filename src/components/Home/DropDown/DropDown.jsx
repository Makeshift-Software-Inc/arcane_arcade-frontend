import React, { useState } from 'react';
import { observer } from 'mobx-react';

import { useStore } from '../../../store';

import RangeSlider from '../../Form/Slider/Range';
import SearchModal from '../../Form/SearchInput/Modal';

import arrowIcon from '../../../img/light-combo-box-bg.png';
import closeIcon from '../../../img/close_white.svg';

import './DropDown.scss';

const DropDown = ({ children, activeTab, handleMore }) => {
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

  const handleOpenModal = (e) => {
    e.preventDefault();
    document.body.classList.add('no-scroll');
    setOpenModal(true);
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    document.body.classList.remove('no-scroll');
    setOpenModal(false);
  };

  const setPriceValues = (values) => {
    search.price.setValues(values);
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    search.update({ [e.target.dataset.name]: e.target.dataset.value });
  };

  return (
    <div className="homepage-dropdown flex-column">
      <div className="flex-column">
        <div className="flex-row justify-between drop-bar relative">
          <button
            className="drop-btn flex-row align-center"
            type="button"
            onClick={() => setClose(!close)}
          >
            {activeTab}
            <img
              src={arrowIcon}
              className={`arrow-icon ${!close ? 'open' : ''}`}
              alt="arrow-icon"
            />
          </button>
          <SearchModal games={games} handleMore={handleMore} />
        </div>
        {/* eslint-disable jsx-a11y/click-events-have-key-events */}
        {activeTab === 'explore' && (
          <div className="flex-row justify-flex-end align-center filters-btn">
            <a
              href="#"
              onClick={handleOpenModal}
              className="flex-row align-center"
            >
              <p>Filters</p>
              <i className="fas fa-sort" />
            </a>
          </div>
        )}
        {/* eslint-enable jsx-a11y/click-events-have-key-events */}
      </div>
      {/* eslint-disable jsx-a11y/click-events-have-key-events */}
      {!close && (
        <div
          className="dropdown-content flex-column justify-flex-start"
          onClick={() => setClose(true)}
          role="button"
          tabIndex={0}
        >
          {children}
        </div>
      )}
      {/* eslint-enable jsx-a11y/click-events-have-key-events */}
      {openModal && (
        <div className="filters-modal flex-column justify-flex-start">
          <div className="flex-column flex-grow">
            <div className="filters-tab flex-row justify-between">
              <p>Filters</p>
              {/* eslint-disable jsx-a11y/click-events-have-key-events */}
              {/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */}
              <img
                src={closeIcon}
                alt="close-icon"
                onClick={handleCloseModal}
                role="button"
                tabIndex={0}
                className="close-btn"
              />
              {/* eslint-enable jsx-a11y/click-events-have-key-events */}
              {/* eslint-enable jsx-a11y/no-noninteractive-element-to-interactive-role */}
            </div>

            <div className="filters-tab filters-container sortby-mobile flex-column">
              {/* eslint-disable jsx-a11y/click-events-have-key-events */}
              <div
                className="flex-row justify-between align-center filter-btn"
                onClick={() => setOpenSortBy(!openSortBy)}
                role="button"
                tabIndex={0}
              >
                <p>Sort By:</p>
                <img src={arrowIcon} alt="close-icon" />
              </div>
              {/* eslint-enable jsx-a11y/click-events-have-key-events */}
              {openSortBy && (
                <div className="flex-column filters-list">
                  {Object.keys(sortByOptions).map((option) => (
                    <a
                      className={`filter ${
                        search.sort_by === option ? 'active' : ''
                      }`}
                      href="#"
                      onClick={handleFilterChange}
                      data-value={option}
                      data-name="sort_by"
                      key={option}
                    >
                      {sortByOptions[option]}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="filters-tab filters-container platform-mobile flex-column">
              {/* eslint-disable jsx-a11y/click-events-have-key-events */}
              <div
                className="flex-row justify-between align-center filter-btn"
                onClick={() => setOpenPlatform(!openPlatform)}
                role="button"
                tabIndex={0}
              >
                {/* eslint-enable jsx-a11y/click-events-have-key-events */}
                <p>Platform:</p>
                <img src={arrowIcon} alt="close-icon" />
              </div>
              {openPlatform && (
                <div className="flex-column filters-list">
                  {Object.keys(platformOptions).map((option) => (
                    <a
                      className={`filter ${
                        search.platform === option ? 'active' : ''
                      }`}
                      href="#"
                      onClick={handleFilterChange}
                      data-value={option}
                      data-name="platform"
                      key={option}
                    >
                      {platformOptions[option]}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="filters-tab filters-container genre-mobile flex-column">
              {/* eslint-disable jsx-a11y/click-events-have-key-events */}
              <div
                className="flex-row justify-between align-center filter-btn"
                onClick={() => setOpenGenre(!openGenre)}
                role="button"
                tabIndex={0}
              >
                {/* eslint-enable jsx-a11y/click-events-have-key-events */}
                <p>Genre:</p>
                <img src={arrowIcon} alt="close-icon" />
              </div>
              {openGenre && (
                <div className="flex-column filters-list">
                  {genreOptions.map((option) => (
                    <a
                      className={`filter ${
                        search.genre === option ? 'active' : ''
                      }`}
                      href="#"
                      onClick={handleFilterChange}
                      data-value={option}
                      data-name="genre"
                      key={option}
                    >
                      {option}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="filters-tab filters-container genre-mobile flex-column">
              {/* eslint-disable jsx-a11y/click-events-have-key-events */}
              <div
                className="flex-row justify-between align-center filter-btn"
                onClick={() => setOpenPrice(!openPrice)}
                role="button"
                tabIndex={0}
              >
                {/* eslint-enable jsx-a11y/click-events-have-key-events */}
                <p>Range:</p>
                <img src={arrowIcon} alt="close-icon" />
              </div>
              {openPrice && (
                <div className="flex-column filters-list">
                  <div className="filter">
                    <RangeSlider
                      range={search.price.defaultRange()}
                      values={search.price.values()}
                      setValues={setPriceValues}
                      maxValue={60}
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
      )}
    </div>
  );
};

export default observer(DropDown);
