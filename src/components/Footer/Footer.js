import React from "react";
import s from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={s.footer}>
      <span className={s.footerLabel}>
        {new Date().getFullYear()} &copy; Developed by{" "}
        <a href="http://catanolabs.com" target="_blank" rel="noreferrer">
          Catanolabs
        </a>
      </span>
    </div>
  );
};

export default Footer;
