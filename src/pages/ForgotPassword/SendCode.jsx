import React from 'react';

import Input from '../../components/Form/Input/Input';

const SendCode = ({
  onChange, send, email, hasError, error, cancel,
}) => (
  <div className="send-code">
    <h1>Forgot Password</h1>
    <span>Provide the email to your account.</span>

    <div>
      <div className="input-container">
        <p className="form-text label">Email</p>
        <Input
          type="text"
          name="email"
          value={email}
          onChange={onChange}
          className={hasError ? 'input-with-error' : ''}
        />
        {error && <small className="input-error">{error}</small>}
      </div>
    </div>

    <div className="submit-delivery">
      <button type="button" onClick={send} className="button">
        SEND
      </button>
    </div>

    <div className="actions flex-row">
      <a href="#" onClick={cancel}>
        Back
      </a>
    </div>
  </div>
);

export default SendCode;
