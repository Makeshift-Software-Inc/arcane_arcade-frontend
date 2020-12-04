import React from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from './Form';

import './Login.scss';

const LoginPage = () => {
  const metaDesc = 'Sign in to your account on Arcane Arcade.';
  return (
    <div className="App login flex-row">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign In</title>
        <meta name="description" content={metaDesc} />
      </Helmet>

      <LoginForm />
    </div>
  );
};

export default LoginPage;
