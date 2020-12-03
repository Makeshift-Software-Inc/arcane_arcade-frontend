import React, { useState } from 'react';

import { observer } from 'mobx-react';

import Input from '../../components/Form/Input/Input';
import eyeIcon from '../../img/Show-Hide_icon.svg';

const ResetPassword = ({
  password,
  passwordConfirmation,
  onChange,
  send,
  errors,
}) => {
  const [seePassword, setSeePassword] = useState(false);

  const toggleSeePassword = (e) => {
    e.preventDefault();
    setSeePassword(!seePassword);
  };

  return (
    <div className="reset-password">
      <div className="input-container">
        <p className="form-text label">Password</p>
        <div
          className={`flex-row align-center input-div ${
            errors.hasError('password') ? 'input-with-error' : ''
          }`}
        >
          <Input
            type={seePassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={onChange}
          />
          <a href="#" className="eye-icon-button" onClick={toggleSeePassword}>
            <img src={eyeIcon} alt="eye-icon" />
          </a>
        </div>
        {errors.hasError('password') && (
          <small className="input-error">{errors.getErrors('password')}</small>
        )}
      </div>

      <div className="input-container">
        <p className="form-text label">Confirm Password</p>
        <div
          className={`flex-row align-center input-div ${
            errors.hasError('password_confirmation') ? 'input-with-error' : ''
          }`}
        >
          <Input
            type={seePassword ? 'text' : 'password'}
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={onChange}
          />
          <a href="#" className="eye-icon-button" onClick={toggleSeePassword}>
            <img src={eyeIcon} alt="eye-icon" />
          </a>
        </div>
        {errors.hasError('password_confirmation') && (
          <small className="input-error">
            {errors.getErrors('password_confirmation')}
          </small>
        )}
      </div>

      <div className="submit-delivery">
        <button type="button" onClick={send} className="button">
          SEND
        </button>
      </div>
    </div>
  );
};

export default observer(ResetPassword);
