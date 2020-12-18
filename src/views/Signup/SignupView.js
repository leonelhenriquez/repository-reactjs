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
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  TextField: {
    display:"block",
    width: "20ch",    
  },
  input : {
    display:"block",
  },
}));

const SignupView = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
    nombre: "",
    apellido: "",
    cpassword: "",
    email: "",
    usuario: "",
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

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid direcrtiom="row">
          <TextField required id="standard-required" label="Nombre" />
          <TextField requerid id="standard-required" label="Apellidos" />
        </Grid>      
        <Grid direction ="row">
          <TextField id="standard-user" label="Usuario" />
          <TextField id="standard-search" label="Correo electronico" type="email" />
        </Grid>
        <Grid direction="row">
          <FormControl  className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
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
          <FormControl  className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">Confirmar contraseña</InputLabel>
            <Input
              id="standard-adornment-cpassword"
              type={values.showPassword ? "text" : "cpassword"}
              value={values.cpassword}
              onChange={handleChange("cpassword")}
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
        <Grid direction="row">
          <Button variant="contained" color="primary" disableElevation>Cancelar</Button>          
          <Button variant="contained" color="primary" disableElevation>Aceptar</Button>   
        </Grid>
      </Grid>
    </div>
  );
};

export default SignupView;
