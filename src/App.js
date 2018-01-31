import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import AuthRoute from './components/authroute';
import DashBoard from './containers/dashboard';
import User from './containers/user';

import store from './redux';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <AuthRoute/>
            <Switch>
              <Route exact path="/" component={DashBoard} />
              <Route path="/user" component={User} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
