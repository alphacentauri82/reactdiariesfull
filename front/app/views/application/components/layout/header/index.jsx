import React, { PropTypes } from 'react';
import Icon from 'views/shared/icon';
import Button from 'views/shared/button';

import styles from './styles.scss';


function LandingHeader(props) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Icon
          name='logo'
          size='medium'
        />
      </h1>

      <nav role="navigation" className={styles.navigation}>
        <Button
          onClick={props.onLogout}
          style="link"
        >
          <Icon
            name='logout'
            size='large'
          />
        </Button>
      </nav>
    </header>
  );
}

LandingHeader.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default LandingHeader;
