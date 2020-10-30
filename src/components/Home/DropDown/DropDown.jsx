import React, {useState} from 'react';

import { useStore } from '../../../store';

import AdvancedSearch from '../AdvancedSearch';

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


  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setOpenModal(false);
    games.search();
  };


  return (
    <div className="homepage-dropdown flex-column">
      <div className="flex-column drop-bar">
        <div className="flex-row">
          <button className="drop-btn flex-row align-center" onClick={() => setClose(!close) }>
            {activeTab}
            <img src={arrowIcon} className={`arrow-icon ${!close ? 'open' : ''}`} alt="arrow-icon"/>
          </button>
          {activeTab === 'discover' && <AdvancedSearch showFilters={false} /> }
        </div>
         {activeTab === 'discover' && 
          <div className="flex-column align-flex-end filters-btn" onClick={() => setOpenModal(true)}>
            <p>Filters</p>
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

            <div className="filters-tab title flex-row justify-between">
              <p>Filters</p>
              <img src={closeIcon} alt="close-icon" onClick={() => setOpenModal(false) }/>
            </div>

            <div className="filters-tab filters-container sortby-mobile flex-column">
              <div className="flex-row justify-between align-center" >
                <p>Sort By:</p>
                <img src={arrowIcon} alt="close-icon"/>
              </div>
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
               
            </div>

            <div className="filters-tab filters-container platform-mobile flex-column">
              <div className="filter flex-row justify-between align-center">
                  <p>Platform:</p>
                <img src={arrowIcon} alt="close-icon"/>
              </div>
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
              
            
            </div>

            <div className="filters-tab filters-container genre-mobile flex-column">
              <div className="filter flex-row justify-between align-center">
                  <p>Genre:</p>
                <img src={arrowIcon} alt="close-icon"/>
              </div>
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
             
            </div>

            <div className="filters-tab filters-container range-mobile flex-column">
              <div className="flex-row justify-between align-center">
                  <p>Range:</p>
                <img src={arrowIcon} alt="close-icon"/>
              </div>
          
            </div>

            <button className="button align-self-flex-end" onClick={()  => handleSubmit()}>
              Submit
            </button>

          </div>
        
      }

      
    </div>
)};

export default DropDown;