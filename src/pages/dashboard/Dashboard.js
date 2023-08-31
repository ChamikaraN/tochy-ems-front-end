import React, { useEffect } from "react";

import { Col, Row } from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
// import ApexLineChart from "./components/ApexLineChart.js";
import Tables from "../tables/Tables";
import CountUp from "react-countup";
import Slider from "../../components/slider/Slider";

// import ApexActivityChart from "./components/ActivityChart.js";

import s from "./Dashboard.module.scss";
import { connect } from "react-redux";
import { fetchMyProfile } from "../../actions/auth.js";
import { fetchEmployee } from "../../actions/employee.js";
import { fetchSentemail } from "../../actions/sentemail.js";
import { Link } from "react-router-dom";
import { fetchBusiness } from "../../actions/business.js";

const Dashboard = ({
  profileData,
  dispatch,
  employees,
  templates,
  totalemailsent,
  businesses,
}) => {
  let totalemailopened = totalemailsent.filter((email) => email.seen);

  useEffect(() => {
    dispatch(fetchMyProfile());
    dispatch(fetchEmployee());
    dispatch(fetchSentemail());
    dispatch(fetchBusiness());
  }, [dispatch]);

  return (
    <div>
      <Row>
        <Col className="pr-grid-col" xs={12} lg={8}>
          {/* starting of intro card divs*/}

          <Row className="gutter">
            {profileData && profileData.role === "admin" && (
              <Col className="mb-4 mb-xl-0" xs={6} sm={6} xl={3}>
                <Link to="/template/viewallbusiness">
                  <Widget className="widget-p-sm">
                    <div className={s.smallWidget}>
                      <div className="text-center mb-4">
                        <i
                          className={`fa fa-bank ${s.employeeIcon} ${s.dashboardbankicon}`}
                          style={{ color: "#FF5668" }}
                        />

                        <br />
                      </div>
                      <div className="d-flex flex-column">
                        <p className="h3 text-center pt-3">
                          <CountUp
                            start={0}
                            end={businesses && businesses.length}
                            duration={2.3}
                          />
                        </p>
                        <span className="h6 muted text-center">
                          {" "}
                          Businesses
                        </span>
                      </div>
                    </div>
                  </Widget>
                </Link>
              </Col>
            )}
            {profileData && profileData.role !== "admin" && (
              <Col className="mb-4 mb-xl-0" xs={6} sm={6} xl={3}>
                <Link to="/template/employee">
                  <Widget className="widget-p-sm">
                    <div className={s.smallWidget}>
                      <div className="text-center mb-4">
                        <i
                          className={`eva eva-people ${s.employeeIcon}`}
                          style={{ color: "#FFC405" }}
                        ></i>
                        <br />
                      </div>
                      <div className="d-flex flex-column">
                        <p className="h3 text-center">
                          <CountUp
                            start={0}
                            end={employees && employees.length}
                            duration={2.3}
                          />
                        </p>
                        <span className="h6 muted text-center">Empoyees</span>
                      </div>
                    </div>
                  </Widget>
                </Link>
              </Col>
            )}
            <Col className="mb-4 mb-xl-0" xs={6} sm={6} xl={3}>
              <Link to="/template/viewallemailtemplates">
                <Widget className="widget-p-sm">
                  <div className={s.smallWidget}>
                    <div className="text-center mb-4">
                      <i
                        className={`eva eva-browser ${s.employeeIcon}`}
                        style={{ color: "#41D5E2" }}
                      ></i>
                      <br />
                    </div>
                    <div className="d-flex flex-column">
                      <p className="h3 text-center">
                        <CountUp
                          start={0}
                          end={templates && templates.length}
                          duration={2.3}
                        />
                      </p>
                      <span className="h6 muted text-center">Templates</span>
                    </div>
                  </div>
                </Widget>
              </Link>
            </Col>

            <Col className="mb-4 mb-xl-0" xs={6} sm={6} xl={3}>
              <Widget className="widget-p-sm">
                <div className={s.smallWidget}>
                  <div className="text-center mb-4">
                    <i
                      className={`eva eva-email ${s.employeeIcon}`}
                      style={{ color: "#4D53E0" }}
                    ></i>
                    <br />
                  </div>
                  <div className="d-flex flex-column">
                    <p className="h3 text-center">
                      <CountUp
                        start={0}
                        end={totalemailsent && totalemailsent.length}
                        duration={2.3}
                      />
                    </p>
                    <span className="h6 muted text-center">Mail sent</span>
                  </div>
                </div>
              </Widget>
            </Col>

            <Col className="mb-4 mb-xl-0" xs={6} sm={6} xl={3}>
              <Widget className="widget-p-sm">
                <div className={s.smallWidget}>
                  <div className="text-center mb-4">
                    <i
                      className={`eva eva-inbox-outline ${s.employeeIcon}`}
                      style={{ color: "#4D53E0" }}
                    ></i>
                    <br />
                  </div>
                  <div className="d-flex flex-column">
                    <p className="h3 text-center">
                      <CountUp
                        start={0}
                        end={totalemailopened && totalemailopened.length}
                        duration={2.3}
                      />
                    </p>
                    <span className="h6 muted text-center">Mail Opened</span>
                  </div>
                </div>
              </Widget>
            </Col>
          </Row>

          {/* ending of intro card divs*/}

          {/* Starting of chart*/}
          <Row className="gutter mb-4 mt-4">
            <Col className="mb-4 mb-md-0" xs={12} md={12}>
              <Widget className="">
                <div className="d-flex justify-content-between widget-p-md">
                  {/* <div className="headline-3 d-flex align-items-center">Email activity</div> */}
                  {/* <UncontrolledDropdown>
                    <DropdownToggle caret>
                      &nbsp; Weekly &nbsp;
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Daily</DropdownItem>
                      <DropdownItem>Weekly</DropdownItem>
                      <DropdownItem>Monthly</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown> */}
                </div>
                {/* <ApexLineChart className="pb-4"/> */}
              </Widget>
            </Col>
          </Row>

          {/* ending of chart*/}

          {/* Starting to table*/}
          <Tables employees={employees}></Tables>
          {/* ending of table */}

          {/*starting of slider */}
        </Col>

        <Col className="mt-4 mt-lg-0" xs={12} lg={4}>
          <div
            className={`pb-4 ${s.widgetColor}`}
            style={{ backgroundColor: "black" }}
          >
            <div className="d-flex p-4">
              <img
                className={s.image}
                src={"https://via.placeholder.com/80x80"}
                alt="..."
              />
              <div className={s.userInfo}>
                <p className="headline-3">{profileData.name}</p>
                <p className="body-3 muted">
                  {profileData.address && profileData.address}
                </p>
              </div>
            </div>

            <div className="profile-personal-info pl-4">
              <div>
                <div className="row mb-2 ">
                  <div className="col-xs-6 col-sm-6 col-xl-3">
                    <span className="headline-3">
                      Name
                      <span className="pl-2 pr-2">:</span>
                    </span>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-xl-9">
                    <span className="body-2 muted">{profileData.name}</span>
                  </div>
                </div>
                <div className="row mb-2 ">
                  <div className="col-xs-6 col-sm-6 col-xl-3">
                    <span className="headline-3">
                      Email
                      <span className="pl-2 pr-2">:</span>
                    </span>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-xl-9">
                    <span className="body-2 muted">{profileData.email}</span>
                  </div>
                </div>
                <div className="row mb-2 ">
                  <div className="col-xs-6 col-sm-6 col-xl-3">
                    <span className="headline-3">
                      Age
                      <span className="pl-2 pr-2">:</span>
                    </span>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-xl-9">
                    <span className="body-2 muted">25+</span>
                  </div>
                </div>
                <div className="row mb-2 ">
                  <div className="col-xs-6 col-sm-6 col-xl-3">
                    <span className="headline-3">
                      Location
                      <span className="pl-2 pr-2">:</span>
                    </span>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-xl-9">
                    <span className="body-2 muted">
                      {profileData.address && profileData.address}
                    </span>
                  </div>
                </div>

                {/* <div className="headline-3 d-flex align-items-center pt-4">social media links</div>
  <div className={`pt-4 pb-4 ${s.socialMediaIcon}`}>
  <i className="fa fa-twitter"></i>
  <i className="fa fa-facebook-f"></i>
  <i className="fa fa-linkedin"></i>
  <i className="fa fa-instagram"></i>
  </div> */}
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} xl={12} className="pr-grid-col pt-5">
          <Widget>
            <div className="p-4 ml-4 mr-4 pb-4">
              <div className="d-flex justify-content-between">
                <div className="headline-2">Email Template</div>
                <div>{/*<img src="" alt="Filter option"/>*/}</div>
              </div>
              <Row>
                <Col>
                  <Slider templates={templates}></Slider>
                </Col>
              </Row>
            </div>
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,

    profileData: state.myprofile.profileData,
    employees: state.employee.employeeData,
    templates: state.template.templateData,
    totalemailsent: state.sentemail.sentemailData,
    businesses: state.business.businessData,
  };
}

export default connect(mapStateToProps)(Dashboard);
