import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import "fontsource-roboto";
import 'bootstrap/dist/css/bootstrap.css';
import "./fonts/SansitaSwashed-VariableFont_wght.ttf";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0C1B33",
      contrastText: '#fff'
    },
    secondary: {
      main: "#03B5AA",
      contrastText: '#fff'
    },
  },
  typography: {
    fontFamily: [
      'Nunito',
    ].join(','),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

