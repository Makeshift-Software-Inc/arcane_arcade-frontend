import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

import ReactPlayer from "react-player";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/splide/dist/css/themes/splide-default.min.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "trix/dist/trix.css";

import { useStore } from "../../../store";

import Navbar from "../../../components/Navbar/Navbar";
import Loading from "../../../components/Loading/Loading";

import Api from "../../../services/Api";

import "./GamesShow.scss";

const Images = ({ images, gameTitle }) =>
  images.map((image) => (
    <SplideSlide key={image}>
      <img src={image} alt={`${gameTitle} cover`} />
    </SplideSlide>
  ));

const Videos = ({ videos, thumbnail }) =>
  videos.map((video) => (
    <SplideSlide key={video}>
      <ReactPlayer
        url={video}
        thumbnail={thumbnail}
        playing={false}
        controls
        muted
      />
    </SplideSlide>
  ));

const Splides = ({ images, videos, gameTitle }) => {
  return (
    <React.Fragment>
      <Videos
        videos={videos}
        thumbnail={images.length > 0 ? images[0] : null}
      />
      <Images images={images} gameTitle={gameTitle} />
    </React.Fragment>
  );
};

const GamesShow = ({ match, history }) => {
  const {
    games: { loadGame, selectedGame },
    auth: { isLoggedIn },
  } = useStore();

  const slug = match.params.slug;

  useEffect(() => {
    loadGame(slug);
  }, [slug]);

  if (!selectedGame) return <Loading />;

  const coverAlt = `${selectedGame.title} cover`;

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      history.push("/login");
      return;
    }

    const coin_type = document.querySelector(
      'input[name="payment_method"]:checked'
    ).id;
    const deposit_amount = this.state.game[`${coin_type}_amount`];

    const response = await Api.post("/orders", {
      coin_type: coin_type.toUpperCase(),
      coin_amount: deposit_amount,
      listing_id: this.state.game.id,
      fiat_currency: this.state.game.default_currency,
    });

    if (response.status === 200) {
      this.props.history.push(`/buy/${response.data.id}`);
    }
  };

  return (
    <div className="App listings-show">
      <Navbar />

      <div className="splide-container">
        <Splide
          className="splide-slider"
          options={{
            type: "loop",
            easing: "ease",
            keyboard: true,
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

      <div className="info-section">
        <div className="pricing">
          <form>
            <div className="payment">
              <div className="crypto">
                {selectedGame.accepts_bitcoin && (
                  <div className="bitcoin">
                    <label className="topcoat-radio-button">
                      <input type="radio" id="btc" name="payment_method" />
                      <div className="topcoat-radio-button__checkmark"></div>
                      <Tippy
                        content={`${selectedGame.btc_amount} BTC`}
                        interactive={true}
                        interactiveBorder={20}
                        delay={100}
                        arrow={true}
                        placement="auto"
                      >
                        <i className="fab fa-bitcoin"></i>
                      </Tippy>
                    </label>
                  </div>
                )}
                {selectedGame.accepts_monero && (
                  <div className="monero">
                    <label className="topcoat-radio-button">
                      <input type="radio" id="xmr" name="payment_method" />
                      <div className="topcoat-radio-button__checkmark"></div>
                      <Tippy
                        content={`${selectedGame.xmr_amount} XMR`}
                        interactive={true}
                        interactiveBorder={20}
                        delay={100}
                        arrow={true}
                        placement="auto"
                      >
                        <i className="fab fa-monero"></i>
                      </Tippy>
                    </label>
                  </div>
                )}
              </div>

              <div className="fiat">
                {selectedGame.price && (
                  <h3>
                    {selectedGame.currency_symbol}
                    {selectedGame.price / 100} {selectedGame.default_currency}
                  </h3>
                )}
              </div>
            </div>

            <div className="vl"></div>

            <div className="platforms">
              {selectedGame.hasSupportedPlatform("WINDOWS") && (
                <div className="windows">
                  <i className="fab fa-windows"></i>
                  <h3>Windows</h3>
                </div>
              )}

              {selectedGame.hasSupportedPlatform("MAC") && (
                <div className="mac">
                  <i className="fab fa-apple"></i>
                  <h3>Mac</h3>
                </div>
              )}

              {selectedGame.hasSupportedPlatform("LINUX") && (
                <div className="linux">
                  <i className="fab fa-linux"></i>
                  <h3>Linux</h3>
                </div>
              )}
            </div>
            <div className="payment-submit">
              <button
                onClick={onFormSubmit}
                className="topcoat-button--large--cta"
                type="submit"
              >
                Buy
              </button>
            </div>
          </form>
        </div>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: selectedGame.description }}
        />
      </div>
    </div>
  );
};

export default observer(GamesShow);
