import React from "react";
import {
  withStyles,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputAdornment,
  IconButton,
  TextField,
  Button,
  CircularProgress,
  Collapse,
} from "@material-ui/core";
import {
  AccountCircleOutlined,
  LockOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@material-ui/icons";
import API from "../../config/api";
import clsx from "clsx";
import { Alert } from "@material-ui/lab";
const axios = require("axios");

const useStyles = (theme) => ({
  rootLoginView: {
    padding: "40px 20px 200px 20px",
    boxSizing: "border-box",
    position: "absolute",
    top: 117,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    display: "flex",
    width: "100%",
    overflow: "auto",
    boxShadow: "inset 0px 250px 0 #4771f4",
  },
  loginCard: {
    width: "100%",
    maxWidth: 350,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    margin: "auto",
  },
  titleLogin: {
    textAlign: "center",
    marginBottom: 30,
  },
  iconAccount: {
    display: "block",
    width: 70,
    height: 70,
    margin: "25px auto 10px auto",
    color: theme.palette.secondary.main,
    textAlign: "center",
  },
  margin: {
    padding: theme.spacing(1),
  },
  textField: {
    width: "100%",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  buttonLogin: {
    fontWeight: 600,
    fontSize: 16,
    width: "100%",
    height: 46,
    marginTop: 16,
    marginBottom: 16,
  },
  buttonLoginLoadding: {
    backgroundColor: "#e8e8e8",
    color: "#808080",
  },
  circleProgress: {
    color: "#808080",
    width: "20px !important",
    height: "20px !important",
  },
});

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      loading: false,
      diableInputs: false,
      iserror: false,
      email: "",
      password: "",
    };
    this.props.controlApp.setShowTabMenu(false);
  }

  setShowPassword = (show) => this.setState({ showPassword: show });
  setLoading = (loading) => this.setState({ loading: loading });
  setDisableInputs = (disabled) => this.setState({ diableInputs: disabled });
  setIsError = (iserror) => this.setState({ iserror: iserror });

  login = async () => {
    this.setShowPassword(false);
    this.setIsError(false);
    if (this.state.email.length > 0 && this.state.password.length > 0) {
      this.setLoading(true);
      this.setDisableInputs(true);
      axios({
        method: "POST",
        url: API.baseURL + "rest-auth/login/",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: this.state.email,
          password: this.state.password,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data;
            if (typeof data?.key != "undefined") {
              localStorage.setItem("token", data.key);
              this.resetView();
            } else {
              this.setIsError(true);
            }
          } else {
            this.setIsError(true);
          }
        })
        .catch((error) => {
          this.setIsError(true);
        })
        .then(() => {
          this.setLoading(false);
          this.setDisableInputs(false);
        });
    } else {
      this.setIsError(true);
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

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rootLoginView}>
        <Card className={classes.loginCard} elevation={4}>
          <CardContent>
            <AccountCircleOutlined className={classes.iconAccount} />
            <Typography variant="h5" className={classes.titleLogin}>
              Iniciar sesión
            </Typography>
            <Collapse in={this.state.iserror}>
              <Alert severity="error">
                <strong>Error:</strong> El correo electronico ó la contraseña
                son invalidos
              </Alert>
            </Collapse>
            <FormControl variant="outlined" className={classes.textField}>
              <TextField
                type="text"
                label="Correo electronico"
                variant="outlined"
                disabled={this.state.diableInputs}
                value={this.state.userName}
                autoComplete="username"
                onChange={(event) =>
                  this.setState({ email: event.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl variant="outlined" className={classes.textField}>
              <TextField
                type={this.state.showPassword ? "text" : "password"}
                label="Contraseña"
                variant="outlined"
                disabled={this.state.diableInputs}
                value={this.state.password}
                autoComplete="current-password"
                onChange={(event) =>
                  this.setState({ password: event.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          this.setShowPassword(!this.state.showPassword)
                        }
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOutlined />
                        ) : (
                          <VisibilityOffOutlined />
                        )}
                      </IconButton>
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
                classes.buttonLogin,
                this.state.loading ? classes.buttonLoginLoadding : ""
              )}
              startIcon={
                this.state.loading && (
                  <CircularProgress className={classes.circleProgress} />
                )
              }
              onClick={() => this.login()}
            >
              Iniciar sesión
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(useStyles)(LoginView);
