import React from 'react';
import { Link } from 'react-router-dom';

import '../magic.css';
import './signup.scss';
import logo from '../img/temp-logo.png';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.welcome = React.createRef();
    this.logo = React.createRef();
    this.firstQuestion = React.createRef();
    this.sellingQuestion = React.createRef();

    this.state = {};
    this.state.fiatCurrencies = [
      { 'USD': 'United States Dollar'},
      { 'EUR': 'Euro' },
      { 'JPY': 'Japanese Yen' },
      { 'GBP': 'British Pound' },
      { 'AUD': 'Australian Dollar' },
      { 'CAD': 'Canadian Dollar' },
      { 'CHF': 'Swiss Franc' },
      { 'CNH': 'Chinese Yuan' },
      { 'SEK': 'Swedish Krona' },
      { 'NZD': 'New Zealand Dollar' }
    ];

    this.state.studioSizes = [
      { 'Indie': 'INDIE' },
      { 'Mid-Size': 'MIDSIZE' },
      { 'Triple_A': 'AAA' },
    ]

    this.state.answers = {
      isSeller: false,
      interested: false,
      default_currency: 'USD',
      accepted_crypto: ['BTC'],
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
      // show normal user signup
    }
    debugger;
  }

  showSellingQuestion() {
    const sellingQuestion = this.sellingQuestion.current;

    sellingQuestion.classList.remove('is-hidden');
    sellingQuestion.classList.add('magictime', 'vanishIn');
  }



  onFormSubmit() {

  }

  render() {
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

          <form className="is-a-seller is-hidden" ref={this.firstQuestion}>
            <ul className="questions">
              <li >
                <p>Are you a game developer or publisher?</p>

                <div className="answer">
                  <div>NO</div>
                  <input type="checkbox" id="is-a-seller" name='user[is_a_seller]' />
                  <label htmlFor="is-a-seller" >Toggle</label>
                  <div>YES</div>
                </div>

                <button type="submit" class="topcoat-button--large continue" onClick={this.secondQuestion.bind(this)} >Continue</button>
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

                <button type="submit" class="topcoat-button--large continue" onClick={this.secondQuestion.bind(this)} >Continue</button>
              </li>
            </ul>

          </form>

        </div>
    )
  }
}

export default SignUp;
