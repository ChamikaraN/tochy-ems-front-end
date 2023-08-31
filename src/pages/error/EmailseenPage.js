import React from "react";


import s from "./ErrorPage.module.scss";

import errorImage from "../../assets/errorImage.svg"
import { useLocation } from "react-router";
import { useEffect } from "react";
import { connect } from "react-redux";
import { makeEmailRead } from "../../actions/sentemail";


const EmailseenPage = ({dispatch}) => {

    const search = useLocation().search;
    const templateid = new URLSearchParams(search).get("templateid");
    const empid = new URLSearchParams(search).get("emp");
    


    useEffect(()=>{
        if (templateid && empid) {
            dispatch(makeEmailRead(templateid, empid))
        }
    },[dispatch])
  return (
    <div className={s.pageContainer}>
      <div className={s.errorContainer}>
        <h1 className={s.errorCode}>Yaaa!!</h1>
        <p className={s.errorInfo}>
           You have successfully read the email.
        </p>
        <p className={s.errorHelp}>
          Now you can have relax!
        </p>
       
      </div>
      <div className={s.imageContainer}>
        <img className={s.errorImage} src={errorImage} alt="Error page" width="80" />
      </div>
      
    </div>
  );
}


export default connect()(EmailseenPage);

