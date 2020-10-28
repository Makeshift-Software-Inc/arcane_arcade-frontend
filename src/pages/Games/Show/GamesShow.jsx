import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import ReactPlayer from 'react-player';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import '@fortawesome/fontawesome-free/css/all.min.css';

import { useStore } from '../../../store';

import backSvg from '../../../img/back.svg';

import Navbar from '../../../components/Navbar/Navbar';
import Loading from '../../../components/Loading/Loading';
import BuyModal from './Buy/Modal';
import OrderDetailsModal from '../../MyLibrary/Modal/Modal';

import SearchInput from '../../../components/Form/SearchInput/SearchInput';

// suported platforms imgs
import PC from '../../../img/platform_icons/PS4.svg';
import WINDOWS from '../../../img/platform_icons/WINDOWS.svg';
import MAC from '../../../img/platform_icons/MAC.svg';
import LINUX from '../../../img/platform_icons/linux.svg';
import SWITCH from '../../../img/platform_icons/SWITCH.svg';
import XB1 from '../../../img/platform_icons/XB1.svg';

import playButton from '../../../img/Play_Button.svg';

import './GamesShow.scss';

const Images = ({ images, gameTitle }) => images.map((image) => (
  <SplideSlide key={image}>
    <img src={image} alt={`${gameTitle} cover`} />
  </SplideSlide>
));

const Videos = ({ videos, thumbnail }) => videos.map((video) => (
  <SplideSlide key={video}>
    <ReactPlayer
      url={video}
      light={thumbnail}
      playing={false}
      preload={thumbnail}
      playIcon={<img src={playButton} className="play-btn" alt="play-btn" />}
      controls
      muted
    />
  </SplideSlide>
));

const Splides = ({ images, videos, gameTitle }) => (
  <>
    <Videos videos={videos} thumbnail={images.length > 0 ? images[0] : null} />
    <Images images={images} gameTitle={gameTitle} />
  </>
);

const supportedPlatformsImgs = {
  PC,
  WINDOWS,
  MAC,
  LINUX,
  SWITCH,
  XB1,
};

const GamesShow = ({ match, history }) => {
  const [showBuyModal, setShowBuyModal] = useState(false);

  const [systemReq, setSystemReq] = useState('windows');

  const [openMobileDecription, setOpenMobileDescription] = useState(false);

  const {
    games: { loadGame, selectedGame, selectGame },
    auth: { isLoggedIn, user },
    forms: {
      buy: { reset },
    },
  } = useStore();

  const { slug } = match.params;

  useEffect(() => {
    loadGame(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => {
      selectGame();
    };
  }, [slug]);

  if (!selectedGame) return <Loading />;

  const openBuyModal = () => {
    if (!isLoggedIn) {
      toast('Please login to continue');
      history.push('/login');
    } else if (!user.activated()) {
      toast('Please finish two factor auth first.');
      history.push('/authorize');
    } else if (user.ownSelectedGame()) {
      toast('You already own this game for all available platforms.');
    } else {
      setShowBuyModal(true);
    }
  };

  const closeBuyModal = () => {
    setShowBuyModal(false);
    reset();
  };

  const TopSearchBar = () => (
    <div className="flex-row justify-between top-search-bar">
      {/* eslint-disable jsx-a11y/click-events-have-key-events */}
      <div
        className="flex-row align-center back-button"
        onClick={() => history.goBack()}
        role="button"
        tabIndex={0}
      >
        <img src={backSvg} alt="back-button" className="back-img" />
        <p>Back to store</p>
      </div>
      {/* eslint-enable jsx-a11y/click-events-have-key-events */}

      <div className="flex-row flex-grow justify-flex-end">
        <form>
          <SearchInput />
        </form>
      </div>
    </div>
  );

  const metaDesc = 'Arcane Arcade is an emerging marketplace for game developers and publishers to sell games for cryptocurrency.';

  return (
    <div className="App listings-show">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Buy
          {' '}
          {selectedGame.title}
          {' '}
          on Arcane Arcade
        </title>
        <meta
          name="description"
          content={metaDesc}
        />
      </Helmet>

      <Navbar />
      <div className="game-page-container flex-column align-center">
        <div className="game-show">
          <TopSearchBar />

          <div className="">
            <div className="splide-container">
              <Splide
                className="splide-slider"
                options={{
                  clones: 0,
                  lazyLoad: true,
                  waitForTransition: true,
                  perPage: 1,
                  slidesPerView: 1,
                }}
              >
                <Splides
                  images={selectedGame.images}
                  videos={selectedGame.videos}
                  gameTitle={selectedGame.title}
                />
              </Splide>
            </div>

            <div className="info-section flex-column">
              <div className="pricing flex-row justify-flex-end">
                <form>
                  <div className="payment flex-column justify-flex-end">
                    <div className="price fiat flex-row justify-flex-end">
                      {selectedGame.price && (
                        <h3>
                          {selectedGame.currency_symbol}
                          {selectedGame.price}
                          {' '}
                          {selectedGame.default_currency}
                        </h3>
                      )}
                    </div>
                  </div>

                  <div className="payment-submit">
                    <button
                      disabled={!(user && user.ordersLoaded)}
                      onClick={openBuyModal}
                      className="button"
                      type="button"
                    >
                      {user && !user.ordersLoaded ? 'Loading...' : 'BUY NOW'}
                    </button>
                  </div>
                </form>
              </div>

              <div className="description flex-column">
                <div className="about-game game-info flex-row flex-grow justify-between">
                  <div className="first-section flex-grow">
                    <h3 className="section-title">About Game</h3>
                  </div>

                  <div className="flex-column about-game-info">
                    <div className="second-section flex-row flex-grow flex-wrap justify-flex-end">
                      <div className="info-container">
                        <p className="info-text">Developer</p>
                        <p>-</p>
                      </div>

                      <div className="info-container">
                        <p className="info-text">Publisher</p>
                        <p>-</p>
                      </div>

                      <div className="info-container">
                        <p className="info-text">Release Date</p>
                        <p>
                          {new Date(
                            Date.parse(selectedGame.release_date),
                          ).toDateString()}
                        </p>
                      </div>

                      <div className="info-container">
                        <p className="info-text">Rating</p>
                        <p>-</p>
                      </div>

                      <div className="flex-column info-container">
                        <p className="info-text">Platform</p>

                        <div className="platforms-imgs">
                          {selectedGame.supportedPlatforms().map((platform) => (
                            <img
                              src={supportedPlatformsImgs[platform.name]}
                              key={platform.id}
                              alt="platform-icon"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="descr">
                      <h3 className="game-title">{selectedGame.title}</h3>
                      <div
                        className={`game-description info-text desc-${
                          openMobileDecription ? 'open' : 'closed'
                        }`}
                        // eslint-disable-next-line
                        dangerouslySetInnerHTML={{
                          __html: selectedGame.description,
                        }}
                      />
                    </div>
                    {/* eslint-disable jsx-a11y/click-events-have-key-events */}
                    <div
                      className="descr-toggle-button"
                      onClick={() => setOpenMobileDescription(!openMobileDecription)}
                      role="button"
                      tabIndex={0}
                    >
                      <span>
                        {openMobileDecription ? 'Show less' : 'Show more'}
                      </span>
                      <img
                        src={backSvg}
                        className={`show-${
                          openMobileDecription ? 'more' : 'less'
                        }-icon`}
                        alt="show-more"
                      />
                    </div>
                    {/* eslint-enable jsx-a11y/click-events-have-key-events */}
                  </div>
                </div>

                <div className="game-specification game-info flex-row flex-grow justify-between align-start">
                  <div className="first-section flex-grow">
                    <h3 className="section-title">Game Specification</h3>
                  </div>

                  <div className="flex-column justify-flex-end flex-grow section-text">
                    <p className="info-text">Languages Supported</p>
                    <p>Audio: English, French, German, Spanish</p>
                    <p>
                      Text: English, French, Spanish - Spain, Italian, German,
                      Polish, Russian, Portuguese - Brazil, Japanese, Spanish -
                      Mexico, Chinese - Traditional
                    </p>
                  </div>
                </div>

                <div className="system-requirements game-info  flex-row flex-grow justify-between align-start">
                  <div className="first-section flex-row flex-grow">
                    <h3 className="section-title">System Requirements</h3>
                  </div>

                  <div className="flex-column flex-grow section-text">
                    <div className="system-req-btns flex-row flex-grow">
                      {/* eslint-disable jsx-a11y/click-events-have-key-events */}
                      <div
                        className={`system-req-btn flex-column  align-center ${
                          systemReq === 'windows' ? 'active' : ''
                        }`}
                        onClick={() => setSystemReq('windows')}
                        role="button"
                        tabIndex={0}
                      >
                        <div>Windows</div>
                      </div>
                      <div
                        className={`system-req-btn flex-column align-center ${
                          systemReq === 'mac' ? 'active' : ''
                        }`}
                        onClick={() => setSystemReq('mac')}
                        role="button"
                        tabIndex={0}
                      >
                        <div>Mac</div>
                      </div>
                      <div
                        className={`system-req-btn flex-column align-center ${
                          systemReq === 'linux' ? 'active' : ''
                        }`}
                        onClick={() => setSystemReq('linux')}
                        role="button"
                        tabIndex={0}
                      >
                        <div>Linux</div>
                      </div>
                      <div className="flex-row flex-grow border-div" />
                      {/* eslint-enable jsx-a11y/click-events-have-key-events */}
                    </div>

                    <div className="flex-row flex-grow flex-wrap justify-between system-req-text">
                      <div className="flex-column flex-grow">
                        <p className="info-text">Minimum</p>
                        <p>
                          Requires a 64-bit processor and operating system OS:
                          Windows 7 - Service Pack 1 (6.1.7601) Processor:
                          Intel® Core™ i5-2500K / AMD FX-6300 Memory: 8 GB RAM
                          Graphics: Nvidia GeForce GTX 770 2GB / AMD Radeon R9
                          280 3GB Network: Broadband Internet connection
                          Storage: 150 GB available space Sound Card: Direct X
                          Compatible
                        </p>
                      </div>

                      <div className="flex-column flex-grow recommended">
                        <p className="info-text">Recommended</p>
                        <p>
                          Requires a 64-bit processor and operating system OS:
                          Windows 10 - April 2018 Update (v1803) Processor:
                          Intel® Core™ i7-4770K / AMD Ryzen 5 1500X Memory: 12
                          GB RAM Graphics: Nvidia GeForce GTX 1060 6GB / AMD
                          Radeon RX 480 4GB Network: Broadband Internet
                          connection Storage: 150 GB available space Sound Card:
                          Direct X Compatible
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showBuyModal && <BuyModal close={closeBuyModal} />}
          <OrderDetailsModal
            order={isLoggedIn && user.selectedOrder}
            setSelectedOrder={isLoggedIn && user.setSelectedOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(GamesShow);
