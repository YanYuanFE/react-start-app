import React from 'react';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  Switch
} from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';

import Home from './containers/Home';
import About from './containers/About';
import Topics from './containers/Topics';
import Topic from './containers/Topic';

import configStore from './redux';

const store = configStore();

const history = createHistory();

class App extends React.Component{
  render() {
    var match = this.props.match;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/topics" component={Topics}></Route>
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App;
