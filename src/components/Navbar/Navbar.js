import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

import "./Navbar.scss";

import { useStore } from "../../store";

const Navbar = () => {
  const { isLoggedIn, user } = useStore("auth");

  const isSeller = isLoggedIn && user && user.isSeller();

  return (
    <nav class="navbar arcane-nav" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <Link to="/">
            <div className="logo-placeholder">
              Logo
            </div>
          </Link>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
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
            <Link to="/my-library" className="navbar-item">My Library</Link>
          ) : (
            <Link to="/login" className="navbar-item">Login</Link>
          )}
        </div>


        <div class="navbar-end">
          <Link to="/how-it-works" className="navbar-item">
            How It Works
          </Link>
          <Link to="/contact-us" className="navbar-item">
            Contact Us
          </Link>

          {isLoggedIn &&
            <Link to="/logout" className="navbar-item">
              Logout
            </Link>
          }

        </div>
      </div>
    </nav>

  );
};

export default observer(Navbar);
