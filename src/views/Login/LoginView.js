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
} from "@material-ui/core";
import {
  AccountCircleOutlined,
  LockOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@material-ui/icons";
import API from "../../config/api";
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
    marginBottom: 50,
  },
  iconAccount: {
    display: "block",
    width: 50,
    height: 50,
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
});

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      userName: "",
      password: "",
    };
    this.props.controlApp.setShowTabMenu(false);
  }

  setShowPassword = (show) => this.setState({ showPassword: show });
  login = async () => {
    axios
      .post(API.baseURL + "login", {
        user: this.state.userName,
        password: this.state.password,
      })
      .then((response) => {});
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
            <FormControl variant="outlined" className={classes.textField}>
              <TextField
                type="text"
                label="Usuario ó email"
                variant="outlined"
                value={this.state.userName}
                onChange={(event) =>
                  this.setState({ userName: event.target.value })
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
                value={this.state.password}
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
              className={classes.buttonLogin}
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
