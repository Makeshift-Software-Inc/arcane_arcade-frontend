import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';

import { useStore } from '../../../store';

import GamesShow from '../../Games/Show/GamesShow';

const AdminGamesShow = ({ match, history }) => {
  const [game, setGame] = useState(null);

  const {
    pendingListings: { listings, loaded, load },
  } = useStore('admin');

  useEffect(() => {
    const run = async () => {
      setGame(listings.find((listing) => listing.slug === match.params.slug));
    };

    if (loaded) {
      run();
    } else {
      load();
    }
  }, [loaded]);

  return <GamesShow history={history} game={game} match={match} forAdmin />;
};

export default observer(AdminGamesShow);
