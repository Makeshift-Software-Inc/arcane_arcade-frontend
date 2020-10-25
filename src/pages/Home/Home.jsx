import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useStore } from '../../store';

// import Api from '../../services/Api';
import Navbar from '../../components/Navbar/Navbar';
import SearchBar from '../../components/SearchBar/SearchBar';
import Loading from '../../components/Loading/Loading';

import GamesListings from './GamesListings';
import SliderInfo from '../../components/Home/SliderInfo';

import hades from '../../img/hades.png';
import fire_emblem from '../../img/fire_emblem.png';
import kingdomCome from '../../img/kingdom_come.jpeg';
import greedfall from '../../img/greedfall.jpg';
import xcom from '../../img/xcom.jpg';

import windowsIcon from '../../img/platform_icons/WINDOWS.svg';
import macIcon from '../../img/platform_icons/MAC.svg';
import psIcon from '../../img/platform_icons/PS4.svg';
import switchIcon from '../../img/platform_icons/SWITCH.svg';
import xbIcon from '../../img/platform_icons/XB1.svg';

import './Home.scss';

const Tab = ({ text, selected, onClick }) => (
  <div className="tab">
    {/* eslint-disable jsx-a11y/click-events-have-key-events */}
    <a
      className={selected ? 'selected' : ''}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {text}
    </a>
    {/* eslint-enable jsx-a11y/click-events-have-key-events */}
  </div>
);

const SplideItem = ({ data }) => (
  <SplideSlide>
    <div className="slider-item flex-row">
      <img
        src={data.image}
        alt="kingdom come deliverance cover"
      />
      <SliderInfo
        title={data.title}
        text={data.text}
        link={data.link}
        icons={data.icons}
        iconType={data.iconType}
      />
    </div>
  </SplideSlide>
);

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    games, load, loading,
  } = useStore('games');

  const [selectedTab, setSelectedTab] = useState('explore');

  useEffect(() => {
    load();
  }, []);

  if (loading) return <Loading />;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // this is the model data that yet has to be done on BE for the first, main slide
  const mainSplideData = [
    {
      image: kingdomCome,
      text: `From its inception, Kingdom Come: Deliverance was billed as a
        game steeped in realism. From period-accurate food and weapon
        damage to characters drawn from history, Warhorse Studios did
        its homework. With the game’s release last week, we finally
        got to play in their (as promised) realistic version of 15th
        century Bohemia.`,
      title: 'Kingdom Come: Deliverance',
      icons: [windowsIcon],
      link: '#',
    },
    {
      image: fire_emblem,
      text: `Dark Souls continues to push the boundaries with the latest,
      ambitious chapter in the critically-acclaimed and genre-defining series.
      Prepare yourself and Embrace The Darkness!`,
      title: 'Dark Souls III',
      icons: [macIcon, switchIcon, psIcon, windowsIcon, xbIcon],
      link: '#',
    },
    {
      image: hades,
      text: `Aenean sed consectetur magna. Donec metus nulla,
        faucibus eu nibh at, dapibus accumsan justo.
        Sed elit sapien, venenatis sed odio dictum,
        suscipit porttitor erat.`,
      title: 'Third Title',
      icons: [macIcon, switchIcon, psIcon, windowsIcon, xbIcon],
      link: '#',
    },
    {
      image: greedfall,
      text: `Nullam luctus massa ut massa lobortis,
        vel tincidunt sapien malesuada. Duis aliquet nec purus eget condimentum.
        Morbi mattis tempor commodo. Mauris commodo consectetur lacinia.
        Sed id nisi vitae velit placerat maximus.`,
      title: 'Forth Title',
      icons: [macIcon, switchIcon, psIcon, windowsIcon, xbIcon],
      link: '#',
    },
    {
      image: xcom,
      text: `Phasellus in lectus turpis.
        Pellentesque tincidunt dignissim sagittis.
        Sed semper, eros vitae molestie rhoncus, ipsum metus sagittis odio,
        eu ultrices ante quam quis turpis.`,
      title: 'Fifth Title',
      icons: [macIcon, switchIcon, psIcon, windowsIcon, xbIcon],
      link: '#',
    },
  ];

  return (
    <div className="App flex-column">
      <Navbar />

      <div className="page-container flex-column flex-grow align-center">
        <div className="flex-column home-page-container">
          <SearchBar>
            <div className="tabs">
              <Tab
                text="Discover"
                selected={selectedTab === 'discover'}
                onClick={() => setSelectedTab('discover')}
              />
              <Tab
                text="Explore"
                selected={selectedTab === 'explore'}
                onClick={() => setSelectedTab('explore')}
              />
            </div>
          </SearchBar>

          <div className="flex-row slider">
            <Splide
              className="main-slider"
              options={{
          
                clones: 0,
                lazyLoad: true,
                waitForTransition: true,
                
              }}
            >
              {
                mainSplideData.map((item) => <SplideItem data={item} key={item.title} />)
              }
            </Splide>
          </div>
        </div>

        <div className="discover flex-column align-center">
          <div className="new-releases">
            <h1 className="title">New Releases</h1>
            <Splide
              className="new release-slider"
              options={{
                clones: 0,
                perPage: 4,
                perMove: 1,
                rewind: false,
                keyboard: false,
                lazyLoad: true,
                breakpoints: {
                  800: {
                    width: 600,
                    perPage: 2,
                  },
                },
              }}
            >
              {games.map((game) => {
                const imageAlt = `${game.title} cover`;
                const listingShowLink = `/games/${game.slug}`;

                return (
                  <SplideSlide key={game.id}>
                    <div className="releases-games-listing flew-row flex-grow" key={game.id}>
                      <Link to={listingShowLink}>
                        <img src={game.images[0]} alt={imageAlt} />
                      </Link>
                      <div className="magic foolishIn info" />
                    </div>
                  </SplideSlide>
                );
              })}
            </Splide>
          </div>

          <div className="promotions flex-column flex-grow align-center">
            <h1>Promotions</h1>

            <div className="games flex-row flex-grow flex-wrap">

              <GamesListings />

            </div>
          </div>
        </div>


        <div className="explore is-hidden">
        <nav
          className="navbar browse-listings"
          role="navigation"
          aria-label="main-navigation"
        >
          <div id="navbarBasicExample" className="navbar-menu search-filters">
            <div className="navbar-start">
              <div className="navbar-item">
                <label htmlFor="sort-by">Sort By</label>

                <div className="select">
                  <select name="sort-by">
                    <option value="relevance">Relevance</option>
                    <option value="release_date">Release Date</option>
                    <option value="Name">Name</option>
                    <option value="price_asc">Lowest Price</option>
                    <option value="price_desc">Highest Price</option>
                    <option value="reviews">User Reviews</option>
                  </select>
                </div>
              </div>

              <div className="navbar-item">
                <label htmlFor="platform">Platform</label>

                <select name="platform">
                  <option value="PC">PC</option>
                </select>
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <form onSubmit={handleSubmit}>
                  <input
                    onChange={handleSearchChange}
                    value={searchQuery}
                    type="search"
                    placeholder="search"
                    className="topcoat-search-input"
                  />
                </form>
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
                <p className="card-header-title">Genre</p>
              </header>

              <div className="card-content">
                <div className="content">
                  <select name="genre" aria-label="search by genre" />
                </div>
              </div>

            </div>

            <div className="card">
              <header className="card-header">
                <p className="card-header-title">Narrow by Price</p>
              </header>
              <div className="card-content">
                <div className="content">
                  <input type="range" className="topcoat-range" min="0" max="60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>




    </div>
  );
};

export default observer(Home);
