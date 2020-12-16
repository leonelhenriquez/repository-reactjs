import { Container, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import ApplicationBar from "./componets/AppBar/ApplicationBar";
import theme from "./config/theme";
import ErrorView from "./views/ErrorView";
import HomeView from "./views/HomeView";
import LoadingView from "./views/LoadingView";
import LoginView from "./views/LoginView";

const axios = require("axios");

const styleApp = {
  mainContainer: {
    paddingTop: 88,
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      isLoading: true,
      isLoadingAppBar: true,
      isErrorLoad: false,
      showTabMenu: false,
      tabMenuPosition: 0,
      userData: {
        username: "",
        nombre: "",
        apellido: "",
      },
    };

    this.controlApp = {
      setIsLogged: this.setIsLogged,
      setIsLoading: this.setIsLoading,
      setIsLoadingAppBar: this.setIsLoadingAppBar,
      setIsErrorLoad: this.setIsErrorLoad,
      setUserData: this.setUserData,
      setTabMenuPosition: this.setTabMenuPosition,
      setShowTabMenu: this.setShowTabMenu,
      historyPush: this.historyPush,
      history: this.props.history,
    };
  }
  setIsLogged = (logged) => this.setState({ isLogged: logged });
  setIsLoading = (loading) => this.setState({ isLoading: loading });
  setIsLoadingAppBar = (loading) => this.setState({ isLoadingAppBar: loading });
  setIsErrorLoad = (iserror) => this.setState({ isErrorLoad: iserror });
  setUserData = (data) => this.setState({ userData: data });
  setTabMenuPosition = (position) => {
    this.setState({ tabMenuPosition: position });
  };
  setShowTabMenu = (show) => this.setState({ showTabMenu: show });

  historyPush = (url) => this.props.history.push(url);

  loadUser = async () => {
    axios
      .get("http://repository.nan/login/check")
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;
          if (typeof data?.logged != "undefined" && data.logged) {
            this.setIsLogged(true);
            this.setUserData({
              username: data.username,
              nombre: data.nombre,
              apellido: data.apellido,
            });
          } else {
            this.setIsLogged(false);
          }
        }
      })
      .catch((error) => {
        this.setIsErrorLoad(true);
      })
      .then(() => {
        this.setIsLoading(false);
        this.setIsLoadingAppBar(false);
      });
  };
  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate() {
    let appBarElement = document.getElementsByClassName("appbar__main")[0];
    let mainContainerElement = document.getElementsByClassName(
      "mainContainer"
    )[0];

    if (
      typeof mainContainerElement != "undefined" &&
      typeof appBarElement != "undefined"
    ) {
      mainContainerElement.style.paddingTop = appBarElement.clientHeight + "px";
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <CssBaseline />
          <ApplicationBar stateApp={this.state} controlApp={this.controlApp} />
          <div className="mainContainer" style={styleApp.mainContainer}>
            <Container>
              {this.state.isErrorLoad ? (
                <ErrorView controlApp={this.controlApp}  />
              ) : this.state.isLoading ? (
                <LoadingView />
              ) : (
                <>
                  <Switch>
                    <Route path={["/", "/home"]} exact>
                      <HomeView controlApp={this.controlApp} />
                    </Route>
                    {this.state.isLogged ? (
                      ""
                    ) : (
                      <Route path="/login">
                        <LoginView controlApp={this.controlApp} />
                      </Route>
                    )}
                    <Route>
                      <ErrorView controlApp={this.controlApp} />
                    </Route>
                  </Switch>
                </>
              )}
            </Container>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
