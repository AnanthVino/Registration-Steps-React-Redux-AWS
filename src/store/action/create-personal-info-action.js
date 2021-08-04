/**
 * 
 * Code implementation
 * @Author Ananth Gunasekarapandiyan
 * @Email ananth1626p@gmail.com
 * 
 */

import axios from 'axios';

const createPersonalData = (data) => {
  return async dispatch => { 
    return await axios.put(`https://opf6bwohpb.execute-api.us-east-1.amazonaws.com/Dev`, { ...data.personal, ...data.office, imageURL:data.imageURL, signatureURL: data.signatureURL, }) 
    .then((res) => {
      console.log('put data personal', res) 
      dispatch({
        type: 'CREATEPERSONALDETAILS',
        data: res.data.response
      })
    })
  }
}

const createOfficeData = (data) => {
 return async dispatch => {
    return await axios.put(`https://opf6bwohpb.execute-api.us-east-1.amazonaws.com/Dev`,{ ...data.personal, ...data.office, imageURL:data.imageURL, signatureURL: data.signatureURL }) 
    .then((res) => {
      console.log('put data office', res.data.response) 
      dispatch({
         type: 'CREATEOFFICEDETAILS',
         data: res.data.response
      })
    })
  }
}

const createSignatureData = (data) => {
 return async dispatch => { 
    return await axios.put(`https://opf6bwohpb.execute-api.us-east-1.amazonaws.com/Dev`, { ...data.office, ...data.personal, imageURL:data.imageURL, signatureURL: data.signatureURL }) 
    .then((res) => {
      console.log('put data signature', res) 
      dispatch({
        type: 'CREATESIGNATUREURL',
        data: res.data.response
      })
    })
  }
}

const createImageData = (data) => {
 return async dispatch => { 
     return await axios.put(`https://opf6bwohpb.execute-api.us-east-1.amazonaws.com/Dev`, { ...data.personal, ...data.office, imageURL:data.imageURL, signatureURL: data.signatureURL }) 
     .then((res) => {
         console.log('put data image', res) 
       dispatch({
        type: 'CREATEIMAGEURL',
        data: res.data.response
       })
    })
  }
}

export {
  createPersonalData,
  createOfficeData,
  createSignatureData,
  createImageData
}