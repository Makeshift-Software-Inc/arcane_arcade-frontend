import React, { useState, useEffect, createRef } from 'react';
import { Link } from 'react-router-dom';

import ReactPlayer from 'react-player';

import { observer } from 'mobx-react';

import { Splide, SplideSlide } from '@splidejs/react-splide';

import './Home.scss';
// import Api from '../../services/Api';
import Navbar from '../../components/Navbar/Navbar';
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

import { useStore } from '../../store';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    selectedGame, games, load, loading,
  } = useStore('games');

  const [mainSplideIndex, setMainSplideIndex] = useState(0);

  useEffect(() => {
    load();
  }, []);

  if (loading) return <Loading />;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);

    // Api.get(`/listings?q=${e.target.value}`).then((response) => {
    //   debugger;
    // });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const exploreRef = createRef();
  const exploreContent = createRef();
  const discoverRef = createRef();
  const discoverContent = createRef();

  // this is data for the first, main slide
  const mainSplideData = [
    {
      text: `From its inception, Kingdom Come: Deliverance was billed as a
        game steeped in realism. From period-accurate food and weapon
        damage to characters drawn from history, Warhorse Studios did
        its homework. With the game’s release last week, we finally
        got to play in their (as promised) realistic version of 15th
        century Bohemia.`,
      title: 'Kingdom Come: Deliverance',
      icon: [windowsIcon],
      link: '#',
    },
    {
      text: `Dark Souls continues to push the boundaries with the latest,
      ambitious chapter in the critically-acclaimed and genre-defining series.
      Prepare yourself and Embrace The Darkness!`,
      title: 'Dark Souls III',
      icon: [macIcon, switchIcon, psIcon, windowsIcon, xbIcon],
      link: '#',
    },
    {
      text: `Aenean sed consectetur magna. Donec metus nulla,
        faucibus eu nibh at, dapibus accumsan justo.
        Sed elit sapien, venenatis sed odio dictum,
        suscipit porttitor erat.`,
      title: 'Third Title',
      icon: [macIcon, switchIcon, psIcon, windowsIcon, xbIcon],
      link: '#',
    },
    {
      text: `Nullam luctus massa ut massa lobortis,
        vel tincidunt sapien malesuada. Duis aliquet nec purus eget condimentum.
        Morbi mattis tempor commodo. Mauris commodo consectetur lacinia.
        Sed id nisi vitae velit placerat maximus.`,
      title: 'Forth Title',
      icon: [macIcon, switchIcon, psIcon, windowsIcon, xbIcon],
      link: '#',
    },
    {
      text: `Phasellus in lectus turpis.
        Pellentesque tincidunt dignissim sagittis.
        Sed semper, eros vitae molestie rhoncus, ipsum metus sagittis odio,
        eu ultrices ante quam quis turpis.`,
      title: 'Fifth Title',
      icon: [macIcon, switchIcon, psIcon, windowsIcon, xbIcon],
      link: '#',
    },
  ];

  const switchPanels = (e) => {
    e.preventDefault();

    const { target } = e;

    let sibling;

    if (target === exploreRef.current) {
      sibling = target.parentElement.previousSibling;
    } else {
      sibling = target.parentElement.nextSibling;
    }

    if (!target.classList.contains('selected')) {
      const link = sibling.querySelector('a');
      link.classList.remove('selected');
      target.classList.add('selected');

      const explore = exploreContent.current;
      const discover = discoverContent.current;
      if (explore.classList.contains('is-hidden')) {
        explore.classList.remove('is-hidden');
        discover.classList.add('is-hidden');
      } else {
        explore.classList.add('is-hidden');
        discover.classList.remove('is-hidden');
      }
    }
  };

  return (
    <div className="App flex-column">
      <Navbar />

      <div className="slider-container">
        {selectedGame && (
          <div>
            <div className="tabs">
              <div className="tab">
                {/* eslint-disable-next-line */}
                <a
                  role="link"
                  tabIndex={0}
                  className="selected"
                  ref={discoverRef}
                  onClick={switchPanels}
                  onKeyDown={switchPanels}
                >
                  Discover
                </a>
              </div>
              <div className="tab">
                {/* eslint-disable-next-line */}
                <a
                  role="link"
                  ref={exploreRef}
                  onClick={switchPanels}
                  onKeyDown={switchPanels}
                  tabIndex={0}
                >
                  Explore
                </a>
              </div>
            </div>

            <ReactPlayer
              url={selectedGame.videos[0]}
              playing
              width="75vw"
              height="50vh"
              controls
              muted
            />
          </div>
        )}
        {!selectedGame && (
          <div className="flex flex-grow">
            <div className="row flex-column">
              <div className="tabs">
                <div className="tab">
                  {/* eslint-disable-next-line */}
                  <a
                    className="selected"
                    role="link"
                    tabIndex={0}
                    ref={discoverRef}
                    onClick={switchPanels}
                    onKeyDown={switchPanels}
                  >
                    Discover
                  </a>
                </div>
                <div className="tab">
                  {/* eslint-disable-next-line */}
                  <a
                    role="link"
                    tabIndex={0}
                    ref={exploreRef}
                    onClick={switchPanels}
                    onKeyDown={switchPanels}
                  >
                    Explore
                  </a>
                </div>
              </div>

              <div className="flex-row">
                <div className="slider">
                  <Splide
                    onMove={(newIndex, oldIndex) => {
                      setMainSplideIndex(oldIndex);
                    }}
                    className="splide-slider"
                    options={{
                      width: 1050,
                      height: 450,
                      clones: 0,
                      lazyLoad: true,
                      waitForTransition: true,
                      breakpoints: {
                        400: {
                          width: 390,
                          height: 200,
                        },
                      },
                    }}
                  >
                    <SplideSlide>
                      <div className="slider-item flex-row">
                        <img
                          src={kingdomCome}
                          alt="kingdom come deliverance cover"
                        />
                        <SliderInfo
                          title={mainSplideData[mainSplideIndex].title}
                          text={mainSplideData[mainSplideIndex].text}
                          link={mainSplideData[mainSplideIndex].link}
                          icons={mainSplideData[mainSplideIndex].icon}
                          iconType={mainSplideData[mainSplideIndex].iconType}
                        />
                      </div>
                    </SplideSlide>
                    <SplideSlide>
                      <div className="slider-item flex-row">
                        <img src={fire_emblem} alt="civilizations 6 cover" />
                        <SliderInfo
                          title={mainSplideData[mainSplideIndex].title}
                          text={mainSplideData[mainSplideIndex].text}
                          link={mainSplideData[mainSplideIndex].link}
                          icons={mainSplideData[mainSplideIndex].icon}
                          iconType={mainSplideData[mainSplideIndex].iconType}
                        />
                      </div>
                    </SplideSlide>
                    <SplideSlide>
                      <div className="slider-item flex-row">
                        <img src={hades} alt="hades cover" />
                        <SliderInfo
                          title={mainSplideData[mainSplideIndex].title}
                          text={mainSplideData[mainSplideIndex].text}
                          link={mainSplideData[mainSplideIndex].link}
                          icons={mainSplideData[mainSplideIndex].icon}
                          iconType={mainSplideData[mainSplideIndex].iconType}
                        />
                      </div>
                    </SplideSlide>
                    <SplideSlide>
                      <div className="slider-item flex-row">
                        <img src={greedfall} alt="greedfall 6 cover" />
                        <SliderInfo
                          title={mainSplideData[mainSplideIndex].title}
                          text={mainSplideData[mainSplideIndex].text}
                          link={mainSplideData[mainSplideIndex].link}
                          icons={mainSplideData[mainSplideIndex].icon}
                          iconType={mainSplideData[mainSplideIndex].iconType}
                        />
                      </div>
                    </SplideSlide>
                    <SplideSlide>
                      <div className="slider-item flex-row">
                        <img src={xcom} alt="civilizations 6 cover" />
                        <SliderInfo
                          title={mainSplideData[mainSplideIndex].title}
                          text={mainSplideData[mainSplideIndex].text}
                          link={mainSplideData[mainSplideIndex].link}
                          icons={mainSplideData[mainSplideIndex].icon}
                          iconType={mainSplideData[mainSplideIndex].iconType}
                        />
                      </div>
                    </SplideSlide>
                  </Splide>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="discover flex-column" ref={discoverContent}>
        <div className="new-releases">
          <h1>New Releases</h1>
          <Splide
            className="new release-slider"
            options={{
              clones: 0,
              perPage: 4,
              perMove: 1,
              width: 1000,
              height: 250,
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
                  <div className="game-listing" key={game.id}>
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

        <div className="promotions">
          <h1>Promotions</h1>

          <div className="games">
            <div className="game-list">
              <GamesListings />
            </div>
          </div>
        </div>
      </div>

      <div className="explore is-hidden" ref={exploreContent}>
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
                  <input
                    type="range"
                    className="topcoat-range"
                    min="0"
                    max="60"
                  />
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
