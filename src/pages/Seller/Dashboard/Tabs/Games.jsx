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
            <Game key={game.id} game={game} />
          ))}
        </div>

        <div className="pending">
          <h1>Pending Listings</h1>

          {pendingGames().map((game) => (
            <Game key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default observer(Games);
