/**
 * 
 * Code implementation
 * @Author Ananth Gunasekarapandiyan
 * @Email ananth1626p@gmail.com
 * 
 */


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import ImageUpload from "../imageUpload";
import UploadSignature from '../uploadSignature';
import './step-three.css';
let renderState;
const StepThree = (props) => {
    const [rakData, setRakData] = useState({})
    const [imageURL, setImageURl] = useState(null)
    const [signatureURL, setSignatureURL] = useState(null);
    const history = useHistory();

    const handleBackStep3 = () => {
        history.push("/step2")
    }

    const handleSuccess = () => {
      if(imageURL && signatureURL){
        history.push("/success")
      }
    }

    useEffect(() => {
      renderState = setInterval(() => {
        const fetchData = async () => {
          const response = await axios.get('https://opf6bwohpb.execute-api.us-east-1.amazonaws.com/Dev')
          if(response.data[0]){
            setRakData(response.data[0])
            setSignatureURL(response.data[0].signature.signatureURL)
            setImageURl(response.data[0].image.imageURL)
          }
      }
      fetchData();
      }, 300);
    }, []);
  
    useEffect(() => {
      if (Object.keys(rakData).length > 0) {
        clearInterval(renderState);
      }
    }, [rakData]);
    
    return (
      props.data ?
        <div className="steps">
          <div className="row mt-5">
            <div className="col ml-5">
              <p>{props.data.personal? props.data.personal.name : ''}</p>
              <p>{props.data.personal?props.data.personal.email : ''}</p>
              <p>{props.data.personal?props.data.personal.mobileNumber : ''}</p>
              <p>{props.data.personal?props.data.personal.personalAddress1 : ''}</p>
              <p>{props.data.personal?props.data.personal.personalAddress2 : ''}</p>
              <p>{props.data.personal?props.data.personal.personalAddress3 : ''}</p>
            </div>
            <div className="col">
              <p>{props.data.office ? props.data.office.buildingName : ''}</p>
              <p>{props.data.office ? props.data.office.city : ''}</p>
              <p>{props.data.office ? props.data.office.landlineNumber : ''}</p>
              <p>{props.data.office ? props.data.office.address1 : ''}</p>
              <p>{props.data.office ? props.data.office.address2 : ''}</p>
              <p>{props.data.office ? props.data.office.boxNumber : ''}</p>
            </div>
            <div className="col">
              <ImageUpload />
              <span className="image-error">{imageURL ? '' : 'Upload your image'}</span>
              <div className="sig-box mt-5">
                <UploadSignature />
                <span className="sig-error">{signatureURL ? '' : 'Uploar your signature'}</span>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center my-5 col-sm-12">
            <button className="btn btn-secondary mr-5 rounded-0" onClick={handleBackStep3}>Back</button>
            <button type="submit" className="btn btn-color ml-5 rounded-0" onClick={handleSuccess}>Submit</button>
        </div>
      </div>
    : null
  )
}

const mapStateToProps = state => {
    return {
      data: state.data,
  };
};
 
export default connect(mapStateToProps, null)(StepThree);