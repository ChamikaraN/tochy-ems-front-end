import React from "react";
import PropTypes from "prop-types";

import s from "./Widget.module.scss";
import classNames from "classnames";
import { useTheme } from "@material-ui/core";

const Widget = (props) => {
  const {
    title = null,
    className = "",
    headerClass = "",
    children = [],
    ...restProps
  } = props;
  const theme = useTheme();
  return (
    <>
      <section
        className={s.widget}
        {...restProps}
        style={{ backgroundColor: theme.palette.background.default }}
      >
        {title && (
          <div className={classNames(headerClass, s.title)}>{title}</div>
        )}
        <div className={className}>{children}</div>
      </section>
    </>
  );
};

Widget.propTypes = {
  title: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  options: PropTypes.object,
};

export default Widget;
