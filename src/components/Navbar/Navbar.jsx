import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import './Navbar.scss';

import { useStore } from '../../store';

const Navbar = () => {
  const { isLoggedIn, user } = useStore('auth');

  const isSeller = isLoggedIn && user && user.isSeller();

  return (
    <nav
      className="navbar arcane-nav"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link class="navbar-item" to="/">
          <div className="logo-placeholder">Logo</div>
        </Link>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          {isSeller ? (
            <Link to="/seller/dashboard" className="navbar-item">
              Dashboard
            </Link>
          ) : (
            <Link to="/seller/onboarding" className="navbar-item">
              Sell With Us
            </Link>
          )}

          {isLoggedIn ? (
            <Link to="/my-library" className="navbar-item">
              My Library
            </Link>
          ) : (
            <Link to="/login" className="navbar-item">
              Login
            </Link>
          )}
        </div>

        <div className="navbar-end">
          <Link to="/how-it-works" className="navbar-item">
            How It Works
          </Link>
          <Link to="/contact-us" className="navbar-item">
            Contact Us
          </Link>

          {isLoggedIn && (
            <Link to="/logout" className="navbar-item">
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default observer(Navbar);