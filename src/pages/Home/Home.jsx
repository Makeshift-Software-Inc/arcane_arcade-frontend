import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import ReactPlayer from 'react-player';

import { useStore } from '../../store';

// import Api from '../../services/Api';
import Navbar from '../../components/Navbar/Navbar';
import SearchBar from '../../components/SearchBar/SearchBar';
import Loading from '../../components/Loading/Loading';
import DropDown from '../../components/Home/DropDown/DropDown';
import Tabs from '../../components/Home/Tabs';

import GamesListings from './GamesListings';
import SliderInfo from '../../components/Home/SliderInfo';
import AdvancedSearch from '../../components/Home/AdvancedSearch';

import hades from '../../img/hades.png';
import fire_emblem from '../../img/fire_emblem.png';
import kingdomCome from '../../img/kingdom_come.jpeg';
import greedfall from '../../img/greedfall.jpg';
import xcom from '../../img/xcom.jpg';

import windowsIcon from '../../img/platform_icons/WINDOWS.svg';
import macIcon from '../../img/platform_icons/MAC.svg';
import switchIcon from '../../img/platform_icons/SWITCH.svg';
// import psIcon from '../../img/platform_icons/PS4.svg';
// import xbIcon from '../../img/platform_icons/XB1.svg';

import playButton from '../../img/Play_Button.svg';
import closeButton from '../../img/close_white.svg';

import './Home.scss';

const SplideImageItem = ({ data }) => (
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

const SplideVideoItem = ({ src, thumbnail, closeTrailer }) => (
  <SplideSlide>
    <div className=" flex-row trailer-container">
      <ReactPlayer
        className="trailer-player"
        url={src}
        light={thumbnail}
        playing={false}
        preload={thumbnail}
        playIcon={<img src={playButton} className="play-btn" alt="play-btn" />}
        controls
        muted
      />
      {/* eslint-disable jsx-a11y/click-events-have-key-events */}
      {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
      {/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */}
      <img
        src={closeButton}
        alt="close-icon"
        className="close-player"
        onClick={() => closeTrailer()}
      />
      {/* eslint-enable jsx-a11y/click-events-have-key-events */}
      {/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */}
      {/* eslint-enable jsx-a11y/no-noninteractive-element-to-interactive-role */}
    </div>
  </SplideSlide>
);

const Home = () => {
  const {
    games: {
      games, load, loading, searching, searchResults,
    },
  } = useStore();

  const [selectedTab, setSelectedTab] = useState('discover');

  const [trailerOpen, setTrailerOpen] = useState(false);
  const [trailerGame, setTrailerGame] = useState(false);

  const handleTrailer = (game) => {
    setTrailerGame(game);
    setTrailerOpen(true);

    window.scroll({
     top: 0,
     left: 0,
     behavior: 'smooth'
    });
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <Loading />;

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
      text: `Fire Emblem: Path of Radiance brings back to consoles the strategic
      combat series Fire Emblem from the Game Boy Advance. In this installment,
      you can control units such as knights, mages, and winged creatures, and
      use their unique fighting styles to win battles and gain experience.
      Fire Emblem: Path of Radiance also includes a detailed story that connects
      the battles and characters together.`,
      title: 'Fire Emblem: Path of Radiance',
      icons: [switchIcon],
      link: '#',
    },
    {
      image: hades,
      text: `Hades is one of the best roguelites of all-time. It's a phenomenal
      achievement in story telling, gameplay, and an absolute treat for both your
      eyes and ears. It's astounding, and it's always been fairly astounding through
      Early Access, but this final release cements it as one of the greats.
      If you like roguelites, and even if you don't, you should probably get in
      on this as soon as you can.`,
      title: 'Hades',
      icons: [windowsIcon, macIcon],
      link: '#',
    },
    {
      image: greedfall,
      text: `Greedfall is a highly ambitious step for Spiders, and one that
      shows that they are hitting their stride. With excellent voice acting
      and gorgeous environments, Greedfall serves as a grand adventure in a genre
      that is sorely needing a fresh face. There are still some bugs to crush,
      but once those are gone, only a memorable RPG capable of filling the
      open world RPG void will remain.`,
      title: 'GreedFall',
      icons: [windowsIcon],
      link: '#',
    },
    {
      image: xcom,
      text: `XCOM: Enemy Unknown is a worthy tribute to its progenitor and
      hopefully the start of something brand new for players who've been dying
      to get a good squad-based strategy game that lets them not only think, but
      feel as well.`,
      title: 'XCOM: Enemy Unknown',
      icons: [macIcon, windowsIcon],
      link: '#',
    },
  ];

  return (
    <div className="App flex-column">
      <Navbar />
      <div className="page-container flex-column flex-grow align-center">
        <div className="flex-column home-page-container">

          <DropDown activeTab={selectedTab}>
            <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} mobile />
          </DropDown>

          <div className="tab-bar-container flex-row flex-grow justify-center align-center">
            <SearchBar show={selectedTab === 'discover'}>
              <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} mobile={false} />
            </SearchBar>
          </div>

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
                !trailerOpen ? (
                  mainSplideData.map((item) => <SplideImageItem data={item} key={item.title} />)
                ) : (
                  trailerGame.videos.map((item, i) => (
                    <SplideVideoItem
                      src={item}
                      key={item}
                      thumbnail={trailerGame.images.length > 0 ? trailerGame.images[i] : null}
                      closeTrailer={() => setTrailerOpen(false)}
                    />
                  ))
                )
              }
            </Splide>
          </div>
        </div>

        <div className="discover flex-column align-center">

          { selectedTab === 'discover' ? (
            <div className="new-releases flex-column align-center">
              <div className="flex-row flex-grow title-container">
                <h1>New Releases</h1>
              </div>

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
                    768: {
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

                        <img src={game.images[0]} alt={imageAlt} />

                        <div className="flex-column align-center justify-between overlay">
                          <div className="flex-column flex-grow justify-evenly align-center">
                            <p className="overlay-title">{game.title}</p>

                            <div className="description">
                              <p>
                                {`${game.raw_description.substring(0, 80)} ... `}
                              </p>
                            </div>
                          </div>

                          <div className="flex-column flex-grow justify-flex-end align-center overlay-info">
                            <div className="flex-row flex-grow align-center price-info">
                              <p>{game.currency_symbol}</p>
                              <p>{game.price}</p>
                              {' '}
                              <p>{game.default_currency}</p>
                            </div>

                            <div className="flex-column align-center justify-center overlay-buttons">
                              {/* eslint-disable jsx-a11y/click-events-have-key-events */}
                              <div
                                className="overlay-button flex-row align-center justify-center trailer"
                                onClick={() => handleTrailer(game)}
                                role="button"
                                tabIndex={0}
                              >
                                {/* eslint-enable jsx-a11y/click-events-have-key-events */}
                                <p>
                                  Watch Trailer
                                </p>
                              </div>

                              <div className="overlay-button flex-row align-center justify-center buy">
                                <Link to={listingShowLink}>
                                  Buy
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="magic foolishIn info" />
                      </div>
                    </SplideSlide>

                  );
                })}
              </Splide>
            </div>
          ) : (
            <div className="explore flex-row flex-grow">
              <AdvancedSearch />
            </div>
          )}

          <div className="promotions flex-column flex-grow">
            { selectedTab === 'discover'
              && (
              <div className="title-container">
                <h1>Promotions</h1>
              </div>
              )}

            <div className="games flex-row flex-grow flex-wrap">
              {searching ? (
                <Loading />
              ) : (
                <GamesListings
                  games={searchResults}
                  loading={searching}
                  handleTrailer={handleTrailer}
                />
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default observer(Home);
