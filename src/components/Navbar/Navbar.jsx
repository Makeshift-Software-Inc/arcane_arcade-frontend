import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import Modal from '../Modals/Modal';
import OnboardingModalContent from '../Onboarding/Modal';

import './Navbar.scss';
import logo from '../../img/logo.png';

import { useStore } from '../../store';

const Navbar = () => {
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const { isLoggedIn, user } = useStore('auth');

  const isSeller = isLoggedIn && user && user.isSeller();

  const handleShowOnboardingModal = (e) => {
    e.preventDefault();
    setShowOnboardingModal(true);
  };

  const closeOnboardingModal = () => {
    setShowOnboardingModal(false);
  };

  const renderSellerLinks = () => {
    if (isSeller) {
      return (
        <Link to="/seller/dashboard" className="navbar-item">
          Dashboard
        </Link>
      );
    }

    if (!isLoggedIn) {
      return (
        <Link to="/login" className="navbar-item">
          Sell With Us
        </Link>
      );
    }

    return (
      <React.Fragment>
        {/* eslint-disable-next-line */}
        <a onClick={handleShowOnboardingModal} href="#" className="navbar-item">
          Sell With Us
        </a>
        {showOnboardingModal && (
          <Modal>
            <OnboardingModalContent close={closeOnboardingModal} />
          </Modal>
        )}
      </React.Fragment>
    );
  };

  return (
    <nav
      className="navbar arcane-nav"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </Link>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          {renderSellerLinks()}

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
