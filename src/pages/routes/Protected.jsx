import React from 'react';

import { Route, Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useStore } from '../../store';

const ProtectedRoute = ({
  asLoggedIn,
  asGuest,
  asActiveUser,
  asSeller,
  asAdmin,
  redirectTo,
  ...rest
}) => {
  const history = useHistory();
  const { isLoggedIn, user } = useStore('auth');

  if (history.location.pathname === redirectTo) return <Route {...rest} />;

  const redirect = (
    <Redirect to={{ pathname: redirectTo, state: { isRedirect: true } }} />
  );

  const makeToast = (notification) => {
    toast.info(notification);
  };

  const loginToast = () => makeToast('Please login to continue');

  if (asLoggedIn && !isLoggedIn) {
    loginToast();
    return redirect;
  }

  if (asGuest && isLoggedIn) {
    makeToast('This page is only accessible by guest users.');
    return redirect;
  }

  if (asActiveUser) {
    if (!isLoggedIn) {
      loginToast();
      return redirect;
    }
    if (!user.activated()) {
      makeToast('Please finish two factor auth first.');
      return redirect;
    }
  }

  if (asSeller) {
    if (!isLoggedIn) {
      loginToast();
      return redirect;
    }
    if (!user.isSeller()) {
      makeToast('Please create seller account first.');
      return redirect;
    }
  }

  if (asAdmin) {
    if (!isLoggedIn || !user.admin) {
      makeToast('You are not authorized to access this page.');
      return redirect;
    }
  }

  return <Route {...rest} />;
};

export default ProtectedRoute;
