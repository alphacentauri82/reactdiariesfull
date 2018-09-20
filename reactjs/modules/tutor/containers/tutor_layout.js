import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Layout from '../../shared/components/layout/material';

import { actions } from '../../../redux';
import baseTheme from '../../../lib/mui_theme/grey_theme';

class MaterialLayoutContainer extends Component {
  static get propTypes() {
    return {
      actions: PropTypes.object.isRequired,
      pupils: PropTypes.array.isRequired,
      pupilSelected: PropTypes.object.isRequired,
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

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  initialFetch() {
    return this.setState({ isLoading: true }, async () => {
      this.props.actions.getTutorMenuItems();
      this.props.actions.getPupilList();
      this.props.actions.getPupilSelected();
      this.setState({
        isLoading: false,
      });
    });
  }

  handleGoMenu = menuSelected => Router.push(menuSelected);

  handleSelectPupil = pupilId => this.props.actions.selectPupil(pupilId);

  render() {
    const {
      ui,
      children,
      pupils,
      pupilSelected,
    } = this.props;

    return (
      <Layout
        isLoading={this.state.isLoading}
        menuItems={ui.menu}
        pupils={pupils}
        pupilSelected={pupilSelected}
        title="Tutor"
        theme={baseTheme}
        onGoMenu={this.handleGoMenu}
        onSelectPupil={this.handleSelectPupil}
      >
        { children }
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui,
    pupils: state.tutor.pupils,
    pupilSelected: state.tutor.pupilSelected,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialLayoutContainer);
