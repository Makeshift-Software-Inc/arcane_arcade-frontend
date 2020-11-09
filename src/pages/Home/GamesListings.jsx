import React from 'react';
import { observer } from 'mobx-react';

import GameListing from '../../components/GameListing/GameListing';
import Loading from '../../components/Loading/Loading';

const GamesListings = ({
  games, loading, handleTrailer, noGamesText,
}) => {
  if (loading) return <Loading small />;

  if (noGamesText && games.length === 0) return <p>{noGamesText}</p>;

  return games.map((game) => (
    <GameListing key={game.id} game={game} handleTrailer={handleTrailer} />
  ));
};

export default observer(GamesListings);
