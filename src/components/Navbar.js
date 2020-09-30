import React from "react";
import { Link } from "react-router-dom";

import "./navbar.scss";

import logo from "../img/temp-logo.png";

import { useStore } from "../store";

const Navbar = () => {
  const { isLoggedIn } = useStore("auth");

  return (
    <header className="nav">
      <div className="left links">
        {isLoggedIn && <Link to="/browse">Browse</Link>}
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
        {isLoggedIn && <Link to="/seller/onboarding">Sell With Us</Link>}
        <Link to="/how-it-works">How It Works</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </header>
  );
};

export default Navbar;
