import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup.js";
import { changeActiveSidebarItem } from "../../actions/navigation.js";
import cn from "classnames";

const Sidebar = (props) => {

  const {
    activeItem = '',
    role,
    ...restProps
  } = props;


  const [burgerSidebarOpen, setBurgerSidebarOpen] = useState(false)

  useEffect(() => {
    if (props.sidebarOpened) {
      setBurgerSidebarOpen(true)
    } else {
      setTimeout(() => {
        setBurgerSidebarOpen(false)
      }, 0);
    }
  }, [props.sidebarOpened])

  return (
    <nav className={cn(s.root, {[s.sidebarOpen]: burgerSidebarOpen})} >
      <header className={s.logo}>
      <i className={`eva eva-email ${s.headericon}`}></i>
        <span className={s.title}>E.M.S</span>
      </header>
      <ul className={s.nav}>
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Dashboard"
          isHeader
          iconName={""}
          link="/template/dashboard"
          index="dashboard"
          badge=""
        />
    
    
          {role==='admin' &&   <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="View All Business"
          isHeader
          iconName={""}
          link="/template/viewallbusiness"
          index="viewallbusiness"
        />}
        {(role==='admin' || role==='business') && <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Employees"
          isHeader
          iconName={""}
          link="/template/employee"
          index="employees"
        />}
        {(role==='business' || role==='user') && <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Manage DNS"
          isHeader
          iconName={""}
          link="/template/domain"
          index="domain"
        />}
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header=" Templates"
          isHeader
          iconName={""}
          link="/template/viewallemailtemplates"
          index="allemailtemplates"
        />
        
          {role==='admin' && <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Add templates"
          isHeader
          iconName={""}
          link="/template/addemailtemplate"
          index="addemailtemplates"
        />}
 
 <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Emails"
          isHeader
          iconName={""}
          link="/template/viewemail"
          index="allemailtemplates"
        />
     
     <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Profile"
          isHeader
          iconName={""}
          link="/template/viewprofile"
          index="allemailtemplates"
        />
        
        <LinksGroup
          onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
          activeItem={props.activeItem}
          header="Edit profile"
          isHeader
          iconName={""}
          link="/template/editprofile"
          index="allemailtemplates"
        />
      

      </ul>

    </nav>
  );
}

Sidebar.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
