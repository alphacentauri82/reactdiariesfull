import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import renderRoutes from 'routes';

// Apply the base styles for ALL the app
import 'assets/stylesheets/index.scss';

// Make sure the static_content gets added to the bundle
import 'assets/static_content';

class Root extends Component {
  render() {
    return renderRoutes(browserHistory, window.__router);
  }
}

ReactDOM.render(<Root/>, document.getElementById('application'));
