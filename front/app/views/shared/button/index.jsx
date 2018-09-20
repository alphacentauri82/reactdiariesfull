import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import styles from './styles.scss';


export default class Button extends Component {
  static get propTypes() {
    return {
      children: PropTypes.node.isRequired,
      className: PropTypes.string,
      id: PropTypes.string,
      onClick: PropTypes.func,
      enable: PropTypes.bool,
      type: PropTypes.string,
      style: PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      enable: true,
      type: 'button'
    };
  }

  render() {
    const {
      className,
      type,
      id,
      onClick,
      enable,
      children,
      style
    } = this.props;

    return (
      <button
        className={classNames(styles.btn, className, styles[style])}
        id={id}
        type={type}
        onClick={onClick}
        disabled={!enable}
      >
        <span>
          {children}
        </span>
      </button>
    );
  }
}
