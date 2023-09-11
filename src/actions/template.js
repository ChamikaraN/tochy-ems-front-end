import { toast } from 'react-toastify';
import { publicRequest, userRequest } from '../requestMethod';

export const FETCH_TEMPLATE_REQUEST = 'FETCH_TEMPLATE_REQUEST';
export const FETCH_TEMPLATE_SUCCESS = 'FETCH_TEMPLATE_SUCCESS';
export const FETCH_TEMPLATE_FAILURE = 'FETCH_TEMPLATE_FAILURE';
export const TEMPLATE_EDIT_SUCCESS = 'TEMPLATE_EDIT_SUCCESS';
export const TEMPLATE_EDIT_FAILURE = 'TEMPLATE_EDIT_FAILURE';

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

export function fetchTemplate() {
  return async(dispatch) => {
   const {data}= await publicRequest.get('/api/template')
   if (data) {
    
        dispatch({type: FETCH_TEMPLATE_SUCCESS, payload: data});
    }else{
        dispatch({type: FETCH_TEMPLATE_FAILURE})
    }
   }
  }


export function editTemplate(changedField) {
  return async(dispatch) => {
   const {data}= await publicRequest.put(`/api/template/update/${changedField.id}`, {changedField})
  
   if (data) {
    
        dispatch(fetchTemplate());
    }else{
        dispatch({type: TEMPLATE_EDIT_FAILURE})
    }
   }
  }


export function addTemplate(field) {

  return async(dispatch) => {
   const {data}= await userRequest.post(`/api/template/add`, field)
  
   if (data) {
    
       await dispatch(fetchTemplate());
        toast.success("New Template added successfully");
    }else{
        dispatch({type: TEMPLATE_EDIT_FAILURE})
    }
   }
  }

export function deleteTemplate(id) {
  return async(dispatch) => {
   const {data}= await publicRequest.delete(`/api/template/delete/${id}`)
  
   if (data) {
    toast.warn("Template deleted successfully");
       await dispatch(fetchTemplate());
        
    }else{
        dispatch({type: TEMPLATE_EDIT_FAILURE})
    }
   }
  }

