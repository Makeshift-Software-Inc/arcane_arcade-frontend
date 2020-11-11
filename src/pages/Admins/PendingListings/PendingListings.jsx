import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { useStore } from '../../../store';

import GamesListings from '../../Home/GamesListings';

import './PendingListings.scss';

const PendingListings = () => {
  const {
    pendingListings: { load, loading, listings },
  } = useStore('admin');

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="pending-listings">
      <GamesListings
        games={listings}
        loading={loading}
        noGamesText="No pending listings"
        forAdmin
      />
    </div>
  );
};

export default observer(PendingListings);
