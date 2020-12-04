import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useStore } from '../../store';

import Errors from '../../components/Errors/Errors';
import Input from '../../components/Form/Input/Input';
import Submit from '../../components/Form/Submit/Submit';

import eyeIcon from '../../img/Show-Hide_icon.svg';
import logo from '../../img/logo.png';

import './Form.scss';

const LoginForm = () => {
  const {
    auth: authStore,
    forms: { login },
  } = useStore();

  const [seePassword, setSeePassword] = useState(false);

  const history = useHistory();

  const forSellers = history.location.pathname.startsWith('/sell-with-us');

  const toggleSeePassword = (e) => {
    e.preventDefault();
    setSeePassword(!seePassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (login.validate()) {
      if (await authStore.login()) {
        if (authStore.user.activated()) {
          history.push(forSellers ? '/sell-with-us' : '/');
        } else {
          history.push(forSellers ? '/sell-with-us/authorize' : '/authorize');
        }
      }
    }
  };

  return (
    <div className="flex-row align-center justify-center flex-grow login-page">
      <div className="login-form flex flex-column flex-grow">
        <Link className="logo" to={forSellers ? '/sell-with-us' : '/'}>
          <img src={logo} alt="logo" />
        </Link>

        <div className="sign-up-link">
          <h1> Log In </h1>
          <span>Don&apos;t have an account? </span>
          <Link to={forSellers ? '/sell-with-us/signup' : '/sign-up'}>
            Sign up
          </Link>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex-column justify-between"
          noValidate
        >
          <div>
            <div className="input-container">
              <p className="form-text label">Username</p>
              <Input
                type="text"
                name="username"
                value={login.username}
                onChange={login.onChange}
                className={login.hasError('username') ? 'input-with-error' : ''}
              />
              {login.hasError('username') && (
                <small className="input-error">
                  {login.getErrors('username')}
                </small>
              )}
            </div>

            <div className="input-container">
              <p className="form-text label">Password</p>
              <div
                className={`flex-row align-center input-div ${
                  login.hasError('password') ? 'input-with-error' : ''
                }`}
              >
                <Input
                  type={seePassword ? 'text' : 'password'}
                  name="password"
                  value={login.password}
                  onChange={login.onChange}
                />
                <a
                  href="#"
                  className="eye-icon-button"
                  onClick={toggleSeePassword}
                >
                  <img src={eyeIcon} alt="eye-icon" />
                </a>
              </div>
              {login.hasError('password') && (
                <small className="input-error">
                  {login.getErrors('password')}
                </small>
              )}
            </div>

            <div className="remember-forgot-div flex-row justify-between">
              <div className="flex-row align-center">
                <Input className="checkbox" type="checkbox" name="remember" />
                <span className="form-text">Remember Me</span>
              </div>

              <Link
                className="form-text flex"
                to={
                  forSellers
                    ? '/sell-with-us/forgot-password'
                    : '/forgot-password'
                }
              >
                Forgot Your Password
              </Link>
            </div>

            <Errors errors={login.errors.full_messages.toJSON()} />
          </div>

          <Submit text="LOG IN" />
        </form>
      </div>
    </div>
  );
};

export default observer(LoginForm);
