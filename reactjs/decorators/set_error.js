import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../lib/theme.js';

function setErrorHOC(WrappedComponent) {
  return class WithSetLayout extends Component {
    static async getInitialProps({ pathname }) {
      return {
        page: pathname,
      };
    }

    render() {
      return (
        <ThemeProvider theme={defaultTheme}>
          <WrappedComponent {...this.props} />
        </ThemeProvider>
      );
    }
  };
}

export default setErrorHOC;
