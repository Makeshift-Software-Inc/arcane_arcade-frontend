import React from 'react';
import { Link } from 'react-router-dom';

import './GameListing.scss';

const GameListing = ({ game, handleTrailer }) => {
  const imageAlt = `${game.title} cover`;
  const listingShowLink = `/games/${game.slug}`;

  return (
    <div className="game-listing" key={game.id}>
      <img src={game.images[0]} alt={imageAlt} />
    
      <div className="flex-column flex-grow align-center justify-center overlay">
        <p className="overlay-title">{game.title}</p>
        

        <div className="overlay-buttons flex-column justify-flex-end align-center flex-grow">
          <div className="flex-row price-info">
            <p>{game.currency_symbol}</p>
            <p>{game.price}</p>
            {' '}
            <p>{game.default_currency}</p>
          </div>
        
          <div className="watch-trailer flex-row align-center justify-center" onClick={() => handleTrailer(game)} >
            Watch Trailer
          </div>

          <div className="overlay-button flex-row align-center justify-center buy">
            <Link to={listingShowLink}>
              View
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GameListing;
