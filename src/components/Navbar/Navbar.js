import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

import "./Navbar.scss";

import logo from "../../img/temp-logo.png";

import { useStore } from "../../store";

const Navbar = () => {
  const { isLoggedIn, user } = useStore("auth");

  const isSeller = isLoggedIn && user.isSeller();

  return (
    <header className="nav">
      <div className="left links">
        {isSeller ? (
          <Link to="/seller/dashboard">Dashboard</Link>
        ) : (
          <Link to="/seller/onboarding">Sell With Us</Link>
        )}
        {isLoggedIn ? (
          <Link to="/my-library">My Library</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
      <div className="center">
        <Link to="/">
          <h3>Arcane Arcade</h3>
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </div>
      <div className="right links">
        <Link to="/how-it-works">How It Works</Link>
        <Link to="/contact-us">Contact Us</Link>
        {isLoggedIn && <Link to="/logout">Logout</Link>}
      </div>
    </header>
  );
};

export default observer(Navbar);
