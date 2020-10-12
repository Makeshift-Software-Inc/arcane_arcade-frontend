import React, { useState, useEffect, createRef } from 'react';
import { Link } from 'react-router-dom';

import ReactPlayer from 'react-player';

import { observer } from 'mobx-react';

import { Splide, SplideSlide } from '@splidejs/react-splide';

import './Home.scss';

import Navbar from '../../components/Navbar/Navbar';
import Loading from '../../components/Loading/Loading';

import GamesListings from './GamesListings';

import hades from '../../img/hades.png';
import fire_emblem from '../../img/fire_emblem.png';
import kingdomCome from '../../img/kingdom_come.jpeg';
import greedfall from '../../img/greedfall.jpg';
import xcom from '../../img/xcom.jpg';

import { useStore } from '../../store';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    selectedGame, games, load, loading,
  } = useStore('games');

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const exploreRef = createRef();
  const exploreContent = createRef();
  const discoverRef = createRef();
  const discoverContent = createRef();

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
    <div className="App">
      <Navbar />

      <div className="slider-container">
        {
        selectedGame && (
        <div>
          <div className="tabs">
            <div className="tab">
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

          <ReactPlayer url={selectedGame.videos[0]} playing="playing" width="75vw" height="50vh" autoPlay="autoPlay" controls="controls" muted="muted" />
        </div>
        )
      }
        {
        !selectedGame && (
        <div className="flex">
          <div className="row">
            <div className="tabs">
              <div className="tab">
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
            <div className="slider">
              <Splide
                className="splide-slider"
                options={{
                  width: 600,
                  height: 450,
                  clones: 0,
                  lazyLoad: true,
                  waitForTransition: true,
                }}
              >
                <SplideSlide>
                  <img src={kingdomCome} alt="kingdom come deliverance cover" />
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
                its homework. With the game’s release last week, we finally got
                to play in their (as promised) realistic version of
                15th century Bohemia.
              </p>

              <div className="platform-icons">
                <a>Learn More ⟶</a>
                <div className="icons">
                  <i className="fab fa-windows" />
                </div>
              </div>
            </div>

          </div>
        </div>
        )
      }
      </div>

      <div className="discover" ref={discoverContent}>
        <div className="new-releases">
          <h1>New Releases</h1>
          <Splide
            className="new release-slider"
            options={{
              type: 'loop',
              clones: 0,
              perPage: 4,
              perMove: 1,
              width: 1000,
              height: 250,
              rewind: false,
              gap: '0.1rem',
              keyboard: false,
              lazyLoad: true,
            }}
          >
            {
              games.map((game) => {
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
              })
            }
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
        <nav className="navbar browse-listings" role="navigation" aria-label="main-navigation">
          <div id="navbarBasicExample" className="navbar-menu">

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
                  <input onChange={handleSearchChange} value={searchQuery} type="search" placeholder="enter search term or tag" className="topcoat-search-input" />
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

    </div>
  );
};

export default observer(Home);
