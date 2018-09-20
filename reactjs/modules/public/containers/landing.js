import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';

import LandingLayout from '../../shared/components/layout/landing';
import Login from '../../auth/containers/login';
import Registration from '../../auth/containers/registration';

class Landing extends Component {
  static get propTypes() {
    return {
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }),
      title: PropTypes.string.isRequired,
    };
  }

  static get defaultProps() {
    return {
      user: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { user } = this.props;

    if (nextProps.user !== user) {
      switch (nextProps.user.role) {
        case 'student':
          Router.push('/tutor');
          break;
        case 'professor':
          Router.push('/professors');
          break;
        default:
          Router.push('/');
      }
    }
  }

  render() {
    return (
      <LandingLayout title={this.props.title}>
        <Login {...this.props} />
        <Registration {...this.props} />
      </LandingLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(Landing);
