import React, { useState } from 'react';

import { observer } from 'mobx-react';

import Input from '../../components/Form/Input/Input';
import eyeIcon from '../../img/Show-Hide_icon.svg';

const ResetPassword = ({
  password, passwordConfirmation, onChange, send,
}) => {
  const [seePassword, setseePassword] = useState(false);

  const passwordsMatching = () => {
    if (password === passwordConfirmation) {
      return true;
    }
    return false;
  };

  return (
    <div className="reset-password">
      <div className="input-container">
        <p className="form-text label">Password</p>
        <div className="flex-row align-center input-div">
          <Input
            type={seePassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={onChange}
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
            value={passwordConfirmation}
            onChange={onChange}
          />
          <a href="#" className="eye-icon-button" onClick={() => setseePassword(!seePassword)}>
            <img src={eyeIcon} alt="eye-icon" />
          </a>
        </div>
      </div>

      <div className="submit-delivery">
        <button
          type="button"
          onClick={send}
          className="button"
          disabled={!passwordsMatching()}
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default observer(ResetPassword);
