import React from 'react';
import { Link } from 'react-router';
import Icon from 'views/shared/icon';

import styles from './styles.scss';


function LandingHeader() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Icon
          name='logo'
          size='medium'
        />
      </h1>

      <nav role="navigation" className={styles.navigation}>
        <Link to="/login" activeClassName={styles.active} className={styles.link}>
          Login
        </Link>
        <Link to="/registration" activeClassName={styles.active} className={styles.link}>
          registration
        </Link>
      </nav>
    </header>
  );
}

export default LandingHeader;
