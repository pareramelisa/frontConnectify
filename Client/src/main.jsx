import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from "./redux/store.js";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme/index.js';
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        
        <App />
       
      </ThemeProvider>
      </BrowserRouter>
  </Provider>
);
