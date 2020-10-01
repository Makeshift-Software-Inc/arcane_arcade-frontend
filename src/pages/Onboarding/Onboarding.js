import React from "react";
import { Link, Redirect } from "react-router-dom";

import "../../magic.css";
import "./Onboarding.scss";

import logo from "../../img/temp-logo.png";
import btcIcon from "../../img/bitcoin.png";
import xmrIcon from "../../img/monero.png";

class Onboarding extends React.Component {
  constructor(props) {
    super(props);

    this.welcome = React.createRef();
    this.logo = React.createRef();
    this.firstQuestion = React.createRef();
    this.sellingQuestion = React.createRef();
    this.companyQuestion = React.createRef();
    this.studioQuestion = React.createRef();
    this.fiatQuestion = React.createRef();
    this.cryptoQuestion = React.createRef();

    this.state = { redirect: null, phase: "" };

    this.state.answers = {
      is_seller: false,
      interested: false,
      default_currency: "",
      accepted_crypto: [],
      company_name: "",
      studio_size: "",
      destinations: {},
    };
  }

  componentDidMount() {
    const logo = this.logo.current;
    const text = this.welcome.current;

    logo.classList.add("magictime", "puffIn");
    text.classList.add("magictime", "puffIn");
  }

  handleChange = (event) => {
    const { name, value, checked } = event.target;
    const target = event.target;

    debugger;
    if (target.type === "text") {
      this.setState({ [name]: value });
    } else if (target.type === "checkbox") {
      this.setState({ [name]: checked });
    }
  };

  showFirstQuestion() {
    const firstQuestion = this.firstQuestion.current;

    firstQuestion.classList.remove("is-hidden");
    firstQuestion.classList.add("magictime", "vanishIn");
  }

  secondQuestion(e) {
    e.preventDefault(e);

    const form = this.firstQuestion.current;
    form.classList.remove("magictime", "vanishIn");
    form.classList.add("magictime", "vanishOut");

    const is_seller = form.querySelector("input[type=checkbox]").checked;

    let newAnswers = this.state.answers;
    newAnswers.is_seller = is_seller;

    this.setState({ answers: newAnswers });

    if (this.state.answers.is_seller) {
      this.showSellingQuestion();
    } else {
      this.showNormalForm();
    }
  }

  showSellingQuestion() {
    const sellingQuestion = this.sellingQuestion.current;

    sellingQuestion.classList.remove("is-hidden");
    sellingQuestion.classList.add("magictime", "vanishIn");
  }

  thirdQuestion(e) {
    e.preventDefault();

    const form = this.sellingQuestion.current;
    form.classList.remove("magictime", "vanishIn");
    form.classList.add("magictime", "vanishOut");

    const isInterested = form.querySelector("input[type=checkbox]").checked;
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

    companyQuestion.classList.remove("is-hidden");
    companyQuestion.classList.add("magictime", "vanishIn");
  }

  fourthQuestion(e) {
    e.preventDefault();

    const form = this.companyQuestion.current;
    const textInput = form.querySelector("input[type=text]");
    const companyName = textInput.value;

    if (companyName === "") {
      textInput.classList.add("error");
      return;
    }

    form.classList.remove("magictime", "vanishIn");
    form.classList.add("magictime", "vanishOut");

    let newAnswers = this.state.answers;
    newAnswers.company_name = companyName;

    this.setState({ answers: newAnswers });
    this.showStudioQuestion();
  }

  showStudioQuestion() {
    const studioQuestion = this.studioQuestion.current;

    studioQuestion.classList.remove("is-hidden");
    studioQuestion.classList.add("magictime", "vanishIn");
  }

  fifthQuestion(e) {
    e.preventDefault();

    const form = this.studioQuestion.current;
    form.classList.remove("magictime", "vanishIn");
    form.classList.add("magictime", "vanishOut");

    const studioSize = form.querySelector("select").value;

    let newAnswers = this.state.answers;
    newAnswers.studio_size = studioSize;

    this.setState({ answers: newAnswers });

    this.showFiatQuestion();
  }

  showFiatQuestion() {
    const fiatQuestion = this.fiatQuestion.current;

    fiatQuestion.classList.remove("is-hidden");
    fiatQuestion.classList.add("magictime", "vanishIn");
  }

  sixthQuestion(e) {
    e.preventDefault();

    const form = this.fiatQuestion.current;
    form.classList.remove("magictime", "vanishIn");
    form.classList.add("magictime", "vanishOut");

    const selectedCurrency = form.querySelector("select").value;

    let newAnswers = this.state.answers;
    newAnswers.default_currency = selectedCurrency;

    this.setState({ answers: newAnswers });

    this.showCryptoQuestion();
  }

  showCryptoQuestion() {
    const cryptoQuestion = this.cryptoQuestion.current;

    cryptoQuestion.classList.remove("is-hidden");
    cryptoQuestion.classList.add("magictime", "vanishIn");
  }

  seventhQuestion(e) {
    e.preventDefault();

    const form = this.cryptoQuestion.current;
    form.classList.remove("magictime", "vanishIn");
    form.classList.add("magictime", "vanishOut");

    let accepted_cryptos = [];
    const acceptsBTC = form.querySelector("input[type=checkbox]#bitcoin")
      .checked;
    const acceptsXMR = form.querySelector("input[type=checkbox]#monero")
      .checked;

    if (acceptsBTC) accepted_cryptos.push("BTC");

    if (acceptsXMR) accepted_cryptos.push("XMR");

    let newAnswers = this.state.answers;
    newAnswers.accepted_crypto = accepted_cryptos;

    this.setState({ answers: newAnswers });

    this.showNormalForm();
  }

  submitForm(e) {
    e.preventDefault();

    let payload = {};

    const answers = this.state.answers;
    if (answers.interested) {
      payload.user.seller_attributes = {
        accepted_crypto: answers.accepted_crypto,
        default_currency: answers.default_currency,
        business_name: answers.company_name,
        studio_size: answers.studio_size,
      };
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="App onboarding">
        <div className="logo" ref={this.logo}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div
          className="welcome"
          ref={this.welcome}
          onAnimationEnd={this.showFirstQuestion.bind(this)}
        >
          <h1> Welcome </h1>
        </div>

        <form className="is-a-seller is-hidden" ref={this.firstQuestion}>
          <ul className="questions">
            <li>
              <p>Are you a game developer or publisher?</p>

              <div className="answer">
                <div>NO</div>
                <input
                  type="checkbox"
                  id="is-a-seller"
                  onChange={this.handleChange.bind(this)}
                  name="is_a_seller"
                />
                <label htmlFor="is-a-seller">Toggle</label>
                <div>YES</div>
              </div>

              <button
                type="submit"
                className="topcoat-button--large continue"
                onClick={this.secondQuestion.bind(this)}
              >
                Continue
              </button>
            </li>
          </ul>
        </form>

        <form className="wants-to-sell is-hidden" ref={this.sellingQuestion}>
          <ul className="questions">
            <li>
              <p>
                Are you interested in selling your game(s) on Arcane Arcade?
              </p>

              <div className="answer">
                <div>NO</div>
                <input
                  type="checkbox"
                  id="wants-to-sell"
                  onChange={this.handleChange.bind(this)}
                  name="user[wants-to-sell]"
                />
                <label htmlFor="wants-to-sell">Toggle</label>
                <div>YES</div>
              </div>

              <button
                type="submit"
                className="topcoat-button--large continue"
                onClick={this.thirdQuestion.bind(this)}
              >
                Continue
              </button>
            </li>
          </ul>
        </form>

        <form className="company-name is-hidden" ref={this.companyQuestion}>
          <ul className="questions">
            <li>
              <p>What is the name of your company?</p>

              <div className="answer">
                <input
                  type="text"
                  className="topcoat-text-input"
                  onChange={this.handleChange.bind(this)}
                  placeholder="Company Name"
                />
              </div>

              <button
                type="submit"
                className="topcoat-button--large continue"
                onClick={this.fourthQuestion.bind(this)}
              >
                Continue
              </button>
            </li>
          </ul>
        </form>

        <form className="studio-size is-hidden" ref={this.studioQuestion}>
          <ul className="questions">
            <li>
              <p>Which best describes the size of your game company?</p>

              <div className="answer">
                <div className="select">
                  <select onChange={this.handleChange.bind(this)}>
                    <option value="INDIE">Indie</option>
                    <option value="MIDSIZE">Mid-Size</option>
                    <option value="AAA">AAA</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="topcoat-button--large continue"
                onClick={this.fifthQuestion.bind(this)}
              >
                Continue
              </button>
            </li>
          </ul>
        </form>

        <form className="fiat is-hidden" ref={this.fiatQuestion}>
          <ul className="questions">
            <li>
              <p>Which fiat currency will you be pricing in?</p>

              <div className="answer">
                <div className="select">
                  <select onChange={this.handleChange.bind(this)}>
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

              <button
                type="submit"
                className="topcoat-button--large continue"
                onClick={this.sixthQuestion.bind(this)}
              >
                Continue
              </button>
            </li>
          </ul>
        </form>

        <form className="crypto is-hidden" ref={this.cryptoQuestion}>
          <ul className="questions">
            <li>
              <p>Which cryptocurrency would you like to be paid in?</p>

              <div className="answer">
                <div className="crypto-options">
                  <div className="btc">
                    <div className="coin-icon">
                      <img src={btcIcon} alt="bitcoin logo" />
                    </div>

                    <input
                      type="checkbox"
                      id="bitcoin"
                      onChange={this.handlePaymentChange.bind(this)}
                      name="accepted_crypto"
                    />
                    <label htmlFor="bitcoin">Toggle</label>
                  </div>

                  <div className="xmr">
                    <div className="coin-icon">
                      <img src={xmrIcon} alt="monero logo" />
                    </div>

                    <input
                      type="checkbox"
                      onChange={this.handlePaymentChange.bind(this)}
                      id="monero"
                      name="accepted_crypto"
                    />
                    <label htmlFor="monero">Toggle</label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="topcoat-button--large continue"
                onClick={this.seventhQuestion.bind(this)}
              >
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

export default Onboarding;
