import React from "react";


import s from "./ErrorPage.module.scss";

import errorImage from "../../assets/errorImage.svg"
import { useHistory, useLocation } from "react-router";
import { useEffect } from "react";
import { connect } from "react-redux";
import { makeEmailVerified } from "../../actions/auth";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";


const EmailVerify = ({dispatch}) => {

    const search = useLocation().search;
    const userid = new URLSearchParams(search).get("user");
    const history= useHistory()
    useEffect(()=>{
        if (userid) {
            dispatch(makeEmailVerified( userid))
        }else{
            history.push('/')
        }
    },[dispatch])
  return (
    <div className={s.pageContainer}>
      <div className={s.errorContainer}>
        <h1 className={s.errorCode}>Yaaa!!</h1>
        <p className={s.errorInfo}>
           You have successfully verify your account.
        </p>
        <p className={s.errorHelp}>
          Now you can login into your account
        </p>
        <Link to="/login">
          <Button className={`${s.errorBtn} rounded-pill`} type="submit" color="secondary-red">
            Login Here
          </Button>
        </Link>
      </div>
      <div className={s.imageContainer}>
        <img className={s.errorImage} src={errorImage} alt="Error page" width="80" />
      </div>
      
    </div>
  );
}


export default connect()(EmailVerify);

