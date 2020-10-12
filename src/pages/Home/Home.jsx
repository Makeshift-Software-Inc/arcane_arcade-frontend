import React, { useState, useEffect } from 'react';
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

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
                    width: 600,
                    height: 450,
                    clones: 0,
                    lazyLoad: true,
                    waitForTransition: true,
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
                  <a>Learn More ⟶</a>
                  <div className="icons">
                    <i className="fab fa-windows" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

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
          {games.map((game) => {
            const imageAlt = `${game.title} cover`;
            const listingShowLink = `/games/${game.slug}`;

            return (
              <SplideSlide key={game.id}>
                <div className="game-listing" key={game.id}>
                  <Link to={listingShowLink}>
                    <img src={game.images[0]} alt={imageAlt} />
                  </Link>
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
  );
};

export default observer(Home);
