import * as actionTypes from './actionTypes';
import axois from 'axios';

export function updateCity(cityName) {
  return {
    type: actionTypes.USER_CURRENTCITY,
    payload: {
      cityName: cityName
    }
  }
}

export function getOrderList() {
  return dispatch => axois.get('/api/user/orderList')
    .then((res) => {
      dispatch(saveOrderList(res.data))
    })
    .catch((err) => {
      console.log(err)
    })
}

export function saveOrderList(object) {
  return {
      type: actionTypes.GET_COMMENT_LIST,
      payload: {
          orderList: object
      }
  }
}