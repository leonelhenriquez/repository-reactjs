import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import ApplicationBar from "./componets/ApplicationBar";
import theme from "./config/theme";
import About from "./views/About";
import Error from "./views/Error";
import Home from "./views/Home";

const styleApp = {
  wrapper: {
    marginTop: 64,
  }
}

const App = () => (
  <ThemeProvider theme={theme}>
    <div className="maincontainer">
      <ApplicationBar />
      <div className="wrapper" style={styleApp.wrapper}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} exact />
          <Route component={Error} />
        </Switch>
      </div>
    </div>
  </ThemeProvider>
);

export default App;
