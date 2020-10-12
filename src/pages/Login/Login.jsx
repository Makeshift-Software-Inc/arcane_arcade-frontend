import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useStore } from '../../store';

import Navbar from '../../components/Navbar/Navbar';
import Errors from '../../components/Errors/Errors';

import './Login.scss';

const LoginPage = ({ history }) => {
  const {
    auth: authStore,
    forms: { login },
  } = useStore();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (login.validate()) {
      if (await authStore.login()) {
        history.push('/');
      }
    }
  };

  const hasError = (name) => Object.prototype.hasOwnProperty.call(login.errors.errors, name);

  return (
    <div className="App">
      <Navbar />

      <h1> Login </h1>
      <div className="login-form">
        <form onSubmit={onSubmit}>
          <div className="field">
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className={`topcoat-text-input--large ${
                login.errors.errors
                && hasError('username')
                  ? 'error'
                  : ''
              }`}
              type="text"
              name="username"
              value={login.username}
              onChange={login.onChange}
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className={`topcoat-text-input--large ${
                login.errors.errors
                && hasError('password')
                  ? 'error'
                  : ''
              }`}
              type="password"
              name="password"
              value={login.password}
              onChange={login.onChange}
            />
          </div>

          <Errors errors={login.errors.full_messages.toJSON()} />

          <button type="submit" className="topcoat-button--large">
            Log In
          </button>
        </form>
      </div>

      <div className="sign-up-link">
        <Link to="/sign-up">Don&apos;t have an account? Sign up</Link>
      </div>
    </div>
  );
};

export default observer(LoginPage);
