import { toast } from "react-toastify";
import { publicRequest, userRequest } from "../requestMethod";

export const FETCH_SENTEMAIL_REQUEST = "FETCH_SENTEMAIL_REQUEST";
export const FETCH_SENTEMAIL_SUCCESS = "FETCH_SENTEMAIL_SUCCESS";
export const FETCH_SENTEMAIL_FAILURE = "FETCH_SENTEMAIL_FAILURE";

export function fetchSentemail() {
  return async (dispatch) => {
    const { data } = await userRequest.get("/api/template/sentemail");
    if (data) {
      dispatch({ type: FETCH_SENTEMAIL_SUCCESS, payload: data });
    } else {
      dispatch({ type: FETCH_SENTEMAIL_FAILURE });
    }
  };
}

export function makeEmailRead(templateid, empid) {
  return async (dispatch) => {
    try {
      const { data } = await publicRequest.put("/api/template/readmail", {
        templateid,
        empid,
      });
      if (data) {
        toast.success("Email marked as read! Enjoy!!");
      }
      return true;
    } catch {
      dispatch({ type: FETCH_SENTEMAIL_FAILURE });
      toast.error("Email already read or not a valid url");
    }
  };
}
