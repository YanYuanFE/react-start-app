import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class Input extends Component {
  static propTypes = {
    labelText: PropTypes.string,
    handleChange: PropTypes.func,
    value: PropTypes.any,
    inputType: PropTypes.string,
    inputName: PropTypes.string,
    countDown: PropTypes.number,
    requestVerifyCode: PropTypes.func,
    canRequestVerifyCode: PropTypes.func,
    hasSend: PropTypes.bool,
  };

  state = {
    focus: false,
    codeFoucs: false,
  };

  componentWillMount() {
    if (this.props.value) {
      this.setState({ focus: true });
    }
  }

  handleFocus = () => {
    if (this.props.requestVerifyCode) {
      this.setState({ codeFoucs: true });
    }
    this.setState({ focus: true });
  }

  handleBlur = () => {
    if (!this.props.value) {
      this.setState({ focus: false });
    }
    if (this.props.requestVerifyCode) {
      this.setState({ codeFoucs: false });
    }
  }

  renderCodeTip = () => {
    const { countDown, hasSend } = this.props;

    if (countDown) {
      return `${countDown}秒`;
    }
    if (hasSend) {
      return '重新发送';
    }
    return '获取验证码';
  }

  render() {
    const { labelText, handleChange, value, inputType, inputName,
      requestVerifyCode, canRequestVerifyCode, hasSend } = this.props;


    return (
      <div className="form-item">
        <label
          style={this.state.focus ?
            { transform: 'scale(0.75) translate(0px, -28px)' } : { width: '100%' }}
        >{labelText}</label>
        <input
          type={inputType}
          name={inputName}
          value={value}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={handleChange}
        />
        {
          requestVerifyCode ?
            <a
              style={this.state.codeFoucs || hasSend ? { color: '#4D7DFB' } : {}}
              className="code"
              disabled={!canRequestVerifyCode()}
              onClick={() => requestVerifyCode()}
            >{this.renderCodeTip()}</a> : null
        }
      </div>
    );
  }
}
