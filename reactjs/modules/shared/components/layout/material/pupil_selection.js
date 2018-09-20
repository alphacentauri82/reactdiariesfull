import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem, makeSelectable } from 'material-ui/List';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class Selectable extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

const styles = {
  radioButton: {
    marginTop: 16,
  },
  dialogBody: {
    padding: 0,
  },
};

class PupilSelection extends Component {
  static get propTypes() {
    return {
      openDialog: PropTypes.bool.isRequired,
      pupils: PropTypes.array.isRequired,
      pupilSelected: PropTypes.object.isRequired,
      onClosePupilSelection: PropTypes.func.isRequired,
      onSelectPupil: PropTypes.func.isRequired,
    };
  }

  handleSelectPupil = pupilId => this.props.onSelectPupil(pupilId);

  renderActions() {
    return (
      <FlatButton
        label={<FormattedMessage id="tutor.selection.pupil.cancel" />}
        onTouchTap={this.props.onClosePupilSelection}
      />
    );
  }

  renderPupilList() {
    const list = this.props.pupils.map((item, index) => {
      return (
        <ListItem
          key={index}
          value={item.id}
          primaryText={` ${item.first_name} ${item.last_name}`}
          leftAvatar={
            <Avatar src={item.avatar_url} />
          }
          onClick={() => this.handleSelectPupil(index)}
        />
      );
    });

    return (
      <List>
        <SelectableList defaultValue={this.props.pupilSelected.id}>
          {list}
        </SelectableList>
      </List>
    );
  }

  render() {
    const isAutoScroll = true;
    const {
      openDialog,
      onClosePupilSelection,
    } = this.props;

    return (
      <Dialog
        bodyStyle={styles.dialogBody}
        title={<h3><FormattedMessage id="tutor.selection.pupil.title" /></h3>}
        actions={this.renderActions()}
        modal={false}
        open={openDialog}
        onRequestClose={onClosePupilSelection}
        autoScrollBodyContent={isAutoScroll}
      >
        {this.renderPupilList()}
      </Dialog>
    );
  }
}

export default PupilSelection;
