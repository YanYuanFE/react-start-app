import * as actionTypes from '../actionTypes';

const initialState = {
  isAuth: false,
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
};

export const user = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.REGISTER_SUCCESS:
    return {
      ...state,
      msg: '',
      isAuth: true,
      ...action.payload
    };
  case actionTypes.LOGIN_SUCCESS:
    return {
      ...state,
      msg: '',
      isAuth: true,
      ...action.payload
    };
  case actionTypes.LOAD_DATA:
    return {
      ...state,
      ...action.payload
    };
  case actionTypes.ERROR_MSG:
    return {
      ...state,
      isAuth: false,
      ...action.payload
    };
  default:
    return state;
  }
};
