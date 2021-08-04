import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import setPersonalReducer from './store/reducer/create-personal-info-reducer';
import './index.css';
import App from './App';

const saveToLocalStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (e) {
      console.log(e)
    }
  };
  
  const loadFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if(serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };
  
  const peristedState = loadFromLocalStorage();
  
  const store = createStore(setPersonalReducer, peristedState, applyMiddleware(thunk));
  
  store.subscribe(() => {
    saveToLocalStorage(store.getState());
  });

ReactDOM.render(
  <Provider store={store}>
      <React.StrictMode>
          <App/>
      </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);