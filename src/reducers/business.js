import { FETCH_BUSINESS_FAILURE, FETCH_BUSINESS_REQUEST, FETCH_BUSINESS_SUCCESS } from "../actions/business.js";

  
  export default function business(state = {
    isFetching: false,
    errorMessage: '',
    businessData:[]
  }, action) {
    switch (action.type) {
      case FETCH_BUSINESS_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case FETCH_BUSINESS_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: '',
          businessData: action.payload
        });
      case FETCH_BUSINESS_FAILURE:
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