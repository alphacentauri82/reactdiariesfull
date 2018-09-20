import React, { Component, PropTypes }  from 'react';
import classNames from 'classnames';

import styles from './styles.scss';


export default class webResponsive extends Component {
  static get propTypes() {
    return {
      header: PropTypes.element.isRequired,
      aside: PropTypes.element,
      children: PropTypes.element.isRequired,
      showMenuButton: PropTypes.bool
    };
  }

  static defaultProps = {
    showMenuButton: true
  }

  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  handleCloseNavBar() {
    this.setState({
      show: false
    });
  }

  handleShowNavBar() {
    this.setState({
      show: !this.state.show
    });
  }

  renderShowMenuIcon() {
    if (this.props.showMenuButton) {
      return (
        <div className={styles.headerShowIcon}>
          <span className='fa fa-list-ul' onClick={this.handleShowNavBar.bind(this)}></span>
        </div>
      );
    }
  }

  renderAside() {
    if (this.props.showMenuButton) {
      return (
        <div className={styles.menu} onClick={this.handleCloseNavBar.bind(this)}>
          {this.props.aside}
        </div>
      );
    }
  }

  render() {
    const navBarResponsive = classNames(
      styles.content,
      this.state.show && styles.withSidebar
    );

    return (
      <div className={navBarResponsive}>
        <div className={styles.siteContainer}>
          <div className={this.props.showMenuButton ? styles.sitePusher : styles.publicSitePusher}>

            <div className={this.props.showMenuButton ? styles.header : styles.publicHeader}>
              {this.renderShowMenuIcon()}
              <div className={styles.headerHideIcon} onClick={this.handleCloseNavBar.bind(this)}>
                <span className='fa fa-chevron-left'></span>
              </div>
              <div className={styles.headerContent}>
                {this.props.header}
              </div>
              {this.renderAside()}
            </div>

            <div className={this.props.showMenuButton ? styles.siteContent : styles.publicSiteContent}>
              <div className={styles.childrenContainer}>
                {this.props.children}
              </div>
            </div>
            <div className={styles.siteCache} onClick={this.handleCloseNavBar.bind(this)}></div>
          </div>
        </div>
      </div>
    );
  }
}
