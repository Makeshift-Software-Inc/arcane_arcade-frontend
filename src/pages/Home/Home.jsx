import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
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
import psIcon from '../../img/platform_icons/PS4.svg';
import switchIcon from '../../img/platform_icons/SWITCH.svg';
import xbIcon from '../../img/platform_icons/XB1.svg';

import './Home.scss';


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
    games: {
      selectedGame, games, load, loading, searching, searchResults,
    },
  } = useStore();

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
          <div className="flex-row">
            <DropDown activeTab={selectedTab}>
              <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} mobile={true} />
            </DropDown>


            <SearchBar show={selectedTab == 'discover' ? true : false} >
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
                mainSplideData.map((item) => <SplideItem data={item} key={item.title} />)
              }
            </Splide>
          </div>
        </div>

        <div className="discover flex-column align-center">

          { selectedTab == 'discover' ? ( 
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
                        <Link to={listingShowLink}>
                          <img src={game.images[0]} alt={imageAlt} />
                        </Link>
                        <div className="magic foolishIn info" />
                      </div>
                    </SplideSlide>
                  );
                })}
              </Splide>
            </div> ): (
              <div className="explore flex-row flex-grow">
                <AdvancedSearch />
              </div>
            )
          }

          <div className="promotions flex-column flex-grow">
            <div className="title-container">
              <h1>Promotions</h1>
            </div>

            <div className="games flex-row flex-grow flex-wrap">

              {searching ? (
                <Loading />
              ) : (
                <GamesListings games={searchResults} loading={searching} />
              )}

            </div>
          </div>
        </div>



      </div>

    </div>
  );
};

export default observer(Home);
