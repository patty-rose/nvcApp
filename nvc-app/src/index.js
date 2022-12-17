import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//MATERIAL-UI 
import {ThemeProvider} from '@mui/material';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

console.log(theme);

root.render(
  <React.StrictMode>
    <ThemeProvider theme = {theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

