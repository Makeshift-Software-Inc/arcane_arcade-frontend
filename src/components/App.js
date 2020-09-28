import React from 'react';
import { Switch, Route } from 'react-router-dom';

import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../normalize.css"
import "../topcoat-desktop-dark.css"
import "bulma/bulma.sass"

import Home from './Home.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import TwoFactorAuth from './TwoFactorAuth.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
     };
  }

  componentDidMount() {
    this.loginStatus();
    this.displayNotifications();
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    });
    debugger
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  loginStatus = () => {
    axios.get('http://localhost:3000/v1/logged_in',  {
      withCredentials: true
    })
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }


  displayNotifications() {
    if (!this.state.isLoggedIn)
      return;

    const userID = this.state.user.id;

    axios.get(`http://localhost:3000/v1/notifications/${userID}`, {
      withCredentials: true
    })
    .then(response => {
      response.notifications.forEach((notif, i) => {
        toast(notif.message, {
          position: "top-right",
          autoClose: false,
          closeButton: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          onClick: () => {
            this.props.history.push(notif.destination_path)
          }
        })
      });
    })
    .catch(error => console.log('api errors:', error))
  }


  render() {
    return (

      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        <Route
          exact path='/'
          render={props => (
            <Home {...props} loggedInStatus={this.state.isLoggedIn} />
          )}
        />
        <Route
          exact path='/login'
          render={props => (
            <Login {...props}
              handleLogin={this.handleLogin}
              loggedInStatus={this.state.isLoggedIn}
            />
          )}
        />
        <Route
          exact path='/sign-up'
          render={props => (
            <SignUp {...props}
              handleLogin={this.handleLogin}
              loggedInStatus={this.state.isLoggedIn}
            />
          )}
        />
        <Route
          exact path='/authorize'
          render={props => (
            <TwoFactorAuth {...props}
              handleLogin={this.handleLogin}
              loggedInStatus={this.state.isLoggedIn}
            />
          )}
        />
      </Switch>


    );

  }
}

export default App;
