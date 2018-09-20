import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../../../redux';
import Layout from '../components/layout';
import SigninForm from '../components/forms/signin';

class Login extends Component {
  static get propTypes() {
    return {
      actions: PropTypes.object.isRequired,
      error: PropTypes.object,
    };
  }

  static get defaultProps() {
    return {
      error: null,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(form) {
    const { username, password } = form;
    return this.setState({ isLoading: true }, async () => {
      this.props.actions.login({ username, password });
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    return (
      <Layout
        name="login"
        isLoading={this.state.isLoading}
        error={this.props.error}
      >
        <SigninForm onSubmit={this.handleSubmit} />
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
