import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {createPersonalData} from '../../store/action/create-personal-info-action';
import axios from 'axios';
import './step-one.css';

const StepOne = (props) => {
  const [name] = useState(props.personal ? props.personal.name : '');
  const [email] = useState(props.personal ? props.personal.email : '');
  const [mobileNumber] = useState(props.personal ? props.personal.mobileNumber : '');
  const [personalAddress1] = useState(props.personal ? props.personal.personalAddress1 : '');
  const [personalAddress2] = useState(props.personal ? props.personal.personalAddress2 : '');
  const [personalAddress3] = useState(props.personal ? props.personal.personalAddress3 : '');
  const [officeData, setOfficeData] = useState({})
  const [imageURL, setImageURl] = useState(null)
  const [signatureURL, setSignatureURL] = useState(null);
  const {
      register,
      handleSubmit,
      formState: { errors }
  } = useForm();
    
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('https://opf6bwohpb.execute-api.us-east-1.amazonaws.com/Dev')
        console.log('response', response)
        setOfficeData(response.data[0].office)
        setSignatureURL(response.data[0].signature.signatureURL)
        setImageURl(response.data[0].image.imageURL)
    }
    fetchData();
  },[])


  const onSubmit = (data) => { 
    if(data){
      let personalData = {
        Id: '12345',
        personal: {
            name: data.name,
            email: data.email,
            mobileNumber: data.mobileNumber,
            personalAddress1: data.personalAddress1,
            personalAddress2: data.personalAddress2,
            personalAddress3: data.personalAddress3
        },
        office: officeData,
        imageURL: imageURL,
        signatureURL: signatureURL
      }
      props.createPersonalData(personalData);
      history.push("/step2")
    }
  };
    
  return (
    <div className="steps d-flex justify-content-center">
      <form className="step-info mx-5 my-5">
        <div className="mb-3 row">
          <label htmlFor="name" className="col-sm-5 personal-form-label">Name</label>
          <div className="col-sm-7">
            <input {...register("name", { required: true, minLength: 8 })} type="text" className="form-control form-text" id="name" defaultValue={name}/>
            {errors.name && <span className="error-message ml-5">This field is required</span>}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="email" className="col-sm-5 personal-form-label">Email</label>
          <div className="col-sm-7">
            <input type="text" className="form-control form-text" id="email" {...register("email", { required: true })} defaultValue={email}/>
            {errors.emailRequired && <span className="error-message ml-5">This field is required</span>}
            </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="number" className="col-sm-5 personal-form-label">Mobile Number</label>
          <div className="col-sm-7">
            <input type="text" className="form-control form-text" id="number" {...register("mobileNumber", { required: true })} defaultValue={mobileNumber}/>
            {errors.numberRequired && <span className="error-message ml-5">This field is required</span>}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="address1" className="col-sm-5 personal-form-label">Address Line 1</label>
          <div className="col-sm-7">
            <input type="text" className="form-control form-text" id="address1" {...register("personalAddress1", { required: true })} defaultValue={personalAddress1}/>
            {errors.address1Required && <span className="error-message ml-5">This field is required</span>}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="address2" className="col-sm-5 personal-form-label">Address Line 2</label>
          <div className="col-sm-7">
            <input type="text" className="form-control form-text" id="address2" {...register("personalAddress2", { required: true })} defaultValue={personalAddress2}/>
            {errors.address2Required && <span className="error-message ml-5">This field is required</span>}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="address3" className="col-sm-5 personal-form-label">Address Line 3</label>
          <div className="col-sm-7">
            <input type="text" className="form-control form-text" id="address3" {...register("personalAddress3", { required: true })} defaultValue={personalAddress3}/>
            {errors.address3Required && <span className="error-message ml-5">This field is required</span>}
          </div>
        </div>
      </form>
      <div className="btnContainer">
        <input type="submit" className="btn btn-color" value="Next" onClick={handleSubmit(onSubmit)}/>
      </div>
    </div>     
  )
}

const mapStateToProps = state => {
    return {
        personal: state.data.personal
    };
};
 
const matchDispatchToProps = dispatch => {
    return bindActionCreators({ createPersonalData: createPersonalData }, dispatch);
};
 
export default connect(mapStateToProps, matchDispatchToProps)(StepOne);