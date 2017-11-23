import * as actinTypes from '../actions/actionTypes';

const initialState = {
    page: 0,
    comments: []
}

export const userInfo = (state = initialState, action) => {
    switch(action.type) {
        case actinTypes.USER_CURRENTCITY:
            return {
                ...state,
                cityName: action.payload.cityName,
                userName: '小明'
            }
        case actinTypes.GET_COMMENT_LIST:
            return {
                ...state,
                comments: action.payload.comments
            }
      
        default:
            return state
    }
}