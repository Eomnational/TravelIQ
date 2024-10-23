import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext'; // 确保路径正确
import { DataProvider } from './Components/DataContext'; // 引入 DataProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>      
    <AuthProvider>
      <DataProvider> 
        <App />
      </DataProvider>
    </AuthProvider>
  </BrowserRouter>
);

reportWebVitals();

