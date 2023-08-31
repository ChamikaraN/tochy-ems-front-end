import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const EditDomain = (props) => {
    const {modalType}= props
  return (
    <div>
      <Modal isOpen={props.show} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Add Domain</ModalHeader>
      <ModalBody>
      <div className="row pt-2">
  <div className="col-lg-12">
    <div className="">
      
      <div className="d-flex justify-content-center align-items-center">
        <div className="form-validation">
          {modalType==='edit'||modalType==='add'? <form className="form-valide" action="#" method="post">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" >Domain name:
                  </label>
                  <div className="col-lg-8">
                    <input type="text" className="form-control" id="val-username" name="val-username" placeholder="Enter domain name.." value={props.changedField.domainName}  onChange={(e)=>props.setChangedField(prev=>({...prev, domainName:e.target.value}))} required/>
                  </div>
                </div>
                
                
                
                {/* <div className="form-group row">
                  <label className="col-lg-4 col-form-label" htmlFor="val-suggestions">Address:
                  </label>
                  <div className="col-lg-8">
                    <textarea className="form-control" id="val-suggestions" name="val-suggestions" rows={5} placeholder="Enter address" defaultValue={""} />
                  </div>
                </div> */}
                

            
              </div>
             
            </div>
          </form>
          :
          <div>
<div className="form-group row">
       <label className="col-lg-4 col-form-label" >Domain Name:
       </label>
       <div className="col-lg-8">
         <p className="mt-2">{props.changedField.domainName}</p>
       </div>
     </div>

     
    
</div>
 }
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
       {modalType !=='view' &&  <Button color="primary" onClick={modalType==='edit'?props.editsubmit : props.addSubmit}>
          Submit
        </Button>}
      </ModalFooter>
    </Modal>

</div>
  )
}

export default EditDomain
