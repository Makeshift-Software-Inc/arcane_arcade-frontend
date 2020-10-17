import React from 'react';
import { Link } from 'react-router-dom';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import './GameListing.scss';

const PopupContent = ({
  title,
  price,
  images,
  videos,
  currencySymbol,
  defaultCurrency,
  play,
}) => (
  <div className="popover">
    <div className="title">
      <h3>{title}</h3>
      <span className="price">
        {currencySymbol}
        {price}
        {' '}
        {defaultCurrency}
      </span>
    </div>
    {images[0] && <img src={images[0]} alt="" />}
    {images[1] && <img src={images[1]} alt="" />}
    {videos.length > 0 && (
    <button type="button" onClick={play} className="button">
      Play Trailer
    </button>
    )}
  </div>
);

const GameListing = ({ game }) => {
  const imageAlt = `${game.title} cover`;
  const listingShowLink = `/games/${game.slug}`;

  return (
    <Tippy
      content={(
        <PopupContent
          title={game.title}
          images={game.images}
          videos={game.videos}
          price={game.price}
          currencySymbol={game.currency_symbol}
          defaultCurrency={game.default_currency}
          play={game.play}
        />
      )}
      interactive
      interactiveBorder={20}
      delay={100}
      arrow
      placement="auto"
      key={game.id}
    >
      <div className="game-listing" key={game.id}>
        <Link to={listingShowLink}>
          <img src={game.images[0]} alt={imageAlt} />
        </Link>
      </div>
    </Tippy>
  );
};

export default GameListing;
