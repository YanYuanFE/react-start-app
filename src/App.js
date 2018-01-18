import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

// import AuthRoute from './components/authroute';
import Home from './containers/dashboard';
import User from './containers/user';

import configStore from './redux';


const store = configStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            {
              /* <AuthRoute/> */
            }
            <Route exact path="/" component={Home} />
            <Route path="/user" component={User} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
