import React from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Collapse,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { LockOutlined } from "@material-ui/icons";
import { Link, withRouter } from "react-router-dom";
import clsx from "clsx";
import API from "../../config/api";

const axios = require("axios");

const useStyles = (theme) => ({
  root: {
    padding: "40px 20px 20px 20px",
    boxSizing: "border-box",
    position: "absolute",
    top: 117,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    boxShadow: "inset 0px 150px 0 #4771f4",
  },
  card: {
    width: "100%",
    maxWidth: 500,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    margin: "auto",
  },
  title: {
    marginBottom: 30,
  },
  margin: {
    padding: theme.spacing(1),
  },
  textField: {
    width: "100%",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  button: {
    width: "100%",
    fontWeight: 600,
    fontSize: 16,
    height: 46,
    marginTop: 16,
    marginBottom: 16,
  },
  buttonLoadding: {
    backgroundColor: "#e8e8e8",
    color: "#808080",
  },
  circleProgress: {
    color: "#808080",
    width: "20px !important",
    height: "20px !important",
  },
});

class ResetPasswordView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      password: "",
      repeatPassword: "",
      isresetPassword: false,
      response: "",
      diableInputs: false,
      errorMessage: {
        password: "",
        repeatPassword: "",
        link: "",
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
        password: "",
        repeatPassword: "",
        link: "",
      },
    });
  };

  resetPassword = async () => {
    this.resetErrorMessage();
    if (
      this.state.password.length > 0 &&
      this.state.repeatPassword.length > 0
    ) {
      this.setState({
        loading: true,
        diableInputs: true,
      });
      axios({
        method: "POST",
        url: API.baseURL + "rest-auth/password/reset/confirm/",
        data: {
          new_password1: this.state.password,
          new_password2: this.state.repeatPassword,
          uid: this.props.match.params.uid,
          token: this.props.match.params.token,
        },
      })
        .then((response) => {
          this.setState({
            response: response.data.detail,
            isresetPassword: true,
          });
        })
        .catch((error) => {
          let data = error.response.data;

          if (typeof data.new_password1 != "undefined") {
            this.setErrorMessage("password", data.new_password1);
          }

          if (typeof data.new_password2 != "undefined") {
            this.setErrorMessage("repeatPassword", data.new_password2);
          }

          if (
            typeof data.uid != "undefined" ||
            typeof data.token != "undefined"
          ) {
            this.setErrorMessage("link", "En enlace es invalido.");
          }
        })
        .then(() =>
          this.setState({
            loading: false,
            diableInputs: false,
          })
        );
    } else {
      
      if (this.state.password.length === 0) {
        this.setErrorMessage("password","El campo esta vacio");
      }

      if (this.state.repeatPassword.length === 0) {
        this.setErrorMessage("repeatPassword", "El campo esta vacio");
      }
    }
  };

  render() {
    const { classes } = this.props;
  
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" className={classes.title}>
              Restablecer contraseña
            </Typography>
            <Collapse in={this.state.isresetPassword}>
              <Alert severity="success" style={{ marginBottom: 24 }}>
                {this.state.response}
              </Alert>
            </Collapse>
            <Collapse in={this.state.errorMessage.link.length > 0}>
              <Alert severity="error" style={{ marginBottom: 24 }}>
                {this.state.errorMessage.link}
              </Alert>
            </Collapse>
            {!this.state.isresetPassword && (
              <div>
                <FormControl variant="outlined" className={classes.textField}>
                  <TextField
                    type="password"
                    label="Contraseña"
                    variant="outlined"
                    autoComplete="new-password"
                    disabled={this.state.diableInputs}
                    value={this.state.password}
                    error={this.state.errorMessage.password.length > 0}
                    helperText={this.state.errorMessage.password}
                    onChange={(event) =>
                      this.setState({ password: event.target.value })
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
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
                    autoComplete="new-password"
                    disabled={this.state.diableInputs}
                    value={this.state.repeatPassword}
                    error={this.state.errorMessage.repeatPassword.length > 0}
                    helperText={this.state.errorMessage.repeatPassword}
                    onChange={(event) =>
                      this.setState({ repeatPassword: event.target.value })
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={this.state.diableInputs}
                  className={clsx(
                    classes.button,
                    this.state.loading ? classes.buttonLoadding : ""
                  )}
                  startIcon={
                    this.state.loading && (
                      <CircularProgress className={classes.circleProgress} />
                    )
                  }
                  onClick={() => this.resetPassword()}
                >
                  Restablecer contraseña
                </Button>
              </div>
            )}
            <Link to="/login" style={{ displat: "block", cursor: "pointer" }}>
              Iniciar sesión
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(ResetPasswordView));
