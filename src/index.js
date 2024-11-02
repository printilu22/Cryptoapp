import React from 'react';
import ReactDOM from 'react-dom/client';  // Import createRoot
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import store from './app/store';

import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Initialize root

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
