import React from 'react';
import { Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import axios from 'axios';

import Navbar from './Navbar.js'
import './two_factor_auth.scss'

class TwoFactorAuth extends React.Component {
  constructor(props) {
    super(props);

    this.chooseDelivery = React.createRef();
    this.enterCode = React.createRef();

    this.state = {
      deliveryMethod: '',
      user: this.props.location.state
    };
  }

  deliverCode() {
    const emailOption = document.querySelector('input[type="radio"]#email');
    const smsOption = document.querySelector('input[type="radio"]#sms');
    let deliveryMethod;

    if (emailOption.checked) deliveryMethod = 'email'
    if (smsOption.checked) deliveryMethod = 'sms'

    const userID = this.state.user.id;

    axios.post(`http://localhost:3000/v1/send_auth_token/${userID}`, {
      auth: { delivery_method: deliveryMethod }
    }, { withCredentials: true })
    .then(response => {
      this.chooseDelivery.current.classList.add('is-hidden');
      this.enterCode.current.classList.remove('is-hidden');
    }).catch((error) => {
      console.log(error)
    });
  }

  moveNext(e) {
    const numberInput = e.target;
    if (numberInput.value.length > numberInput.maxLength)
      numberInput.value = numberInput.value.slice(numberInput.value.length -1, numberInput.maxLength);

    var key = e.keyCode || e.charCode;

    if( key === 8 || key === 46 ) {
      const lastSibling = numberInput.previousSibling;
      if (lastSibling) lastSibling.focus();
    } else {
      numberInput.nextElementSibling.focus();
    }
  }

  authorize(e) {
    const digits = document.querySelectorAll('input[type=number]');

    let code = '';
    digits.forEach((digit) => {
      if (digit.value) code += digit.value
    });

    const userID = this.state.user.id;

    axios.post(`http://localhost:3000/v1/authorize/${userID}`, {
      auth: { code: code }
    }, { withCredentials: true })
    .then(response => {
      this.props.handleLogin(this.state);
      this.props.history.push('/');
    }).catch((error) => {
      console.log(error)
    });
  }

  render() {
    return (
      <div className="App two-factor">
        <ToastContainer />

        <Navbar />

        <div ref={this.chooseDelivery} className="send-code">
          <h1>Activate Your Account</h1>

          <p>
            We've generated a 7-digit code to verify your account.
            Which method would you like to use to receive:
          </p>

          <div className="delivery-options">
            <label className="topcoat-radio-button">
              <input type="radio" id="email" name="topcoat" />
              <div className="topcoat-radio-button__checkmark"></div>
              Email
            </label>


            <label className="topcoat-radio-button">
              <input type="radio" id="sms" name="topcoat" />
              <div className="topcoat-radio-button__checkmark"></div>
              SMS
            </label>

          </div>

          <div className="submit-delivery">
            <button onClick={this.deliverCode.bind(this)} className="topcoat-button--large--cta" >Send</button>
          </div>
        </div>

        <div ref={this.enterCode} className="authorize is-hidden">
          <h1> 2-Factor Auth </h1>

          <div className="code">
            <input type="number" onKeyUp={this.moveNext.bind(this)} maxLength="1" min="0" pattern="\d*" max="9" id="first digit" />
            <input type="number" onKeyUp={this.moveNext.bind(this)} maxLength="1" min="0" pattern="\d*" max="9" id="second digit" />
            <input type="number" onKeyUp={this.moveNext.bind(this)} maxLength="1" min="0" pattern="\d*" max="9" id="third digit" />
            <input type="number" onKeyUp={this.moveNext.bind(this)} maxLength="1" min="0" pattern="\d*" max="9" id="fourth digit" />
            <input type="number" onKeyUp={this.moveNext.bind(this)} maxLength="1" min="0" pattern="\d*" max="9" id="fifth digit" />
            <input type="number" onKeyUp={this.moveNext.bind(this)} maxLength="1" min="0" pattern="\d*" max="9" id="sixth digit" />
            <input type="number" onKeyUp={this.moveNext.bind(this)} maxLength="1" min="0" pattern="\d*" max="9" id="seven digit" />

            <div className="submit-delivery">
              <button onClick={this.authorize.bind(this)} className="topcoat-button--large--cta" >Send</button>
            </div>
            <a onClick={this.deliverCode.bind(this)}> Resend Code </a>
          </div>
        </div>
      </div>
    )
  }
}

export default TwoFactorAuth;
