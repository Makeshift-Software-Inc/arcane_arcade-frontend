import React from 'react';

import { Helmet } from 'react-helmet';

import SignUpForm from './Form';

import './SignUp.scss';

const SignUpPage = () => {
  const metaDesc = 'Double check that your email is accurate and doesn\'t contain any typos.';
  return (
    <div className="App sign-up flex-row">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Create Your Account</title>
        <meta name="description" content={metaDesc} />
      </Helmet>

      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
