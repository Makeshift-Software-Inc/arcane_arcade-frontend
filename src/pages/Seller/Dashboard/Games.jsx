import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';

import { useStore } from '../../../store';

import Loading from '../../../components/Loading/Loading';

const Games = () => {
  const {
    user: {
      seller: {
        activeGames, pendingGames, loadingGames, loadGames,
      },
    },
  } = useStore('auth');

  useEffect(() => {
    loadGames();
  }, []);

  if (loadingGames) return <Loading />;

  return (
    <div className="my-games">
      <div className="post">
        <Link to="/sell-your-game">
          <button type="button" className="button">
            Post a New Game
          </button>
        </Link>
      </div>
      <div className="listings">
        <div className="active">
          <h1>Active Listings</h1>

          {activeGames().map((game) => (
            <Tippy
              content={(
                <div className="info">
                  <p>{game.title}</p>

                  <div className="actions">
                    <div className="topcoat-button-bar">
                      <div className="topcoat-button-bar__item">
                        <Link key={game.id} to={`/games/${game.slug}`}>
                          <button
                            type="button"
                            className="topcoat-button-bar__button"
                          >
                            View
                          </button>
                        </Link>
                      </div>

                      <div className="topcoat-button-bar__item">
                        <Link key={game.id} to={`/games/${game.slug}/edit`}>
                          <button
                            type="button"
                            className="topcoat-button-bar__button"
                          >
                            Edit
                          </button>
                        </Link>
                      </div>

                      <div className="topcoat-button-bar__item">
                        <Link
                          key={game.id}
                          to={`/sell-your-game/${game.id}/distribution/add`}
                        >
                          <button
                            type="button"
                            className="topcoat-button-bar__button"
                          >
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
          ))}
        </div>

        <div className="pending">
          <h1>Pending Listings</h1>

          {pendingGames().map((game) => (
            <Tippy
              content={(
                <div className="info">
                  <p>{game.title}</p>

                  <div className="actions">
                    <div className="topcoat-button-bar">
                      <div className="topcoat-button-bar__item">
                        <Link key={game.id} to={`/games/${game.slug}`}>
                          <button
                            type="button"
                            className="topcoat-button-bar__button"
                          >
                            View
                          </button>
                        </Link>
                      </div>

                      <div className="topcoat-button-bar__item">
                        <Link key={game.id} to={`/games/${game.slug}/edit`}>
                          <button
                            type="button"
                            className="topcoat-button-bar__button"
                          >
                            Edit
                          </button>
                        </Link>
                      </div>

                      <div className="topcoat-button-bar__item">
                        <Link
                          key={game.id}
                          to={`/sell-your-game/${game.id}/distribution/add`}
                        >
                          <button
                            type="button"
                            className="topcoat-button-bar__button"
                          >
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default observer(Games);
