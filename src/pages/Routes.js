import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import { useStore } from "../store";

import Home from "./Home/Home";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import TwoFactorAuth from "./TwoFactorAuth/TwoFactorAuth";
import Onboarding from "./Onboarding/Onboarding";
import GamesShow from "./Games/Show/GamesShow";
import OrdersShow from "./Orders/Show/OrdersShow";
import Logout from "./Logout/Logout";
import HowItWorks from "./HowItWorks/HowItWorks";
import ContactUs from "./ContactUs/ContactUs";

const Routes = () => {
  const { auth } = useStore();

  if (auth.loading) return null;

  const guestRoutes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/how-it-works" component={HowItWorks} />
      <Route exact path="/contact-us" component={ContactUs} />
      <Route exact path="/games/:slug" component={GamesShow} />
      <Redirect to="/login" />
    </Switch>
  );

  if (!auth.isLoggedIn) return guestRoutes;

  const nonActivatedRoutes = (
    <Switch>
      <Route exact path="/authorize" component={TwoFactorAuth} />
      <Route exact path="/how-it-works" component={HowItWorks} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/contact-us" component={ContactUs} />
      <Route exact path="/games/:slug" component={GamesShow} />
      <Redirect to="/authorize" />
    </Switch>
  );

  if (!auth.user.activated()) return nonActivatedRoutes;

  const activatedRoutes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/how-it-works" component={HowItWorks} />
      <Route exact path="/contact-us" component={ContactUs} />
      <Route exact path="/seller/onboarding" component={Onboarding} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/games/:slug" component={GamesShow} />
      <Redirect to="/" />
    </Switch>
  );

  return activatedRoutes;
};

export default observer(Routes);
