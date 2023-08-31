import React from "react";
import s from "./Footer.module.scss";


const Footer = () => {
  return (
    <div className={s.footer}>
      <a href="mailto:rakibulislam.cse21@gmail.com" >
      <span className={s.footerLabel}>2022 &copy; Developed by ARbyteTechnology</span>
 </a>

    </div>
  )
}

export default Footer;
