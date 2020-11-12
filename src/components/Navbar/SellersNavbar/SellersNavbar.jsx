import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';

import { toast } from 'react-toastify';

import Modal from '../../Modals/Modal';
import OnboardingModalContent from '../../Onboarding/Modal';

import './SellersNavbar.scss';
import logo from '../../../img/logo.png';
import hamburgerIcon from '../../../img/hamburger_light.svg';

import howIcon from '../../../img/sellers-icons/nav/how.svg';
import userIcon from '../../../img/sellers-icons/nav/avatar.svg';
import dollarIcon from '../../../img/sellers-icons/nav/dollar.svg';


import { useStore } from '../../../store';

const SellersNavbar = () => {
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
          <div className="icon-container flex-row justify-center align-center">
            <img src={userIcon} alt="icon" />
          </div>
          <p>Dashboard</p>
        </Link>
      );
    }

    if (!isLoggedIn) {
      return (
        <Link to="/login" className="navbar-item">
          <div className="icon-container flex-row justify-center align-center">
            <img src={dollarIcon} alt="icon" />
          </div>
          <p>Sell With Us</p>
        </Link>
      );
    }

    return (
      <React.Fragment>
        {/* eslint-disable-next-line */}
        <a onClick={handleShowOnboardingModal} href="#" className="navbar-item">
          <div className="icon-container flex-row justify-center align-center">
            <img src={dollarIcon} alt="icon" />
          </div>
          <p>Sell With Us</p>
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
      className="sellers-navbar arcane-nav flex-row justify-between align-center"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item-logo flex-row align-center" to="/">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </Link>
      </div>

      <div id="navbarBasicExample" className="navbar-menu navbar-menu flex-row justify-flex-end">

        <div className="navbar-end flex-row justify-between flex-grow">
          {renderSellerLinks()}
          <Link to="/how-it-works" className="navbar-item flex-row">
            <div className="icon-container flex-row justify-center align-center">
              <img src={howIcon} alt="icon" />
            </div>
            <p>How It Works</p>
          </Link>

          {isLoggedIn ? (
            <Link to="/logout" className="navbar-item flex-row align-center">
              <div className="icon-container flex-row justify-center align-center">
                <img src={userIcon} alt="icon" />
              </div>
              <p>Logout</p>
            </Link>
          ) : (
            <Link to="/login" className="navbar-item flex-row align-center">
              <div className="icon-container flex-row justify-center align-center">
                <img src={userIcon} alt="icon" />
              </div>
              <p>Login</p>
            </Link>
          )}

        </div>
      </div>

      <div className="mobile-nav flex-row align-center">

        { openMobNav

            && (
            <div className="mobile-nav-dropdown">

              <div className="navbar-end flex-column justify-between flex-grow">
                {renderSellerLinks()}
                <Link to="/how-it-works" className="navbar-item flex-row align-center">
                  <div className="icon-container flex-row justify-center align-center">
                    <img src={howIcon} alt="icon" />
                  </div>
                  <p>How It Works</p>
                </Link>

                {isLoggedIn ? (
                  <Link to="/logout" className="navbar-item flex-row align-center">
                    <div className="icon-container flex-row justify-center align-center">
                      <img src={userIcon} alt="icon" />
                    </div>
                    <p>Logout</p>
                  </Link>
                ) : (
                  <Link to="/login" className="navbar-item flex-row align-center">
                    <div className="icon-container flex-row justify-center align-center">
                      <img src={userIcon} alt="icon" />
                    </div>
                    <p>Login</p>
                  </Link>
                )}
              </div>
            </div>
            )}
        {
              openMobNav ? (
                <button className="icon-btn close-btn" onClick={() => setOpenMobNav(!openMobNav)} type="button">
                  X
                </button>
              ) : (

                <button className="icon-btn hamburger-btn" onClick={() => setOpenMobNav(!openMobNav)} type="button">
                  <img
                    src={hamburgerIcon}
                    alt="hamburger-icon"
                    className="hamburger-icon"
                  />
                </button>
              )
            }

      </div>
    </nav>
  );
};

export default observer(SellersNavbar);
