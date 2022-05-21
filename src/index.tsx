import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import { context } from "@reatom/react"


ReactDOM.render(
  <React.StrictMode>
    <context.Provider value={store}>
      <App />
    </context.Provider>
  </React.StrictMode>,
    document.getElementById('root') as HTMLElement
);
