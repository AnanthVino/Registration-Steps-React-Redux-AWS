/**
 * 
 * Code implementation
 * @Author Ananth Gunasekarapandiyan
 * @Email ananth1626p@gmail.com
 * 
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createImageData } from '../../store/action/create-personal-info-action';
import axios from 'axios';
import './imageUpload.css'
class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: null,
      personalData: {},
      officeData: {},
      signature: null
    };

    this.onImageChange = this.onImageChange.bind(this);
  }

  async componentDidMount() {
    const response = await axios.get('https://opf6bwohpb.execute-api.us-east-1.amazonaws.com/Dev')
    if(response.data[0]){
      this.setState({imageURL: response.data[0].image.imageURL})
    }
  }

  onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];

      const response = await axios.get('https://opf6bwohpb.execute-api.us-east-1.amazonaws.com/Dev')
      this.setState({
        personalData: response.data[0].personal,
        officeData: response.data[0].office,
        signature: response.data[0].signature.signatureURL,
        imageURL:  URL.createObjectURL(img)
      })

      let imageData = {
        Id: '12345',
        signatureURL: this.state.signature,
        personal: this.state.personalData,
        office: this.state.officeData,
        imageURL: this.state.imageURL
      }
        this.props.createImageData(imageData);
      }
  };

  render() {
    return (
      <div className="sig-box d-flex justify-content-between">
        {this.state.imageURL ? 
          <img src={this.state.imageURL} alt='' className="p-2"/>
          :
          <i className="bi bi-person" style={{fontSize: '4rem', color: '#000'}}></i>
        }
          <div className="d-flex flex-column pr-3">
            <i className="bi bi-camera" style={{fontSize: '2rem', color: '#000'}}>
            </i>
            <i className="bi bi-folder2 upload-file" style={{fontSize: '2rem', color: '#000'}}>
              <input type="file" onChange={evt => this.onImageChange(evt)}/>
            </i>
          </div>
      </div>  
    );
  }
}

const mapStateToProps = state => {
  return {
      personal: state.data.personalData
  };
};

const matchDispatchToProps = dispatch => {
  return bindActionCreators({ createImageData: createImageData }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(ImageUpload);