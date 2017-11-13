import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import 'regenerator-runtime/runtime';

import Login from 'pages/login/login.js';
import Home from 'pages/home/home.js';
import Profile from 'pages/profile/profile.js';

import './app.scss';

class App extends React.Component {
  static propTypes = {
    children: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      app: {
        platform: 'browser'
      }
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route path="login" component={Login}/>
      <Route path="home" component={Home}/>
      <Route path="profile" component={Profile}/>
    </Route>
  </Router>
), document.getElementById('root'));
