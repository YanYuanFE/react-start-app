import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import Input from '../../components/input';
import Button from '../../components/button';

class Register extends Component {
  state = {
    username: '',
    password: '',
    confirmPsw: ''
  };
  handleChange = (e, type) => {
    this.setState({ [type]: e.target.value.trim() });
  }

  render() {
    return (
      <div className="register-container">
        <div className="form">
          <Input
            labelText="用户名"
            inputName="username"
            inputType="text"
            handleChange={(e) => this.handleChange(e, 'name')}
            value={this.state.username}
          />
          <Input
            labelText="密码"
            inputName="password"
            inputType="password"
            handleChange={(e) => this.handleChange(e, 'password')}
            value={this.state.password}
          />
          <Input
            labelText="确认密码"
            inputName="confirmPsw"
            inputType="password"
            handleChange={(e) => this.handleChange(e, 'confirmPsw')}
            value={this.state.confirmPsw}
          />
          <div className="bottom">
            <div className="btn-wrapper">
              <Button type="primary">注册</Button>
            </div>
            <div className="login">
              <Link to="/user/login">使用已有账户登录</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;

