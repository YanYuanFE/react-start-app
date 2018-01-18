import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import Input from '../../components/input';
import Button from '../../components/button';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };
  handleChange = (e, type) => {
    this.setState({ [type]: e.target.value.trim() });
  }

  render() {
    return (
      <div className="login-container">
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
          <div className="forget">
            <Link to="/user/register">注册帐号</Link>
          </div>
          <div className="btn-wrapper">
            <Button type="primary">登录</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

