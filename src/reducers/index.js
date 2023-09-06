import { combineReducers } from "redux";
import navigation from "./navigation.js";
import register from "./register.js";
import auth from "./auth.js";
import template from "./template.js";
import employee from "./employee.js";
import domain from "./domain.js";
import myprofile from "./myprofile.js";
import business from "./business.js";
import sentemail from "./sentemail.js";
import theme from "./theme.js";

export default combineReducers({
  register,
  auth,
  navigation,
  template,
  employee,
  domain,
  myprofile,
  business,
  sentemail,
  theme,
});
