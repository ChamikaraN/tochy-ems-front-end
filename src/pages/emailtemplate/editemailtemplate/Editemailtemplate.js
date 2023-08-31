import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
const Editemailtemplate = (props) => {
  const {modalType}= props

  const handleEditorChange = content => {
    // console.log(content);
    props.setChangedField(prev=>({...prev, body:content}))
  };
  return (
    <div>
      <Modal isOpen={props.show} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Edit Template</ModalHeader>
      <ModalBody>
      <div className="row">
  <div className="col-lg-12">
    <div className="">
      
      <div className="">
        <div className="form-validation">
          {modalType==='edit' ? <form className="form-valide">
     
     <div className="form-group row">
       <label className="col-lg-4 col-form-label" >Title:
       </label>
       <div className="col-lg-8">
         <input type="text" className="form-control" id="val-username" name="title" value={props.changedField.title} placeholder="Enter a title.." onChange={(e)=>props.setChangedField(prev=>({...prev, title:e.target.value}))} />
       </div>
     </div>
     <div className="form-group row">
       <label className="col-lg-4 col-form-label" >From:
       </label>
       <div className="col-lg-8">
         <input type="text" className="form-control" id="val-username" name="title" value={props.changedField.emailfrom} placeholder="Enter from.." onChange={(e)=>props.setChangedField(prev=>({...prev, emailfrom:e.target.value}))} />
       </div>
     </div>
     <div className="form-group row">
       <label className="col-lg-4 col-form-label" >Subject:
       </label>
       <div className="col-lg-8">
         <input type="text" className="form-control" id="val-username" name="title" value={props.changedField.subject} placeholder="Enter subject.." onChange={(e)=>props.setChangedField(prev=>({...prev, subject:e.target.value}))} />
       </div>
     </div>

     <div className="form-group row">
     <SunEditor
        // setContents="My contents"
        showToolbar={true}
        onChange={handleEditorChange}
        setDefaultStyle="height: 300"
        height='400'
        setContents={props.changedField.body}
        setOptions={{
          buttonList: [
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "list",
              "align",
              "fontSize",
              "fontColor",
              "link",
              "formatBlock",
              
             
             
            ]
          ]
        }}
      />
     </div>
   



</form>
:
<div>
<div className="form-group row">
       <label className="col-lg-4 col-form-label" >Title:
       </label>
       <div className="col-lg-8">
         <p className="mt-2">{props.changedField.title}</p>
       </div>
     </div>
<div className="form-group row">
       <label className="col-lg-4 col-form-label" >From:
       </label>
       <div className="col-lg-8">
         <p className="mt-2">{props.changedField.emailfrom}</p>
       </div>
     </div>
<div className="form-group row">
       <label className="col-lg-4 col-form-label" >Subject:
       </label>
       <div className="col-lg-8">
         <p className="mt-2">{props.changedField.subject}</p>
       </div>
     </div>

     <div className="form-group row">
       <label className="col-lg-4 col-form-label" >Email Body:
       </label>
       <div className="col-lg-8">
         <p className="mt-2">{props.changedField.body}</p>
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
       {modalType==='edit' &&  <Button color="primary" onClick={props.editsubmit}>
          Submit
        </Button>}
      </ModalFooter>
    </Modal>

</div>
  )
}

export default Editemailtemplate

