import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

// import AuthRoute from './components/authroute';
import Home from './containers/dashboard';
import About from './containers/About';
import Login from './containers/login';
import Register from './containers/register';

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
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
