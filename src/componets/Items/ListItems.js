import { Grid } from "@material-ui/core";
import React from "react";
import API from "../../config/api";
import LoadingView from "../../views/LoadingView";
import ErrorVoidView from "./ErrorVoidView";
import ItemResource from "./ItemResource";

const axios = require("axios");

export default class ListItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataResource: [],
      isLoading: true,
      showItems: false,
    };
  }

  updateStateDataSource = () =>
    this.setState({ dataResource: this.state.dataResource });

  componentDidMount() {
    this.setState({ isLoading: true });
    this.setState({ showItems: false });
    if (this.props.load === "all") {
      this.loadResources();
    } else if (this.props.load === "myresources") {
      this.loadResourcesUser();
    } else if (this.props.load === "favorites") {
      this.loadResourcesFavorites();
    } else if (this.props.load === "watchlater") {
      this.loadResourcesWatchlater();
    }
  }

  loadResources = async () => {
    axios({
      method: "GET",
      url: API.baseURL + "recurso/recurso-list/",
    })
      .then((response) => {
        let data = response.data;
        if (
          response.status === 200 &&
          typeof data?.length != "undefined" &&
          data.length > 0
        ) {
          let dataResource = [];
          for (let i = 0; i < data.length; i++) {
            data[i].deleted = false;
            data[i].imagen = data[i].imagen.replace("/download/", "/get/");
            data[i].archivo = data[i].archivo.replace("/download/", "/get/");
            data[i].isfavorite = false;
            data[i].iswatchlater = false;
            dataResource.push({ recurso: data[i] });
          }
          this.setState({ dataResource: dataResource });
          this.checkResourcesFavorites();
          this.checkResourcesWatchlater();
        }
      })
      .then(() => {
        this.setState({ isLoading: false });
      });
  };

  loadResourcesUser = async () => {
    let user = this.props.stateApp.userData.id;
    axios({
      method: "GET",
      url: API.baseURL + `recurso/recurso-userlist/${user}/`,
    })
      .then((response) => {
        let data = response.data;
        if (
          response.status === 200 &&
          typeof data?.length != "undefined" &&
          data.length > 0
        ) {
          let dataResource = [];
          for (let i = 0; i < data.length; i++) {
            data[i].deleted = false;
            data[i].imagen = data[i].imagen.replace("/download/", "/get/");
            data[i].archivo = data[i].archivo.replace("/download/", "/get/");
            data[i].isfavorite = false;
            data[i].iswatchlater = false;
            dataResource.push({ recurso: data[i] });
          }
          this.setState({ dataResource: dataResource });
          this.checkResourcesFavorites();
          this.checkResourcesWatchlater();
        }
      })
      .then(() => {
        this.setState({ isLoading: false });
      });
  };

  loadResourcesFavorites = async () => {
    axios({
      method: "GET",
      url:
        API.baseURL +
        `lista/lista-listas/${this.props.stateApp.userData.id}/1/`,
    })
      .then((response) => {
        let data = response.data;
        if (
          response.status === 200 &&
          typeof data?.length != "undefined" &&
          data.length > 0
        ) {
          let dataResource = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].recurso != null) {
              data[i].recurso.deleted = false;
              data[i].recurso.imagen =
                API.baseURL.substring(0, API.baseURL.length - 1) +
                data[i].recurso.imagen.replace("/download/", "/get/");
              data[i].recurso.archivo =
                API.baseURL.substring(0, API.baseURL.length - 1) +
                data[i].recurso.archivo.replace("/download/", "/get/");
              data[i].recurso.isfavorite = true;
              data[i].recurso.iswatchlater = false;
              dataResource.push({
                recurso: data[i].recurso,
                favorito: {
                  id: data[i].id,
                  fecha: data[i].fecha,
                  usuario: data[i].usuario,
                  tipo: data[i].tipo,
                },
              });
            }
          }
          this.setState({ dataResource: dataResource });
          this.checkResourcesWatchlater();
        }
      })
      .then(() => {
        this.setState({ isLoading: false });
      });
  };

  loadResourcesWatchlater = async () => {
    axios({
      method: "GET",
      url:
        API.baseURL +
        `lista/lista-listas/${this.props.stateApp.userData.id}/2/`,
    })
      .then((response) => {
        let data = response.data;
        if (
          response.status === 200 &&
          typeof data?.length != "undefined" &&
          data.length > 0
        ) {
          let dataResource = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].recurso != null) {
              data[i].recurso.deleted = false;
              data[i].recurso.imagen =
                API.baseURL.substring(0, API.baseURL.length - 1) +
                data[i].recurso.imagen.replace("/download/", "/get/");
              data[i].recurso.archivo =
                API.baseURL.substring(0, API.baseURL.length - 1) +
                data[i].recurso.archivo.replace("/download/", "/get/");
              data[i].recurso.isfavorite = false;
              data[i].recurso.iswatchlater = true;
              dataResource.push({
                recurso: data[i].recurso,
                watchlater: {
                  id: data[i].id,
                  fecha: data[i].fecha,
                  usuario: data[i].usuario,
                  tipo: data[i].tipo,
                },
              });
            }
          }
          this.setState({ dataResource: dataResource });
          this.checkResourcesFavorites();
        }
      })
      .then(() => {
        this.setState({ isLoading: false });
      });
  };

  checkResourcesFavorites = async () => {
    axios({
      method: "GET",
      url:
        API.baseURL +
        `lista/lista-listas_nodetail/${this.props.stateApp.userData.id}/1/`,
    }).then((response) => {
      let data = response.data;
      if (
        response.status === 200 &&
        typeof data?.length != "undefined" &&
        data.length > 0
      ) {
        data.forEach((resourceFavorites) => {
          this.state.dataResource.forEach((resource) => {
            if (resource.recurso.id === resourceFavorites.recurso) {
              resource.recurso.isfavorite = true;
              resource.favorito = {};
              resource.favorito.id = resourceFavorites.id;
              resource.favorito.fecha = resourceFavorites.fecha;
              resource.favorito.usuario = resourceFavorites.usuario;
              resource.favorito.tipo = resourceFavorites.tipo;
            }
          });
        });
        this.updateStateDataSource();
      }
    });
  };
  checkResourcesWatchlater = async () => {
    axios({
      method: "GET",
      url:
        API.baseURL +
        `lista/lista-listas_nodetail/${this.props.stateApp.userData.id}/2/`,
    }).then((response) => {
      let data = response.data;
      if (
        response.status === 200 &&
        typeof data?.length != "undefined" &&
        data.length > 0
      ) {
        data.forEach((resourceWatchlater) => {
          this.state.dataResource.forEach((resource) => {
            if (resource.recurso.id === resourceWatchlater.recurso) {
              resource.recurso.iswatchlater = true;
              resource.watchlater = {};
              resource.watchlater.id = resourceWatchlater.id;
              resource.watchlater.fecha = resourceWatchlater.fecha;
              resource.watchlater.usuario = resourceWatchlater.usuario;
              resource.watchlater.tipo = resourceWatchlater.tipo;
            }
          });
        });
        this.updateStateDataSource();
      }
    });
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingView />;
    } else if (this.state.dataResource.length > 0) {
      const listItems = this.state.dataResource.map((data) => (
        <ItemResource
          key={data.recurso.id.toString()}
          resource={data}
          updateStateDataSource={this.updateStateDataSource}
          stateApp={this.props.stateApp}
          loadView={this.props.load}
        />
      ));

      return (
        <div style={{ paddingTop: 32, paddinBottom: 32 }}>
          <Grid container justify="center" alignItems="baseline" spacing={2}>
            {listItems}
          </Grid>
        </div>
      );
    } else {
      return <ErrorVoidView controlApp={this.props.controlApp} />;
    }
  }
}
