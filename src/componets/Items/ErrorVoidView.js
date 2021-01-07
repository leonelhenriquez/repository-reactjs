import React from "react";
import { withStyles, Typography } from "@material-ui/core";
import { SentimentDissatisfiedOutlined } from "@material-ui/icons";

const useStyles = (theme) => ({
  rootErrorView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    margin: 0,
    padding: "40px 20px",
  },
  iconError: {
    width: 100,
    height: 100,
    margin: 35,
    color: "#37474F",
  },
  textError: {
    maxWidth: 600,
    textAlign: "center",
    color: "#37474F",
  },
});

class ErrorVoidView extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rootErrorView}>
        <SentimentDissatisfiedOutlined className={classes.iconError} />
        <Typography variant="h4" className={classes.textError}>
          No se encontro ningun recurso para mostrar
        </Typography>
      </div>
    );
  }
}

export default withStyles(useStyles)(ErrorVoidView);
