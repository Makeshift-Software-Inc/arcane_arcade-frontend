import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { useStore } from '../../../store';

import Loading from '../../../components/Loading/Loading';
import PendingSeller from './PendingSeller';

import './PendingSellers.scss';

const PendingSellers = () => {
  const {
    pendingSellers: { load, loading, sellers },
  } = useStore('admin');

  useEffect(() => {
    load();
  }, []);

  if (loading) return <Loading small />;

  if (sellers.length === 0) return <div className="pending-sellers">No pending sellers.</div>;

  return (
    <div className="pending-sellers flex-row flex-wrap">
      {sellers.map((seller) => (
        <PendingSeller key={seller.id} seller={seller} />
      ))}
    </div>
  );
};

export default observer(PendingSellers);
