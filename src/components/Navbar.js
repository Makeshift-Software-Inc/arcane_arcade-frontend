import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.scss'

import logo from '../img/temp-logo.png';

class Navbar extends React.Component {
  render() {
    let leftLink;
    if (!this.props.loggedInStatus) {
      leftLink  = <Link to="/login">Login</Link>
    } else {
      leftLink  = <Link to="/my-library">My Library</Link>
    }



    return (
      <header className="nav">
        <div className="left links">
          { this.props.loggedInStatus &&
            <Link to="/browse">Browse</Link>
          }
          { leftLink }
        </div>
        <div className="center">
          <Link to="/">
            <h3>Arcane Arcade</h3>
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
        </div>
        <div className="right links">
          { this.props.loggedInStatus &&
            <Link to="/seller/onboarding">Sell With Us</Link>
          }
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </header>
    )
  }
}

export default Navbar;
