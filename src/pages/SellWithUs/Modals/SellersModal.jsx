import React from 'react';
import { Link } from 'react-router-dom';

import Modal from '../../../components/Modals/Modal';

import closeIcon from '../../../img/close_white.svg';

import './SellersModal.scss';

const SellersModal = ({ children }) => (
  <Modal className="sellers-modal">
    <Link to="/sell-with-us" className="close-modal">
      <img src={closeIcon} alt="Close" />
    </Link>
    {children}
  </Modal>
);

export default SellersModal;
