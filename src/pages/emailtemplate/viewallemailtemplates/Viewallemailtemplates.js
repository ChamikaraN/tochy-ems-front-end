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

import Editemailtemplate from "../editemailtemplate/Editemailtemplate.js";
import {
  deleteTemplate,
  editTemplate,
  fetchTemplate,
} from "../../../actions/template.js";
import { connect } from "react-redux";
import {
  fetchMyProfile,
  removeTemplate,
  selectTemplate,
} from "../../../actions/auth.js";
import { useTheme } from "@material-ui/core";

const Tables = function (props) {
  const [modalShow, setModalShow] = useState(false);
  const [changedField, setChangedField] = useState({
    id: "",
    title: "",
    emailfrom: "",
    subject: "",
    body: "",
  });

  const [firstTableCurrentPage, setFirstTableCurrentPage] = useState(0);
  const [modalType, setModalType] = useState("edit");

  const { dispatch, profileData } = props;
  const selectedTemplate = profileData.selectedTemplate;

  const pageSize = 10;
  const { templateData } = props.templateDetails;
  const firstTablePagesCount = Math.ceil(templateData.length / pageSize);

  useEffect(() => {
    dispatch(fetchTemplate());

    dispatch(fetchMyProfile());
  }, [dispatch]);

  const handleEdit = (item) => {
    setModalType("edit");
    setChangedField((prev) => ({
      ...prev,
      id: item._id,
      title: item.title,
      emailfrom: item.emailfrom,
      subject: item.subject,
      body: item.body,
    }));
    setModalShow(true);
  };
  const handleView = (item) => {
    setModalType("view");
    setChangedField((prev) => ({
      ...prev,
      id: item._id,
      title: item.title,
      emailfrom: item.emailfrom,
      subject: item.subject,
      body: item.body,
    }));
    setModalShow(true);
  };
  const toggleModal = () => setModalShow(!modalShow);

  const editSubmit = () => {
    props.dispatch(editTemplate(changedField));
    setModalShow(false);
  };

  const handleDelete = (id) => {
    props.dispatch(deleteTemplate(id));
  };

  const handleSelectTemplate = (templateid, title) => {
    props.dispatch(selectTemplate(templateid, title));
  };
  const handleRemoveTemplate = (templateid, title) => {
    props.dispatch(removeTemplate(templateid));
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
                  <div className="headline-2">
                    {profileData.isAdmin
                      ? "Email Template List"
                      : "Select your email template"}
                  </div>
                </div>
                <div className="widget-table-overflow p-4">
                  <Table
                    className="table table-borderless table-hover"
                    responsive
                  >
                    <thead>
                      <tr>
                        <th className="w-25">Title</th>
                        <th className="w-25">Mail body</th>

                        <th className="w-25 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {templateData
                        ?.slice(
                          firstTableCurrentPage * pageSize,
                          (firstTableCurrentPage + 1) * pageSize
                        )
                        .map((item) => (
                          <tr key={item._id}>
                            <td className="d-flex align-items-center">
                              <span className="ml-3">{item.title}</span>
                            </td>
                            <td>{item.body.slice(0, 19) + ".."}</td>

                            <td className="d-flex actionBtn">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handleView(item)}
                              >
                                <i className="fa fa-eye actionicon"></i>
                              </button>
                              {profileData.isAdmin && (
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={() => handleEdit(item)}
                                >
                                  <i className="fa fa-edit actionicon"></i>
                                </button>
                              )}
                              {profileData.isAdmin && (
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => handleDelete(item._id)}
                                >
                                  <i className="fa fa-solid fa-trash actionicon"></i>
                                </button>
                              )}

                              {!profileData.isAdmin &&
                                (selectedTemplate.some(
                                  (stp) => stp.templateid === item._id
                                ) ? (
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    title="Remove this fromyour template list"
                                    onClick={() =>
                                      handleRemoveTemplate(item._id)
                                    }
                                  >
                                    <i className="fa fa-solid fa-minus actionicon"></i>
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-success"
                                    title="Add this to your template list"
                                    onClick={() =>
                                      handleSelectTemplate(item._id, item.title)
                                    }
                                  >
                                    <i className="fa fa-solid fa-plus actionicon"></i>
                                  </button>
                                ))}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  {modalShow && (
                    <Editemailtemplate
                      show={modalShow}
                      changedField={changedField}
                      setChangedField={setChangedField}
                      modalType={modalType}
                      toggle={toggleModal}
                      editsubmit={editSubmit}
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

Tables.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,

    templateDetails: state.template,
    profileData: state.myprofile.profileData,
  };
}

export default connect(mapStateToProps)(Tables);
