import axios from 'axios';
import API from 'constants/api';
import { SUCCESS, ERR_OK } from 'constants/config';
import * as actionTypes from '../actionTypes';

export function errorMsg(msg) {
  return {
    type: actionTypes.ERROR_MSG,
    payload: msg
  };
}

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

export function loadData(userInfo) {
  return {
    type: actionTypes.LOAD_DATA,
    payload: userInfo
  };
}

export function recordPath(redirectTo) {
  return {
    type: actionTypes.RECORD_PATH,
    payload: redirectTo
  };
}


export function register({ user, pwd, repeatpwd }) {
  console.log(user);
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入');
  }
  if (pwd !== repeatpwd) {
    return errorMsg('两次输入的密码不同');
  }
  return dispatch => {
    axios.post(API.REGISTER, { user, pwd })
      .then(res => {
        if (res.status === SUCCESS && res.data.code === ERR_OK) {
          dispatch(registerSuccess(res.data.data));
        } else {
          dispatch(errorMsg(res.data.msg));
        }
      });
  };
}

export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入');
  }
  return dispatch => {
    axios.post(API.LOGIN, { user, pwd })
      .then(res => {
        if (res.status === SUCCESS && res.data.code === ERR_OK) {
          dispatch(loginSuccess(res.data.data));
        } else {
          dispatch(errorMsg(res.data.msg));
        }
      });
  };
}


