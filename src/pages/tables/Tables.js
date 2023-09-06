import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Widget from "../../components/Widget/Widget.js";

import s from "./Tables.module.scss";
import { useTheme } from "@material-ui/core";

const Tables = function ({ employees, business }) {
  const theme = useTheme();
  return (
    <div>
      <Row>
        <Col xs={12} xl={12} className="pr-grid-col">
          <Widget>
            {employees && (
              <>
                {" "}
                <div className={s.tableTitle}>
                  <div className="headline-2">Recent Employees</div>
                  <div>
                    <button
                      className="btn btn-primary rounded-pill mx-auto logout-btn"
                      type="submit"
                    >
                      <span className="ml-1 viewall-btn">
                        <Link to="/template/employee">View All</Link>
                      </span>
                    </button>
                  </div>
                </div>
                <div className={s.widgetContentBlock}>
                  {employees?.slice(0, 4).map((item) => (
                    <div
                      key={uuidv4()}
                      className={s.content}
                      style={{
                        backgroundColor: theme.palette.background.light,
                      }}
                    >
                      <div className="col-12">
                        <div className="body-3 muted d-none d-md-block ">
                          Reg. Date: {item.createdAt.slice(0, 10)}
                        </div>
                        <div className="body-2 ">Name: {item.name}</div>
                        <div className="body-3 muted d-none d-lg-block ">
                          Email: {item.email}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {business && (
              <>
                <div className={s.tableTitle}>
                  <div className="headline-2">Recent Business</div>
                  <div>
                    <button
                      className="btn btn-primary rounded-pill mx-auto logout-btn"
                      type="submit"
                    >
                      <span className="ml-1">
                        <Link to="/template/business">View All</Link>
                      </span>
                    </button>
                    {/*<img src="" alt="Filter option"/>*/}
                  </div>
                </div>
                <div className={s.widgetContentBlock}>
                  {business?.slice(0, 4).map((item) => (
                    <div
                      key={uuidv4()}
                      className={s.content}
                      style={{
                        backgroundColor: theme.palette.background.light,
                      }}
                    >
                      <div className="col-12">
                        <div className="body-3 muted d-none d-md-block col-4">
                          Reg. Date: {item.createdAt.slice(0, 10)}
                        </div>
                        <div className="body-2 col-4">Name: {item.name}</div>
                        <div className="body-3 muted d-none d-lg-block col-4">
                          Email: {item.email}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

export default Tables;
