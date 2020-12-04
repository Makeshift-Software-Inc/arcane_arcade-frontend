import React from 'react';

import leftTop from '../../../img/sellers-icons/card/left-top.svg';
import leftBottom from '../../../img/sellers-icons/card/left-bottom.svg';
import right from '../../../img/sellers-icons/card/right.svg';
import top from '../../../img/sellers-icons/card/top.svg';
import box from '../../../img/sellers-icons/card/background.png';

const Card = ({
  title, text, icon, hoverIcon,
}) => (
  <div className="benefits-card flex-column">
    <div className="sub-title">
      <p>
        {title}
      </p>
    </div>
    <div className="card-cont flex-column align-center">
      <div className="top-frame flex-row align-flex-end">
        <img src={top} alt="top" />
      </div>
      <div className="middle-container flex-row align-center">

        <div className="left-frame flex-column">
          <div className="first">
            <img src={leftTop} alt="left-top" />
          </div>
          <div className="second">
            <img src={leftBottom} alt="left-bottom" />
          </div>
        </div>

        <div className="b-card flex-column align-center">
          <img src={box} alt="box" className="background" />
          <img src={icon} alt="wallet" className="not-hover" />
          <img src={hoverIcon} alt="wallet" className="hover" />
          <p className="text">
            {text}
          </p>
        </div>

        <div className="right-frame">
          <img src={right} alt="right" />
        </div>

      </div>
    </div>
  </div>
);

export default Card;
