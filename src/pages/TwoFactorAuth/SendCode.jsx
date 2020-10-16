import React from 'react';

import checkSlider from './../../img/Checkmark_icon.svg';

const SendCode = ({ selected, onChange, send }) => {


  return (
    <div className="send-code">

      <p>
        We&apos;ve generated a 7-digit code to verify your account. 
        <br/>
        Which method would you like to use to receive:
      </p>

      <div className="delivery-options flex-row">

        <label className="topcoat-radio-button flex-row topcoat-email-label">
          <span className={`email-span ${selected === 'email' ? 'active' : ''}`}>Email</span>
          {
            selected === 'sms' &&
            <a>
              <img src={checkSlider} alt="email-checked" className="email-checkbox" />
            </a>
          }
          
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

        <label className="topcoat-radio-button flex-row topcoat-sms-label">

          {
            selected === 'email' &&
            <a>
              <img src={checkSlider} alt="sms-checked" className="sms-checkbox"/>
            </a>
          }

          <input
            type="checkbox"
            id="sms"
            value="sms"
            name="delivery_method"
            checked={selected === 'sms'}
            onChange={onChange}
          />
          <div className="topcoat-radio-button__checkmark" />
          <span className={`sms-span ${selected === 'sms' ? 'active' : ''}`}>SMS</span>
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
  )
};

export default SendCode;
