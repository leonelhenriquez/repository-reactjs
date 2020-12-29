import React from "react";
import clsx from "clsx";
import {
  Typography,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Button,
  CircularProgress,
  Collapse,
  withStyles,
} from "@material-ui/core";
import {
  AlternateEmailOutlined,
  EmailOutlined,
  LockOutlined,
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { validateEmail, validatePassword } from "../../utils/Validator";
import API from "../../config/api";
const axios = require("axios");

const useStyles = (theme) => ({
  rootSignupView: {
    padding: "40px 20px 20px 20px",
    boxSizing: "border-box",
    position: "absolute",
    top: 117,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    boxShadow: "inset 0px 250px 0 #4771f4",
  },
  titleSignup: {
    marginTop: 20,
    marginBottom: 30,
    fontWeight: 500,
  },
  textField: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    margin: "auto",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: "100%",
    fontWeight: "bold",
  },
  buttonLoading: {
    backgroundColor: "#e8e8e8",
    color: "#808080",
  },
  signupCard: {
    width: "100%",
    maxWidth: 800,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    margin: "auto",
  },
  circleProgress: {
    color: "#808080",
    width: "20px !important",
    height: "20px !important",
  },
});

class SignupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      repeat_password: "",
      iserror: false,
      disabledInputs: false,
      disableButton: true,
      loading: false,
      errorMessage: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
      },
    };
  }

  setErrorMessage = (key, msg) => {
    this.setState({
      errorMessage: {
        ...this.state.errorMessage,
        [key]: msg,
      },
    });
  };

  resetErrorMessage = () => {
    this.setState({
      errorMessage: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
      },
    });
  };

  getUser = () => {
    return {
      username: this.state.username,
      email: this.state.email.trim(),
      first_name: this.state.firstName.trim(),
      last_name: this.state.lastName.trim(),
      password1: this.state.password,
      password2: this.state.repeat_password,
    };
  };

  registerUser = async () => {
    this.setState({ loading: true });
    this.resetErrorMessage();
    let user = this.getUser();

    if (this.validarUsuario()) {
      axios({
        method: "POST",
        url: API.baseURL + "rest-auth/registration/",
        headers: {
          "Content-Type": "application/json",
        },
        data: user,
      })
        .then((response) => {
          let data = response.data;

          if (typeof data.key != "undefined") {
            localStorage.setItem("token", data.key);
            this.resetView();
          }
        })
        .catch((err) => {
          let data = err.response.data;

          if (typeof data.first_name != "undefined") {
            this.setErrorMessage("firstName", data.first_name);
          }

          if (typeof data.last_name != "undefined") {
            this.setErrorMessage("lastName", data.last_name);
          }

          if (typeof data.username != "undefined") {
            this.setErrorMessage("username", data.username);
          }

          if (typeof data.email != "undefined") {
            this.setErrorMessage("email", data.email);
          }

          if (typeof data.password1 != "undefined") {
            this.setErrorMessage("password", data.password1);
          }

          if (typeof data.password2 != "undefined") {
            this.setErrorMessage("repeatPassword", data.password2);
          }
        })
        .then(() => this.setState({ loading: false }));
    }
  };

  resetView = () => {
    this.props.controlApp.setIsLoadingAppBar(true);
    this.props.controlApp.setIsLoading(true);
    setTimeout(() => {
      this.props.controlApp.historyPush("/home");
      this.props.controlApp.history.go(0);
    }, 100);
  };

  validarUsuario = () => {
    let user = this.getUser();
    return (
      user.username.length > 0 &&
      validateEmail(user.email) &&
      user.first_name.length > 0 &&
      user.last_name.length > 0 &&
      validatePassword(user.password1) &&
      user.password1 === user.password2
    );
  };

  checkInputs = () => {
    setTimeout(
      () => this.setState({ disableButton: !this.validarUsuario() }),
      10
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rootSignupView}>
        <Card className={classes.signupCard} elevation={4}>
          <CardContent>
            <Typography variant="h4" className={classes.titleSignup}>
              Registrate
            </Typography>
            <Collapse in={this.state.iserror}>
              <Alert severity="error">
                <strong>Error</strong> Los datos ingresados son incorrectos.
              </Alert>
            </Collapse>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <FormControl variant="outlined" className={classes.textField}>
                  <TextField
                    type="text"
                    label="Nombres"
                    variant="outlined"
                    disabled={this.state.disabledInputs}
                    value={this.state.firstName}
                    error={this.state.errorMessage.firstName.length > 0}
                    helperText={this.state.errorMessage.firstName}
                    onChange={(event) => {
                      this.setState({ firstName: event.target.value });
                      this.checkInputs();
                    }}
                    required
                  />
                </FormControl>
                <FormControl variant="outlined" className={classes.textField}>
                  <TextField
                    type="text"
                    label="Apellidos"
                    variant="outlined"
                    disabled={this.state.disabledInputs}
                    value={this.state.apellidos}
                    error={this.state.errorMessage.lastName.length > 0}
                    helperText={this.state.errorMessage.lastName}
                    onChange={(event) => {
                      this.setState({ lastName: event.target.value });
                      this.checkInputs();
                    }}
                    required
                  />
                </FormControl>
                <FormControl variant="outlined" className={classes.textField}>
                  <TextField
                    type="text"
                    label="Usuario"
                    variant="outlined"
                    disabled={this.state.disabledInputs}
                    value={this.state.username}
                    error={this.state.errorMessage.username.length > 0}
                    helperText={this.state.errorMessage.username}
                    onChange={(event) => {
                      this.setState({ username: event.target.value });
                      this.checkInputs();
                    }}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <AlternateEmailOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" className={classes.textField}>
                  <TextField
                    type="email"
                    label="Correo electronico"
                    variant="outlined"
                    disabled={this.state.disabledInputs}
                    value={this.state.email}
                    error={this.state.errorMessage.email.length > 0}
                    helperText={this.state.errorMessage.email}
                    onChange={(event) => {
                      this.setState({ email: event.target.value });
                      this.setErrorMessage(
                        "email",
                        !validateEmail(event.target.value)
                          ? "El correo electronico es invalido"
                          : ""
                      );
                      this.checkInputs();
                    }}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <EmailOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <FormControl variant="outlined" className={classes.textField}>
                  <TextField
                    type="password"
                    label="Contraseña"
                    variant="outlined"
                    disabled={this.state.disabledInputs}
                    value={this.state.password}
                    autoComplete="new-password"
                    error={this.state.errorMessage.password.length > 0}
                    helperText={this.state.errorMessage.repeatPassword}
                    onChange={(event) => {
                      this.setState({ password: event.target.value });
                      this.setErrorMessage(
                        "password",
                        !validatePassword(event.target.value)
                          ? "La contraseña debe tener almenos 8 caracteres, 2 letras y 2 numeros."
                          : ""
                      );
                      if (this.state.repeat_password.length > 0) {
                        this.setErrorMessage(
                          "repeatPassword",
                          event.target.value !== this.state.repeat_password
                            ? "Las contraseñas no coindicen"
                            : ""
                        );
                      }
                      this.checkInputs();
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <LockOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <FormControl variant="outlined" className={classes.textField}>
                  <TextField
                    type="password"
                    label="Repetir contraseña"
                    variant="outlined"
                    disabled={this.state.disabledInputs}
                    value={this.state.repeat_password}
                    autoComplete="new-password"
                    error={this.state.errorMessage.repeatPassword.length > 0}
                    helperText={this.state.errorMessage.repeatPassword}
                    onChange={(event) => {
                      this.setState({ repeat_password: event.target.value });
                      this.setErrorMessage(
                        "repeatPassword",
                        event.target.value !== this.state.password
                          ? "Las contraseñas no coindicen"
                          : ""
                      );
                      this.checkInputs();
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <LockOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <Button
                  color="secondary"
                  variant="contained"
                  className={clsx(
                    classes.button,
                    this.state.loading ? classes.buttonLoading : ""
                  )}
                  disabled={
                    this.state.disableButton || this.state.disabledInputs
                  }
                  onClick={() => this.registerUser()}
                  startIcon={
                    this.state.loading && (
                      <CircularProgress className={classes.circleProgress} />
                    )
                  }
                >
                  Registrarme
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(useStyles)(SignupView);
