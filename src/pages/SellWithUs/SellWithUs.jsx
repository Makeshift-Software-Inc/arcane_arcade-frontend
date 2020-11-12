import React from 'react';

import SellersNavbar from '../../components/Navbar/SellersNavbar/SellersNavbar';

import Card from './Cards/Card';

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

          <Card
            title="90%/10% REVENUE SPLIT"
            text={'90% of each transaction\ngoes directly into your\ncoin wallet'}
            icon={howIcon}
          />

          <Card
            title="INSTANT PAYOUTS"
            text={'After a successful sale, the\nmoney goes directly to you\nwithin 15-30 minutes.'}
            icon={howIcon}
          />

          <Card
            title="NEW REVENUE STREAM"
            text={'There\'s an untapped market\nof cryptocurrency owners\nwho are gamers. By selling with\nus, you can take advantage\nof this market.'}
            icon={howIcon}
          />

        </div>

        <button className="button button-sell" type="button">
          SELL WITH US
        </button>
      </div>

    </div>
  </div>
);

export default SellWithUs;
