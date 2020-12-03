import React, { Fragment, useState } from 'react';
import Autocomplete from '../Autocomplete/Autocomplete';

import searchIcon from '../../../img/search-bg.png';
import closeIcon from '../../../img/close_white.svg';
import './Modal.scss';

const Modal = ({ games, handleMore }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    document.body.classList.add('no-scroll');
    setShowModal(true);
  };

  const closeModal = (e) => {
    if (e) e.preventDefault();
    document.body.classList.remove('no-scroll');
    setShowModal(false);
  };

  const onSubmit = (query) => {
    closeModal();
    handleMore(query);
  };

  return (
    <div className="search-modal-wrapper flex-row align-center">
      <a href="#" className="flex-row search-btn" onClick={openModal}>
        <img src={searchIcon} alt="Search" />
      </a>
      {showModal && (
        <Fragment>
          <div className="search-modal invisible flex-row">
            <Autocomplete searchForm={games} handleMore={onSubmit} />
            <a href="#" className="flex-row close-btn" onClick={closeModal}>
              <img src={closeIcon} alt="Close" />
            </a>
          </div>
          <div className="backdrop" />
        </Fragment>
      )}
    </div>
  );
};

export default Modal;
