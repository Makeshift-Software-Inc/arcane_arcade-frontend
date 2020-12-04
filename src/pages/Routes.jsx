import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../store';

import ProtectedRoute from './routes/Protected';

import Home from './Home/Home';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import TwoFactorAuth from './TwoFactorAuth/TwoFactorAuth';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import GamesShow from './Games/Show/GamesShow';
import Logout from './Logout/Logout';
import HowItWorks from './HowItWorks/HowItWorks';
import ContactUs from './ContactUs/ContactUs';
import SellWithUs from './SellWithUs/SellWithUs';
import SellerDashboard from './Seller/Dashboard/Dashboard';
import SellerListingsNew from './Seller/Listings/New';
import SellerListingsEdit from './Seller/Listings/Edit';
import SellerListingsDistributions from './Seller/Listings/Distributions/Distributions';
import MyLibrary from './MyLibrary/MyLibrary';
import AdminDashboard from './Admins/Dashboard';
import AdminGamesShow from './Admins/Games/Show';

const Routes = () => {
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
      <Route exact path="/sell-with-us/:modal?" component={SellWithUs} />
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
        asGuest
        redirectTo="/"
        exact
        path="/forgot-password"
        component={ForgotPassword}
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
        redirectTo={isLoggedIn ? '/authorize' : '/login'}
        exact
        path="/my-library"
        component={MyLibrary}
      />
      <ProtectedRoute
        asSeller
        redirectTo={isLoggedIn ? '/seller/onboarding' : '/login'}
        exact
        path="/seller/dashboard"
        component={SellerDashboard}
      />
      <ProtectedRoute
        asSeller
        redirectTo={isLoggedIn ? '/seller/onboarding' : '/login'}
        exact
        path="/sell-your-game"
        component={SellerListingsNew}
      />
      {/* Can we change this from :id to :slug? */}
      <ProtectedRoute
        asSeller
        redirectTo={isLoggedIn ? '/seller/onboarding' : '/login'}
        exact
        path="/sell-your-game/:id/distributions"
        component={SellerListingsDistributions}
      />
      <ProtectedRoute
        asSeller
        redirectTo={isLoggedIn ? '/seller/onboarding' : '/login'}
        exact
        path="/games/:slug/edit"
        component={SellerListingsEdit}
      />
      <ProtectedRoute
        asAdmin
        redirectTo="/"
        exact
        path="/admins/dashboard"
        component={AdminDashboard}
      />
      <ProtectedRoute
        asAdmin
        redirectTo="/"
        exact
        path="/admins/games/:slug"
        component={AdminGamesShow}
      />
    </Switch>
  );
};

export default observer(Routes);
