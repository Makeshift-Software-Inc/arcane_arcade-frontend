import React, { useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Helmet } from 'react-helmet';

import 'intl-tel-input/build/css/intlTelInput.css';
import 'intl-tel-input/build/js/utils';
import intlTelInput from 'intl-tel-input';

import { useStore } from '../../store';

import Errors from '../../components/Errors/Errors';

import Input from '../../components/Form/Input/Input';
import Submit from '../../components/Form/Submit/Submit';

import eyeIcon from '../../img/Show-Hide_icon.svg';
import logo from '../../img/logo.png';

import './SignUp.scss';

const SignUpPage = ({ history }) => {
  const phoneNumberRef = useRef(null);
  const intl = useRef(null);

  useEffect(() => {
    intl.current = intlTelInput(phoneNumberRef.current, {
      utilsScript: '../../node_modules/intl-tel-input/build/js/utils.js',
      separateDialCode: true,
      // if you want autofill for country, register to ipinfo
      // initialCountry: 'auto',
      // geoIpLookup: async (success, failure) => {
      //   const response = await fetch('https://ipinfo.io/json');
      //   const json = await response.json();
      //   const countryCode = json && json.country ? json.country : 'us';
      //   success(countryCode);
      // },
    });
  }, []);

  const {
    auth: authStore,
    forms: { signUp },
  } = useStore();

  const [seePassword, setSeePassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    signUp.update({ phone_number: intl.current.getNumber() });
    if (signUp.validate()) {
      if (await authStore.signUp()) {
        history.push('/authorize');
      }
    }
  };

  const toggleSeePassword = (e) => {
    e.preventDefault();
    setSeePassword(!seePassword);
  };

  const metaDesc = `Double check that your email "${signUp.email}" is accurate and doesn't contain any typos.`;
  return (
    <div className="App sign-up flex-row">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Create Your Account</title>
        <meta name="description" content={metaDesc} />
      </Helmet>
      <div className="flex-row align-center justify-center flex-grow sign-up-page">
        <div className="login-form flex flex-column flex-grow">
          <Link className="logo flex" to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="sign-up-link">
            <h1> Sign Up </h1>
            <span>Already have an account? </span>
            <Link to="/login">Sign In</Link>
          </div>
          <form onSubmit={onSubmit} className="flex-flex-column" noValidate>
            <div className="input-container">
              <p className="form-text label">Username</p>
              <Input
                type="text"
                name="username"
                value={signUp.username}
                onChange={signUp.onChange}
                className={
                  signUp.hasError('username') ? 'input-with-error' : ''
                }
              />
              {signUp.hasError('username') && (
                <small className="input-error">
                  {signUp.getErrors('username')}
                </small>
              )}
            </div>

            <div className="input-container">
              <p className="form-text label">Email</p>
              <Input
                type="email"
                name="email"
                value={signUp.email}
                onChange={signUp.onChange}
                className={signUp.hasError('email') ? 'input-with-error' : ''}
              />
              {signUp.hasError('email') && (
                <small className="input-error">
                  {signUp.getErrors('email')}
                </small>
              )}
            </div>

            <div className="input-container">
              <p className="form-text label">Password</p>
              <div
                className={`flex-row align-center input-div ${
                  signUp.hasError('password') ? 'input-with-error' : ''
                }`}
              >
                <Input
                  type={seePassword ? 'text' : 'password'}
                  name="password"
                  value={signUp.password}
                  onChange={signUp.onChange}
                />
                <a
                  href="#"
                  className="eye-icon-button"
                  onClick={toggleSeePassword}
                >
                  <img src={eyeIcon} alt="eye-icon" />
                </a>
              </div>
              {signUp.hasError('password') && (
                <small className="input-error">
                  {signUp.getErrors('password')}
                </small>
              )}
            </div>

            <div className="input-container">
              <p className="form-text label">Confirm Password</p>
              <div
                className={`flex-row align-center input-div ${
                  signUp.hasError('password_confirmation')
                    ? 'input-with-error'
                    : ''
                }`}
              >
                <Input
                  type={seePassword ? 'text' : 'password'}
                  name="password_confirmation"
                  value={signUp.password_confirmation}
                  onChange={signUp.onChange}
                />
                <a
                  href="#"
                  className="eye-icon-button"
                  onClick={toggleSeePassword}
                >
                  <img src={eyeIcon} alt="eye-icon" />
                </a>
              </div>
              {signUp.hasError('password_confirmation') && (
                <small className="input-error">
                  {signUp.getErrors('password_confirmation')}
                </small>
              )}
            </div>

            <div className="input-container">
              <p className="form-text label">Phone Number</p>
              <div
                className={`flex-row ${
                  signUp.hasError('phone_number') ? 'input-with-error' : ''
                }`}
              >
                <input
                  type="tel"
                  id="phone_number"
                  className="arcane-input"
                  maxLength="16"
                  name="phone_number"
                  placeholder="Phone Number"
                  ref={phoneNumberRef}
                  value={signUp.phone_number}
                  onChange={signUp.onChange}
                />
              </div>
              {signUp.hasError('phone_number') && (
                <small className="input-error">
                  {signUp.getErrors('phone_number')}
                </small>
              )}
            </div>

            <div className="terms-div flex-column justify-center">
              <p>
                By continuing, you agree to accept our
                <br />
                Privacy Policy & Terms of Service.
              </p>
            </div>

            <Errors errors={signUp.errors.full_messages.toJSON()} />

            <Submit text="SIGN UP" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default observer(SignUpPage);
