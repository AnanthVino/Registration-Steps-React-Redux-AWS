import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createOfficeData } from '../../store/action/create-personal-info-action';
import axios from 'axios';

const StepTwo = (props) => {
  const [Id, setID] = useState('12345')
  const [buildingName, setBuildingName] = useState(props.office ? props.office.buildingName : '');
  const [city, setCity] = useState(props.office ? props.office.city : '');
  const [landlineNumber, setLandlineNumber] = useState(props.office ? props.office.landlineNumber : '');
  const [address1, setAddress1] = useState(props.office ? props.office.address1 : '');
  const [address2, setAddress2] = useState(props.office ? props.office.address2 : '');
  const [boxNumber, setBoxNumber] = useState(props.office ? props.office.boxNumber : '');
  const [personalData, setPersonalData] = useState({})
  const [imageURL, setImageURl] = useState(null)
  const [signatureURL, setSignatureURL] = useState(null);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
    
  const handleBackStep2 = () => {
    history.push("/step1")
  }
    
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://opf6bwohpb.execute-api.us-east-1.amazonaws.com/Dev')
      console.log('response personal', response)
      setPersonalData(response.data[0].personal)
      setSignatureURL(response.data[0].signature.signatureURL)
      setImageURl(response.data[0].image.imageURL)
    }
    fetchData();
  },[])

  const onSubmit = (data) => { 
    if(data){
      let officeData = {
        Id: '12345',
        office: { 
          buildingName: data.buildingName,
          city: data.city,
          landlineNumber: data.landlineNumber,
          address1: data.address1,
          address2: data.address2,
          boxNumber: data.boxNumber
        },
        personal: personalData,
        imageURL: imageURL,
        signatureURL: signatureURL
      }
      props.createOfficeData(officeData);
      history.push("/step3")
    }
  };
  return (
    <div className="steps d-flex justify-content-center">
      <div className="step-info mx-5 my-5">
        <div className="mb-3 row">
          <label htmlFor="building-name" className="col-sm-5 col-form-label">Building Name</label>
          <div className="col-sm-7">
            <input type="text" className="form-control form-text" id="building-name" {...register("buildingName", { required: true })} defaultValue={buildingName}/>
            {errors.buildingName && <span className="error-message ml-5">This field is required</span>}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="city-area" className="col-sm-5 col-form-label">City/Area</label>
          <div className="col-sm-7">
            <input type="text" className="form-control form-text" id="city-area" {...register("city", { required: true })} defaultValue={city}/>
            {errors.city && <span className="error-message ml-5">This field is required</span>}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="landline-number" className="col-sm-5 col-form-label">Landline Number</label>
          <div className="col-sm-7">
            <input type="text" className="form-control form-text" id="landline-number" {...register("landlineNumber", { required: true })} defaultValue={landlineNumber}/>
            {errors.landlineNumber && <span className="error-message ml-5">This field is required</span>}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="address1" className="col-sm-5 col-form-label">Address Line 1</label>
          <div className="col-sm-7">
            <input type="text" className="form-control form-text" id="address1" {...register("address1", { required: true })} defaultValue={address1}/>
            {errors.address1 && <span className="error-message ml-5">This field is required</span>}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="address2" className="col-sm-5 col-form-label">Address Line 2</label>
          <div className="col-sm-7">
            <input type="text" className="form-control form-text" id="address2" {...register("address2", { required: true })} defaultValue={address2}/>
            {errors.address2 && <span className="error-message ml-5">This field is required</span>}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="po-box-number" className="col-sm-5 col-form-label">PO Box Number</label>
          <div className="col-sm-7">
            <input type="text" className="form-control form-text" id="po-box-number" {...register("boxNumber", { required: true })} defaultValue={boxNumber}/>
            {errors.boxNumber && <span className="error-message ml-5">This field is required</span>}
          </div>
        </div>
      </div>
      <div className="btnContainer">
        <button className="btn btn-color mr-4" onClick={handleBackStep2}>Back</button>
        <input type="submit" className="btn btn-color" value="Next" onClick={handleSubmit(onSubmit)} />
      </div>
    </div>     
  )
}

const mapStateToProps = state => {
  return {
    office: state.data.office,
    personal: state.data.personal
  };
};
 
const matchDispatchToProps = dispatch => {
  return bindActionCreators({ createOfficeData: createOfficeData }, dispatch);
};
 
export default connect(mapStateToProps, matchDispatchToProps)(StepTwo);