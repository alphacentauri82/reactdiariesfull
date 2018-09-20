import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import SignupForm from './components/signup_form';
import api from 'api/auth';


class SignupContainer extends Component {
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
    console.log('form', form);
    return this.setState({ loading: true }, async () => {
      try {
        const user = await api.auth.signUp(form);

        this.setState({
          user,
          loading: false
        });

        browserHistory.push('/login');
      } catch (e) {
        this.setState({
          loading: false,
          error: 'error'
        });
        console.log(e);
      }
    });
  }

  render() {
    return (
      <section name='signup'>
        {this.state.loading && (
          <h1>loading ...</h1>
        )}
        {this.state.error && (
          <h4>{this.state.error}</h4>
        )}
        <SignupForm onSubmit={this.handleSubmit}/>
      </section>
    );
  }
}

export default SignupContainer;
