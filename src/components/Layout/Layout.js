import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";
import PropTypes from "prop-types";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Dashboard from "../../pages/dashboard/Dashboard";
import Notifications from "../../pages/notifications/Notifications";
import Tables from "../../pages/tables/Tables";
import Viewallbusiness from "../../pages/business/viewallbusiness/Viewallbusiness";
import ViewEmailtemplate from "../../pages/emailtemplate/viewallemailtemplates/Viewallemailtemplates";
import AddEmailtemplate from "../../pages/emailtemplate/addemailtemplate/Addemailtemplate";
import Viewprofile from "../../pages/profile/viewprofile/Viewprofile";
import Editprofile from "../../pages/profile/editprofile/Editprofile";
import s from "./Layout.module.scss";
import Viewallemployee from "../../pages/employee/viewallemployee/Viewallemployee";
import { fetchMyProfile } from "../../actions/auth";
import { fetchTemplate } from "../../actions/template";
import EmailListTable from "../../pages/emailtemplate/emaillist/EmailListTable";
import ViewDomainList from "../../pages/domain/viewDomain/ViewDomainList";
import { useTheme } from "@material-ui/core";

const PermitedRoute = ({ dispatch, role, component, ...rest }) => {
  if (role !== "admin") {
    return <Redirect to="/notpermission" />;
  } else {
    return (
      <Route
        {...rest}
        render={(props) => React.createElement(component, props)}
      />
    );
  }
};

const Layout = (props) => {
  const { dispatch } = props;
  const theme = useTheme();
  useEffect(() => {
    dispatch(fetchMyProfile());
    dispatch(fetchTemplate());
  }, [dispatch]);
  return (
    <div className={s.root}>
      <div
        className={s.wrap}
        style={{ backgroundColor: theme.palette.background.light }}
      >
        <Header />
        <Sidebar role={props.profileData.role} />
        <main
          className={s.content}
          style={{ backgroundColor: theme.palette.background.light }}
        >
          <Switch>
            <Route
              path="/template"
              exact
              render={() => <Redirect to="template/dashboard" />}
            />
            <Route path="/template/dashboard" exact component={Dashboard} />

            <Route path="/template/tables" exact component={Tables} />
            <Route
              path="/template/notifications"
              exact
              component={Notifications}
            />
            <Route
              path="/template/ui-elements"
              exact
              render={() => <Redirect to={"/template/ui-elements/charts"} />}
            />

            <PermitedRoute
              path="/template/viewallbusiness"
              dispatch={props.dispatch}
              role={props.profileData.role}
              exact
              component={Viewallbusiness}
            />
            <Route
              path="/template/employee"
              exact
              component={Viewallemployee}
            />
            <Route path="/template/domain" exact component={ViewDomainList} />

            <Route
              path="/template/viewallemailtemplates"
              exact
              component={ViewEmailtemplate}
            />
            <Route
              path="/template/viewemail"
              exact
              component={EmailListTable}
            />

            <PermitedRoute
              path="/template/addemailtemplate"
              dispatch={props.dispatch}
              role={props.profileData.role}
              exact
              component={AddEmailtemplate}
            />

            <Route path="/template/viewprofile" exact component={Viewprofile} />
            <Route path="/template/editprofile" exact component={Editprofile} />

            <Route path="*" exact render={() => <Redirect to="/error" />} />
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  );
};

Layout.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    profileData: store.myprofile.profileData,
    templateDetails: store.template.templateData,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
