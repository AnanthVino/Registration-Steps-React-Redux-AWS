import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import loadable from '@loadable/component'

const Steps = loadable(() => import('./components/steps/index.js'))
const Success = loadable(() => import('./components/success/index.js'))

const App = () => {
  return (
    <Router>
      <Route path="/step1" exact component={Steps}/>
      <Route path="/step2" component={Steps}/>
      <Route path="/step3" component={Steps}/>
      <Route path="/success" component={Success}/>
    </Router>
  );
}

export default App;
