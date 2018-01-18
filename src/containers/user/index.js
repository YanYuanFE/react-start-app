import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom';
import Login from '../login';
import Register from '../register';
import logo from '../../assets/logo.png';
import './style.scss';

class User extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className="user-container">
        <div className="top">
          <div className="header">
            <img src={logo} alt="" className="logo"/>
            <span className="title">Chat Room</span>
          </div>
        </div>
        <div className="main">
          <Route path={`${match.url}/login`} component={Login} />
          <Route path={`${match.url}/register`} component={Register} />
        </div>
      </div>
    );
  }
}

export default User;

