import React from 'react';
import { observer } from 'mobx-react';

import GameListing from '../../components/GameListing/GameListing';
import Loading from '../../components/Loading/Loading';

const GamesListings = ({ loading, games }) => {
  if (loading) return <Loading />;

  return games.map((game) => <GameListing key={game.id} game={game} />);
};

export default observer(GamesListings);
