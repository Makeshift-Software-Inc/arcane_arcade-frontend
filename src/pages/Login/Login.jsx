import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Helmet } from 'react-helmet';

import { useStore } from '../../store';

import Errors from '../../components/Errors/Errors';
import Input from '../../components/Form/Input/Input';
import Submit from '../../components/Form/Submit/Submit';

import eyeIcon from '../../img/Show-Hide_icon.svg';
import logo from '../../img/logo.png';

import './Login.scss';

const LoginPage = ({ history }) => {
  const {
    auth: authStore,
    forms: { login },
  } = useStore();

  const [seePassword, setSeePassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (login.validate()) {
      if (await authStore.login()) {
        if (authStore.user.activated()) {
          history.push('/');
        } else {
          history.push('/authorize');
        }
      }
    }
  };

  const toggleSeePassword = (e) => {
    e.preventDefault();
    setSeePassword(!seePassword);
  };

  const metaDesc = 'Sign in to your account on Arcane Arcade.';
  return (
    <div className="App login flex-row">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign In</title>
        <meta name="description" content={metaDesc} />
      </Helmet>

      <div className="flex-row align-center justify-center flex-grow login-page">
        <div className="login-form flex flex-column flex-grow">
          <Link className="logo" to="/">
            <img src={logo} alt="logo" />
          </Link>

          <div className="sign-up-link">
            <h1> Log In </h1>
            <span>Don&apos;t have an account? </span>
            <Link to="/sign-up">Sign up</Link>
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
                  className={
                    login.hasError('username') ? 'input-with-error' : ''
                  }
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

                <Link className="form-text flex" to="/forgot-password">
                  Forgot Your Password
                </Link>
              </div>

              <Errors errors={login.errors.full_messages.toJSON()} />
            </div>

            <Submit text="LOG IN" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default observer(LoginPage);
