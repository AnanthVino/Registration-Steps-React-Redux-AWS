/**
 * 
 * Code implementation
 * @Author Ananth Gunasekarapandiyan
 * @Email ananth1626p@gmail.com
 * 
 */ 


import React from 'react';
import { Route } from 'react-router-dom';
import StepIndicator from '../stepIndicator';
import StepOne from '../stepOne';
import StepTwo from '../stepTwo';
import StepThree from '../stepThree';
import './steps.css';

const Steps = () => {

  return (
    <div className="stepContainer">
      <div className="mainContainer">
        <StepIndicator />
        <div className="output">
          <Route exact path="/">
            <StepOne />
          </Route>
          <Route path="/step2">
            <StepTwo />
          </Route>
          <Route path="/step3">
            <StepThree />
          </Route>
        </div>
      </div>
    </div>
  );
}

export default Steps;