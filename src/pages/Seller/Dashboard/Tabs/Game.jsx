import React from 'react';

import { Link } from 'react-router-dom';

const Game = ({ game }) => (
  <div className="game-listing relative">
    <img src={game.defaultImage.smallImage} alt={`${game.title} cover`} />
    <div className="game-listing-details flex-column">
      <h3 className="text-overflow">{game.title}</h3>
      <div className="actions flex-column flex-grow align-center justify-evenly">
        <Link to={`/games/${game.slug}`}>View</Link>
        <Link to={`/games/${game.slug}/edit`}>Edit</Link>
        <Link to={`/sell-your-game/${game.id}/distribution/add`}>Manage</Link>
      </div>
    </div>
  </div>
);

export default Game;
