import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Widget from "../../../components/Widget/Widget.js";

import "../../business/viewallbusiness/Viewallbusiness.css";

import s from "../../tables/Tables.module.scss";

import { connect } from "react-redux";

import { toast } from "react-toastify";
import {
  addDomain,
  fetchDomain,
  verifyDomain,
} from "../../../actions/domain.js";
import EditDomain from "../editDomain/EditDomain.js";
import { useTheme } from "@material-ui/core";

const ViewDomainList = function (props) {
  const [modalShow, setModalShow] = useState(false);
  const [changedField, setChangedField] = useState({ id: "", domainName: "" });

  const [firstTableCurrentPage, setFirstTableCurrentPage] = useState(0);
  const [modalType, setModalType] = useState("add");

  const pageSize = 10;
  const { domainData } = props.domainDetails;

  const { dispatch, profileDetails } = props;
  let firstTablePagesCount = 1;
  if (domainData) {
    firstTablePagesCount = Math.ceil(domainData.length / pageSize);
  }

  useEffect(() => {
    dispatch(fetchDomain());
  }, [dispatch]);

  const toggleModal = () => setModalShow(!modalShow);

  const editSubmit = () => {
    props.dispatch(verifyDomain(changedField));
    setModalShow(false);
  };
  const addSubmit = () => {
    if (!changedField.domainName) {
      toast.error("Please add a domain name!");
      return;
    }
    props.dispatch(addDomain(changedField));
    setModalShow(false);
    setChangedField({ id: "", domainName: "" });
  };

  const handleVerifyDns = (id) => {
    props.dispatch(verifyDomain(id));
  };
  const handleAdd = () => {
    setChangedField({ id: "", name: "", email: "", phone: "" });
    setModalShow(true);
    setModalType("add");
    // props.dispatch(deleteEmployee(id))
  };

  const setFirstTablePage = (e, index) => {
    e.preventDefault();
    setFirstTableCurrentPage(index);
  };

  const theme = useTheme();

  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4 m-4">
            <Col>
              <Widget>
                <div className={s.tableTitle}>
                  <div className="headline-2">Domain List</div>
                  {profileDetails &&
                    profileDetails.role !== "admin" &&
                    profileDetails.role !== "user" && (
                      <div>
                        <button
                          type="button"
                          className="btn btn-success p-1 pr-2 pl-2"
                          onClick={handleAdd}
                        >
                          <i className="fa fa-plus actionicon"></i> Add Domain
                        </button>
                      </div>
                    )}
                </div>
                <div className="widget-table-overflow p-4">
                  <Table
                    className="table table-borderless table-hover"
                    responsive
                  >
                    <thead>
                      <tr>
                        <th className="w-25">Domain Name</th>
                        <th className="w-25">TXT Record</th>
                        <th className="w-25">Status</th>

                        <th className="w-25 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {domainData
                        ?.slice(
                          firstTableCurrentPage * pageSize,
                          (firstTableCurrentPage + 1) * pageSize
                        )
                        .map((item) => (
                          <tr key={item._id}>
                            <td className="d-flex align-items-center">
                              <span className="ml-3">{item.domainName}</span>
                            </td>
                            <td>{item.txtrecord}</td>
                            <td>
                              {item.isVerified ? (
                                <span className="bg-primary rounded pl-1 pr-1 text-white">
                                  Verified
                                </span>
                              ) : (
                                <span className="bg-warning rounded pl-1 pr-1">
                                  Not Verified
                                </span>
                              )}
                            </td>

                            <td className="d-flex actiondomainBtn">
                              {/* <button type="button" className="btn btn-success" onClick={() =>handleEdit(item)}><i className="fa fa-edit actionicon"></i></button> */}
                              {!item.isVerified && (
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => handleVerifyDns(item._id)}
                                >
                                  Verify Now
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  {modalShow && (
                    <EditDomain
                      show={modalShow}
                      changedField={changedField}
                      setChangedField={setChangedField}
                      modalType={modalType}
                      toggle={toggleModal}
                      editsubmit={editSubmit}
                      addSubmit={addSubmit}
                    />
                  )}

                  <Pagination
                    className="pagination-borderless mt-2"
                    aria-label="Page navigation example"
                  >
                    <PaginationItem disabled={firstTableCurrentPage <= 0}>
                      <PaginationLink
                        onClick={(e) =>
                          setFirstTablePage(e, firstTableCurrentPage - 1)
                        }
                        previous
                        href="#top"
                        style={{
                          backgroundColor: theme.palette.background.light,
                        }}
                      />
                    </PaginationItem>
                    {[...Array(firstTablePagesCount)].map((page, i) => (
                      <PaginationItem
                        active={i === firstTableCurrentPage}
                        key={i}
                      >
                        <PaginationLink
                          onClick={(e) => setFirstTablePage(e, i)}
                          href="#top"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem
                      disabled={
                        firstTableCurrentPage >= firstTablePagesCount - 1
                      }
                    >
                      <PaginationLink
                        onClick={(e) =>
                          setFirstTablePage(e, firstTableCurrentPage + 1)
                        }
                        next
                        href="#top"
                        style={{
                          backgroundColor: theme.palette.background.light,
                        }}
                      />
                    </PaginationItem>
                  </Pagination>
                </div>
              </Widget>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

ViewDomainList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    domainDetails: state.domain,
    profileDetails: state.myprofile.profileData,
  };
}

export default connect(mapStateToProps)(ViewDomainList);
