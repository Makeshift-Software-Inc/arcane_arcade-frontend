import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import "./GameListing.scss";

const PopupContent = ({ title, price, images, videos, play }) => {
  return (
    <div className="popover">
      <div className="title">
        {title}
        <span className="price">{price / 100}</span>
      </div>
      {images[0] && <img src={images[0]} alt="" />}
      {images[1] && <img src={images[1]} alt="" />}
      {videos.length > 0 && (
        <button onClick={play} className="topcoat-button--large--cta">
          Play Trailer
        </button>
      )}
    </div>
  );
};

const GameListing = ({ game }) => {
  const imageAlt = `${game.title} cover`;

  return (
    <Tippy
      content={
        <PopupContent
          title={game.title}
          images={game.images}
          videos={game.videos}
          price={game.price}
          play={game.play}
        />
      }
      interactive={true}
      interactiveBorder={20}
      delay={100}
      arrow={true}
      placement="top"
      key={game.id}
    >
      <div className="game-listing" key={game.id}>
        <img src={game.images[0]} alt={imageAlt} />
      </div>
    </Tippy>
  );
};

export default GameListing;
