import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  rootLoadingView: {
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
}));

const LoadingView = () => {
  const classes = useStyles();

  return (
    <div className={classes.rootLoadingView}>
      <CircularProgress color="secondary" />
      <h1>Cargando...</h1>
    </div>
  );
};

export default LoadingView;
