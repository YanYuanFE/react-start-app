import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { userInfo } from './user';

export default combineReducers({
  userInfo,
  router: routerReducer
});
