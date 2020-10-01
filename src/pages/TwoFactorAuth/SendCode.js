import React from "react";

const SendCode = ({ selected, onChange, send }) => {
  return (
    <div className="send-code">
      <h1>Activate Your Account</h1>

      <p>
        We've generated a 7-digit code to verify your account. Which method
        would you like to use to receive:
      </p>

      <div className="delivery-options">
        <label className="topcoat-radio-button">
          <input
            type="radio"
            id="email"
            value="email"
            name="delivery_method"
            checked={selected === "email"}
            onChange={onChange}
          />
          <div className="topcoat-radio-button__checkmark"></div>
          Email
        </label>

        <label className="topcoat-radio-button">
          <input
            type="radio"
            id="sms"
            value="sms"
            name="delivery_method"
            checked={selected === "sms"}
            onChange={onChange}
          />
          <div className="topcoat-radio-button__checkmark"></div>
          SMS
        </label>
      </div>

      <div className="submit-delivery">
        <button
          onClick={send}
          className="topcoat-button--large--cta"
          disabled={!selected}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendCode;
