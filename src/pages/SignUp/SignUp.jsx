import React, { useEffect, createRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import 'intl-tel-input/build/css/intlTelInput.css';
import 'intl-tel-input/build/js/utils';
import intlTelInput from 'intl-tel-input';

import { useStore } from '../../store';

import Errors from '../../components/Errors/Errors';

import Input from '../../components/Form/Input/Input';
import Submit from '../../components/Form/Submit/Submit';

import eyeIcon from '../../img/Show-Hide_icon.svg';

import './SignUp.scss';

const SignUpPage = ({ history }) => {
  const phoneNumberRef = createRef(null);

  useEffect(() => {
    intlTelInput(phoneNumberRef.current, {
      utilsScript: '../../node_modules/intl-tel-input/build/js/utils.js',
      separateDialCode: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    auth: authStore,
    forms: { signUp },
  } = useStore();

  const [seePassword, setseePassword] = useState(false);

  const onSubmit = async (e) => {
    const countryCode = document.querySelector('.iti__selected-dial-code').innerHTML;
    e.preventDefault();
    if (signUp.validate()) {
      if (await authStore.signUp(countryCode)) {
        history.push('/authorize');
      }
    }
  };

  return (
    <div className="App sign-up flex-row">

      <div className="flex-row align-center justify-center flex-grow sign-up-page">

        <div className="login-form flex flex-column flex-grow">
          <Link className="logo flex" to="/">
            Logo
          </Link>
          <div className="sign-up-link">
            <h1> Sign Up </h1>
            <span>Already have an account? </span>
            <Link to="/login">Sign In</Link>
          </div>
          <form onSubmit={onSubmit} className="flex-flex-column">

            <div className="input-container">
              <p className="form-text label">Username</p>
              <Input
                type="text"
                name="username"
                value={signUp.username}
                onChange={signUp.onChange}
              />
            </div>

            <div className="input-container">
              <p className="form-text label">Email</p>
              <Input
                type="email"
                name="email"
                value={signUp.email}
                onChange={signUp.onChange}
              />
            </div>

            <div className="input-container">
              <p className="form-text label">Password</p>
              <div className="flex-row align-center input-div">
                <Input
                  type={seePassword ? 'text' : 'password'}
                  name="password"
                  value={signUp.password}
                  onChange={signUp.onChange}
                />
                <a href="#" className="eye-icon-button" onClick={() => setseePassword(!seePassword)}>
                  <img src={eyeIcon} alt="eye-icon" />
                </a>
              </div>
            </div>

            <div className="input-container">
              <p className="form-text label">Confirm Password</p>
              <div className="flex-row align-center input-div">
                <Input
                  type={seePassword ? 'text' : 'password'}
                  name="password_confirmation"
                  value={signUp.password_confirmation}
                  onChange={signUp.onChange}
                />
                <a href="#" className="eye-icon-button" onClick={() => setseePassword(!seePassword)}>
                  <img src={eyeIcon} alt="eye-icon" />
                </a>
              </div>
            </div>

            <div className="input-container">
              <p className="form-text label">Phone Number</p>
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
