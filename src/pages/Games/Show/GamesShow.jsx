import React, { Fragment, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import ReactPlayer from 'react-player';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import '@fortawesome/fontawesome-free/css/all.min.css';

import { useStore } from '../../../store';
import useBreakpoints from '../../../hooks/useBreakpoints';

import backSvg from '../../../img/back.svg';

import Navbar from '../../../components/Navbar/Navbar';
import Loading from '../../../components/Loading/Loading';
import BuyModal from './Buy/Modal';
import OrderDetailsModal from '../../MyLibrary/Modal/Modal';

import Autocomplete from '../../../components/Form/Autocomplete/Autocomplete';
import SearchModal from '../../../components/Form/SearchInput/Modal';

// suported platforms imgs
import PS4 from '../../../img/platform_icons/PS4.svg';
import WINDOWS from '../../../img/platform_icons/WINDOWS.svg';
import MAC from '../../../img/platform_icons/MAC.svg';
import LINUX from '../../../img/platform_icons/linux.svg';
import SWITCH from '../../../img/platform_icons/SWITCH.svg';
import XB1 from '../../../img/platform_icons/XB1.svg';

import Actions from '../../Admins/Actions/UpdateStatus';

import playButton from '../../../img/Play_Button.svg';

import './GamesShow.scss';

const SystemRequirementTabs = ({ options, selected, onClick }) => (
  <div className="system-req-btns flex-row flex-grow">
    {options.map((option) => (
      // eslint-disable-next-line
      <div
        key={option}
        className={`system-req-btn flex-column  align-center ${
          selected === option ? 'active' : ''
        }`}
        onClick={() => onClick(option)}
      >
        <div>{option}</div>
      </div>
    ))}
    <div className="flex-row flex-grow border-div" />
  </div>
);

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
  WINDOWS,
  MAC,
  LINUX,
  SWITCH,
  XB1,
  PS4,
};

const TopSearchBar = ({ goBack, games, handleMore }) => {
  const { isMobile } = useBreakpoints();

  return (
    <div className="flex-row justify-between top-search-bar relative">
      {/* eslint-disable jsx-a11y/click-events-have-key-events */}
      <div
        className="flex-row align-center back-button"
        onClick={goBack}
        role="button"
        tabIndex={0}
      >
        <img src={backSvg} alt="back-button" className="back-img" />
        <p>Back to store</p>
      </div>
      {/* eslint-enable jsx-a11y/click-events-have-key-events */}
      {isMobile ? (
        <SearchModal games={games} handleMore={handleMore} />
      ) : (
        <Autocomplete searchForm={games} handleMore={handleMore} />
      )}
    </div>
  );
};

const GamesShow = ({
  match, history, forAdmin, game,
}) => {
  const [showBuyModal, setShowBuyModal] = useState(false);

  const [systemReq, setSystemReq] = useState();

  const [openMobileDecription, setOpenMobileDescription] = useState(false);

  const {
    games,
    games: { loadGame, selectGame },
    auth: { isLoggedIn, user },
    forms: {
      search,
      buy: { reset },
    },
  } = useStore();

  const selectedGame = forAdmin ? game : games.selectedGame;

  const { slug } = match.params;

  // eslint-disable-next-line
  useEffect(() => {
    if (!forAdmin) {
      loadGame(slug);

      return () => {
        selectGame();
      };
    }
  }, [slug]);

  useEffect(() => {
    if (selectedGame && selectedGame.hasSystemRequirements()) {
      setSystemReq(selectedGame.systemRequirements()[0].platform);
    }
  }, [selectedGame]);

  if (!selectedGame || selectedGame.updating) return <Loading />;

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

  const handleStatusUpdate = async (e) => {
    const success = await game.handleStatusUpdate(e);
    if (success) {
      history.push('/admins/dashboard');
    }
  };

  const handleMore = (query) => {
    search.update({ query });
    history.push('/#search');
  };

  const metaDesc = 'Arcane Arcade is an emerging marketplace for game developers and publishers to sell games for cryptocurrency.';

  const system_requirements = selectedGame.systemRequirements();

  // eslint-disable-next-line
  const selectedSystemReq =
    systemReq && system_requirements.find((req) => req.platform === systemReq);

  return (
    <div className="App listings-show">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Buy
          {selectedGame.title}
          {' '}
          on Arcane Arcade
        </title>
        <meta name="description" content={metaDesc} />
      </Helmet>

      <Navbar />
      <div className="game-page-container flex-column align-center">
        <div className="game-show">
          {!forAdmin && (
            <TopSearchBar
              handleMore={handleMore}
              goBack={history.goBack}
              games={games}
            />
          )}

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
                      disabled={!(user && user.ordersLoaded) || forAdmin}
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
                  <div className="first-section flex-1">
                    <h3 className="section-title">About Game</h3>
                  </div>

                  <div className="flex-column about-game-info flex-2">
                    <div className="second-section flex-row flex-grow flex-wrap justify-flex-end">
                      <div className="info-container">
                        <p className="info-text">Developer</p>
                        <p>{selectedGame.seller.business_name}</p>
                      </div>

                      <div className="info-container">
                        <p className="info-text">Publisher</p>
                        <p>{selectedGame.seller.business_name}</p>
                      </div>

                      <div className="info-container">
                        <p className="info-text">Release Date</p>
                        <p>
                          {new Date(
                            Date.parse(selectedGame.release_date),
                          ).toDateString()}
                        </p>
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

                {selectedGame.supported_languages && (
                  <div className="game-specification game-info flex-row flex-grow justify-between align-start">
                    <div className="first-section flex-1">
                      <h3 className="section-title">Game Specification</h3>
                    </div>

                    <div className="flex-column justify-flex-end flex-2 section-text">
                      <p className="info-text">Languages Supported</p>
                      <p>
                        Audio:
                        {' '}
                        {selectedGame.supported_languages.audio
                          .map((lang) => lang.name)
                          .join(', ')}
                      </p>
                      <p>
                        Text:
                        {' '}
                        {selectedGame.supported_languages.text
                          .map((lang) => lang.name)
                          .join(', ')}
                      </p>
                    </div>
                  </div>
                )}

                {system_requirements.length > 0 && (
                  <div className="system-requirements game-info  flex-row flex-grow justify-between align-start">
                    <div className="first-section flex-row flex-1">
                      <h3 className="section-title">System Requirements</h3>
                    </div>

                    <div className="flex-column flex-2 section-text">
                      <SystemRequirementTabs
                        options={system_requirements.map((req) => req.platform)}
                        onClick={setSystemReq}
                        selected={systemReq}
                      />
                      {selectedSystemReq && (
                        <div className="flex-column flex-grow flex-wrap justify-between system-req-text">
                          <div className="flex-column">
                            <p className="info-text">Minimum</p>
                            <p>{selectedSystemReq.minimum.asString()}</p>
                          </div>

                          {selectedSystemReq.recommended.asString().length
                            > 0 && (
                            <Fragment>
                              <hr />
                              <div className="flex-column recommended">
                                <p className="info-text">Recommended</p>
                                <p>
                                  {selectedSystemReq.recommended.asString()}
                                </p>
                              </div>
                            </Fragment>
                          )}

                          {selectedSystemReq.additional_notes.length > 0 && (
                            <Fragment>
                              <hr />
                              <div className="flex-column recommended">
                                <p className="info-text">Additional Notes</p>
                                <p>{selectedSystemReq.additional_notes}</p>
                              </div>
                            </Fragment>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {forAdmin && <Actions handleUpdate={handleStatusUpdate} />}
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
