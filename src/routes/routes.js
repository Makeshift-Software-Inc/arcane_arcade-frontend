import React from 'react';
import {
    Switch, Route
} from 'react-router-dom';

/**
 * Import all page components here
 */
 import HomePage from '../components/App.js';


 export default (
   <Route exact path="/" component={HomePage}>
      <Route component={HomePage} />
  </Route>
 );
