import { PROFILELOAD_SUCCESS } from "../actions/auth.js";

  
  export default function register(state = {
    
    profileData:{}
  }, action) {
    switch (action.type) {
      
      case PROFILELOAD_SUCCESS:
        
        return Object.assign({}, state, {
          
            profileData: action.payload,
        });
      
      default:
        return state;
    }
  }