import { toast } from 'react-toastify';
import { publicRequest } from '../requestMethod';

export const FETCH_BUSINESS_REQUEST = 'FETCH_BUSINESS_REQUEST';
export const FETCH_BUSINESS_SUCCESS = 'FETCH_BUSINESS_SUCCESS';
export const FETCH_BUSINESS_FAILURE = 'FETCH_BUSINESS_FAILURE';
export const BUSINESS_EDIT_SUCCESS = 'BUSINESS_EDIT_SUCCESS';
export const BUSINESS_EDIT_FAILURE = 'BUSINESS_EDIT_FAILURE';

// export function receiveRegister() {
//   return {
//     type: FETCH_TEMPLATE_REQUEST,
//   };
// }

// export function registerError(payload) {
//   return {
//     type: REGISTER_FAILURE,
//     payload,
//   };
// }

export function fetchBusiness() {
  return async(dispatch) => {
   const {data}= await publicRequest.get('/api/user/business')
   if (data) {
    
        dispatch({type: FETCH_BUSINESS_SUCCESS, payload: data});
    }else{
        dispatch({type: FETCH_BUSINESS_FAILURE})
    }
   }
  }


export function editBusiness(changedField) {
  return async(dispatch) => {
   const {data}= await publicRequest.put(`/api/user/business/update/${changedField.id}`, {changedField})
  
   if (data) {
    
        dispatch(fetchBusiness());
    }else{
        dispatch({type: BUSINESS_EDIT_FAILURE})
        toast.error("Something was wrong.");
    }
   }
  }


// export function addTemplate(field) {
//   return async(dispatch) => {
//    const {data}= await publicRequest.post(`/api/template/add`, field)
  
//    if (data) {
    
//        await dispatch(fetchTemplate());
//         toast.success("New Template added successfully");
//     }else{
//         dispatch({type: TEMPLATE_EDIT_FAILURE})
//     }
//    }
//   }

export function deleteBusiness(id) {
  return async(dispatch) => {
   const {data}= await publicRequest.delete(`/api/business/delete/${id}`)
  
   if (data) {
    toast.warn("Template deleted successfully");
       await dispatch(fetchBusiness());
        
    }else{
        dispatch({type: BUSINESS_EDIT_FAILURE})
    }
   }
  }

