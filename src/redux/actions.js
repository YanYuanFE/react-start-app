import * as actionTypes from './actionTypes';

export function registerSuccess(data) {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    payload: data
  };
}

export function loginSuccess(data) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: data
  };
}

export function errorMsg(msg) {
  return {
    type: actionTypes.ERROR_MSG,
    payload: msg
  };
}


export function loadData(userInfo) {
  return {
    type: actionTypes.LOAD_DATA,
    payload: userInfo
  };
}

