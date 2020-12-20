import React from "react";
import API from "../../config/api";
import LoadingView from "../LoadingView";

const axios = require("axios");

class SignoffView extends React.Component {
  constructor(props) {
    super(props);
    this.props.controlApp.setShowTabMenu(false);
  }

  componentDidMount() {
    this.closeSession();
  }

  closeSession = async () => {
    let token = localStorage.getItem("token");
    if (token != null) {
      axios
        .post(API.baseURL + "rest-auth/logout/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then(() => {
          this.resetView();
        })
        .catch((error) => {});
      localStorage.removeItem("token");
      localStorage.clear();
    } else {
      this.resetView();
    }
  };

  resetView = () => {
    this.props.controlApp.setShowTabMenu(false);
    this.props.controlApp.setIsLoading(true);
    this.props.controlApp.historyPush("/home");
    this.props.controlApp.history.go(0);
  };

  render() {
    return <LoadingView />;
  }
}

export default SignoffView;
