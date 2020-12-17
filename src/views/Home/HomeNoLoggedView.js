import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
import logo from "./../../logotipo.svg";
import imgDocument from "./regular-document.png";
import ButtonsLoginSingUp from "../../componets/AppBar/ButtonsLoginSingUp";

const useStyles = (theme) => ({
  homeContainer: {
    display: "block",
    flexGrow: 1,
  },
  logoHome: {
    maxWidth: 275,
    width: "100%",
    paddingTop: 50,
    paddingBottom: 50,
  },
  grid__item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 32,
  },
  buttonsLoginSingUp: {
    display: "block",
    paddingTop: 50,
    paddingBottom: 50,
  },
});

class HomeNoLoggedView extends React.Component {
  componentDidMount() {
    this.props.controlApp.setShowTabMenu(true);
    this.props.controlApp.setTabMenuPosition(0);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.homeContainer}>
        <Grid container>
          <Grid item xs={8} className={classes.grid__item}>
            <img src={logo} className={classes.logoHome} alt="logoHome" />
            <Typography variant="body1">
              Repository es un repositorio de textos académicos, científicos y
              literarios, con una vasta colección de artículos, ensayos,
              reportes y documentos para las diferentes áreas de estudio.
              Repository permite a nuestros usuarios compartir documentos para
              fines educativos, científicos y académicos con solo crear una
              cuenta.
            </Typography>
            <div className={classes.buttonsLoginSingUp}>
              <ButtonsLoginSingUp controlApp={this.props.controlApp} />
            </div>
          </Grid>
          <Grid item xs={4} className={classes.grid__item}>
            <img src={imgDocument} style={{ width: 150 }} alt="document" />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(HomeNoLoggedView);
