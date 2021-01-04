import React from "react";
import { withRouter } from "react-router-dom";
import ItemResource from "../../componets/Items/ItemResource";
import API from "../../config/api";

const axios = require("axios");

class ResourceView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataResource: {},
    };
  }

  componentDidMount() {
    this.props.controlApp.setShowTabMenu(false);
    this.loadResource();
  }

  loadResource = async () => {
    axios({
      method: "GET",
      url:
        API.baseURL +
        `recurso/recurso-detail/${parseInt(
          this.props.match.params.resourceId
        )}/`,
    }).then((response) => {
      let data = response.data;
      if (response.status === 200 && typeof data?.id != "undefined") {
        data.imagen =
          API.baseURL.substring(0, API.baseURL.length - 1) +
          data.imagen.replace("/download/", "/get/");
        data.archivo =
          API.baseURL.substring(0, API.baseURL.length - 1) +
          data.archivo.replace("/download/", "/get/");
        this.setState({ dataResource: data });
      }
    });
  };

  render() {
    if (typeof this.state.dataResource.id != "undefined") {
      return <ItemResource resource={this.state.dataResource} showAll />;
    } else {
      return <div>No se encontro el recurso</div>;
    }
  }
}

export default withRouter(ResourceView);
