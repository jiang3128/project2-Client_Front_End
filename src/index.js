import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//available access to child directory
import{Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

