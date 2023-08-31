import React, { useState } from 'react'
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { addTemplate } from '../../../actions/template'
import { useHistory } from 'react-router';
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { toast } from 'react-toastify';

function Editbusiness(props) {
  const [updateData, setUpdataData]= useState({title:'',emailfrom:'',subject:'', body:''})
const history = useHistory()

  const submitHandler = (e) =>{
    e.preventDefault()
    if (!updateData.title || !updateData.emailfrom || !updateData.subject || !updateData.body) {
      toast.error('Please Fill all the fields')
      return
    }
     props.dispatch(addTemplate(updateData))
    
    setUpdataData({title:'',emailfrom:'',subject:'', body:''})
    history.push('/template/viewallemailtemplates')
  }
  const handleEditorChange = content => {
    // console.log(content);
    setUpdataData(prev=>({...prev, body:content}))
  };

  return (
    <div>
         <div className="row justify-content-center">
  <div className="col-lg-8">
    <div className="card">
      
      <div className="card-body">
        <div className="form-validation">
          <form className="form-valide" onSubmit={(e)=>submitHandler(e)}>
            <div className="row">
              <div className="col-xl-12">
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" >Title:
                  </label>
                  <div className="col-lg-8">
                    <input type="text" className="form-control" id="val-username" name="title" placeholder="Enter a title.." value={updateData.title} onChange={(e)=>setUpdataData(prev=>({...prev, title:e.target.value}))}  />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" >From:
                  </label>
                  <div className="col-lg-8">
                    <input type="email" className="form-control" id="val-username" name="emailfrom" placeholder="Enter email.." value={updateData.emailfrom} onChange={(e)=>setUpdataData(prev=>({...prev, emailfrom:e.target.value}))} />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label" >Subject:
                  </label>
                  <div className="col-lg-8">
                    <input type="text" className="form-control" id="val-username" name="subject" placeholder="Enter mail subject.." value={updateData.subject} onChange={(e)=>setUpdataData(prev=>({...prev, subject:e.target.value}))} />
                  </div>
                </div>

                <div className="form-group row">
                  {/* <label className="col-lg-4 col-form-label" htmlFor="val-suggestions">Description: 
                  </label>
                  <div className="col-lg-8">
                    <textarea className="form-control" id="val-suggestions" name="val-suggestions" rows={5} placeholder="What would you like to see?" value={updateData.body} onChange={(e)=>setUpdataData(prev=>({...prev, body:e.target.value}))} />
                  </div> */}

<SunEditor
        // setContents="My contents"
        showToolbar={true}
        onChange={handleEditorChange}
        setDefaultStyle="height: 300"
        height='400'
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
         
          
                <div className="form-group d-flex justify-content-center">

                <button className="btn btn-primary rounded-pill mx-auto logout-btn" type="submit" ><span className="ml-1">Submit</span></button>
                  
                </div>
             </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</div>
</div>
  )
}

Editbusiness.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    
    templateDetails: state.template
  };
}

export default connect(mapStateToProps)(Editbusiness);

