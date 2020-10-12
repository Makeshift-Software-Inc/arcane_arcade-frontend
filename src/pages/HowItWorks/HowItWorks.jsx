import React, { useState, useEffect } from 'react';

import './HowItWorks.scss';

import Navbar from "./../../components/Navbar/Navbar";
import HowItWorksList from "./../../components/HowItWorks/HowItWorksList";

//buyer svgs
import gamesPickImg from "./../../img/Games_Pick.svg";
import platformImg from "./../../img/Platform.svg";
import paymentImg from "./../../img/Payment_Method.svg";
import qrImg from "./../../img/QR_Code.svg";
import congratsImg from "./../../img/Congrat.svg";

//seller svgs
import sellWithUsImg from "./../../img/SellWithUs.svg";
import reviwImg from "./../../img/Reviewseller.svg";
import methodImg from "./../../img/method.svg";
import gameTypeImg from "./../../img/GameType.svg";
import postGameImg from "./../../img/PostGame.svg";
import profitImg from "./../../img/profit.svg";

//lines
import line from "./../../img/Line.svg";
import straightLine from "./../../img/Straight_Dotted_Line.svg";


const HowItWorks = () => {

  const [buyer, setBuyer]   = useState(true);
  const [seller, setSeller] = useState(false);

  const buyerData = [
    {
      img: gamesPickImg,
      text: "1. Browse our catalog & select a game to buy"
    },
    {
      img: platformImg,
      text: "2. Choose the desired Platform",
    },
    {
      text: "3. Select the cryptocurrency to pay in",
      img: paymentImg,
    },
    {
      img: qrImg,
      text: "4. Send the exact amount to the given address",
    },
    {
      text: "5. PROFIT! Receive your redemtion code in an email and in your game library",
      img: congratsImg,
    }
  ];


  const sellerData = [
    {
      img: sellWithUsImg,
      text: "1. Apply to Sell With Us (<- link to /sell-with-us)"
    },
    {
      img: reviwImg,
      text: "2. We will review your application and be in touch for extra verification.",
    },
    {
      text: `3. After acceptance, select your payment method of choice: 
              Bitcoin and/or Monero. Add the addresses to your personal coin wallet. 
              Payments will go directly to your coin wallet.`,
      img: methodImg,
    },
    {
      img: postGameImg,
      text: "4. Post your game for sale, set price in the fiat currency of your choice (USD, Euro, GBP, etc.)",
    },
    {
      text: "5. Provide either Steam Keys or installers to redeem your game, to be used by buyers of your work.",
      img: gameTypeImg,
    },
    {
      text: "6. PROFIT! Receive payment after every sale, into your coin wallet. If you don’t wish to keep them, liquidate your coins through Coinbase.",
      img: profitImg,
    }
  ];

  return (

    <div className="App how-it-works ">
      <Navbar />
      <div className="flex flex-column page-container">

        <h2 className="title">How It Works</h2>

        <div className="flex flex-row page-buttons">
          <button className={`button is-text ${ buyer ? 'active' : ''}`} onClick={() => {setSeller(false); setBuyer(true)}}>For Buyer</button>
          <button className={`button is-text ${ seller ? 'active' : ''}`} onClick={() => {setBuyer(false); setSeller(true) }}>For Seller</button>
        </div>

        <div className="flex flex-column list-container">

          <img src={line} alt="line" className="line-img" />
          <img src={straightLine} alt="straight-line" className="straight-line-img" />

          <div className="flex flex-column list"> 
          {
            buyer && <HowItWorksList data={buyerData} />
          }

          {
            seller && <HowItWorksList data={sellerData} />
          }
          </div>
        </div>

        {
          seller &&
          <div className="seller-msg">
            <h2>
              We track the price of the cryptocurrency at the time of purchase, 
              so every sale is accountable and taxable for your company. 
              We generate monthly and quarterly reports in your currency of choice, to report your earnings.
            </h2>

            <button className="button button-sell">Sell With Us</button>
          </div>
        }
           

      </div>
    </div>
  );
};

export default HowItWorks;
