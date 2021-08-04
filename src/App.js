import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Steps from './components/steps';
import Success from './components/success';

const App = () => {
  return (
    <Router>
      <Route path="/step1" exact component={Steps} title='Personal Info Page'/>
      <Route path="/step2" component={Steps} title='Office Info Page'/>
      <Route path="/step3" component={Steps} title='Confirmation Page' />
      <Route path="/success" component={Success} title='Registration Success'/>
    </Router>
  );
}

export default App;
