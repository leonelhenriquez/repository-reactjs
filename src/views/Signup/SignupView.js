import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import { Alert } from "@material-ui/lab";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 275,
  },
  margin: {
    margin: theme.spacing(3),
  },
  withoutLabel: {
    margin: theme.spacing(3),
    //marginTop: theme.spacing(3),
  },
  FormControl: {
    display: "block",
  },
  TextField: {
    margin: theme.spacing(2),
    textalign: "center",
  },
  Button: {
    display: "inline-block",
    width: "50ch",
    margin: theme.spacing(1),
    margin: "auto",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: "100%",
  },
  Card: {
    width: "100%",
    maxWidth: 600,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    margin: "auto",
  },
  Grid: {
    display: "grid",
  },
}));

const SignupView = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: "",
    weight: "",
    weightRange: "",
    showPassword: false,
    showCPassword: false,
    nombre: "",
    apellido: "",
    password: "",
    cpassword: "",
    email: "",
    usuario: "",
    iserror: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validate = () => {
    if (values.nombre.length !== 0 && values.apellido.length !== 0) {
      if (values.password === values.cpassword) {
        if (values.usuario.length !== 0 && values.email.length !== 0) {
          setValues({ ...values, iserror: false });
        } else {
          setValues({ ...values, iserror: true });
        }
      } else {
        setValues({ ...values, iserror: true });
      }
    } else {
      setValues({ ...values, iserror: true });
    }
  };

  return (
    <div className={classes.root}>
      <Card className={(classes.root, classes.Card)}>
        <CardContent>
          <Grid container="row">
            <TextField
              name="nombre"
              className={classes.TextField}
              required
              id="standard-required"
              label="Nombres"
              onChange={(event) =>
                setValues({ ...values, nombre: event.target.value })
              }
            />
            <TextField
              requerid
              id="standard-required"
              className={classes.TextField}
              label="Apellidos"
              onChange={(event) =>
                setValues({ ...values, apellido: event.target.value })
              }
            />
          </Grid>
          <Grid container="row" className={classes.Grid}>
            <TextField
              id="standard-user"
              className={classes.TextField}
              label="Usuario"
              onChange={(event) =>
                setValues({ ...values, usuario: event.target.value })
              }
            />
            <TextField
              id="standard-search"
              className={classes.TextField}
              label="Correo electronico"
              type="email"
              onChange={(event) =>
                setValues({ ...values, email: event.target.value })
              }
            />
          </Grid>
          <Grid container="row">
            <FormControl
              className={clsx(
                classes.margin,
                classes.withoutLabel,
                classes.FormControl
              )}
            >
              <InputLabel htmlFor="standard-adornment-password">
                Contraseña
              </InputLabel>
              <Input
                className={classes.Input}
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={
                  (handleChange("password"),
                  (event) =>
                    setValues({ ...values, password: event.target.value }))
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              className={clsx(
                classes.margin,
                classes.withoutLabel,
                classes.textField
              )}
            >
              <InputLabel htmlFor="standard-adornment-password">
                Confirmar contraseña
              </InputLabel>
              <Input
                id="standard-adornment-cpassword"
                type={values.showPassword ? "text" : "password"}
                value={values.cpassword}
                onChange={
                  (handleChange("password"),
                  (event) =>
                    setValues({ ...values, cpassword: event.target.value }))
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.Button}
            onClick={() => {
              validate();
            }}
            disableElevation
          >
            Aceptar
          </Button>
        </CardContent>
      </Card>
      <Collapse in={values.iserror}>
        <Alert severity="error">
          <strong>Error:</strong> Todos los campos son obligatorios o revise si
          ha escrito mal un dato
        </Alert>
      </Collapse>
    </div>
  );
};

export default SignupView;
