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
import Editemployee from "../editemployee/Editemployee.js";
import {
  addEmployee,
  deleteEmployee,
  editEmployee,
  fetchEmployee,
  importEmployeesCsv,
} from "../../../actions/employee.js";
import { toast } from "react-toastify";
import { fetchDomain } from "../../../actions/domain.js";
import { useTheme } from "@material-ui/core";
import ImportEmployee from "../importEmployee/ImportEmployee.js";

const Tables = function (props) {
  const [modalShow, setModalShow] = useState(false);
  const [importEmpShow, setImportEmpShow] = useState(false);
  const [csv, setCsv] = useState(null);
  const [changedField, setChangedField] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const [firstTableCurrentPage, setFirstTableCurrentPage] = useState(0);
  const [modalType, setModalType] = useState("edit");
  const { domainData } = props;
  const pageSize = 10;
  const { employeeData } = props.employeeDetails;
  const { dispatch, profileDetails } = props;
  const firstTablePagesCount = Math.ceil(employeeData.length / pageSize);

  useEffect(() => {
    dispatch(fetchEmployee());
    dispatch(fetchDomain());
  }, [dispatch]);

  const handleEdit = (item) => {
    setModalType("edit");
    setChangedField((prev) => ({
      ...prev,
      id: item._id,
      name: item.name,
      email: item.email,
      phone: item.phone,
    }));
    setModalShow(true);
  };

  const handleView = (item) => {
    setModalType("view");
    setChangedField((prev) => ({
      ...prev,
      id: item._id,
      name: item.name,
      email: item.email,
      phone: item.phone,
    }));
    setModalShow(true);
  };

  const toggleModal = () => setModalShow(!modalShow);

  const closeImport = () => setImportEmpShow(!importEmpShow);

  const editSubmit = () => {
    let domain = changedField.email.split("@")[1];
    const checkDNS = domainData.filter(
      (e) => e.isVerified && e.domainName === domain
    )[0];

    if (checkDNS) {
      props.dispatch(editEmployee(changedField));
      setModalShow(false);
    } else {
      toast.error("You can only add verified DNS email for employee.");
    }
  };

  const addSubmit = () => {
    if (!changedField.email || !changedField.name) {
      toast.error("Please fill all fields");
      return;
    }
    let domain = changedField.email.split("@")[1];
    const checkDNS = domainData.filter(
      (e) => e.isVerified && e.domainName === domain
    )[0];

    if (checkDNS) {
      props.dispatch(addEmployee(changedField));
      setModalShow(false);
      setChangedField({ id: "", name: "", email: "", phone: "" });
    } else {
      toast.error(
        "Please verify the domain first! Then you can add this employee."
      );
    }
  };

  const importEmployees = () => {
    if (!csv) {
      toast.error("Please Select CSV File");
      return;
    }

    // Read the contents of the selected CSV file
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContents = event.target.result;

      // Split the file contents into lines
      const lines = fileContents.split("\n");

      // Check if the first line (header) matches the expected headers
      const header = lines[0].trim();
      if (header !== "name,phone,email") {
        toast.error("Invalid CSV header. Expected: name, phone, email");
        return;
      }

      // Process the CSV data
      const domains = [];
      let matchingDomainFound = true; // Flag to track if a matching domain was found

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          const columns = line.split(",");
          const email = columns[2]; // Assuming email is the third column (index 2)

          // Check if the email domain is in the domainData array and is verified
          const matchingDomain = domainData.find(
            (domain) => domain.isVerified && email.includes(domain.domainName)
          );

          if (matchingDomain) {
            domains.push(matchingDomain.domainName);
          } else {
            matchingDomainFound = false; // Set the flag to false
            break; // Stop the loop if a matching domain is not found
          }
        }
      }

      if (matchingDomainFound) {
        setCsv(null);
        setImportEmpShow(false);
        props.dispatch(importEmployeesCsv(csv));
      } else {
        setCsv(null);
        setImportEmpShow(false);
        toast.error(
          "Not verified domain found! Please verify the domain first!"
        );
      }
    };

    reader.readAsText(csv);
  };

  const handleDelete = (id) => {
    props.dispatch(deleteEmployee(id));
  };

  const handleAdd = () => {
    setChangedField({ id: "", name: "", email: "", phone: "" });
    setModalShow(true);
    setModalType("add");
    // props.dispatch(deleteEmployee(id))
  };

  const handleImport = () => {
    setCsv(null);
    setImportEmpShow(true);
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
                  <div className="headline-2">Employee List</div>
                  {profileDetails && profileDetails.role !== "admin" && (
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary p-1 pr-2 pl-2 mr-2"
                        onClick={handleImport}
                      >
                        <i className="fa fa-download actionicon"></i> Import
                        From CSV
                      </button>
                      <button
                        type="button"
                        className="btn btn-success p-1 pr-2 pl-2"
                        onClick={handleAdd}
                      >
                        <i className="fa fa-plus actionicon"></i> Add
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
                        <th className="w-25">Name</th>
                        <th className="w-25">Business</th>
                        <th className="w-25">Email</th>
                        <th className="w-25">Mail Opened</th>

                        <th className="w-25 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeData
                        ?.slice(
                          firstTableCurrentPage * pageSize,
                          (firstTableCurrentPage + 1) * pageSize
                        )
                        .map((item) => (
                          <tr key={item._id}>
                            <td className="d-flex align-items-center">
                              <span className="ml-3">{item.name}</span>
                            </td>
                            <td>{item.business.name && item.business.name}</td>
                            <td>{item.email}</td>

                            {item.mailsent > 0 ? (
                              <td className="">
                                {(item.mailopened / item.mailsent).toFixed(4) *
                                  100 >
                                49 ? (
                                  <span className="text-center ml-1 text-white px-4 rounded bg-danger">
                                    {(item.mailopened / item.mailsent).toFixed(
                                      4
                                    ) * 100}
                                    %
                                  </span>
                                ) : (item.mailopened / item.mailsent).toFixed(
                                    4
                                  ) *
                                    100 >
                                  15 ? (
                                  <span className="text-center ml-1 text-white px-4 rounded bg-warning">
                                    {(item.mailopened / item.mailsent).toFixed(
                                      4
                                    ) * 100}
                                    %
                                  </span>
                                ) : (
                                  <span className="text-center ml-1 text-white px-4 rounded bg-primary">
                                    {(item.mailopened / item.mailsent).toFixed(
                                      4
                                    ) * 100}
                                    %
                                  </span>
                                )}
                              </td>
                            ) : (
                              <td>
                                <span className="text-center text-red px-1 rounded">
                                  No Mail Sent
                                </span>
                              </td>
                            )}

                            <td className="d-flex actionBtn">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handleView(item)}
                              >
                                <i className="fa fa-eye actionicon"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => handleEdit(item)}
                              >
                                <i className="fa fa-edit actionicon"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleDelete(item._id)}
                              >
                                <i className="fa fa-solid fa-trash actionicon"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  {modalShow && (
                    <Editemployee
                      show={modalShow}
                      changedField={changedField}
                      setChangedField={setChangedField}
                      modalType={modalType}
                      toggle={toggleModal}
                      editsubmit={editSubmit}
                      addSubmit={addSubmit}
                    />
                  )}
                  <ImportEmployee
                    show={importEmpShow}
                    setCsv={setCsv}
                    csv={csv}
                    closeImport={closeImport}
                    importEmployees={importEmployees}
                  />

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

    employeeDetails: state.employee,
    profileDetails: state.myprofile.profileData,
    domainData: state.domain.domainData,
  };
}

export default connect(mapStateToProps)(Tables);
