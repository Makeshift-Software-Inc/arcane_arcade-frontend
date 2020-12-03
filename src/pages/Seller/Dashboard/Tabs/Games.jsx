import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { useStore } from '../../../../store';

import Loading from '../../../../components/Loading/Loading';

import Game from './Game';

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
    <div className="my-games flex-column">
      <div className="post flex-row justify-center">
        <Link to="/sell-your-game">
          <button type="button" className="button">
            Post a New Game
          </button>
        </Link>
      </div>
      <div className="listings flex-column">
        {pendingGames().length > 0 && (
          <div className="pending flex-column">
            <h1>Pending Games</h1>
            <div className="list">
              {pendingGames().map((game) => (
                <Game key={game.id} game={game} />
              ))}
            </div>
          </div>
        )}
        <div className="active flex-column">
          <h1>Active Games</h1>
          {activeGames().length > 0 ? (
            <div className="list">
              {activeGames().map((game) => (
                <Game key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <p className="text-center">You don&apos;t have any active game.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(Games);
