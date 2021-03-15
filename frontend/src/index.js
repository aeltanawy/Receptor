import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { createStore, compose, applyMiddleware } from 'redux';

// import thunk from 'redux-thunk';

// import reducer from './reducers/auth';


// const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const store = createStore(reducer, composeEnhances(
//   applyMiddleware(thunk)
// ));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
