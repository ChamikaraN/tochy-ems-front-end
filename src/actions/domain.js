import { toast } from 'react-toastify';
import { publicRequest, userRequest } from '../requestMethod';


export const FETCH_DOMAIN_SUCCESS = 'FETCH_DOMAIN_SUCCESS';
export const FETCH_DOMAIN_FAILURE = 'FETCH_DOMAIN_FAILURE';
export const DOMAIN_EDIT_FAILURE = 'Domain_EDIT_FAILURE';



export function fetchDomain() {
   
  return async(dispatch) => {
   const {data}= await userRequest.get('/api/domain')
   if (data) {
    
        dispatch({type: FETCH_DOMAIN_SUCCESS, payload: data});
    }else{
        dispatch({type: FETCH_DOMAIN_FAILURE})
    }
   }
  }


export function verifyDomain(id) {
  return async(dispatch) => {
   const {data}= await publicRequest.put(`/api/domain/update/${id}`, {isVerifyReqSent: true})
  
   if (data.success) {
    if (data.message==='DNS TXT verify successfull!') {
        toast.success("DNS TXT verify successfull!");
    }else{
        toast.error("TXT record not found! Sometimes it needs few times to update the TXT on your domain settings. Please try again after 15 minutes");
    }
        dispatch(fetchDomain());
    }else{
        dispatch({type: DOMAIN_EDIT_FAILURE})
    }
   }
  }


export function addDomain(field) {
  return async(dispatch) => {
   try {
    const {data}= await userRequest.post(`/api/domain/add`, field)
  
   if (data) {
    
       await dispatch(fetchDomain());
        toast.success("Domain added successfully");
    }else{
        dispatch({type: DOMAIN_EDIT_FAILURE})
        toast.error("something went wrong");
    }
   } catch (error) {
    toast.error("Duplicate Domain used, please use a different Domain");
   }
   }
  }

export function deleteDomain(id) {
  return async(dispatch) => {
   const {data}= await publicRequest.delete(`/api/domain/delete/${id}`)
  
   if (data) {
    toast.success("Domain deleted successfully");
       await dispatch(fetchDomain());
        
    }else{
        toast.error("something went wrong");
    }
   }
  }

