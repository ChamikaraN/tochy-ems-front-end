import {
    FETCH_SENTEMAIL_REQUEST,
    FETCH_SENTEMAIL_SUCCESS,
    FETCH_SENTEMAIL_FAILURE,
    
  } from "../actions/sentemail.js";
  
  export default function sentemail(state = {
    isFetching: false,
    errorMessage: '',
    sentemailData:[]
  }, action) {
    switch (action.type) {
      case FETCH_SENTEMAIL_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case FETCH_SENTEMAIL_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: '',
          sentemailData: action.payload
        });
      case FETCH_SENTEMAIL_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.payload,
        });

       
      default:
        return state;
    }
  }