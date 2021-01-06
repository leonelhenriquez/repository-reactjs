import { Container, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import ApplicationBar from "./componets/AppBar/ApplicationBar";
import API from "./config/api";
import theme from "./config/theme";
import ErrorView from "./views/ErrorView";
import HomeView from "./views/Home/HomeView";
import LoadingView from "./views/LoadingView";
import LoginView from "./views/Login/LoginView";
import SignoffView from "./views/Signoff/Signoff";
import SignupView from "./views/Signup/SignupView";
import ProfileView from "./views/Profile/ProfileView";
import ResourceView from "./views/ResourceView/ResourceView";
import ListFavoritesView from "./views/List/ListFavorites/ListFavoritesView";
import ListWathlaterView from "./views/List/ListWatchlater/ListWatchlater";
import MyResourcesView from "./views/MyResources/MyResourcesView";

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
        id: 0,
        username: "",
        nombre: "",
        apellido: "",
        email: "",
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
    let token = localStorage.getItem("token");

    if (token != null) {
      axios
        .get(API.baseURL + "rest-auth/user/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data;
            if (typeof data?.username != "undefined") {
              this.setIsLogged(true);
              this.setUserData({
                id: data.pk,
                username: data.username,
                nombre: data.first_name,
                apellido: data.last_name,
                email: data.email,
              });
            } else {
              this.setIsLogged(false);
            }
          }
        })
        .catch((error) => {
          //this.setIsErrorLoad(true);
        })
        .then(() => {
          this.setIsLoading(false);
          this.setIsLoadingAppBar(false);
        });
    } else {
      this.setIsLoading(false);
      this.setIsLoadingAppBar(false);
      this.setIsErrorLoad(false);
    }
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
                <ErrorView controlApp={this.controlApp} />
              ) : this.state.isLoading ? (
                <LoadingView />
              ) : (
                <>
                  <Switch>
                    <Route
                      path={
                        this.state.isLogged
                          ? ["/", "/home", "/resources"]
                          : ["/", "/home"]
                      }
                      exact
                    >
                      <HomeView
                        controlApp={this.controlApp}
                        stateApp={this.state}
                      />
                    </Route>
                    {this.state.isLogged ? (
                      <>
                        <Route path="/signoff">
                          <SignoffView controlApp={this.controlApp} />
                        </Route>
                        <Route path="/profile">
                          <ProfileView
                            controlApp={this.controlApp}
                            stateApp={this.state}
                          />
                        </Route>
                        <Route path="/resource/:resourceId">
                          <ResourceView
                            controlApp={this.controlApp}
                            stateApp={this.state}
                          />
                        </Route>
                        <Route path="/myresources">
                          <MyResourcesView
                            controlApp={this.controlApp}
                            stateApp={this.state}
                          />
                        </Route>
                        <Route path="/list/">
                          <Route path="/list/favorites">
                            <ListFavoritesView
                              controlApp={this.controlApp}
                              stateApp={this.state}
                            />
                          </Route>
                          <Route path="/list/watchlater">
                            <ListWathlaterView
                              controlApp={this.controlApp}
                              stateApp={this.state}
                            />
                          </Route>
                        </Route>
                      </>
                    ) : (
                      <>
                        <Route path="/login">
                          <LoginView controlApp={this.controlApp} />
                        </Route>
                        <Route path="/signup">
                          <SignupView controlApp={this.controlApp} />
                        </Route>
                      </>
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
