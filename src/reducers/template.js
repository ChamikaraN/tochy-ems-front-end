import {
    FETCH_TEMPLATE_REQUEST,
    FETCH_TEMPLATE_SUCCESS,
    FETCH_TEMPLATE_FAILURE,
    
  } from "../actions/template.js";
  
  export default function template(state = {
    isFetching: false,
    errorMessage: '',
    templateData:[]
  }, action) {
    switch (action.type) {
      case FETCH_TEMPLATE_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case FETCH_TEMPLATE_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: '',
          templateData: action.payload
        });
      case FETCH_TEMPLATE_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.payload,
        });

        // case TEMPLATE_EDIT_SUCCESS:
        // return Object.assign({}, state, {
        //   isFetching: false,
        //   errorMessage: '',
        //   templateData: action.payload
        // });
      default:
        return state;
    }
  }