import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';



import 'intl-tel-input/build/css/intlTelInput.css'
import 'intl-tel-input/build/js/utils.js'
import intlTelInput from 'intl-tel-input';

import Navbar from './Navbar.js'
import './sign_up.scss'

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.normalSignup = React.createRef();

    this.state = { redirect: null, redirectState: '' };
  }

  componentDidMount() {
    const input = document.querySelector(".normal-signup #phone");
    intlTelInput(input, {
      utilsScript: '../../node_modules/intl-tel-input/build/js/utils.js',
      separateDialCode: true
    });

    const isNumericInput = (event) => {
        const key = event.keyCode;
        return ((key >= 48 && key <= 57) || // Allow number line
            (key >= 96 && key <= 105) // Allow number pad
        );
    };

    const isModifierKey = (event) => {
        const key = event.keyCode;
        return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
            (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
            (key > 36 && key < 41) || // Allow left, up, right, down
            (
                // Allow Ctrl/Command + A,C,V,X,Z
                (event.ctrlKey === true || event.metaKey === true) &&
                (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
            )
    };

    const enforceFormat = (event) => {
        // Input must be of a valid number format or a modifier key, and not longer than ten digits
        if(!isNumericInput(event) && !isModifierKey(event)){
            event.preventDefault();
        }
    };

    const formatToPhone = (event) => {
        if(isModifierKey(event)) {return;}

        // I am lazy and don't like to type things more than once
        const target = event.target;
        const input = target.value.replace(/\D/g,'').substring(0,10); // First ten digits of input only
        const zip = input.substring(0,3);
        const middle = input.substring(3,6);
        const last = input.substring(6,10);

        if(input.length > 6){target.value = `(${zip}) ${middle} - ${last}`;}
        else if(input.length > 3){target.value = `(${zip}) ${middle}`;}
        else if(input.length > 0){target.value = `(${zip}`;}
    };

    input.addEventListener('keydown',enforceFormat);
    input.addEventListener('keyup',formatToPhone);
  }

  validPassword(form) {
    const password = form.querySelector('input#password');
    const confirmation = form.querySelector('input#password_confirmation');
    const matchingPasswords = password.value === confirmation.value;

    if (!matchingPasswords) {
      password.classList.add('error');
      confirmation.classList.add('error');
    } else {
      password.classList.remove('error');
      confirmation.classList.remove('error');
    }

    return matchingPasswords;
  }

  validateUsername(usernameInput) {
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    const username = usernameInput.value;
    if (username === '' || !username.match(usernameRegex)) {
      // todo: CHECK IF TAKEN
      usernameInput.classList.add('error');

      return;
    } else {
      usernameInput.classList.remove('error');
    }

    return username;
  }

  validatePhoneNumber(phoneInput) {
    const countryCode = document.querySelector('.iti__selected-dial-code').innerText;

    if (phoneInput.value === '') {
      phoneInput.classList.add('error');

      return;
    } else {
      phoneInput.classList.remove('error');
    }

    return countryCode + phoneInput.value;
  }

  onFormSubmit(e) {
    e.preventDefault();

    const form = this.normalSignup.current;

    const emailInput    = form.querySelector('input#email');
    const usernameInput = form.querySelector('input#username');
    const phoneInput    = form.querySelector('input#phone');

    const username = this.validateUsername(usernameInput);
    if (!username) return;
    // Validate email not taken

    // Validate Phone #
    const phoneNumber = this.validatePhoneNumber(phoneInput);
    if (!phoneNumber) return;

    if (this.validPassword(form)) {
      let password = form.querySelector('input#password').value;
      let passwordConfirmation = form.querySelector('input#password_confirmation').value
      let payload = {
        user: {
          username: username,
          password: password,
          password_confirmation: passwordConfirmation,
          email: emailInput.value,
          phone_number: phoneNumber
        }
      };

      // TODO: move api url to env
      axios.post('http://localhost:3000/v1/users', payload, {
        withCredentials: true
      })
      .then((response) => {
        this.props.handleLogin(response.data);

        console.log(response);

        this.setState({ 
          redirect: '/authorize',
          redirectState: response.data.user
        });
      }).catch((error) => {
        console.log(error)
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{
          pathname: this.state.redirect,
          state: this.state.redirectState
      }} />
    }

    return (
        <div className="App sign-up">
          <ToastContainer />
          <Navbar />

          <h1> Sign Up </h1>
          <form className="normal-signup" ref={this.normalSignup} >
            <div className="field">
              <label htmlFor="user[username]">Username</label>

              <input type="text" id="username" className="topcoat-text-input" name="user[username]" placeholder="Username" />
            </div>

            <div className="password-fields">
              <div className="field">
                <label htmlFor="user[password]">Password</label>

                <input type="password" id="password" className="topcoat-text-input" name="user[password]" placeholder="Password" />
              </div>

              <div className="field">
                <input type="password" id="password_confirmation" className="topcoat-text-input" name="user[password_confirmation]" placeholder="Confirm Password" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="user[email]">Email</label>

              <input type="email" id="email"className="topcoat-text-input" name="user[email]" placeholder="Email" />
            </div>

            <div className="field phone">
              <label htmlFor="user[phone_number]">Phone Number</label>


              <input type="tel" id="phone_number" className="topcoat-text-input" maxLength="16" id="phone" name="user[phone_number]" placeholder="Phone Number" />
            </div>

            <button type="submit" className="topcoat-button--large continue" onClick={this.onFormSubmit.bind(this)} >Sign Up</button>
          </form>

        </div>
    )
  }
}

export default SignUp;
