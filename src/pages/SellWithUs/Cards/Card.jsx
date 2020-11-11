import React from 'react';

const Card = ({ title, text, icon }) => (
  <div className="benefits-card flex-column">
    <div className="sub-title">
      <p>
        {title}
      </p>
    </div>
    <div className="card-cont flex-column align-center">
      <div className="top-frame" />
      <div className="middle-container flex-row align-center">

        <div className="left-frame flex-column">
          <div className="first" />
          <div className="second" />
        </div>

        <div className="b-card flex-column align-center">
          <img src={icon} alt="wallet" />
          <p className="text">
            {text}
          </p>
        </div>

        <div className="right-frame" />

      </div>
    </div>
  </div>
);

export default Card;
