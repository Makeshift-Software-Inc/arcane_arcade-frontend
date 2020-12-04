import React from 'react';
import { Helmet } from 'react-helmet';

import ForgotPasswordForm from './Form';

import './ForgotPassword.scss';

const ForgotPassword = () => (
  <div className="App forgot-password flex-row">
    <Helmet>
      <meta charSet="utf-8" />
      <title>Forgot Password</title>
    </Helmet>

    <ForgotPasswordForm />
  </div>
);

export default ForgotPassword;
