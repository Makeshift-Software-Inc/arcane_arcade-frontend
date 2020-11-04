import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';

import { toast } from 'react-toastify';

import Modal from '../Modals/Modal';
import OnboardingModalContent from '../Onboarding/Modal';

import './Navbar.scss';
import logo from '../../img/logo.png';
import hamburgerIcon from '../../img/hamburger_light.svg';
import closeIcon from '../../img/close_white.svg';

import { useStore } from '../../store';

const Navbar = () => {
  const history = useHistory();
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const { isLoggedIn, user } = useStore('auth');

  const [openMobNav, setOpenMobNav] = useState(false);

  const isSeller = isLoggedIn && user && user.isSeller();

  const handleShowOnboardingModal = (e) => {
    e.preventDefault();
    if (user.activated()) {
      setShowOnboardingModal(true);
    } else {
      toast('Please finish two factor auth first.');
      history.push('/authorize');
    }
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
      className="navbar arcane-nav flex-row justify-between align-center"
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

      <div className="mobile-nav flex-row align-center">

        { openMobNav

            && (
            <div className="mobile-nav-dropdown">

              <div className="mobile-start-links flex-column">
                {isLoggedIn
                  && (
                  <Link to="/my-library" className="navbar-item">
                    My Library
                  </Link>
                  )}
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

              <div className="end-mobile-links flex-column">
                <div className="flex-row">
                  {!isLoggedIn ? (
                    <Link to="/login" className="navbar-item highlited-link">
                      Login
                    </Link>
                  ) : (
                    <Link to="/" className="navbar-item highlited-link">
                      {user.username}
                    </Link>
                  )}
                </div>
                <div className="seller-navbar-item">
                  {renderSellerLinks()}
                </div>
              </div>
            </div>
            )}
        {/* eslint-disable jsx-a11y/click-events-have-key-events */}
        {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
        {/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */}
        <img
          src={openMobNav ? closeIcon : hamburgerIcon}
          alt="hamburger-icon"
          className="hamburger-icon"
          onClick={() => setOpenMobNav(!openMobNav)}
        />
        {/* eslint-enable jsx-a11y/click-events-have-key-events */}
        {/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */}
        {/* eslint-enable jsx-a11y/no-noninteractive-element-to-interactive-role */}
      </div>
    </nav>
  );
};

export default observer(Navbar);
