import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';

import './HowItWorks.scss';

import Navbar from '../../components/Navbar/Navbar';
import HowItWorksList from '../../components/HowItWorks/HowItWorksList';

import Modal from '../../components/Modals/Modal';
import OnboardingModalContent from '../../components/Onboarding/Modal';

// buyer svgs
import gamesPickImg from '../../img/Games_Pick.svg';
import platformImg from '../../img/Platform.svg';
import paymentImg from '../../img/Payment_Method.svg';
import qrImg from '../../img/QR_Code.svg';
import congratsImg from '../../img/Congrat.svg';

// seller svgs
import sellWithUsImg from '../../img/SellWithUs.svg';
import reviwImg from '../../img/Reviewseller.svg';
import methodImg from '../../img/method.svg';
import gameTypeImg from '../../img/GameType.svg';
import postGameImg from '../../img/PostGame.svg';
import profitImg from '../../img/profit.svg';

// lines
import line from '../../img/Line.svg';
import straightLine from '../../img/Straight_Dotted_Line.svg';

import { useStore } from '../../store';

const HowItWorks = ({ history }) => {
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [activeTab, setActivetab] = useState('buyer');

  const { isLoggedIn, user } = useStore('auth');

  const handleShowOnboardingModal = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast('Please login first.');
      history.push('/login');
      return;
    }
    if (!user.activated()) {
      toast('Please finish two factor auth first.');
      history.push('/authorize');
      return;
    }
    setShowOnboardingModal(true);
  };

  const closeOnboardingModal = () => {
    setShowOnboardingModal(false);
  };

  const buyerData = [
    {
      img: gamesPickImg,
      text: '1. Browse our catalog \n& select a game to buy',
    },
    {
      img: platformImg,
      text: '2. Choose the desired Platform',
    },
    {
      img: paymentImg,
      text: '3. Select the cryptocurrency to pay in',
    },
    {
      img: qrImg,
      text: '4. Send the exact amount to the given address',
    },
    {
      text:
        '5. PROFIT! Receive your redemption code in an email and in your game library',
      img: congratsImg,
    },
  ];

  const sellerData = [
    {
      img: sellWithUsImg,
      text: '1. Apply to Sell With Us',
    },
    {
      img: reviwImg,
      text:
        '2. We will review your application and be in touch for extra verification.',
    },
    {
      text: `3. After acceptance, select your payment method of choice:
              Bitcoin and/or Monero. Add the addresses to your personal coin wallet.
              Payments will go directly to your coin wallet.`,
      img: methodImg,
    },
    {
      img: postGameImg,
      text:
        '4. Post your game for sale, set price in the fiat currency of your choice (USD, Euro, GBP, etc.)',
    },
    {
      text:
        '5. Provide either Steam Keys or installers to redeem your game, to be used by buyers of your work.',
      img: gameTypeImg,
    },
    {
      text:
        '6. PROFIT! Receive payment after every sale, into your coin wallet. We only take 10%, so 90% goes directly to you! If you don’t wish to keep them, liquidate your coins through Coinbase.',
      img: profitImg,
    },
  ];

  const metaDesc = 'Arcane Arcade is an emerging marketplace for game developers and publishers to sell games for cryptocurrency.';

  return (
    <div className="App how-it-works ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>How It Works</title>
        <meta name="description" content={metaDesc} />
      </Helmet>

      <Navbar />
      <div className="flex flex-column page-container">
        <h2 className="title">How It Works</h2>

        <div className="flex flex-row page-buttons">
          <button
            type="button"
            className={`button is-text ${
              activeTab === 'buyer' ? 'active' : ''
            }`}
            onClick={() => {
              setActivetab('buyer');
            }}
          >
            For Buyer
          </button>
          <button
            type="button"
            className={`button is-text ${
              activeTab === 'seller' ? 'active' : ''
            }`}
            onClick={() => {
              setActivetab('seller');
            }}
          >
            For Seller
          </button>
        </div>

        <div className="flex flex-column list-container">
          <img src={line} alt="line" className="line-img" />
          <img
            src={straightLine}
            alt="straight-line"
            className="straight-line-img"
          />

          <div className="flex flex-column list">
            <HowItWorksList
              data={activeTab === 'buyer' ? buyerData : sellerData}
            />
          </div>
        </div>

        {activeTab === 'seller' && (
          <div className="seller-msg">
            <hr />
            <h2>
              We track the price of the cryptocurrency at the time of purchase,
              so every sale is accountable and taxable for your company. We
              generate monthly and quarterly reports in your currency of choice,
              to report your earnings.
            </h2>

            <button
              onClick={handleShowOnboardingModal}
              type="button"
              className="button button-sell"
            >
              Sell With Us
            </button>
            {showOnboardingModal && (
              <Modal>
                <OnboardingModalContent close={closeOnboardingModal} />
              </Modal>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(HowItWorks);
