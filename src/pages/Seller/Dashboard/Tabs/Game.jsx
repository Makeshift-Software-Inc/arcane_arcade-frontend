import React from 'react';

import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';

const Game = ({ game }) => (
  <Tippy
    content={(
      <div className="info">
        <p>{game.title}</p>

        <div className="actions">
          <div className="topcoat-button-bar">
            <div className="topcoat-button-bar__item">
              <Link key={game.id} to={`/games/${game.slug}`}>
                <button type="button" className="topcoat-button-bar__button">
                  View
                </button>
              </Link>
            </div>

            <div className="topcoat-button-bar__item">
              <Link key={game.id} to={`/games/${game.slug}/edit`}>
                <button type="button" className="topcoat-button-bar__button">
                  Edit
                </button>
              </Link>
            </div>

            <div className="topcoat-button-bar__item">
              <Link
                key={game.id}
                to={`/sell-your-game/${game.id}/distribution/add`}
              >
                <button type="button" className="topcoat-button-bar__button">
                  Manage
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )}
    interactive
    interactiveBorder={20}
    delay={100}
    arrow
    placement="auto"
    key={game.id}
  >
    <div className="game-listing">
      <img src={game.images[0]} alt={`${game.title} cover`} />
    </div>
  </Tippy>
);

export default Game;
