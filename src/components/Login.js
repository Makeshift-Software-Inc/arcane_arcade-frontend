import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from './Navbar.js'
import './login.scss'

class Login extends React.Component {
  onFormSubmit() {

  }

  render() {
    return (
        <div className="App">
          <Navbar />

          <h1> Login </h1>
          <div class="login-form">
            <form onSubmit={this.onFormSubmit.bind(this)}>
              <div className="field">
                <label className="label" for="user[username]">Username</label>
                <input className="topcoat-text-input--large" type="text" name="user[username]"></input>
              </div>

              <div className="field">
                <label className="label" for="user[password]">Password</label>
                <input className="topcoat-text-input--large" type="text" name="user[password]"></input>
              </div>

              <button type="submit" class="topcoat-button--large" >Log In</button>

            </form>
          </div>

          <div className="sign-up-link">
            <Link to="/sign-up">Don't have an account? Sign up</Link> 
          </div>
        </div>
    )
  }
}

export default Login;
