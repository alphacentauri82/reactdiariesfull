import React from 'react';
import {
  Router,
  Route,
  Redirect,
  browserHistory
} from 'react-router';
import ApplicationContainer from 'views/application/application_container';
import HomeContainer from 'views/home/home_container';
import LandingContainer from 'views/landing/landing_container';
import LoginContainer from 'views/auth/login_container';
import SignUpContainer from 'views/auth/signup_container';

if (module.hot) {
  // Don't hot reload the routes, do a refresh instead
  module.hot.decline();
}

export default function renderRoutes() {
  return (
    <Router history={browserHistory}>
      <Redirect from="/" to="/home" />
      <Route path='/' component={ApplicationContainer}>
        <Route path='/landing' component={LandingContainer} />
        <Route path='/login' component={LoginContainer} />
        <Route path='/registration' component={SignUpContainer} />
        <Route path='/home' component={HomeContainer} />
      </Route>
    </Router>
  );
}
