import React from 'react';

import Input from '../../components/Form/Input/Input';

const SendCode = ({ onChange, send }) => (
  <div className="send-code">

    <h1>Forgot Password</h1>

    <p>
      Provide the email to your account.
    </p>

    <div>
      <div className="input-container">
        <p className="form-text label">email</p>
        <Input
          type="text"
          name="email"
          onChange={onChange}
        />
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

export default SendCode;
