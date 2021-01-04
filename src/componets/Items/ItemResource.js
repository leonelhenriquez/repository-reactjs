import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  withStyles,
} from "@material-ui/core";
import {
  AccountCircleOutlined,
  BookOutlined,
  CategoryOutlined,
  DescriptionOutlined,
  FavoriteBorderOutlined,
  GetAppOutlined,
  TodayOutlined,
  WatchLaterOutlined,
} from "@material-ui/icons";
import clsx from "clsx";

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
    color: "#D50000",
    borderColor: "#D50000 !important",
  },
  buttonWatchLater: {
    color: "#4771f4",
    borderColor: "#4771f4 !important",
  },
});

class ItemResource extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.rootItem} style={this.props.showAll && {maxWidth: 800, margin: "0 auto"}}>
        <CardContent>
          <a
            href={"/resource/" + this.props.resource.id}
            className={classes.titleLink}
          >
            <Typography variant="h5" className={classes.title}>
              {this.props.resource.titulo}
            </Typography>
          </a>
          <Chip
            className={classes.dateInfo}
            avatar={<TodayOutlined />}
            label={this.props.resource.fecha.replaceAll("-", "/")}
            variant="outlined"
          />
          <Chip
            className={classes.userInfo}
            avatar={<AccountCircleOutlined />}
            label={
              this.props.resource.usuario.first_name +
              " " +
              this.props.resource.usuario.last_name
            }
            variant="outlined"
          />
          <div style={{ display: "block" }}>
            <Chip
              className={classes.infoItem}
              avatar={
                this.props.resource.tipo.nombre === "Libro" ? (
                  <DescriptionOutlined />
                ) : (
                  <BookOutlined />
                )
              }
              label={this.props.resource.tipo.nombre}
              variant="outlined"
            />
            <Chip
              className={classes.infoItem}
              avatar={<CategoryOutlined />}
              label={this.props.resource.categoria.nombre}
              variant="outlined"
            />
          </div>
          <div className={classes.extraInfo}>
            <b>Año de publicación: </b>
            {this.props.resource.anyo_publicacion}
          </div>
          <div className={classes.extraInfo}>
            <b>Autor: </b>
            {this.props.resource.autor}
          </div>
          <Typography
            variant="body1"
            className={
              this.props.showAll ? classes.descriptionAll : classes.description
            }
          >
            <b>Descripción: </b>
            {this.props.resource.descripcion}
          </Typography>
          {this.props.showAll ? (
            <img
              src={this.props.resource.imagen}
              style={{ margin: "25px auto" }}
              alt="img resource"
            />
          ) : (
            <CardMedia
              className={classes.image}
              image={this.props.resource.imagen}
            />
          )}
          <div className={classes.containerButtons}>
            <Button
              className={clsx(classes.button, classes.buttonDownload)}
              variant="outlined"
              color="secondary"
              disableElevation
              startIcon={<GetAppOutlined />}
              onClick={() => window.open(this.props.resource.archivo, "_blank")}
            >
              Descargar
            </Button>
            <Button
              className={clsx(classes.button, classes.buttonFavorite)}
              variant="outlined"
              color="secondary"
              disableElevation
              startIcon={<FavoriteBorderOutlined />}
            >
              Agregar a favoritos
            </Button>
            <Button
              className={clsx(classes.button, classes.buttonWatchLater)}
              variant="outlined"
              color="secondary"
              disableElevation
              startIcon={<WatchLaterOutlined />}
            >
              Agregar a ver mas tarde
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(useStyles)(ItemResource);
