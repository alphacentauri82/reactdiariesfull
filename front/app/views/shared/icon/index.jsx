import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { getIcon, getSize } from './utils';

export default class Icon extends Component {
  static get propTypes() {
    return {
      className: PropTypes.string,
      name: PropTypes.string.isRequired,
      size: PropTypes.string,
      onClick: PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      size: 'small'
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      size: getSize(props.size),
      iconName: getIcon(this.props.name)
    };
  }

  render() {
    const { size, iconName } = this.state;
    const { className, onClick } = this.props;

    return (
      <span
        className={classNames('fa', iconName, className, `fa-${size}`)}
        onClick={onClick}
      ></span>
    );
  }
}
