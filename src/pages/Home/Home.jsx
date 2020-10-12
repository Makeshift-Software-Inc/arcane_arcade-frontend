import React, { useState } from 'react';

import ReactPlayer from 'react-player';

import { observer } from 'mobx-react';

import { Splide, SplideSlide } from '@splidejs/react-splide';

import './Home.scss';

import Navbar from '../../components/Navbar/Navbar';

import GamesListings from './GamesListings';

import hades from '../../img/hades.png';
import fire_emblem from '../../img/fire_emblem.png';
import kingdomCome from '../../img/kingdom_come.jpeg';
import greedfall from '../../img/greedfall.jpg';
import xcom from '../../img/xcom.jpg';

import { useStore } from '../../store';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { selectedGame } = useStore('games');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <Navbar />

      <div className="slider-container">
        {selectedGame && (
          <div>
            <div className="tabs">
              <div className="tab">
                <a className="selected">Discover</a>
              </div>
              <div className="tab">
                <a>Explore</a>
              </div>
            </div>

            <ReactPlayer
              url={selectedGame.videos[0]}
              playing
              width="75vw"
              height="50vh"
              autoPlay
              controls
              muted
            />
          </div>
        )}
        {!selectedGame && (
          <div className="flex">
            <div className="row">
              <div className="tabs">
                <div className="tab">
                  <a className="selected">Discover</a>
                </div>
                <div className="tab">
                  <a>Explore</a>
                </div>
              </div>
              <div className="slider">
                <Splide
                  className="splide-slider"
                  options={{
                    type: 'loop',
                    easing: 'ease',
                    width: 600,
                    height: 450,
                    keyboard: true,
                    perPage: 1,
                  }}
                >
                  <SplideSlide>
                    <img
                      src={kingdomCome}
                      alt="kingdom come deliverance cover"
                    />
                  </SplideSlide>
                  <SplideSlide>
                    <img src={fire_emblem} alt="civilizations 6 cover" />
                  </SplideSlide>
                  <SplideSlide>
                    <img src={hades} alt="hades cover" />
                  </SplideSlide>
                  <SplideSlide>
                    <img src={greedfall} alt="greedfall 6 cover" />
                  </SplideSlide>
                  <SplideSlide>
                    <img src={xcom} alt="civilizations 6 cover" />
                  </SplideSlide>
                </Splide>
              </div>
              <div className="slider-info">
                <h1>Kingdom Come: Deliverance</h1>

                <p>
                  From its inception, Kingdom Come: Deliverance was billed as a
                  game steeped in realism. From period-accurate food and weapon
                  damage to characters drawn from history, Warhorse Studios did
                  its homework. With the game’s release last week, we finally
                  got to play in their (as promised) realistic version of 15th
                  century Bohemia.
                </p>

                <div className="platform-icons">
                  <i className="fab fa-windows" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <nav
        className="navbar browse-listings"
        role="navigation"
        aria-label="main navigation"
      >
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <form onSubmit={handleSubmit}>
                <input
                  onChange={handleSearchChange}
                  value={searchQuery}
                  type="search"
                  placeholder="enter search term or tag"
                  className="topcoat-search-input"
                />
              </form>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <label htmlFor="sort-by">Sort By</label>

              <div className="select">
                <select name="sort-by">
                  <option value="sort_by">Relevance</option>
                  <option value="release_date">Release Date</option>
                  <option value="Name">Name</option>
                  <option value="price_asc">Lowest Price</option>
                  <option value="price_desc">Highest Price</option>
                  <option value="reviews">User Reviews</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="games">
        <div className="game-list">
          <GamesListings />
        </div>

        <div className="filters">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">Narrow by Price</p>
            </header>
            <div className="card-content">
              <div className="content">
                <input type="range" className="topcoat-range" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Home);
