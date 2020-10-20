import React, { useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';

import '../react-tags.css';

import '../normalize.css';
// import '../topcoat-desktop-dark.css';
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
    auth.checkLoggedIn();
    forms.listing.load();
  }, []);

  useEffect(() => {
    if (auth.isLoggedIn) {
      auth.user.loadOrders();
    }
  }, [auth.isLoggedIn]);

  if (auth.loading || !forms.listing.loaded) return <Loading />;

  return (
    <>
      <ToastContainer />
      {auth.isLoggedIn && <Notifications />}
      <Routes />
    </>
  );
};

export default observer(App);
