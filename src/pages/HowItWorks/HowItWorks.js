import React, { useState } from 'react';

import HowItWorksList from "./../../components/HowItWorks/HowItWorksList";

import Navbar from "./../../components/Navbar/Navbar";
import gamesPickImg from "./../../img/Games_Pick.svg";
import platformImg from "./../../img/Platform.svg";
import paymentImg from "./../../img/Payment_Method.svg";
import qrImg from "./../../img/QR_Code.svg";
import congratsImg from "./../../img/Congrat.svg";


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
      img: gamesPickImg,
      text: "1. Apply to Sell With Us (<- link to /sell-with-us)"
    },
    {
      img: platformImg,
      text: "2. We will review your application and be in touch for extra verification.",
    },
    {
      text: `3. After acceptance, select your payment method of choice: 
              Bitcoin and/or Monero. Add the addresses to your personal coin wallet. 
              Payments will go directly to your coin wallet.`,
      img: paymentImg,
    },
    {
      img: qrImg,
      text: "4. Post your game for sale, set price in the fiat currency of your choice (USD, Euro, GBP, etc.)",
    },
    {
      text: "5. Provide either Steam Keys or installers to redeem your game, to be used by buyers of your work.",
      img: congratsImg,
    },
    {
      text: "6. PROFIT! Receive payment after every sale, into your coin wallet. If you don’t wish to keep them, liquidate your coins through Coinbase.",
      img: congratsImg,
    }
  ];


  

  return (

    <div className="App how-it-works ">
      <Navbar />
      <div className="flex flex-column">

        <h2 className="title">How It Works</h2>

        <div className="flex flex-row">
          <button className="" onClick={() => {setSeller(false); setBuyer(true)}}>For Buyer</button>
          <button className="" onClick={() => {setBuyer(false); setSeller(true) }}>For Seller</button>
        </div>

        <div className="flex flex-column">
          {
            buyer && <HowItWorksList data={buyerData} />
          }

          {
            seller && <HowItWorksList data={sellerData} />
          }

          {
            seller &&
            <div>
              <h2>
                We track the price of the cryptocurrency at the time of purchase, 
                so every sale is accountable and taxable for your company. 
                We generate monthly and quarterly reports in your currency of choice, to report your earnings.
              </h2>
            </div>
          }
           
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
