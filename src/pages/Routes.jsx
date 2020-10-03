import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import { useStore } from "../store";

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

const Routes = () => {
  const { auth } = useStore();

  if (auth.loading) return null;

  const sharedRoutes = (
    <React.Fragment>
      <Route exact path="/how-it-works" component={HowItWorks} />
      <Route exact path="/contact-us" component={ContactUs} />
      <Route exact path="/games/:slug" component={GamesShow} />
    </React.Fragment>
  );

  const guestRoutes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign-up" component={SignUp} />
      {sharedRoutes}
      <Redirect to="/login" />
    </Switch>
  );

  if (!auth.isLoggedIn) return guestRoutes;

  const nonActivatedRoutes = (
    <Switch>
      <Route exact path="/authorize" component={TwoFactorAuth} />
      <Route exact path="/logout" component={Logout} />
      {sharedRoutes}
      <Redirect to="/authorize" />
    </Switch>
  );

  if (!auth.user.activated()) return nonActivatedRoutes;

  const activatedRoutes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/seller/onboarding" component={SellerOnboarding} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/buy/:id" component={OrdersShow} />
      {sharedRoutes}
      <Redirect to="/" />
    </Switch>
  );

  if (!auth.user.isSeller()) return activatedRoutes;

  const sellerRoutes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/buy/:id" component={OrdersShow} />
      <Route exact path="/seller/dashboard" component={SellerDashboard} />
      <Route exact path="/seller/listings/new" component={SellerListingsNew} />
      {sharedRoutes}
      <Redirect to="/" />
    </Switch>
  );

  return sellerRoutes;
};

export default observer(Routes);
