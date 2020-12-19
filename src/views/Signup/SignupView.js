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
import Collapse from '@material-ui/core/Collapse';
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(3),
  },
  withoutLabel: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  TextField: {
    paddingLeft:"100 px",
    display:"block",
    width: "20ch", 
    margin: "50 px",
   },
  input : {
    display:"block",
    position:"left",
  },
  Button : {
    padding : "50 px",
  }
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
    iserror : false,
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

  const validate =()=>{
    if(values.nombre.length !== 0 && values.apellido.length !== 0){
      if(values.password === values.cpassword){
        if(values.usuario.length !== 0 && values.email.length !== 0){
          setValues({...values, iserror: false});
        }
        else{
          setValues({...values, iserror: true});
        }
      }
      else{
        setValues({...values, iserror: true});
      }
    }
    else{
      setValues({...values, iserror: true});
    }
  }

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid direcrtiom="row">
          <TextField 
            name="nombre" 
            required id="standard-required"  
            label="Nombre" 
            onChange={(event) =>
              setValues({...values, nombre: event.target.value })
             }
          />
          <TextField 
            requerid id="standard-required" 
            label="Apellidos" 
            onChange={(event) =>
              setValues({...values, apellido: event.target.value })
             }/>
        </Grid>      
        <Grid direction ="row">
          <TextField 
            id="standard-user" 
            label="Usuario" 
            onChange={(event) =>
              setValues({...values, usuario: event.target.value })
             }/>
          <TextField 
            id="standard-search" 
            label="Correo electronico" 
            type="email" 
            onChange={(event) =>
              setValues({...values, email: event.target.value })
             }/>
        </Grid>
        <Grid direction="row">
          <FormControl  className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange ={
                handleChange("password"),
                (event) => setValues({...values, password: event.target.value })
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
          <FormControl  className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">Confirmar contraseña</InputLabel>
            <Input
              id="standard-adornment-cpassword"
              type={values.showPassword ? "text" : "password"}
              value={values.cpassword}
              onChange={
                handleChange("password"),
                (event) => setValues({...values, cpassword: event.target.value })
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
        <Grid direction="row">
          <Button variant="contained" color="primary"  disableElevation>Cancelar</Button>        
          <Button 
            variant="contained" 
            color="primary" 
            onClick = {() => {
              validate();
            }
            }
            disableElevation
          >Aceptar</Button>   
        </Grid>
        <Grid direction="row">
          <Collapse in={values.iserror}>
            <Alert severity="error">
              <strong>Error:</strong> Todos los campos son obligatorios o revise si ha escrito mal un dato
            </Alert>
          </Collapse>  
        </Grid>
      </Grid>
    </div>
  );
};

export default SignupView;
