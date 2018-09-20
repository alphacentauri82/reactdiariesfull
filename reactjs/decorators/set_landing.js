import React from 'react';
import { ThemeProvider } from 'styled-components';
import setWithStoreHOC from './set_with_store';
import { defaultTheme } from '../lib/theme.js';

function setLandingHOC(WrappedComponent) {
  function WithSetLayout(props) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <WrappedComponent {...props} />
      </ThemeProvider>
    );
  }

  return setWithStoreHOC(WithSetLayout);
}

export default setLandingHOC;
