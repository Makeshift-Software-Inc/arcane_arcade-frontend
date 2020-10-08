import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

import ReactPlayer from "react-player";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/splide/dist/css/themes/splide-default.min.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "trix/dist/trix.css";

import Navbar from "../../../components/Navbar/Navbar";
import Api from "../../../services/Api";

import "./GamesShow.scss";

class GamesShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = { game: {} };
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    const path = `/listings/${slug}`;

    Api.get(path).then((response) => {
      this.setState({
        game: response.data.data.attributes,
      });
    });
  }

  splideSlides() {
    let slides = [];

    if (!this.state.game.id) return [];

    let key = 1;

    this.state.game.videos.forEach((video, i) => {
      slides.push(
        <SplideSlide key={key}>
          <ReactPlayer
            url={video}
            thumbnail={this.state.game.images[0]}
            playing={false}
            controls
            muted
          />
        </SplideSlide>
      );

      key += 1;
    });

    this.state.game.images.forEach((image) => {
      const imageAlt = `${this.state.game.title} cover`;

      slides.push(
        <SplideSlide key={key}>
          <img src={image} alt={imageAlt} />
        </SplideSlide>
      );

      key += 1;
    });

    return slides;
  }

  async onFormSubmit(e) {
    e.preventDefault();

    // TODO: IF NOT LOGGED IN, REDIRECT TO LOGIN. ACTIVATED USERS ONLY CAN
    //       CREATE ORDERS.

    const coin_type = document
                          .querySelector('input[name="payment_method"]:checked')
                          .id;
    const deposit_amount = this.state.game[`${coin_type}_amount`];

    const response = await Api.post('/orders', {
      coin_type: coin_type.toUpperCase(),
      coin_amount: deposit_amount,
      listing_id: this.state.game.id,
      fiat_currency: this.state.game.default_currency
    })

    if (response.status === 200)  {
      this.props.history.push(`/buy/${response.data.id}`)
    }
  }

  render() {
    const coverAlt = `${this.state.game.title} cover`;

    return (
      <div className="App listings-show">
        <Navbar />

      <div className="return-to-store">
        <Link to="/">
          <i class="fas fa-caret-left"></i>
          Return to Store
        </Link>
      </div>

        <div className="splide-container">
          <Splide
            className="splide-slider"
            options={{
              type: "loop",
              easing: "ease",
              keyboard: true,
              perPage: 1
            }}
            >
            {this.splideSlides()}
          </Splide>
        </div>

        <div className="info-section">
          <div className="pricing">
            <form>
              <div className="payment">
                <div className="crypto">
                  <div className="bitcoin">
                    <label className="topcoat-radio-button">
                      <input type="radio" id="btc" name="payment_method" />
                      <div className="topcoat-radio-button__checkmark"></div>
                      <Tippy
                        content={`${this.state.game.btc_amount} BTC`}
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
                  <div className="monero">
                    <label className="topcoat-radio-button">
                      <input type="radio" id="xmr" name="payment_method" />
                      <div className="topcoat-radio-button__checkmark"></div>
                      <Tippy
                        content={`${this.state.game.xmr_amount} XMR`}
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
                </div>

                <div className="fiat">
                  <h3>
                    {this.state.game.currency_symbol}
                    {this.state.game.price / 100}{" "}
                    {this.state.game.default_currency}
                  </h3>
                </div>
              </div>

              <div className="vl"></div>

              <div className="platforms">
                <div className="windows">
                  <i className="fab fa-windows"></i>
                  <h3>Windows</h3>
                </div>

                <div className="mac">
                  <i className="fab fa-apple"></i>
                  <h3>Mac</h3>
                </div>

                <div className="linux">
                  <i className="fab fa-linux"></i>
                  <h3>Linux</h3>
                </div>
              </div>
              <div className="payment-submit">
                <button
                  onClick={this.onFormSubmit.bind(this)}
                  className="topcoat-button--large--cta"
                  type="submit"
                >
                  Buy
                </button>
              </div>
            </form>
          </div>
          <div className="description" dangerouslySetInnerHTML={{__html: this.state.game.description}} />
        </div>
      </div>
    );
  }
}

export default observer(GamesShow);
