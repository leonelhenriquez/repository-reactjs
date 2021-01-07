import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import {
  AccountCircleOutlined,
  BookOutlined,
  CategoryOutlined,
  DeleteForever,
  DescriptionOutlined,
  EditOutlined,
  Favorite,
  FavoriteBorderOutlined,
  GetAppOutlined,
  TodayOutlined,
  WatchLater,
  WatchLaterOutlined,
} from "@material-ui/icons";
import clsx from "clsx";
import API from "../../config/api";

const axios = require("axios");

const useStyles = (theme) => ({
  rootItem: {
    display: "flex",
    padding: 16,
  },
  titleLink: {
    color: "#4771f4",
    textDecoration: "none",
  },
  title: {
    paddingBottom: 5,
    fontWeight: 600,
  },
  userInfo: {
    marginBottom: 8,
    border: "none !important",
    paddingLeft: 0,
    marginLeft: -4,
  },
  dateInfo: {
    marginBottom: 8,
    border: "none !important",
    paddingLeft: 0,
    marginLeft: -4,
  },
  infoItem: {
    marginBottom: 8,
    border: "none !important",
    paddingLeft: 0,
    marginLeft: -4,
  },
  extraInfo: {
    paddingBottom: 10,
    display: "block",
  },
  description: {
    color: "#4f4f4f",
    textAlign: "justify",
    overflow: "hidden",
    lineClamp: 5,
    display: "box",
    boxOrient: "vertical",
  },
  descriptionAll: {
    color: "#4f4f4f",
    textAlign: "justify",
  },
  image: {
    marginTop: 20,
    marginBottom: 20,
    minHeight: 400,
    backgroundPositionY: "top",
  },
  containerButtons: {},
  button: {
    margin: 5,
    fontWeight: 700,
    borderRadius: 50,
    borderWidth: "3px !important",
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  buttonDownload: {
    color: "#4CAF50",
    borderColor: "#4CAF50 !important",
  },
  buttonFavorite: {
    color: "#D32F2F",
    borderColor: "#D32F2F !important",
  },
  buttonDelete: {
    color: "#D50000",
    borderColor: "#D50000 !important",
  },
  buttonFavoriteActivate: {
    backgroundColor: "#D50000 !important",
    borderColor: "#D50000 !important",
    color: "#FFF",
  },
  buttonWatchLater: {
    color: "#4771f4",
    borderColor: "#4771f4 !important",
  },
  buttonWatchLaterActivate: {
    backgroundColor: "#4771f4 !important",
    borderColor: "#4771f4 !important",
    color: "#FFF",
  },
});

class ItemResource extends React.Component {
  addList = async (user, tipo, recurso) => {
    axios({
      method: "GET",
      url: API.baseURL + `lista/lista-detail/${user}/${tipo}/${recurso}/`,
    }).then((response) => {
      if (response.status === 200 && typeof response.data.id == "undefined") {
        axios({
          method: "POST",
          url: API.baseURL + "lista/lista-add/",
          data: {
            usuario: user,
            recurso: recurso,
            tipo: tipo,
          },
        });
      }
    });
  };

  removeList = async (user, tipo, recurso) => {
    axios({
      method: "GET",
      url: API.baseURL + `lista/lista-detail/${user}/${tipo}/${recurso}/`,
    }).then((response) => {
      if (response.status === 200 && typeof response.data.id !== "undefined") {
        axios({
          method: "DELETE",
          url: API.baseURL + `lista/lista-delete/${response.data.id}/`,
        });
      }
    });
  };

  deleteResource = async (recurso) => {
    axios({
      method: "DELETE",
      url: API.baseURL + `recurso/recurso-delete/${recurso}/`,
    });
  };

  render() {
    const { classes } = this.props;
    if (
      this.props.resource.recurso.deleted ||
      (this.props.loadView === "favorites" &&
        !this.props.resource.recurso.isfavorite) ||
      (this.props.loadView === "watchlater" &&
        !this.props.resource.recurso.iswatchlater)
    ) {
      return <></>;
    }
    return (
      <Grid item xs={this.props.showAll ? 12 : 6}>
        <Card
          className={classes.rootItem}
          style={this.props.showAll && { maxWidth: 800, margin: "0 auto" }}
        >
          <CardContent>
            <a
              href={"/resource/" + this.props.resource.recurso.id}
              className={classes.titleLink}
            >
              <Typography variant="h5" className={classes.title}>
                {this.props.resource.recurso.titulo}
              </Typography>
            </a>
            <Chip
              className={classes.dateInfo}
              avatar={<TodayOutlined />}
              label={this.props.resource.recurso.fecha.replaceAll("-", "/")}
              variant="outlined"
            />
            <Chip
              className={classes.userInfo}
              avatar={<AccountCircleOutlined />}
              label={
                this.props.resource.recurso.usuario.first_name +
                " " +
                this.props.resource.recurso.usuario.last_name
              }
              variant="outlined"
            />
            <div style={{ display: "block" }}>
              <Chip
                className={classes.infoItem}
                avatar={
                  this.props.resource.recurso.tipo.nombre === "Libro" ? (
                    <DescriptionOutlined />
                  ) : (
                    <BookOutlined />
                  )
                }
                label={this.props.resource.recurso.tipo.nombre}
                variant="outlined"
              />
              <Chip
                className={classes.infoItem}
                avatar={<CategoryOutlined />}
                label={this.props.resource.recurso.categoria.nombre}
                variant="outlined"
              />
            </div>
            <div className={classes.extraInfo}>
              <b>Año de publicación: </b>
              {this.props.resource.recurso.anyo_publicacion}
            </div>
            <div className={classes.extraInfo}>
              <b>Autor: </b>
              {this.props.resource.recurso.autor}
            </div>
            <Typography
              variant="body1"
              className={
                this.props.showAll
                  ? classes.descriptionAll
                  : classes.description
              }
            >
              <b>Descripción: </b>
              {this.props.resource.recurso.descripcion}
            </Typography>
            {this.props.showAll ? (
              <img
                src={this.props.resource.recurso.imagen}
                style={{ margin: "25px auto", maxWidth: "100%" }}
                alt="img resource"
              />
            ) : (
              <CardMedia
                className={classes.image}
                image={this.props.resource.recurso.imagen}
              />
            )}
            <div className={classes.containerButtons}>
              <Button
                className={clsx(classes.button, classes.buttonDownload)}
                variant="outlined"
                color="secondary"
                disableElevation
                startIcon={<GetAppOutlined />}
                onClick={() =>
                  window.open(this.props.resource.recurso.archivo, "_blank")
                }
              >
                Descargar
              </Button>
              <Button
                className={clsx(
                  classes.button,
                  classes.buttonFavorite,
                  this.props.resource.recurso.isfavorite &&
                    classes.buttonFavoriteActivate
                )}
                variant="outlined"
                color="secondary"
                disableElevation
                startIcon={
                  this.props.resource.recurso.isfavorite ? (
                    <Favorite />
                  ) : (
                    <FavoriteBorderOutlined />
                  )
                }
                onClick={() => {
                  if (this.props.resource.recurso.isfavorite) {
                    this.removeList(
                      this.props.stateApp.userData.id,
                      1,
                      this.props.resource.recurso.id
                    );
                  } else {
                    this.addList(
                      this.props.stateApp.userData.id,
                      1,
                      this.props.resource.recurso.id
                    );
                  }
                  this.props.resource.recurso.isfavorite = !this.props.resource
                    .recurso.isfavorite;
                  this.props.updateStateDataSource();
                }}
              >
                {this.props.resource.recurso.isfavorite
                  ? "Eliminar de favoritos"
                  : "Agregar a favoritos"}
              </Button>
              <Button
                className={clsx(
                  classes.button,
                  classes.buttonWatchLater,
                  this.props.resource.recurso.iswatchlater &&
                    classes.buttonWatchLaterActivate
                )}
                variant="outlined"
                color="secondary"
                disableElevation
                startIcon={
                  this.props.resource.recurso.iswatchlater ? (
                    <WatchLater />
                  ) : (
                    <WatchLaterOutlined />
                  )
                }
                onClick={() => {
                  if (this.props.resource.recurso.iswatchlater) {
                    this.removeList(
                      this.props.stateApp.userData.id,
                      2,
                      this.props.resource.recurso.id
                    );
                  } else {
                    this.addList(
                      this.props.stateApp.userData.id,
                      2,
                      this.props.resource.recurso.id
                    );
                  }
                  this.props.resource.recurso.iswatchlater = !this.props
                    .resource.recurso.iswatchlater;
                  this.props.updateStateDataSource();
                }}
              >
                {this.props.resource.recurso.iswatchlater
                  ? "Eliminar de ver más tarde"
                  : "Agregar a ver más tarde"}
              </Button>
              {this.props.resource.recurso.usuario.id ===
                this.props.stateApp.userData.id && (
                <>
                  <Button
                    className={clsx(classes.button, classes.buttonDelete)}
                    variant="outlined"
                    color="secondary"
                    disableElevation
                    startIcon={<DeleteForever />}
                    onClick={() => {
                      this.deleteResource(this.props.resource.recurso.id);
                      this.props.resource.recurso.deleted = true;
                      this.props.updateStateDataSource();
                    }}
                  >
                    Eliminar recurso
                  </Button>
                  <Button
                    className={clsx(classes.button, classes.buttonWatchLater)}
                    variant="outlined"
                    color="secondary"
                    disableElevation
                    startIcon={<EditOutlined />}
                    onClick={() => {
                      this.props.controlApp.resourceDialog.edit(
                        this.props.resource.recurso
                      );
                      this.props.controlApp.resourceDialog.open();
                    }}
                  >
                    Editar recurso
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}
export default withStyles(useStyles)(ItemResource);
