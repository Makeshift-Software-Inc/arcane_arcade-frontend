import React from 'react';
import { Helmet } from 'react-helmet';

import TwoFactorAuthForm from './Form';

const TwoFactorAuth = () => (
  <div className="App two-factor flex-row">
    <Helmet>
      <meta charSet="utf-8" />
      <title>Authorize</title>
    </Helmet>
    <TwoFactorAuthForm />
  </div>
);

export default TwoFactorAuth;
