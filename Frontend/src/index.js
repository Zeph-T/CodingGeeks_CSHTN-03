import React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.css";

const theme = createMuiTheme({
  props: {
    MuiPaper: {
      elevation: 0,
      square: false,
      variant: "outlined"
    }
  },
  palette: {
    primary: { main: "#3A36DB" },
    text: { primary: "#555" }
  },
  typography: {
    fontFamily: [
      'Nunito Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    useNextVariants: true
  }
})



render(
  <MuiThemeProvider theme={theme} >
      <Router>
        <Route path='/' component={App} />
      </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);