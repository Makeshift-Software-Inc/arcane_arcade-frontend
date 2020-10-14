import React from 'react';

import backIcon from '../../img/back_black.svg';
import closeIcon from '../../img/close.svg';

import './Header.scss';

const Header = ({ back, close }) => {
  const goBack = (e) => {
    e.preventDefault();
    back();
  };

  const closeModal = (e) => {
    e.preventDefault();
    close();
  };

  return (
    <div className="onboarding-modal-header flex-row align-center justify-between">
      <span className="back-wrapper">
        {back && (
          // eslint-disable-next-line
          <a href="#" onClick={goBack} className="flex-row">
            <img src={backIcon} alt="Back" />
          </a>
        )}
      </span>
      <span className="modal-title">Sell With Us</span>
      <span className="close-wrapper">
        {close && (
          // eslint-disable-next-line
          <a href="#" onClick={closeModal} className="flex-row">
            <img src={closeIcon} alt="Close" />
          </a>
        )}
      </span>
    </div>
  );
};

export default Header;
