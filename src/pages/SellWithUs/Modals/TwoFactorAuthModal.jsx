import React from 'react';

import SellersModal from './SellersModal';
import TwoFactorAuthForm from '../../TwoFactorAuth/Form';

const TwoFactorAuthModal = () => (
  <SellersModal>
    <TwoFactorAuthForm />
  </SellersModal>
);

export default TwoFactorAuthModal;
