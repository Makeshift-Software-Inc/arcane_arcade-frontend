import React from 'react';
import { Link } from 'react-router-dom';

import './GameListing.scss';

const GameListing = ({ game }) => {
  const imageAlt = `${game.title} cover`;
  const listingShowLink = `/games/${game.slug}`;

  return (
    <div className="game-listing" key={game.id}>
      <img src={game.images[0]} alt={imageAlt} />

      <div className="flex-column align-center justify-center overlay">
        <p>{game.title}</p>
        <div className="flex-row price-info">
          <p>{game.currency_symbol}</p>
          <p>{game.price}</p>
          {' '}
          <p>{game.default_currency}</p>
        </div>

        <p className="watch-trailer">Watch Trailer</p>
        <div className="overlay-button flex-row align-center justify-center buy">
          <Link to={listingShowLink}>
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameListing;
