import React from "react";
import { Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { useStore } from "../../store";

const ProtectedRoute = ({
  asLoggedIn,
  asGuest,
  asActiveUser,
  asSeller,
  redirectTo,
  ...rest
}) => {
  const { isLoggedIn, user } = useStore("auth");

  const redirect = <Redirect to={redirectTo} />;

  const makeToast = (notification) => {
    toast(notification, {
      position: "top-right",
      autoClose: false,
      closeButton: true,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const loginToast = () => makeToast("Please login to continue");

  if (asLoggedIn && !isLoggedIn) {
    loginToast();
    return redirect;
  }

  if (asGuest && isLoggedIn) {
    makeToast("This page is only accessible by guest users.");
    return redirect;
  }

  if (asActiveUser) {
    if (!isLoggedIn) {
      loginToast();
      return redirect;
    } else if (!user.activated()) {
      makeToast("Please finish two factor auth first.");
      return redirect;
    }
  }

  if (asSeller) {
    if (!isLoggedIn) {
      loginToast();
      return redirect;
    } else if (!user.isSeller()) {
      makeToast("Please create seller account first.");
      return redirect;
    }
  }

  return <Route {...rest} />;
};

export default ProtectedRoute;
