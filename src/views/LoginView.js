import React from "react";
import { withStyles, Typography } from "@material-ui/core";
import { AccountCircleOutlined, WarningRounded } from "@material-ui/icons";

const useStyles = ((theme) => ({
  rootLoginView: {
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
  iconAccount: {
    width: 125,
    height: 125,
    margin: 35,
    color: theme.palette.secondary.main,
  },
}));

class LoginView extends React.Component {
  
  constructor(props){
    super(props);
    this.props.controlApp.setShowTabMenu(false);
  }

  render() {
    const { classes } = this.props;
    return ( 
      <div className={classes.rootLoginView}>
        <AccountCircleOutlined className={classes.iconAccount} />
        <Typography variant="h4">¡Vaya, no hay nada aquí!</Typography>
      </div>
    );
  }
}

export default withStyles(useStyles)(LoginView);

