import React, { useEffect, createRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useStore } from '../../store';

import Errors from '../../components/Errors/Errors';

import Input from '../../components/Form/Input/Input';
import Submit from '../../components/Form/Submit/Submit';

import eyeIcon from '../../img/Show-Hide_icon.svg';
import logo from '../../img/logo.png';

// import './SignUp.scss';

const ResetPassword = ({ password, passwordConfirmation, onChange }) => {

  const [seePassword, setseePassword] = useState(false);


  return (
    <div class="reset-password">
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
          >
          SEND
        </button>
      </div>
    </div>
  );
};

export default observer(SignUpPage);
