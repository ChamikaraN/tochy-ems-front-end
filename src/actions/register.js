import { toast } from "react-toastify";
import { publicRequest } from "../requestMethod";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export function receiveRegister() {
  return {
    type: REGISTER_SUCCESS,
  };
}

export function registerError(payload) {
  return {
    type: REGISTER_FAILURE,
    payload,
  };
}

export function registerUser(payload) {
  return async (dispatch) => {
    try {
      const { data } = await publicRequest.post(`/api/user`, payload.creds);
      if (data) {
        toast.success(
          "You've been registered successfully, Please verify your account"
        );
        // dispatch({type: REGISTER_SUCCESS_PROFILELOAD, payload: data});
        payload.history.push("/login");
      } else {
        dispatch(registerError("Something was wrong. Try again"));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
