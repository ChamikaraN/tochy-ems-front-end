import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { fetchMyProfile, logoutUser } from "../../actions/auth";
import { closeSidebar, openSidebar } from "../../actions/navigation";
import MenuIcon from "../Icons/HeaderIcons/MenuIcon";

import SearchIcon from "../Icons/HeaderIcons/SearchIcon";

import ProfileIcon from "../../assets/navbarMenus/pfofileIcons/ProfileIcon";
import logoutIcon from "../../assets/navbarMenus/pfofileIcons/logoutOutlined.svg";
// import userImg from "../../assets/user.svg";

import s from "./Header.module.scss";
import "animate.css";
import { useTheme } from "@material-ui/core";
import { changeTheme } from "../../actions/theme";

const Header = (props) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const theme = useTheme();
  const { dispatch, profileData } = props;

  useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch]);

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const toggleSidebar = () => {
    if (props.sidebarOpened) {
      props.dispatch(closeSidebar());
    } else {
      const paths = props.location.pathname.split("/");
      paths.pop();
      props.dispatch(openSidebar());
    }
  };

  const doLogout = () => {
    props.dispatch(logoutUser());
  };

  return (
    <Navbar
      className={`${s.root} d-print-none`}
      style={{ backgroundColor: theme.palette.background.light }}
    >
      <div>
        <NavLink
          onClick={() => toggleSidebar()}
          className={`d-md-none mr-3 ${s.navItem}`}
          href="#"
        >
          <MenuIcon className={s.menuIcon} />
        </NavLink>
      </div>

      <Nav className="ml-auto">
        <NavItem className="d-sm-none mr-4">
          <NavLink className="" href="#">
            <SearchIcon />
          </NavLink>
        </NavItem>

        <Dropdown
          isOpen={notificationsOpen}
          toggle={() => toggleNotifications()}
          nav
          id="basic-nav-dropdown"
          className="ml-3"
        >
          <div
            style={{ paddingRight: "20px", paddingTop: "10px" }}
            onClick={() => props.dispatch(changeTheme())}
          >
            <i
              className={`eva eva-${
                props.theme === "dark" ? "sun" : "moon"
              }-outline`}
              style={{ color: props.theme === "dark" ? "#ffffff" : "#000" }}
            ></i>
          </div>
          <DropdownToggle nav caret className="navbar-dropdown-toggle">
            <span className={`${s.avatar} rounded-circle float-left mr-2`}>
              <img src={"https://via.placeholder.com/80x80"} alt="User" />
            </span>
            <span className="small d-none d-sm-block ml-1 mr-2 body-1">
              {profileData.name}
            </span>
          </DropdownToggle>
          <DropdownMenu
            className="navbar-dropdown profile-dropdown"
            style={{
              width: "194px",
              backgroundColor: theme.palette.background.light,
            }}
          >
            <Link to="/template/viewprofile">
              <DropdownItem className={s.dropdownProfileItem}>
                <ProfileIcon />
                <span>Profile</span>
              </DropdownItem>
            </Link>
            <Link to="/template/editprofile">
              <DropdownItem className={s.dropdownProfileItem}>
                <i className="fa fa-pencil"></i>
                <span>Edit profile</span>
              </DropdownItem>
            </Link>

            <NavLink onClick={() => doLogout()} href="#">
              <button
                className="btn btn-primary rounded-pill mx-auto logout-btn"
                type="submit"
              >
                <img src={logoutIcon} alt="Logout" />
                <span className="ml-1">Logout</span>
              </button>
            </NavLink>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sidebarOpened: PropTypes.bool,
};

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    profileData: store.myprofile.profileData,
    theme: store.theme.selectedTheme,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
