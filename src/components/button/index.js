import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.string,
    type: PropTypes.string,
  };

  render() {
    const { children, type } = this.props;


    return (
      <button className={`btn btn-${type}`} {...this.props}>{children}</button>
    );
  }
}
