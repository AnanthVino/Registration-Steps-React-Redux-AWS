/**
 * 
 * Code implementation
 * @Author Ananth Gunasekarapandiyan
 * @Email ananth1626p@gmail.com
 * 
 */

import React, { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './success.css';

const Success = () => {

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://opf6bwohpb.execute-api.us-east-1.amazonaws.com/Dev')
            let data = response.data[0]
            
            Swal.fire({
                title: 'Success',
                text: "Your application has been submitted.",
                icon: 'success',
                confirmButtonColor: '#d33',
                confirmButtonText: '<a href="/">OK</a>'
            })

            if(data) {
                await axios.delete('https://opf6bwohpb.execute-api.us-east-1.amazonaws.com/Dev', { Id: data.Id, ...data.personal, ...data.office, ...data.image, ...data.signature })
                localStorage.removeItem("state");
            }
        }
        fetchData();
    },[]) 

    return (
        <div className="mainContainer">
            <div className="stepIndicator">
                <h1 className="ml-5 text-white">Registration Success</h1>
                <div className="success-screen d-flex justify-content-between">
                </div>
            </div>
        </div> 
    )
}

export default Success;
