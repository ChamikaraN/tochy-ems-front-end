import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchMyProfile } from "../../../actions/auth";
import { Link } from "react-router-dom";

import "./Viewprofile.css";
import { useTheme } from "@material-ui/core";

function Viewprofile({ profileData, dispatch }) {
  useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch]);
  const theme = useTheme();
  return (
    <div>
      <div className="container">
        <div className="main-body">
          {/* /Breadcrumb */}
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div
                className="card mb-3 pt-2"
                style={{ backgroundColor: theme.palette.background.default }}
              >
                <div
                  className="card-body"
                  style={{ backgroundColor: theme.palette.background.default }}
                >
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Admin"
                      className="rounded-circle"
                      width={150}
                    />
                    <div className="mt-3">
                      <h4>{profileData.name}</h4>
                      <p className="text-secondary mb-1">
                        {profileData.role} Account
                      </p>
                      <p className="text-muted font-size-sm">
                        {profileData.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div
                className="card mb-3 pt-2"
                style={{ backgroundColor: theme.palette.background.default }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 body-2 muted">
                      {profileData.name}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Company Name</h6>
                    </div>
                    <div className="col-sm-9 body-2 muted">
                      {profileData.businessname
                        ? profileData.businessname
                        : "Not added yet"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 body-2 muted">
                      {profileData.email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 body-2 muted">
                      {profileData.phone ? profileData.phone : "Not added yet"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 body-2 muted">
                      {profileData.address
                        ? profileData.address
                        : "Not added yet"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <Link
                        to="/template/editprofile"
                        className="btn btn-primary rounded-pill mx-auto "
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,

    profileData: state.myprofile.profileData,
  };
}

export default connect(mapStateToProps)(Viewprofile);
