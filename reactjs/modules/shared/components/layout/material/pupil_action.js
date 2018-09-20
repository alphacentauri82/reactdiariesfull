import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import People from 'material-ui/svg-icons/social/people';

const styles = {
  floatingButton: {
    position: 'fixed',
    bottom: 8,
    right: 8,
  },
};

function PupilAction(props) {
  return (
    <FloatingActionButton
      style={styles.floatingButton}
      onTouchTap={props.onOpenDialog}
    >
      <People />
    </FloatingActionButton>
  );
}

PupilAction.propTypes = {
  onOpenDialog: PropTypes.func.isRequired,
};

export default PupilAction;
