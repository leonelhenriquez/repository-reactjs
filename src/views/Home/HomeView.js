import React from "react";
import HomeLoggedView from "./HomeLoggedView";
import HomeNoLoggedView from "./HomeNoLoggedView";

const HomeView = (props) => {
  if (props.stateApp.isLogged) {
    return <HomeLoggedView controlApp={props.controlApp} />;
  } else {
    return <HomeNoLoggedView controlApp={props.controlApp} />;
  }
};

export default HomeView;