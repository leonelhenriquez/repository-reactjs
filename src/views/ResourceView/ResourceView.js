import React from "react";
import { withRouter } from "react-router-dom";
import ErrorVoidView from "../../componets/Items/ErrorVoidView";
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

  updateStateDataSource = () =>
    this.setState({ dataResource: this.state.dataResource });

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
      let dataResource = {};
      if (response.status === 200 && typeof data?.id != "undefined") {
        data.imagen =
          API.baseURL.substring(0, API.baseURL.length - 1) +
          data.imagen.replace("/download/", "/get/");
        data.archivo =
          API.baseURL.substring(0, API.baseURL.length - 1) +
          data.archivo.replace("/download/", "/get/");
        data.deleted = false;
        data.isfavorite = false;
        data.iswatchlater = false;
        dataResource.recurso = data;
        this.setState({ dataResource: dataResource });
        this.checkResourcesFavorites();
        this.checkResourcesWatchlater();
      }
    });
  };

  checkResourcesFavorites = async () => {
    axios({
      method: "GET",
      url:
        API.baseURL +
        `lista/lista-detail/${this.props.stateApp.userData.id}/1/${this.state.dataResource.recurso.id}/`,
    }).then((response) => {
      let data = response.data;
      console.log(response);
      if (response.status === 200 && typeof data?.id != "undefined") {
        this.state.dataResource.recurso.isfavorite = true;
        this.state.dataResource.favorito = {};
        this.state.dataResource.favorito.id = data.id;
        this.state.dataResource.favorito.fecha = data.fecha;
        this.state.dataResource.favorito.usuario = data.usuario;
        this.state.dataResource.favorito.tipo = data.tipo;
        this.updateStateDataSource();
        console.log(this.state.dataResource);
      }
    });
  };

  checkResourcesWatchlater = async () => {
    axios({
      method: "GET",
      url:
        API.baseURL +
        `lista/lista-detail/${this.props.stateApp.userData.id}/2/${this.state.dataResource.recurso.id}/`,
    }).then((response) => {
      let data = response.data;
      console.log(response);
      if (response.status === 200 && typeof data?.id != "undefined") {
        this.state.dataResource.recurso.iswatchlater = true;
        this.state.dataResource.watchlater = {};
        this.state.dataResource.watchlater.id = data.id;
        this.state.dataResource.watchlater.fecha = data.fecha;
        this.state.dataResource.watchlater.usuario = data.usuario;
        this.state.dataResource.watchlater.tipo = data.tipo;
        this.updateStateDataSource();
        console.log(this.state.dataResource);
      }
    });
  };

  render() {
    if (typeof this.state.dataResource.recurso?.id != "undefined") {
      return (
        <ItemResource
          resource={this.state.dataResource}
          stateApp={this.props.stateApp}
          updateStateDataSource={this.updateStateDataSource}
          showAll
        />
      );
    } else {
      return <ErrorVoidView controlApp={this.props.controlApp} />;
    }
  }
}

export default withRouter(ResourceView);
