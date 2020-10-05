import React from "react";
import { Switch, Route } from "react-router-dom";
import { observer } from "mobx-react";
import { useStore } from "../store";

import ProtectedRoute from "./routes/Protected";

import Home from "./Home/Home";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import TwoFactorAuth from "./TwoFactorAuth/TwoFactorAuth";
import GamesShow from "./Games/Show/GamesShow";
import OrdersShow from "./Orders/Show/OrdersShow";
import Logout from "./Logout/Logout";
import HowItWorks from "./HowItWorks/HowItWorks";
import ContactUs from "./ContactUs/ContactUs";
import SellerOnboarding from "./Seller/Onboarding/Onboarding";
import SellerDashboard from "./Seller/Dashboard/Dashboard";
import SellerListingsNew from "./Seller/Listings/New";

const Routes = (props) => {
  const {
    auth,
    auth: { isLoggedIn },
  } = useStore();

  if (auth.loading) return null;

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/how-it-works" component={HowItWorks} />
      <Route exact path="/contact-us" component={ContactUs} />
      <Route exact path="/games/:slug" component={GamesShow} />
      <ProtectedRoute
        asGuest
        redirectTo="/"
        exact
        path="/login"
        component={Login}
      />
      <ProtectedRoute
        asGuest
        redirectTo="/"
        exact
        path="/sign-up"
        component={SignUp}
      />
      <ProtectedRoute
        asLoggedIn
        redirectTo="/login"
        exact
        path="/authorize"
        component={TwoFactorAuth}
      />
      <ProtectedRoute
        asLoggedIn
        redirectTo="/login"
        exact
        path="/logout"
        component={Logout}
      />
      <ProtectedRoute
        asLoggedIn
        redirectTo="/login"
        exact
        path="/authorize"
        component={TwoFactorAuth}
      />
      <ProtectedRoute
        asActiveUser
        redirectTo={isLoggedIn ? "/authorize" : "/login"}
        exact
        path="/seller/onboarding"
        component={SellerOnboarding}
      />
      <ProtectedRoute
        asActiveUser
        redirectTo={isLoggedIn ? "/authorize" : "/login"}
        exact
        path="/buy/:id"
        component={OrdersShow}
      />
      <ProtectedRoute
        asSeller
        redirectTo={isLoggedIn ? "/seller/onboarding" : "/login"}
        exact
        path="/seller/dashboard"
        component={SellerDashboard}
      />
      <ProtectedRoute
        asSeller
        redirectTo={isLoggedIn ? "/seller/onboarding" : "/login"}
        exact
        path="/sell-your-game"
        component={SellerListingsNew}
      />
    </Switch>
  );
};

export default observer(Routes);
