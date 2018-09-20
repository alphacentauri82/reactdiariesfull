import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class Menu extends Component {
  static get propTypes() {
    return {
      items: PropTypes.array.isRequired,
      open: PropTypes.bool.isRequired,
      onToggleMenu: PropTypes.func.isRequired,
      onSelectPage: PropTypes.func.isRequired,
    };
  }

  renderMenuItems() {
    const {
      items,
      onSelectPage,
    } = this.props;

    return items.map((item, index) => {
      return (
        <MenuItem
          key={index}
          onClick={() => onSelectPage(item.path)}
        >
          <FormattedMessage id={item.textId} />
        </MenuItem>
      );
    });
  }

  render() {
    const {
      items,
      open,
      onToggleMenu,
      onSelectPage,
    } = this.props;

    return (
      <Drawer
        docked={false}
        width={200}
        open={open}
        onRequestChange={onToggleMenu}
      >
        <AppBar
          title="School"
          onTitleTouchTap={() => onSelectPage(items[0].path)}
          showMenuIconButton={false}
          iconElementRight={
            <IconButton onClick={onToggleMenu}>
              <NavigationClose />
            </IconButton>
          }
        />
        {this.renderMenuItems()}
      </Drawer>
    );
  }
}

export default Menu;
