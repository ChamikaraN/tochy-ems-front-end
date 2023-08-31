
import { FETCH_DOMAIN_FAILURE, FETCH_DOMAIN_SUCCESS } from "../actions/domain.js";

  
  export default function domain(state = {
    isFetching: false,
    errorMessage: '',
    domainData:[]
  }, action) {
    switch (action.type) {
     
      case FETCH_DOMAIN_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: '',
          domainData: action.payload
        });
      case FETCH_DOMAIN_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.payload,
        });

       
      default:
        return state;
    }
  }