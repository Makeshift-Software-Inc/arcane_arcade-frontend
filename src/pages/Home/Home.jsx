import React, { useRef, useState, useEffect } from 'react';

import { observer } from 'mobx-react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import ReactPlayer from 'react-player';

import { useStore } from '../../store';

// import Api from '../../services/Api';
import Navbar from '../../components/Navbar/Navbar';
import Autocomplete from '../../components/Form/Autocomplete/Autocomplete';
import Loading from '../../components/Loading/Loading';
import DropDown from '../../components/Home/DropDown/DropDown';
import Tabs from '../../components/Home/Tabs';

import GamesListings from './GamesListings';
import Discover from './Discover';

import SliderInfo from '../../components/Home/SliderInfo';
import AdvancedSearch from '../../components/Home/AdvancedSearch';

import WINDOWS from '../../img/platform_icons/WINDOWS.svg';
import MAC from '../../img/platform_icons/MAC.svg';
import LINUX from '../../img/platform_icons/linux.svg';
import SWITCH from '../../img/platform_icons/SWITCH.svg';
import PS4 from '../../img/platform_icons/PS4.svg';
import XB1 from '../../img/platform_icons/XB1.svg';

import playButton from '../../img/Play_Button.svg';
import closeButton from '../../img/close_white.svg';

import './Home.scss';

const supportedPlatformsImgs = {
  WINDOWS,
  MAC,
  LINUX,
  SWITCH,
  XB1,
  PS4,
};

const SplideImageItem = ({ data }) => (
  <SplideSlide>
    <div className="slider-item flex-row">
      <img src={data.image} alt="kingdom come deliverance cover" />
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
      {/* eslint-disable-next-line */}
      <img
        src={closeButton}
        alt="close-icon"
        className="close-player"
        onClick={() => closeTrailer()}
      />
    </div>
  </SplideSlide>
);

const Home = () => {
  const {
    games,
    games: {
      featuredGames,
      promotedGames,
      newReleases,
      load,
      loading,
      searching,
      searched,
      searchResults,
    },
    forms: { search },
  } = useStore();

  const gamesContainerRef = useRef(null);

  const [selectedTab, setSelectedTab] = useState('discover');

  const [trailerOpen, setTrailerOpen] = useState(false);
  const [trailerGame, setTrailerGame] = useState(false);

  const handleTrailer = (game) => {
    setTrailerGame(game);
    setTrailerOpen(true);

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <Loading />;

  const goToExploreTab = () => {
    setSelectedTab('explore');
    gamesContainerRef.current.scrollIntoView();
  };

  const handleMore = (query) => {
    search.update({ query });
    goToExploreTab();
  };

  const mainSplideData = featuredGames().map((game) => ({
    image: game.images[0],
    text:
      game.raw_description.length > 400
        ? `${game.raw_description.slice(0, 400)}...`
        : game.raw_description,
    title: game.title,
    icons: game
      .supportedPlatforms()
      .map((platform) => supportedPlatformsImgs[platform.name]),
    link: `/games/${game.slug}`,
  }));

  return (
    <div className="App flex-column">
      <Navbar />
      <div className="page-container flex-column flex-grow align-center">
        <div className="flex-column home-page-container">
          <DropDown goToExploreTab={goToExploreTab} activeTab={selectedTab}>
            <Tabs
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              mobile
            />
          </DropDown>

          <div className="tab-bar-container flex-row flex-grow justify-center align-center">
            <div className="flex-row justify-between flex-grow align-center top-search-bar">
              <Tabs
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                mobile={false}
              />

              {selectedTab === 'discover' && (
                <div className="flex-row flex-grow justify-flex-end advanced-search">
                  <Autocomplete searchForm={games} handleMore={handleMore} />
                </div>
              )}
            </div>
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
              {!trailerOpen
                ? mainSplideData.map((item) => (
                  <SplideImageItem data={item} key={item.title} />
                ))
                : trailerGame.videos.map((item, i) => (
                  <SplideVideoItem
                    src={item}
                    key={item}
                    thumbnail={
                        trailerGame.images.length > 0
                          ? trailerGame.images[i]
                          : null
                      }
                    closeTrailer={() => setTrailerOpen(false)}
                  />
                ))}
            </Splide>
          </div>
        </div>

        <div className="discover flex-column align-center">
          {selectedTab === 'discover' ? (
            <Discover games={newReleases()} handleTrailer={handleTrailer} />
          ) : (
            <div className="explore flex-row flex-grow">
              <AdvancedSearch />
            </div>
          )}

          <div className="promotions flex-column flex-grow">
            <div className="title-container">
              <h1>
                {selectedTab === 'discover' || !searched
                  ? 'Promotions'
                  : 'Search Results'}
              </h1>
            </div>
            <div
              className="games flex-row flex-grow flex-wrap"
              ref={gamesContainerRef}
            >
              {selectedTab === 'discover' || !searched ? (
                <GamesListings
                  games={promotedGames()}
                  loading={loading}
                  handleTrailer={handleTrailer}
                />
              ) : (
                <GamesListings
                  games={searchResults}
                  loading={searching}
                  handleTrailer={handleTrailer}
                  noGamesText="No search results"
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
