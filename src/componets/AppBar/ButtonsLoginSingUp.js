import React from "react";
import { Button, ButtonGroup, Fade, makeStyles } from "@material-ui/core";
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
        <ButtonGroup>
          <Button
            variant={"outlined"}
            color={"secondary"}
            className={classes.buttons}
            onClick={() => props.controlApp.historyPush("/login")}
          >
            Iniciar sesión
          </Button>
          <Button
            variant={"outlined"}
            color={"secondary"}
            className={classes.buttons}
            onClick={() => props.controlApp.historyPush("/signup")}
          >
            Registrarme
          </Button>
        </ButtonGroup>
      </Fade>
    </>
  );
};

export default ButtonsLoginSingUp;
