import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.scss'

import logo from '../img/temp-logo.png';

const Navbar = () => {
  return (
    <header className="nav">
      <div className="left links">
        <Link to="/login">Login</Link>
      </div>
      <div className="center">
        <Link to="/">
          <h3>Arcane Arcade</h3>
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </div>
      <div className="right links">
        <Link to="/how-it-works">How It Works</Link>
      </div>
    </header>
  )
}

export default Navbar;
