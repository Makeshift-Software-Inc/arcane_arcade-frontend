import React from 'react';
import { Switch, Route } from 'react-router-dom';

import "../normalize.css"
import "../topcoat-desktop-dark.css"
import "bulma/bulma.sass"

import Home from './Home.js';
import Login from './Login.js';
import SignUp from './SignUp.js';

class App extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/sign-up' component={SignUp}></Route>
      </Switch>
    );

  }
}

export default App;
