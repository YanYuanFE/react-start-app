import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { userInfo } from './userInfo';

export default combineReducers({
  userInfo,
  router: routerReducer
})