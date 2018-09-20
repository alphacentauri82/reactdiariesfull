import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styled from 'styled-components';

import Header from './header';
import Menu from './menu';
import PupilAction from './pupil_action';
import PupilSection from './pupil_section';
import PupilSelection from './pupil_selection';

import { media } from '../../../../../lib/style-utils';

const Container = styled.div`
  padding-left: 200px;
  ${media.tablet`
    padding-left: 0;
  `}
  ${media.phone`
    padding-left: 0;
  `}
`;

const Main = styled.div`
  overflow: hidden;
`;

class MaterialLayout extends Component {
  static get propTypes() {
    return {
      isLoading: PropTypes.bool.isRequired,
      children: PropTypes.node.isRequired,
      menuItems: PropTypes.array.isRequired,
      pupils: PropTypes.array.isRequired,
      pupilSelected: PropTypes.object.isRequired,
      theme: PropTypes.object.isRequired,
      title: PropTypes.string.isRequired,
      onGoMenu: PropTypes.func.isRequired,
      onSelectPupil: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openDialog: false,
    };
  }

  handleCloseDialog = () => this.setState({ openDialog: false });

  handleOpenDialog = () => this.setState({ openDialog: true });

  handleSelectPage = (path) => {
    this.setState({ open: false });
    this.props.onGoMenu(path);
  }

  handleSelectPupil = (pupilId) => {
    this.setState({ openDialog: false });
    this.props.onSelectPupil(pupilId);
  }

  handleToggleMenu = () => this.setState({ open: !this.state.open });

  render() {
    const {
      isLoading,
      children,
      menuItems,
      theme,
      pupils,
      pupilSelected,
      title,
    } = this.props;

    const {
      open,
      openDialog,
    } = this.state;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <Container>
          <Menu
            items={menuItems}
            open={open}
            onToggleMenu={this.handleToggleMenu}
            onSelectPage={this.handleSelectPage}
          />

          <Header
            title={title}
            onToggleMenu={this.handleToggleMenu}
            onSelectPage={this.handleSelectPage}
          />

          {
            pupilSelected.first_name ?
              <PupilSection
                firstName={pupilSelected.first_name}
                lastName={pupilSelected.last_name}
                avatarPath={pupilSelected.avatar_url}
                onOpenDialog={this.handleOpenDialog}
              /> :
              <h1>Loading...</h1>
          }

          <Main>
            {children}
          </Main>

          <PupilAction
            onOpenDialog={this.handleOpenDialog}
          />

          <PupilSelection
            pupils={pupils}
            pupilSelected={pupilSelected}
            openDialog={openDialog}
            onClosePupilSelection={this.handleCloseDialog}
            onSelectPupil={this.handleSelectPupil}
          />
        </Container>
      </MuiThemeProvider>
    );
  }
}

export default MaterialLayout;
