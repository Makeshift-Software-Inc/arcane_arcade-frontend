import React from 'react';

const SendCode = ({ selected, onChange, send }) => (
  <div className="send-code">

    <p>
      We&apos;ve generated a 7-digit code to verify your account. 
      <br/>
      Which method would you like to use to receive:
    </p>

    <div className="delivery-options flex-row">
      <label className="topcoat-radio-button flex-row">
        Email
        <input
          type="checkbox"
          id="email"
          value="email"
          name="delivery_method"
          checked={selected === 'email'}
          onChange={onChange}
        />
        <div className="topcoat-radio-button__checkmark" />
      </label>

      <label className="topcoat-radio-button flex-row">
        <input
          type="checkbox"
          id="sms"
          value="sms"
          name="delivery_method"
          checked={selected === 'sms'}
          onChange={onChange}
        />
        <div className="topcoat-radio-button__checkmark" />
        SMS
      </label>
    </div>

    <div className="submit-delivery">
      <button
        type="button"
        onClick={send}
        className="topcoat-button--large--cta"
        disabled={!selected}
      >
        SEND
      </button>
    </div>
  </div>
);

export default SendCode;
