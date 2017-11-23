import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import logger from 'redux-logger'
import reducers from './reducers';

export default function configStore(preLoadedState) {
  return createStore(reducers, preLoadedState, applyMiddleware(routerMiddleware(history), logger),
    // https://github.com/zalmoxisus/redux-devtools-extension#usage
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}