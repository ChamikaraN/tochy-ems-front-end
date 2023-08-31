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


import '../../business/viewallbusiness/Viewallbusiness.css'

import s from "../../tables/Tables.module.scss";

import Editbusiness from "../editbusiness/Editbusiness.js";

import { connect } from "react-redux";
import {  editBusiness, fetchBusiness } from "../../../actions/business.js";



const Tables = function (props) {
  const [modalShow, setModalShow] = useState(false);
  const [changedField, setChangedField] = useState({id:'', name:'',businessname:'', phone:'', email:'', address:''});

  const [firstTableCurrentPage, setFirstTableCurrentPage] = useState(0);
  const [modalType, setModalType] = useState('edit');


const {dispatch} = props
  const pageSize = 10;
  const {businessData}= props.businessDetails
  const firstTablePagesCount = Math.ceil(businessData.length / pageSize);

useEffect(()=>{
 dispatch(fetchBusiness())
},[dispatch])


  const handleEdit= (item) => {
    setModalType('edit')
   setChangedField(prev=>({...prev, id: item._id, name: item.name, businessname: item.businessname, phone: item.phone, email: item.email, address: item.address}))
  setModalShow(true)
  }
  const handleView= (item) => {
    setModalType('view')
   setChangedField(prev=>({...prev, id: item._id, name: item.name, businessname: item.businessname, phone: item.phone, email: item.email, address: item.address}))
  setModalShow(true)
  }
  const toggleModal = () => setModalShow(!modalShow);

  const editSubmit= ()=>{
    props.dispatch(editBusiness(changedField))
    setModalShow(false)
  }

  const handleDelete= (id)=>{
    alert('Currently You do not have permission to delete')
    // props.dispatch(deleteBusiness(id))
    
  }

  const setFirstTablePage = (e, index) => {
    e.preventDefault();
    setFirstTableCurrentPage(index);
  }

  



  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4 m-4">
            <Col>
              <Widget>
                <div className={s.tableTitle}>
                  <div className="headline-2">Business List</div>
             
                </div>
                <div className="widget-table-overflow p-4">
                  <Table className={`table-striped table-borderless table-hover ${s.statesTable}`} responsive>
                    <thead>
                    <tr>
                     
                      <th className="w-25">Name</th>
                      <th className="w-25">Email</th>
                      <th className="w-25">TXT Status</th>
                  
                      <th className="w-25 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {businessData && businessData
                      .slice(
                        firstTableCurrentPage * pageSize,
                        (firstTableCurrentPage + 1) * pageSize
                      )
                      .map(item => (
                        <tr key={item._id}>
                      
                          <td className="d-flex align-items-center"><span className="ml-3">{item.name}</span></td>
                          <td>{item.email}</td>
                          {item.isVerified? <td><span className="text-center ml-1 text-white px-4 rounded bg-primary">Verified</span></td> :
                          <td><span className="text-center ml-1 text-white px-4 rounded bg-danger">Not Verified</span></td>
                          }
                          
                        
                          <td className="d-flex actionBtn"> 
                            <button type="button" className="btn btn-primary" onClick={() =>handleView(item)}><i className="fa fa-eye actionicon"></i></button>
                            <button type="button" className="btn btn-success" onClick={() =>handleEdit(item)}><i className="fa fa-edit actionicon"></i></button>
                            <button type="button" className="btn btn-danger" onClick={() =>handleDelete(item._id)} ><i className="fa fa-solid fa-trash actionicon"></i>
 
                            </button></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {modalShow && <Editbusiness  show={modalShow} changedField={changedField} setChangedField={setChangedField} modalType={modalType} toggle={toggleModal} editsubmit={editSubmit}/>}

                  <Pagination className="pagination-borderless mt-2" aria-label="Page navigation example">
                    <PaginationItem disabled={firstTableCurrentPage <= 0}>
                      <PaginationLink
                        onClick={e => setFirstTablePage(e, firstTableCurrentPage - 1)}
                        previous
                        href="#top"
                      />
                    </PaginationItem>
                    {[...Array(firstTablePagesCount)].map((page, i) =>
                      <PaginationItem active={i === firstTableCurrentPage} key={i}>
                        <PaginationLink onClick={e => setFirstTablePage(e, i)} href="#top">
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    <PaginationItem disabled={firstTableCurrentPage >= firstTablePagesCount - 1}>
                      <PaginationLink
                        onClick={e => setFirstTablePage(e, firstTableCurrentPage + 1)}
                        next
                        href="#top"
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
  )
}

Tables.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    
    businessDetails: state.business
  };
}

export default connect(mapStateToProps)(Tables);
