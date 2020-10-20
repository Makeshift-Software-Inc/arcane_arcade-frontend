import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';

import { withRouter } from 'react-router-dom';

import ReactPlayer from 'react-player';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import '@fortawesome/fontawesome-free/css/all.min.css';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'trix/dist/trix.css';

import { useStore } from '../../../store';

import backSvg from '../../../img/back.svg'

import Navbar from '../../../components/Navbar/Navbar';
import Loading from '../../../components/Loading/Loading';
import BuyModal from './Buy/Modal';
import OrderDetailsModal from '../../MyLibrary/Modal/Modal';

import SearchInput from '../../../components/Form/SearchInput/SearchInput';


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


const GamesShow = ({ match, history }) => {
  const [showBuyModal, setShowBuyModal] = useState(false);

  const {
    games: { loadGame, selectedGame, selectGame },
    auth: { isLoggedIn, user },
    forms: {
      buy: { reset },
    },
  } = useStore();

  const [openMobileDecription, setOpenMobileDescription] = useState(false);

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

  const TopSearchBar = () => { 
    console.log(selectedGame.supportedPlatforms()[0].name);
    return(
    <div className="flex-row justify-between top-search-bar">
      <div className="flex-row align-center back-button" onClick={() => history.goBack()}> 
        <img src={backSvg} alt="back-button" className="back-img"/>
        <p>Back to store</p>
      </div>

      <div className="flex-row">
        <SearchInput />
      </div>
    </div>
  )};


  return (
    <div className="App listings-show">
      <Navbar />
      <div className="game-page-container">

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
                  disabled={!user.ordersLoaded}
                  onClick={openBuyModal}
                  className="button"
                  type="button"
                >
                  {!user.ordersLoaded ? 'Loading...' : 'BUY NOW'}
                </button>
              </div>
            </form>
          </div>

          <div className="description flex-column">
            <div className="about-game game-info flex-row flex-grow justify-between">
              <div className="first-section flex-grow">
                <h3 className="section-title">About Game</h3>
              </div>

              <div className="flex-column">
                <div className="second-section flex-row flex-grow flex-wrap justify-flex-end">

                  <div>
                    <p>Developer</p>
                    <p>-</p>
                  </div>

                  <div>
                    <p>Publisher</p>
                    <p>-</p>
                  </div>

                  <div>
                    <p>Release Date</p>
                    <p>{new Date(Date.parse(selectedGame.release_date)).toUTCString()}</p>
                  </div>

                  <div>
                    <p>Rating</p>
                    <p>-</p>
                  </div>

                  <div className="flex-column">
                    <p>Platform</p>

                    <div className="platforms">
                      {selectedGame.hasSupportedPlatform('WINDOWS') && (
                        <div className="windows">
                          <i className="fab fa-windows" />
                        </div>
                      )}

                      {selectedGame.hasSupportedPlatform('MAC') && (
                        <div className="mac">
                          <i className="fab fa-apple" />
                        </div>
                      )}

                      {selectedGame.hasSupportedPlatform('LINUX') && (
                        <div className="linux">
                          <i className="fab fa-linux" />
                        </div>
                      )}
                    </div>

                  </div>


                </div>

                <div className="descr">
                  <h3 className="game-title">{selectedGame.title}</h3>
                  <div className={`game-description info-text desc-${openMobileDecription ? 'open' : 'closed'}`} 
                  // eslint-disable-next-line
                  dangerouslySetInnerHTML={{ __html: selectedGame.description }} />
                </div>
                <div className="descr-toggle-button" onClick={() => setOpenMobileDescription(!openMobileDecription)}>
                  <span>{openMobileDecription ? 'Show less' : 'Show more'}</span>
                  <img src={backSvg} className={`show-${openMobileDecription ? 'more' : 'less' }-icon`} alt="show-more"  />
                </div>

               </div> 
              
            </div>

            

            <div className="game-specification game-info flex-row flex-grow justify-between align-center">
              <div className="first-section flex-grow">
                <h3 className="section-title">Game Specification</h3>
              </div>

              <div className="flex-column justify-flex-end flex-grow">
                <p className="info-text">Languages Supported</p>
                <p></p>
                <p></p>
              </div>
            </div>

            <div className="system-requirements game-info  flex-row flex-grow justify-between align-center">
              <div className="first-section flex-row flex-grow">
                <h3 className="section-title">System Requirements</h3>
              </div>

              <div className="flex-row flex-grow align-center">
                <div className="flex-column flex-grow">
                  <p className="info-text">Minimum</p>

                </div>

                <div className="flex-column flex-grow">
                  <p className="info-text">Recommended</p>

                </div>

              </div>


            </div>


          </div>

        </div>
        </div>
        {showBuyModal && <BuyModal close={closeBuyModal} />}
        <OrderDetailsModal />
      </div>
    </div>
  );
};

export default observer(GamesShow);
