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
import { editTemplate } from "../../../actions/template.js";
import { connect } from "react-redux";
import { fetchMyProfile } from "../../../actions/auth.js";
import { fetchSentemail } from "../../../actions/sentemail.js";
import { fetchEmployee } from "../../../actions/employee.js";

const EmailListTable = function (props) {
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

  const { dispatch, profileData, employees, totalemailsent } = props;

  const pageSize = 20;

  const firstTablePagesCount = Math.ceil(totalemailsent.length / pageSize);

  useEffect(() => {
    dispatch(fetchSentemail());
    dispatch(fetchEmployee());
    dispatch(fetchMyProfile());
  }, [dispatch]);

  // let filteredData= totalemailsent.map((email)=>{

  //     return employees.filter((el)=>{
  //         if (el._id===email.employeeid) {
  //             return{
  //                 ...email,
  //                 el
  //             }
  //         }
  //     })
  // })
  // console.log(filteredData);

  //   const handleEdit= (item) => {
  //     setModalType('edit')
  //    setChangedField(prev=>({...prev, id: item._id, title: item.title, emailfrom: item.emailfrom, subject: item.subject, body: item.body}))
  //   setModalShow(true)
  //   }
  //   const handleView= (item) => {
  //     setModalType('view')
  //    setChangedField(prev=>({...prev, id: item._id, title: item.title, emailfrom: item.emailfrom, subject: item.subject, body: item.body}))
  //   setModalShow(true)
  //   }
  const toggleModal = () => setModalShow(!modalShow);

  const editSubmit = () => {
    props.dispatch(editTemplate(changedField));
    setModalShow(false);
  };

  //   const handleDelete= (id)=>{
  //     props.dispatch(deleteTemplate(id))

  //   }

  //   const handleSelectTemplate=(templateid, title)=>{
  //     props.dispatch(selectTemplate(templateid, title))
  //   }
  //   const handleRemoveTemplate=(templateid, title)=>{
  //     props.dispatch(removeTemplate(templateid))
  //   }

  const setFirstTablePage = (e, index) => {
    e.preventDefault();
    setFirstTableCurrentPage(index);
  };

  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4 m-4">
            <Col>
              <Widget>
                <div className={s.tableTitle}>
                  <div className="headline-2 p-0">List of Email Sent</div>
                </div>
                <div className="widget-table-overflow p-4">
                  <Table
                    className={`table-striped table-borderless table-hover ${s.statesTable}`}
                    responsive
                  >
                    <thead>
                      <tr>
                        <th className="w-25">Sent Date</th>
                        <th className="w-25">Employee ID</th>
                        <th className="w-25">Employee Name</th>

                        <th className="w-25 ">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {totalemailsent &&
                        totalemailsent
                          .slice(
                            firstTableCurrentPage * pageSize,
                            (firstTableCurrentPage + 1) * pageSize
                          )
                          .map((item) => (
                            <tr
                              key={item._id}
                              style={{ backgroundColor: "#101010" }}
                            >
                              <td className="d-flex align-items-center">
                                <span className="ml-3">
                                  {item.createdAt.slice(0, 10)}
                                </span>
                              </td>
                              {/* <td>{item.employeeid}</td> */}

                              <td>{item.employeeid}</td>
                              <td>{item.employeename}</td>

                              <td>
                                {item.seen ? (
                                  <span className="badge badge-success">
                                    Opened
                                  </span>
                                ) : (
                                  <span className="badge badge-warning">
                                    Not Opened
                                  </span>
                                )}
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
                        style={{ background: "#101010" }}
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
                        style={{ background: "#101010" }}
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

EmailListTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,

    profileData: state.myprofile.profileData,
    totalemailsent: state.sentemail.sentemailData,
    employees: state.employee.employeeData,
  };
}

export default connect(mapStateToProps)(EmailListTable);
