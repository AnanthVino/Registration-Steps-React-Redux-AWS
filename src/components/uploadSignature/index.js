import React, { useState, useRef, useEffect } from "react";
import SignaturePad from "react-signature-canvas";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createSignatureData } from '../../store/action/create-personal-info-action';
import axios from 'axios';

const UploadSignature = (props) => {
    const [imageURL, setImageURl] = useState(null)
    const [signatureURL, setSignatureURL] = useState(null);
    const [officeData, setOfficeData] = useState({})
    const [personalData, setPersonalData] = useState({})
    const sigCanvas = useRef({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://opf6bwohpb.execute-api.us-east-1.amazonaws.com/Dev')
            console.log('response singature', response)
            setPersonalData(response.data[0].personal)
            setOfficeData(response.data[0].office)
            setSignatureURL(response.data[0].signature.signatureURL)
            setImageURl(response.data[0].image.imageURL)
        }
        fetchData();
    },[])

    const getSignatureURL = () => {
        let signatureData = {
            Id: '12345',
            signatureURL: sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"),
            personal: personalData,
            office: officeData,
            imageURL: imageURL
        }
        props.createSignatureData(signatureData);
        setSignatureURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    }

    return (
        <div onBlur={getSignatureURL} tabIndex="0">
            {signatureURL ?  
                <img src={signatureURL} alt='' className="p-2"/>
            :
            <SignaturePad
                ref={sigCanvas}
                canvasProps={{width: 200, height: 100}}
            />}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        data: state.data
    };
};
 
const matchDispatchToProps = dispatch => {
    return bindActionCreators({ createSignatureData: createSignatureData }, dispatch);
};
 
export default connect(mapStateToProps, matchDispatchToProps)(UploadSignature);
