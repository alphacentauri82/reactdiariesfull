import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import { actions } from '../../../redux';
import Layout from '../../shared/components/layout/material';


class ProfessorLayoutContainer extends Component {
  static get propTypes() {
    return {
      actions: PropTypes.object.isRequired,
      ui: PropTypes.shape({
        menu: PropTypes.array,
      }).isRequired,
      children: PropTypes.node.isRequired,
    };
  }

  static get defaultProps() {
    return {
      ui: {
        menu: [],
      },
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  initialFetch() {
    this.props.actions.getProfessorMenuItems();
  }

  handleGoMenu = (menuSelected) => {
    Router.push(menuSelected);
  }

  render() {
    const { ui, children } = this.props;
    return (
      <Layout
        menuItems={ui.menu}
        onGoMenu={this.handleGoMenu}
        title="Professor"
        theme={baseTheme}
      >
        { children }
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    error: state.auth.error,
    ui: state.ui,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessorLayoutContainer);
