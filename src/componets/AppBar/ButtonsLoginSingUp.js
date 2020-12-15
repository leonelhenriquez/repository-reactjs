import React from "react";
import { Button, Fade, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  buttons: {
    marginLeft: theme.spacing(2),
    fontWeight: 600,
  },
}));

const ButtonsLoginSingUp = (props) => {
  const classes = useStyles();
  return (
    <>
      <Fade in={true}>
        <Button
          variant={"outlined"}
          color={"secondary"}
          className={classes.buttons}
          onClick={() => props.controlApp.historyPush("/login")}
        >
          Iniciar sesión
        </Button>
      </Fade>

      <Fade in={true}>
        <Button
          variant={"outlined"}
          color={"secondary"}
          className={classes.buttons}
          onClick={() => props.controlApp.historyPush("/signup")}
        >
          Registrarme
        </Button>
      </Fade>
    </>
  );
};

export default ButtonsLoginSingUp;
