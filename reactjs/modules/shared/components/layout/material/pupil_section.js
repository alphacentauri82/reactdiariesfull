import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';

const styles = {
  chipStudent: {
    padding: 8,
  },
  paper: {
    padding: 8,
    marginBottom: 8,
  },
};

class PupilSection extends Component {
  static get propTypes() {
    return {
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      avatarPath: PropTypes.string.isRequired,
      onOpenDialog: PropTypes.func.isRequired,
    };
  }

  render() {
    const {
      firstName,
      lastName,
      avatarPath,
    } = this.props;

    const name = `${firstName} ${lastName}`;

    return (
      <Paper style={styles.paper} zDepth={2}>
        <Chip
          style={styles.chipStudent}
          onRequestDelete={this.props.onOpenDialog}
          onTouchTap={() => console.log('onTouched')}
        >
          <Avatar src={avatarPath} />
          {name}
        </Chip>
      </Paper>
    );
  }
}

export default PupilSection;
