import React from 'react';
import ReactDOM from 'react-dom/client'; // Cập nhật import
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

// Lấy root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render ứng dụng
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
