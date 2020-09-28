import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';

import Navbar from './Navbar.js'
import './login.scss'

class Login extends React.Component {

  createdUserNotif() {
    if (this.props.location.state) {
      toast(this.props.location.state);
    }
  }

  componentDidMount() {
    this.createdUserNotif();
  }

  validateUsername(usernameInput) {
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    const username = usernameInput.value;
    if (username === '' || !username.match(usernameRegex)) {
      usernameInput.classList.add('error');

      return;
    } else {
      usernameInput.classList.remove('error');
    }

    return username;
  }

  onFormSubmit(e) {
    e.preventDefault()

    const usernameInput = e.target.querySelector('input#username');
    const username = this.validateUsername(usernameInput);
    if (!username) return;

    const password = e.target.querySelector('input#password').value;

    let payload = {
      user: {
        username: username,
        password: password
      }
    };


    axios.post('http://localhost:3000/v1/login', payload, {
      withCredentials: true
    })
    .then((response) => {
      debugger;
      this.props.handleLogin(response.data);
      this.props.history.push('/');

    }).catch((error) => {
      console.log(error)
    });
  }


  render() {

    return (
        <div className="App">
          <ToastContainer />

          <Navbar />

          <h1> Login </h1>
          <div className="login-form">
            <form method="post" onSubmit={this.onFormSubmit.bind(this)}>
              <div className="field">
                <label className="label" htmlFor="user[username]">Username</label>
                <input id="username" className="topcoat-text-input--large" type="text" name="user[username]"></input>
              </div>

              <div className="field">
                <label className="label" htmlFor="user[password]">Password</label>
                <input id="password" className="topcoat-text-input--large" type="password" name="user[password]"></input>
              </div>

              <button type="submit" className="topcoat-button--large" >Log In</button>

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
