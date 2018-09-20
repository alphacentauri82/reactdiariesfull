import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import acceptLanguage from 'accept-language';
import { Provider } from 'react-redux';

import initStore from '../redux/store';
import { enabledLanguages } from '../i18n/setup';
import IntlWrapper from '../modules/i18n/containers/intl_wrapper';

// Make sure react-tap-event-plugin only gets injected once
// Needed for material-ui
if (!process.tapEventInjected) {
  injectTapEventPlugin();
  process.tapEventInjected = true;
}

acceptLanguage.languages(enabledLanguages);

export default WrappedComponent => (
  class extends Component {
    static async getInitialProps(ctx) {
      let acceptLang;
      if (process.browser) {
        acceptLang = navigator['accept-language'];
      } else {
        acceptLang = ctx.req.headers['accept-language'];
      }
      const isServer = !!ctx.req;
      const store = initStore({}, true);
      return {
        initialState: store.getState(),
        isServer,
        acceptLang,
      };
    }

    static get propTypes() {
      return {
        initialState: PropTypes.object.isRequired,
        isServer: PropTypes.bool,
        url: PropTypes.object.isRequired,
      };
    }

    constructor(props) {
      super(props);
      this.store = initStore(props.initialState, props.isServer);
    }

    render() {
      return (
        <Provider store={this.store}>
          <IntlWrapper>
            <WrappedComponent url={this.props.url} />
          </IntlWrapper>
        </Provider>
      );
    }
  }
);
