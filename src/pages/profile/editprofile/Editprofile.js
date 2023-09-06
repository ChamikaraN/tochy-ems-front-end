import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchMyProfile, myProfileEdit } from "../../../actions/auth";
import { useTheme } from "@material-ui/core";

function Editprofile({ profileData, dispatch }) {
  useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch, profileData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const businessname = e.target.businessname.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    dispatch(myProfileEdit({ name, businessname, phone, address }));
  };
  const theme = useTheme();
  return (
    <div>
      <div>
        <div className="row">
          <div className="col-lg-12">
            <div
              className="card mb-3 pt-2"
              style={{ backgroundColor: theme.palette.background.default }}
            >
              <div
                className="card-body"
                style={{ backgroundColor: theme.palette.background.default }}
              >
                <div className="form-validation">
                  <form className="form-valide" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="form-group row">
                          <label className="col-lg-4 col-form-label">
                            Name
                          </label>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              defaultValue={profileData.name}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            className="col-lg-4 col-form-label"
                            htmlFor="val-email"
                          >
                            Company Name
                          </label>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              name="businessname"
                              defaultValue={
                                profileData.businessname &&
                                profileData.businessname
                              }
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            className="col-lg-4 col-form-label"
                            htmlFor="val-email"
                          >
                            Mobile no.
                          </label>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              name="phone"
                              defaultValue={
                                profileData.phone && profileData.phone
                              }
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            className="col-lg-4 col-form-label"
                            htmlFor="val-email"
                          >
                            Address
                          </label>
                          <div className="col-lg-6">
                            <textarea
                              className="form-control"
                              id="val-suggestions"
                              name="address"
                              defaultValue={
                                profileData.address && profileData.address
                              }
                              rows={5}
                              placeholder="address here.."
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-6">
                        <div className="form-group row">
                          <label
                            className="col-lg-4 col-form-label"
                            htmlFor="val-email"
                          >
                            Email
                          </label>
                          <div className="col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              name="email"
                              defaultValue={profileData.email}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="d-flex justify-content-center align-items-center mb-4">
                        <button
                          className="btn btn-primary rounded-pill mx-auto logout-btn"
                          type="submit"
                        >
                          <span className="ml-1">Submit</span>
                        </button>
                      </div>
                    </div>
                  </form>
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

export default connect(mapStateToProps)(Editprofile);
