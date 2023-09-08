import axios from "axios";
// const BASE_URL = "https://api.phishstops.com/";
const BASE_URL = "http://localhost:3001/";
let token;
let TOKEN = "";
export const loadToken = () => {
  if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");

    if (token) {
      TOKEN = token;
    }
  }
};
loadToken();

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});
