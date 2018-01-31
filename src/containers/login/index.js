import React, { Component } from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/input';
import Button from '../../components/button';
import { login } from 'actions/user';

@connect(
  state => state.user,
  { login }
)
class Login extends Component {
  state = {
    user: '',
    pwd: '',
  };

  handleChange = (e, type) => {
    this.setState({ [type]: e.target.value.trim() });
  }

  handleLogin = () => {
    this.props.login(this.state);
  }

  render() {
    return (
      <div className="login-container">
        {
          (this.props.redirectTo && this.props.redirectTo !== '/user/login') ?
            <Redirect to={this.props.redirectTo} /> : null
        }
        <div className="form">
          <Input
            labelText="用户名"
            inputName="username"
            inputType="text"
            handleChange={(e) => this.handleChange(e, 'user')}
            value={this.state.user}
          />
          <Input
            labelText="密码"
            inputName="password"
            inputType="password"
            handleChange={(e) => this.handleChange(e, 'pwd')}
            value={this.state.pwd}
          />
          <div className="forget">
            <Link to="/user/register">注册帐号</Link>
          </div>
          <div className="btn-wrapper">
            <Button type="primary" onClick={this.handleLogin}>登录</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

