import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router";
import { HashRouter } from "react-router-dom";
import { connect } from "react-redux";
import LayoutComponent from "./components/Layout/Layout";
import ErrorPage from "./pages/error/ErrorPage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { logoutUser } from "./actions/auth";
import { ToastContainer } from "react-toastify";
import isAuthenticated from "./services/authService";
import "./styles/app.scss";
import NotPermission from "./pages/error/NotPermission";
import EmailseenPage from "./pages/error/EmailseenPage";
import EmailVerify from "./pages/error/EmailVerify";
import lightTheme from "./themes/lightTheme";
import darkTheme from "./themes/darkTheme";
import { ThemeProvider } from "@material-ui/core/styles";

const PrivateRoute = ({ dispatch, component, ...rest }) => {
  if (!isAuthenticated(JSON.parse(localStorage.getItem("authenticated")))) {
    dispatch(logoutUser());
    return <Redirect to="/login" />;
  } else {
    return (
      <Route
        {...rest}
        render={(props) => React.createElement(component, props)}
      />
    );
  }
};

const App = (props) => {
  return (
    <ThemeProvider theme={props.theme === "dark" ? darkTheme : lightTheme}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <HashRouter>
        <Switch>
          <Route path="/emailseen" exact component={EmailseenPage} />
          <Route path="/verifyaccount" exact component={EmailVerify} />

          <Route
            path="/"
            exact
            render={() => <Redirect to="/template/dashboard" />}
          />
          <Route
            path="/template"
            exact
            render={() => <Redirect to="/template/dashboard" />}
          />
          <PrivateRoute
            path="/template"
            dispatch={props.dispatch}
            component={LayoutComponent}
          />
          <Route path="/login" exact component={Login} />
          <Route path="/error" exact component={ErrorPage} />

          <Route path="/notpermission" exact component={NotPermission} />
          <Route path="/register" exact component={Register} />
          <Route component={ErrorPage} />
          <Route
            path="*"
            exact={true}
            render={() => <Redirect to="/error" />}
          />
        </Switch>
      </HashRouter>
      <ToastContainer />
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  theme: state.theme.selectedTheme,
});

export default connect(mapStateToProps)(App);
