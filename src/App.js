// -- React and related libs
import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { HashRouter } from "react-router-dom";


// -- Redux
import { connect } from "react-redux";

// -- Custom Components
import LayoutComponent from "./components/Layout/Layout";
import ErrorPage from "./pages/error/ErrorPage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";


// -- Redux Actions
import { logoutUser } from "./actions/auth";

// -- Third Party Libs
import { ToastContainer } from "react-toastify";

// -- Services
import isAuthenticated from "./services/authService";

// -- Component Styles
import "./styles/app.scss";
import NotPermission from "./pages/error/NotPermission";
import EmailseenPage from "./pages/error/EmailseenPage";
import EmailVerify from "./pages/error/EmailVerify";


const PrivateRoute = ({ dispatch, component, ...rest }) => {
  if (!isAuthenticated(JSON.parse(localStorage.getItem("authenticated")))) {
    dispatch(logoutUser());
    return (<Redirect to="/login" />)
  } else {
    return (
      <Route { ...rest } render={props => (React.createElement(component, props))} />
    );
  }
};

const App = (props) => {
  return (
    <div>
      <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover/>

      <HashRouter>
      
        <Switch>
        <Route path="/emailseen" exact component={EmailseenPage} />
        <Route path="/verifyaccount" exact component={EmailVerify} />
         
          <Route path="/" exact render={() => <Redirect to="/template/dashboard" />} />
          <Route path="/template" exact render={() => <Redirect to="/template/dashboard"/>}/>
          <PrivateRoute path="/template" dispatch={props.dispatch} component={LayoutComponent} />
          <Route path="/login" exact component={Login} />
         <Route path="/error" exact component={ErrorPage} />
         
         <Route path="/notpermission" exact component={NotPermission} />
          <Route path="/register" exact component={Register} />
          <Route component={ErrorPage}/>
          <Route path='*' exact={true} render={() => <Redirect to="/error" />} />
        </Switch>
      </HashRouter>
      <ToastContainer/>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
