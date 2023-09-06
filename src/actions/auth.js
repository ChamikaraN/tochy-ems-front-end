import { loadToken, publicRequest, userRequest } from "../requestMethod";

import { toast } from "react-toastify";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const PROFILELOAD_SUCCESS = "PROFILELOAD_SUCCESS";

export function receiveLogin() {
  return {
    type: LOGIN_SUCCESS,
  };
}

function loginError(payload) {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

// logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem("authenticated");
    localStorage.removeItem("token");
    dispatch(receiveLogout());
  };
}

export function loginUser(creds, payload) {
  return async (dispatch) => {
    try {
      const { data } = await publicRequest.post(`/api/user/login`, creds);
      if (data === "Account not verified") {
        toast.error(
          "Account not verified! Plz check your email to verify your account."
        );
        return false;
      }
      await localStorage.setItem("authenticated", true);
      await localStorage.setItem("token", data.token);
      dispatch(receiveLogin());
      dispatch({ type: PROFILELOAD_SUCCESS, payload: data });
      toast.success("Login successfull");
      // payload.go(0);
      await loadToken();
      // payload.push('/')
      return true;
    } catch {
      console.log("error");
      dispatch(loginError("Something was wrong. Try again"));
      toast.error("wrong email or password");
    }
  };
}

export function fetchMyProfile() {
  return async (dispatch) => {
    try {
      const { data } = await userRequest.get(`/api/user/profile`);

      dispatch({ type: PROFILELOAD_SUCCESS, payload: data });
    } catch {
      console.log("error");
    }
  };
}

export function myProfileEdit(field) {
  return async (dispatch) => {
    const { data } = await userRequest.put(`/api/user/profile/update`, field);

    if (data) {
      await dispatch(fetchMyProfile());
      toast.success("Profile Updated successfully");
    } else {
      toast.error("something went wrong");
    }
  };
}

export function selectTemplate(templateid, title) {
  return async (dispatch) => {
    const { data } = await userRequest.put(`/api/user/template/select`, {
      templateid,
      title,
    });

    if (data) {
      await dispatch(fetchMyProfile());
      toast.success("Template selected successfully");
    } else {
      toast.error("something went wrong");
    }
  };
}
export function removeTemplate(templateid) {
  return async (dispatch) => {
    const { data } = await userRequest.put(
      `/api/user/template/remove/${templateid}`
    );

    if (data) {
      await dispatch(fetchMyProfile());
      toast.success("Template removed successfully");
    } else {
      toast.error("something went wrong");
    }
  };
}

export function makeEmailVerified(userid) {
  return async (dispatch) => {
    const { data } = await publicRequest.put(
      `/api/user/verifyaccount/${userid}`
    );
    if (data) {
      toast.success("Your account has been verified successfully!!");
    } else {
      return false;
    }
  };
}
