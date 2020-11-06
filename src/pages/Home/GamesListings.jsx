import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../store';

import GameListing from '../../components/GameListing/GameListing';
import Loading from '../../components/Loading/Loading';

const GamesListings = ({ handleTrailer }) => {
  const { games, load, loading } = useStore('games');

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return games.map((game) => (
    <GameListing key={game.id} game={game} handleTrailer={handleTrailer} />
  ));
};

export default observer(GamesListings);
