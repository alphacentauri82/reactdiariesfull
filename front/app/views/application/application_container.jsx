import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { isTokenSet, clearToken } from 'utils/auth_token';
import WebResponsive from './components/layout/web_mobile';
import LandingHeader from './components/layout/landing_header';
import Header from './components/layout/header';


export default class ApplicationContainer extends Component {
  static get propTypes() {
    return {
      children: PropTypes.node
    };
  }

  constructor() {
    super();

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.initialApp();
  }

  initialApp() {
    if (isTokenSet()) {
      browserHistory.push('/home');
    } else {
      browserHistory.push('/landing');
    }
  }

  handleLogout() {
    if (isTokenSet) {
      clearToken();
      browserHistory.push('/landing');
    }
  }

  renderAside() {
    return (
      <div>
        Aside
      </div>
    );
  }

  renderHeader() {
    return (
      <Header onLogout={this.handleLogout} />
    );
  }

  renderLandingHeader() {
    return <LandingHeader />;
  }

  render() {
    const { children } = this.props;
    if (isTokenSet()) {
      return (
        <WebResponsive
          aside={this.renderAside()}
          header={this.renderHeader()}
          children={children}
        />
      );
    } else {
      return (
        <WebResponsive
          header={this.renderLandingHeader()}
          children={children}
          showMenuButton={false}
        />
      );
    }
  }
}
