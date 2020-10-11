import React, { useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';

import '../react-tags.css';

import '../normalize.css';
import '../topcoat-desktop-dark.css';
import 'bulma/bulma.sass';

import { ToastContainer } from 'react-toastify';

import { observer } from 'mobx-react';

import { useStore } from '../store';

import Notifications from '../components/Notifications/Notifications';
import Loading from '../components/Loading/Loading';
import Routes from './Routes';

const App = () => {
  const { auth, forms } = useStore();

  useEffect(() => {
    const load = async () => {
      await auth.checkLoggedIn();
      await forms.listing.load();
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (auth.loading) return <Loading />;

  return (
    <>
      <ToastContainer />
      {auth.isLoggedIn && <Notifications />}
      <Routes />
    </>
  );
};

export default observer(App);
