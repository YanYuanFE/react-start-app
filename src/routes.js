import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux'

import Home from "./containers/Home";
import About from "./containers/About";
import Topics from "./containers/Topics";
import Topic from "./containers/Topic";

const history = createHistory();

export default class Router extends React.Component{
  render() {
    var match = this.props.match;
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/about" component={Home}></Route>
          <Route path="/topics" component={Topics}></Route>
          <Route path="/topic/:topicId" component={Topic}></Route>
        </Switch>
      </Router>
    )
  }
}