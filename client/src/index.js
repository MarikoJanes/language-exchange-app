import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
// import './index.css';
import "./App.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import actionCable from "actioncable";

const CableApp = {}
CableApp.cable = actionCable.createConsumer("ws://localhost:3000/cable")
export const ActionCableContext = createContext();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ActionCableContext.Provider value={CableApp.cable} >
      <App />
    </ActionCableContext.Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
