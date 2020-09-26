import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import 'intl-tel-input/build/css/intlTelInput.css'
import 'intl-tel-input/build/js/utils.js'
import intlTelInput from 'intl-tel-input';

import '../magic.css';
import './signup.scss';

import logo from '../img/temp-logo.png';
import btcIcon from '../img/bitcoin.png';
import xmrIcon from '../img/monero.png';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.welcome  = React.createRef();
    this.logo     = React.createRef();
    this.normalSignup     = React.createRef();
    this.firstQuestion    = React.createRef();
    this.sellingQuestion  = React.createRef();
    this.companyQuestion  = React.createRef();
    this.studioQuestion   = React.createRef();
    this.fiatQuestion     = React.createRef();
    this.cryptoQuestion   = React.createRef();

    this.state = { redirect: null };

    this.state.answers = {
      isSeller: false,
      interested: false,
      default_currency: '',
      accepted_crypto: [],
      company_name: '',
      studio_size: '',
      destinations: {}
    }
  }
  componentDidMount() {
    const logo = this.logo.current
    const text = this.welcome.current;

    logo.classList.add('magictime', 'puffIn');
    text.classList.add('magictime', 'puffIn');

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

  showFirstQuestion() {
    const firstQuestion = this.firstQuestion.current;

    firstQuestion.classList.remove('is-hidden');
    firstQuestion.classList.add('magictime', 'vanishIn')
  }

  secondQuestion(e) {
    e.preventDefault(e);

    const form = this.firstQuestion.current;
    form.classList.remove('magictime', 'vanishIn');
    form.classList.add('magictime', 'vanishOut');

    const isSeller = form.querySelector('input[type=checkbox]').checked;

    let newAnswers = this.state.answers;
    newAnswers.isSeller = isSeller;

    this.setState({ answers: newAnswers });

    if (this.state.answers.isSeller) {
      this.showSellingQuestion();
    } else {
      this.showNormalForm();
    }
  }


  showSellingQuestion() {
    const sellingQuestion = this.sellingQuestion.current;

    sellingQuestion.classList.remove('is-hidden');
    sellingQuestion.classList.add('magictime', 'vanishIn');
  }

  thirdQuestion(e) {
    e.preventDefault();

    const form = this.sellingQuestion.current;
    form.classList.remove('magictime', 'vanishIn');
    form.classList.add('magictime', 'vanishOut');

    const isInterested = form.querySelector('input[type=checkbox]').checked;
    let newAnswers = this.state.answers;
    newAnswers.interested = isInterested;

    this.setState({ answers: newAnswers });

    if (this.state.answers.interested) {
      this.showCompanyQuestion();
    } else {
      this.showNormalForm();
    }
  }

  showCompanyQuestion() {
    const companyQuestion = this.companyQuestion.current;

    companyQuestion.classList.remove('is-hidden');
    companyQuestion.classList.add('magictime', 'vanishIn');
  }



  fourthQuestion(e) {
    e.preventDefault();

    const form = this.companyQuestion.current;
    const textInput = form.querySelector('input[type=text]');
    const companyName = textInput.value

    if (companyName === '') {
      textInput.classList.add('error');
      return;
    }

    form.classList.remove('magictime', 'vanishIn');
    form.classList.add('magictime', 'vanishOut');


    let newAnswers = this.state.answers;
    newAnswers.company_name = companyName;

    this.setState({ answers: newAnswers });
    this.showStudioQuestion();
  }

  showStudioQuestion() {
    const studioQuestion = this.studioQuestion.current;

    studioQuestion.classList.remove('is-hidden');
    studioQuestion.classList.add('magictime', 'vanishIn');
  }

  fifthQuestion(e) {
    e.preventDefault();

    const form = this.studioQuestion.current;
    form.classList.remove('magictime', 'vanishIn');
    form.classList.add('magictime', 'vanishOut');

    const studioSize = form.querySelector('select').value

    let newAnswers = this.state.answers;
    newAnswers.studio_size = studioSize;

    this.setState({ answers: newAnswers });

    this.showFiatQuestion();
  }

  showFiatQuestion() {
    const fiatQuestion = this.fiatQuestion.current;

    fiatQuestion.classList.remove('is-hidden');
    fiatQuestion.classList.add('magictime', 'vanishIn');
  }

  sixthQuestion(e) {
    e.preventDefault();

    const form = this.fiatQuestion.current;
    form.classList.remove('magictime', 'vanishIn');
    form.classList.add('magictime', 'vanishOut');

    const selectedCurrency = form.querySelector('select').value

    let newAnswers = this.state.answers;
    newAnswers.default_currency = selectedCurrency;

    this.setState({ answers: newAnswers });

    this.showCryptoQuestion();
  }

  showCryptoQuestion() {
    const cryptoQuestion = this.cryptoQuestion.current;

    cryptoQuestion.classList.remove('is-hidden');
    cryptoQuestion.classList.add('magictime', 'vanishIn');
  }

  seventhQuestion(e) {
    e.preventDefault();

    const form = this.cryptoQuestion.current;
    form.classList.remove('magictime', 'vanishIn');
    form.classList.add('magictime', 'vanishOut');

    let accepted_cryptos = []
    const acceptsBTC = form.querySelector('input[type=checkbox]#bitcoin').checked;
    const acceptsXMR = form.querySelector('input[type=checkbox]#monero').checked;

    if (acceptsBTC)
      accepted_cryptos.push('BTC');

    if (acceptsXMR)
      accepted_cryptos.push('XMR');

    let newAnswers = this.state.answers;
    newAnswers.accepted_crypto = accepted_cryptos;

    this.setState({ answers: newAnswers });

    this.showNormalForm();
  }

  showNormalForm() {
    const normalSignup = this.normalSignup.current;

    normalSignup.classList.remove('is-hidden');
    normalSignup.classList.add('magictime', 'vanishIn');
  }

  submitForm(e) {
    e.preventDefault();

    const form = this.normalSignup.current;

    const emailInput    = form.querySelector('input#email');
    const usernameInput = form.querySelector('input#username');
    const phoneInput    = form.querySelector('input#phone');


    // Validate Username
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    const username = usernameInput.value;
    if (username === '' || !username.match(usernameRegex)) {
      // todo: CHECK IF TAKEN
      usernameInput.classList.add('error');

      return;
    } else {
      usernameInput.classList.remove('error');
    }

    // Validate email not taken


    // Validate Phone #
    const countryCode = form.querySelector('.iti__selected-dial-code').innerText;

    if (phoneInput.value === '') {
      phoneInput.classList.add('error');

      return;
    } else {
      phoneInput.classList.remove('error');
    }
    const phoneNumber = countryCode + phoneInput.value;

    if (this.validPassword(form)) {
      let password = form.querySelector('input#password').value;

      let payload = {
        user: {
          username: username,
          password: password,
          email: emailInput.value,
          phone_number: phoneNumber
        }
      }

      const answers = this.state.answers;
      if (answers.interested) {
        payload.user.seller_attributes = {
          accepted_crypto: answers.accepted_crypto,
          default_currency: answers.default_currency,
          business_name: answers.company_name,
          studio_size: answers.studio_size
        }
      }

      // TODO: move api url to env
      axios.post('http://localhost:3000/v1/users', payload).then((response) => {
        console.log(response);
        this.setState({ redirect: '/' })
      }).catch((error) => {
        console.log(error)
        debugger;
      });
    }
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

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (

        <div className="App signup">
          <div className="logo" ref={this.logo}>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <div className="welcome" ref={this.welcome} onAnimationEnd={this.showFirstQuestion.bind(this)}>
            <h1> Welcome </h1>
          </div>

          <form className="normal-signup is-hidden" ref={this.normalSignup} >
            <ul className="questions">
              <li>
                <div className="field">
                  <p>Username</p>

                  <input type="text" id="username" className="topcoat-text-input" name="user[username]" placeholder="Username" />
                </div>

                <div className="field">
                  <p>Password</p>

                  <input type="password" id="password" className="topcoat-text-input" name="user[password]" placeholder="Password" />
                </div>

                <div className="field">
                  <p>Confirm Password</p>

                  <input type="password" id="password_confirmation" className="topcoat-text-input" name="user[password_confirmation]" placeholder="Confirm Password" />
                </div>

                <div className="field">
                  <p>Email</p>

                  <input type="email" id="email"className="topcoat-text-input" name="user[email]" placeholder="Email" />
                </div>

                <div className="field">
                  <p>Phone Number</p>

                  <input type="tel" id="phone_number" className="topcoat-text-input" maxLength="16" id="phone" name="user[phone_number]" placeholder="Phone Number" />
                </div>

                <button type="submit" className="topcoat-button--large continue" onClick={this.submitForm.bind(this)} >Sign Up</button>
              </li>
            </ul>
          </form>

          <form className="is-a-seller is-hidden" ref={this.firstQuestion} >
            <ul className="questions">
              <li >
                <p>Are you a game developer or publisher?</p>

                <div className="answer">
                  <div>NO</div>
                  <input type="checkbox" id="is-a-seller" name='user[is_a_seller]' />
                  <label htmlFor="is-a-seller" >Toggle</label>
                  <div>YES</div>
                </div>

                <button type="submit" className="topcoat-button--large continue" onClick={this.secondQuestion.bind(this)} >Continue</button>
              </li>
            </ul>

          </form>

          <form className="wants-to-sell is-hidden" ref={this.sellingQuestion}>
            <ul className="questions">
              <li >
                <p>Are you interested in selling your game(s) on Arcane Arcade?</p>

                <div className="answer">
                  <div>NO</div>
                  <input type="checkbox" id="wants-to-sell" name='user[wants-to-sell]' />
                  <label htmlFor="wants-to-sell" >Toggle</label>
                  <div>YES</div>
                </div>

                <button type="submit" className="topcoat-button--large continue" onClick={this.thirdQuestion.bind(this)} >Continue</button>
              </li>
            </ul>

          </form>

          <form className="company-name is-hidden" ref={this.companyQuestion} >
            <ul className="questions">
              <li>
                <p>What is the name of your company?</p>

                <div className="answer">
                  <input type="text" className="topcoat-text-input" placeholder="Company Name" />
                </div>

                <button type="submit" className="topcoat-button--large continue" onClick={this.fourthQuestion.bind(this)} >Continue</button>
              </li>
            </ul>

          </form>

          <form className="studio-size is-hidden" ref={this.studioQuestion} >
            <ul className="questions">
              <li>
                <p>Which best describes the size of your game company?</p>

                <div className="answer">
                  <div className="select">
                    <select>
                      <option value="INDIE">Indie</option>
                      <option value="MIDSIZE">Mid-Size</option>
                      <option value="AAA">AAA</option>
                    </select>
                  </div>

                </div>

                <button type="submit" className="topcoat-button--large continue" onClick={this.fifthQuestion.bind(this)} >Continue</button>
              </li>
            </ul>

          </form>

          <form className="fiat is-hidden" ref={this.fiatQuestion} >
            <ul className="questions">
              <li>
                <p>Which fiat currency will you be pricing in?</p>

                <div className="answer">
                  <div className="select">
                    <select>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="AUD">AUD - Australian Dollar</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                      <option value="CHF">CHF - Swiss Franc</option>
                      <option value="CNY">CNY - Chinese Yuan</option>
                      <option value="SEK">SEK - Swedish Krona</option>
                      <option value="NZD">NZD - New Zealand Dollar</option>
                    </select>
                  </div>

                </div>

                <button type="submit" className="topcoat-button--large continue" onClick={this.sixthQuestion.bind(this)} >Continue</button>
              </li>
            </ul>

          </form>

          <form className="crypto is-hidden" ref={this.cryptoQuestion} >
            <ul className="questions">
              <li>
                <p>Which cryptocurrency would you like to be paid in?</p>

                <div className="answer">
                  <div className="crypto-options">
                    <div className="btc">
                      <div className="coin-icon">
                        <img src={btcIcon} alt="bitcoin logo" />
                      </div>

                      <input type="checkbox" id="bitcoin" name='seller[accepted_crypto][]' />
                      <label htmlFor="bitcoin" >Toggle</label>
                    </div>

                    <div className="xmr">
                      <div className="coin-icon">
                        <img src={xmrIcon} alt="monero logo" />
                      </div>

                      <input type="checkbox" id="monero" name='seller[accepted_crypto][]' />
                      <label htmlFor="monero" >Toggle</label>

                    </div>
                  </div>

                </div>

                <button type="submit" className="topcoat-button--large continue" onClick={this.seventhQuestion.bind(this)} >Continue</button>
              </li>
            </ul>

          </form>


        </div>
    )
  }
}

export default SignUp;
