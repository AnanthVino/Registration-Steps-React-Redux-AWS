import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import './success.css';

const Success = () => {

    useEffect(() => {
        const fetchData = async () => {
            Swal.fire({
                title: 'Success',
                text: "Your application has been submitted.",
                icon: 'success',
                confirmButtonColor: '#d33',
                confirmButtonText: '<a className="ananth" href="/step1">OK</a>'
            })
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
