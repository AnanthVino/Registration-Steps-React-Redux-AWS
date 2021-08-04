import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import './step-indicator.css'
const StepIndicator = (props) => {

    const steps = [
        {
            path: "/step1",
            active: 'activeLink'
        },
        {
            path: "/step2",
            active: 'activeLink'
        },
        {
            path: "/step3",
            active: props.office && props.personal ? Object.keys(props.personal).length > 0 &&  Object.keys(props.office).length > 0 ? 'activeLink ' : '' : 'activeLink' 
           }
    ]

    const pageTitle = () => {
        let obj = {}
        if(window.location.pathname === '/step1'){
            obj ={
                pageTitle: 'Personal Info Page',
                pageInfo: 'Personal Info'
            }
        }else if(window.location.pathname === '/step2'){
            obj ={
                pageTitle: 'Office Info Page',
                pageInfo: 'Office Info'
            }
        }else if(window.location.pathname === '/step3'){
            obj ={
                pageTitle: 'Confirmation Info Page',
                pageInfo: 'Confirmation Info'
            }
        }
        return obj;
    }

    const getCurrentPage = (step) => {
        let getCurrentPage = '';
        if(step === window.location.pathname){
            getCurrentPage = 'active-page'
        }else{
            getCurrentPage = 'inactive-page'
        }
        return getCurrentPage
    }

    return (
        <div className="stepIndicator">
            <h1 className="ml-5 text-white">{pageTitle().pageTitle}</h1>
            <div className="step-title d-flex justify-content-between">
                <div className="mt-4 ml-3">{pageTitle().pageInfo}</div>
                <div className="user-toggle d-flex justify-content-between">
                    <span className="mt-2 ml-2 text-white">User</span>
                    <i className="bi bi-justify" style={{fontSize: '2rem', color: '#fff'}} />
                </div>
            </div>
            <div className="step-info-wizard d-flex justify-content-around">
                {steps.map((step, index) => {
                    return (
                        <>
                        <div className="indicator">
                            <NavLink className={step.active} activeClassName='activeLink1' key={index} to={step.path}>{index + 1}</NavLink>
                            <span className="step">{`Step ${index+1}`}</span>
                            
                        </div>
                        <hr className={getCurrentPage(step.path)}/>
                        </>
                    );
                })}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        personal: state.data.personal,
        office: state.data.office
    };
};

export default connect(mapStateToProps, null)(StepIndicator);