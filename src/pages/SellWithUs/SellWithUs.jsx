import React from 'react';

import SellersNavbar from '../../components/Navbar/SellersNavbar/SellersNavbar';

import cryptoTownSvg from '../../img/crypto-town.svg';

import howIcon from '../../img/how-icon.png';

import './SellWithUs.scss';

const SellWithUs = () => (
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
              Arcane Arcade is an emerging marketplace for game developers
              and publishers to sell games for cryptocurrency.
            </p>
          </div>
        </div>

        <div className="crypto-town-img flex-row flex-grow">
          <img src={cryptoTownSvg} alt="sell-img" />
        </div>
      </div>

      <div className="second-section flex-column align-center justify-center">
        <div className="title">
          <p>
            BENEFITS
          </p>
        </div>

        <div className="benefits-cards flex-row flex-grow justify-between align-center">

          <div className="benefits-card flex-column">
            <div className="sub-title">
              <p>
                90%/10% REVENUE SPLIT
              </p>
            </div>
            <div className="b-card flex-column align-center">
              <img src={howIcon} alt="wallet" />
              <p className="text">
                90% of each transaction
                <br />
                goes directly into your
                <br />
                coin wallet
              </p>
            </div>
          </div>

          <div className="benefits-card flex-column">
            <div className="sub-title">
              <p>
                INSTANT PAYOUTS
              </p>
            </div>
            <div className="b-card flex-column align-center">
              <img src={howIcon} alt="wallet" />
              <p className="text">
                After a successful sale, the
                <br />
                money goes directly to you
                <br />
                within 15-30 minutes.
              </p>
            </div>
          </div>

          <div className="benefits-card flex-column">
            <div className="sub-title">
              <p>
                NEW REVENUE STREAM
              </p>
            </div>
            <div className="b-card flex-column align-center">
              <img src={howIcon} alt="wallet" />
              <p className="text">
                There&apos;s an untapped market
                <br />
                of cryptocurrency owners
                <br />
                who are gamers. By selling with
                <br />
                us, you can take advantage
                <br />
                of this market.
              </p>
            </div>
          </div>

        </div>
        <button className="button button-sell" type="button">
          SELL WITH US
        </button>
      </div>

    </div>
  </div>
);

export default SellWithUs;
