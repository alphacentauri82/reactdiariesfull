import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Header extends Component {
  static get propTypes() {
    return {
      title: PropTypes.string.isRequired,
      onToggleMenu: PropTypes.func.isRequired,
      onSelectPage: PropTypes.func.isRequired,
    };
  }

  renderMenuHeader() {
    const isSecondaryBadge = true;

    return (
      <div>
        <Badge
          style={{ padding: 0 }}
          badgeContent={10}
          secondary={isSecondaryBadge}
          badgeStyle={{ left: 22, zIndex: 999 }}
        >
          <IconButton tooltip="Notifications">
            <NotificationsIcon />
          </IconButton>
        </Badge>
        <IconButton>
          <Avatar
            src="https://cdn0.iconfinder.com/data/icons/iconshock_guys/512/matthew.png"
            size={25}
          />
        </IconButton>
        <IconMenu
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="Profile" />
          <MenuItem
            primaryText="Sign out"
            onTouchTap={() => this.props.onSelectPage('/')}
          />
        </IconMenu>
      </div>
    );
  }

  renderNavigationMenu() {
    return (
      <IconButton onClick={this.props.onToggleMenu}>
        <NavigationMenu />
      </IconButton>
    );
  }

  render() {
    const {
      title,
      onSelectPage,
    } = this.props;

    return (
      <AppBar
        title={title}
        onTitleTouchTap={() => onSelectPage('/tutor')}
        iconElementLeft={this.renderNavigationMenu()}
        iconElementRight={this.renderMenuHeader()}
      />
    );
  }
}

export default Header;
