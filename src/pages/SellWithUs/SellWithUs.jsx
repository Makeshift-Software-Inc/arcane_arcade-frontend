import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../../store';

import cryptoTownSvg from '../../img/crypto-town.svg';
import clockIcon from '../../img/sellers-icons/clock.svg';
import hoverClockIcon from '../../img/sellers-icons/clock-blue.svg';
import dollarIcon from '../../img/sellers-icons/dollar.svg';
import hoverDollarIcon from '../../img/sellers-icons/dollar-blue.svg';
import walletIcon from '../../img/sellers-icons/wallet.svg';
import hoverWalletIcon from '../../img/sellers-icons/wallet-blue.svg';

import SellersNavbar from '../../components/Navbar/SellersNavbar/SellersNavbar';

import LoginModal from './Modals/LoginModal';
import SignUpModal from './Modals/SignUpModal';
import ForgotPasswordModal from './Modals/ForgotPasswordModal';
import TwoFactorAuthModal from './Modals/TwoFactorAuthModal';
import OnboardingModal from './Modals/OnboardingModal';
import Card from './Cards/Card';

import './SellWithUs.scss';

const SellWithUs = ({ match }) => {
  const { user, isLoggedIn } = useStore('auth');
  const { modal } = match.params;

  const isSeller = isLoggedIn && user && user.isSeller();

  const renderButton = () => {
    if (!isLoggedIn) {
      return (
        <Link to="/sell-with-us/signup" className="button button-sell">
          SELL WITH US
        </Link>
      );
    }
    if (!isSeller) {
      return (
        <Link to="/sell-with-us/onboarding" className="button button-sell">
          SELL WITH US
        </Link>
      );
    }

    return null;
  };

  return (
    <div className="App sell-with-us-page">
      <SellersNavbar />
      <div className="sell-with-us-container flex-column flex-grow align-center justify-center">
        <div className="first-section flex-row flex-grow align-center">
          <div className="flex-column">
            <div className="title">
              <p>
                Digital currency is the future and we&apos;re taking you there!
              </p>
            </div>
            <div className="sub-title">
              <p>
                Arcane Arcade is an emerging marketplace for game developers and
                publishers to sell games for cryptocurrency.
              </p>
            </div>
          </div>

          <div className="crypto-town-img flex-row flex-grow">
            <img src={cryptoTownSvg} alt="sell-img" />
          </div>
        </div>

        <div className="second-section flex-column align-center justify-center">
          <div className="title">
            <p>BENEFITS</p>
          </div>

          <div className="benefits-cards flex-row flex-grow justify-between align-center">
            <Card
              title="90%/10% REVENUE SPLIT"
              text={
                '90% of each transaction\ngoes directly into your\ncoin wallet'
              }
              icon={walletIcon}
              hoverIcon={hoverWalletIcon}
            />

            <Card
              title="INSTANT PAYOUTS"
              text={
                'After a successful sale, the\nmoney goes directly to you\nwithin 15-30 minutes.'
              }
              icon={clockIcon}
              hoverIcon={hoverClockIcon}
            />

            <Card
              title="NEW REVENUE STREAM"
              text={
                "There's an untapped market\nof cryptocurrency owners\nwho are gamers. By selling with\nus, you can take advantage\nof this market."
              }
              icon={dollarIcon}
              hoverIcon={hoverDollarIcon}
            />
          </div>
          {renderButton()}
        </div>
        {modal === 'login' && <LoginModal />}
        {modal === 'signup' && <SignUpModal />}
        {modal === 'forgot-password' && <ForgotPasswordModal />}
        {modal === 'authorize' && <TwoFactorAuthModal />}
        {modal === 'onboarding' && <OnboardingModal />}
      </div>
    </div>
  );
};

export default observer(SellWithUs);
