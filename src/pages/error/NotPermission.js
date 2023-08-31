import React from "react";
import {
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import s from "./ErrorPage.module.scss";

import errorImage from "../../assets/errorImage.svg"


const NotPermission = () => {
  return (
    <div className={s.pageContainer}>
      <div className={s.errorContainer}>
        <h1 className={s.errorCode}>403</h1>
        <p className={s.errorInfo}>
          Oops. Looks like you don't have permission to access the page..
        </p>
        <p className={s.errorHelp}>
          But you have other options to have fun..
        </p>
        <Link to="/template/dashboard">
          <Button className={`${s.errorBtn} rounded-pill`} type="submit" color="secondary-red">
            Back to Home
          </Button>
        </Link>
      </div>
      <div className={s.imageContainer}>
        <img className={s.errorImage} src={errorImage} alt="Error page" width="80" />
      </div>
      
    </div>
  );
}

export default NotPermission;
