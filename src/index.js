import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'babel-polyfill';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import diplomeReducer from './reducer/reducer-diplome';
import "./dist/css/adminlte.css";
import "./dist/css/all.min.css";
// import "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bulma/css/bulma.css";

const store = configureStore({
  reducer: {
    diplomes: diplomeReducer,
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
