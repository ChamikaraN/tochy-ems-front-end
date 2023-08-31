import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const Editbusiness = (props) => {
  const {modalType, changedField}= props
  return (
    <div>
      <Modal isOpen={props.show} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Edit Business</ModalHeader>
      <ModalBody>
      <div className="row pt-2">
  <div className="col-lg-12">
    <div className="">
      
      <div className="d-flex justify-content-center align-items-center">
        <div className="form-validation">
         {modalType==='edit'||modalType==='add'? <form className="form-valide" >
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" >Owner name:
                  </label>
                  <div className="col-lg-8">
                    <input type="text" className={changedField.name?"form-control havevalue": "form-control"} id="val-username" name="name" placeholder="Enter a ownername" value={props.changedField.name}  onChange={(e)=>props.setChangedField(prev=>({...prev, name:e.target.value}))} required />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" >Business name:
                  </label>
                  <div className="col-lg-8">
                    <input type="text" className={changedField.businessname?"form-control havevalue": "form-control"} id="val-username" name="val-username" placeholder="Enter a business name" value={props.changedField.businessname} onChange={(e)=>props.setChangedField(prev=>({...prev, businessname:e.target.value}))} />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" >Phone No:
                  </label>
                  <div className="col-lg-8">
                    <input type="text" className={changedField.phone?"form-control havevalue": "form-control"} id="val-username" name="val-username" placeholder="Enter a mobile no." value={props.changedField.phone} onChange={(e)=>props.setChangedField(prev=>({...prev, phone:e.target.value}))}/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="val-email">Email:
                  </label>
                  <div className="col-lg-8">
                    <input type="email" className={changedField.email?"form-control havevalue": "form-control"} id="val-email" name="val-email" placeholder="Your valid email" value={props.changedField.email}  onChange={(e)=>props.setChangedField(prev=>({...prev, email:e.target.value}))} required/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="val-suggestions">Address:
                  </label>
                  <div className="col-lg-8">
                    <textarea className={changedField.address?"form-control havevalue": "form-control"} id="val-suggestions" name="val-suggestions" rows={5} placeholder="Enter address" value={props.changedField.address} onChange={(e)=>props.setChangedField(prev=>({...prev, address:e.target.value}))}/>
                  </div>
                </div>
                

            
              </div>
             
            </div>
          </form>
          :
          <div>
          <div className="form-group row">
                 <label className="col-lg-4 col-form-label" ><span className="badge badge-info">Name:</span>
                 </label>
                 <div className="col-lg-8">
                   <p className="mt-2 badge badge-dark">{props.changedField.name}</p>
                 </div>
               </div>
          
               <div className="form-group row">
                 <label className="col-lg-4 col-form-label" ><span className="badge badge-info">Email:</span>
                 </label>
                 <div className="col-lg-8">
                   <p className="mt-2 badge badge-dark">{props.changedField.email}</p>
                 </div>
               </div>
               <div className="form-group row">
                 <label className="col-lg-4 col-form-label" ><span className="badge badge-info ">Phone:</span>
                 </label>
                 <div className="col-lg-8">
                   <p className="mt-2 ">{props.changedField.phone? <span className="badge badge-dark">{ props.changedField.phone}</span> : <span className="badge badge-pill badge-secondary">Not Added</span> }</p>
                 </div>
               </div>
          </div>}
        </div>
      </div>
    </div>
  </div>

</div>
      </ModalBody>
      <ModalFooter>
       
        <Button color="secondary" onClick={props.toggle}>
          {modalType==='edit' ?'Cancel' : 'Close'}
        </Button>{' '}
       {modalType !=='view' &&  <Button color="primary" onClick={modalType==='edit'?props.editsubmit : props.addSubmit&& props.addSubmit}>
          Submit
        </Button>}
      </ModalFooter>
    </Modal>

</div>
  )
}

export default Editbusiness
