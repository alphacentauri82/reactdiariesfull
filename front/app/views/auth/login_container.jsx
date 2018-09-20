import React, { Component } from 'react';
import { storeToken } from 'utils/auth_token';
import { browserHistory } from 'react-router';
import LoginForm from './components/login_form';
import api from 'api/auth';


class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loading: false,
      error: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(form) {
    const { username, password } = form;
    return this.setState({ loading: true }, async () => {
      try {
        const user = await api.auth.signIn(username, password);

        this.setState({
          user,
          loading: false
        });

        storeToken(user.token);
        browserHistory.push('/');
      } catch (e) {
        this.setState({
          loading: false,
          error: `${e}`
        });
      }
    });
  }

  render() {
    return (
      <section name='login'>
        {this.state.loading && (
          <h1>loading ...</h1>
        )}
        {this.state.error && (
          <h4>{this.state.error}</h4>
        )}
        <LoginForm onSubmit={this.handleSubmit}/>
      </section>
    );
  }
}

export default LoginContainer;
