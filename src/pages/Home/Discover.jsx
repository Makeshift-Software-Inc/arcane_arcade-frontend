import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from 'react-router-dom';

const Discover = ({ games, handleTrailer }) => (
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
            <div
              className="releases-games-listing flew-row flex-grow"
              key={game.id}
            >
              <img src={game.images[0]} alt={imageAlt} />

              <div className="flex-column align-center justify-between overlay">
                <div className="flex-column flex-grow justify-evenly align-center">
                  <p className="overlay-title">{game.title}</p>

                  <div className="description">
                    <p>{`${game.raw_description.substring(0, 80)} ... `}</p>
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
                      <p>Watch Trailer</p>
                    </div>

                    <div className="overlay-button flex-row align-center justify-center buy">
                      <Link to={listingShowLink}>Buy</Link>
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
);

export default Discover;
