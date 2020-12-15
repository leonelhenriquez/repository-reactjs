import React from "react";
import { withStyles, Typography } from "@material-ui/core";
import { WarningRounded } from "@material-ui/icons";

const useStyles = ((theme) => ({
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
    width: 125,
    height: 125,
    margin: 35,
    color: theme.palette.error.main,
  },
}));

class ErrorView extends React.Component {

  constructor(props){
    super(props);
    this.props.controlApp.setShowTabMenu(false);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rootErrorView}>
        <WarningRounded className={classes.iconError} />
        <Typography variant="h4">¡Vaya, no hay nada aquí!</Typography>
      </div>
    );
  }
}

export default withStyles(useStyles)(ErrorView);

