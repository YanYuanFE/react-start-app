import React, { Component } from 'react';
import './style.scss';
// import {
//   Link
// } from 'react-router-dom';


class DashBoard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <header>
          <h1>首页</h1>
        </header>
        <div className="main">
          <div className="left">
            <div className="message-area">
              <textarea />
              <div className="send-btn">发送</div>
            </div>
          </div>
          <div className="right">
            <div className="title">在线用户</div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;
