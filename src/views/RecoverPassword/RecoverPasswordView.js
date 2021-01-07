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
import { EmailOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
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

class RecoverPasswordView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      errorMessage: "",
      sendEmail: false,
      response: "",
      diableInputs: false,
    };
  }

  resetPassword = async () => {
    this.setState({ errorMessage: "" });
    if (this.state.email.trim().length > 0) {
      this.setState({
        loading: true,
        diableInputs: true,
      });
      axios({
        method: "POST",
        url: API.baseURL + "rest-auth/password/reset/",
        data: {
          email: this.state.email,
        },
      })
        .then((response) => {
          this.setState({
            response: response.data.detail,
            sendEmail: true,
          });
        })
        .catch((error) => {
          this.setState({ errorMessage: error.response.data.email });
        })
        .then(() =>
          this.setState({
            loading: false,
            diableInputs: false,
          })
        );
    } else {
      this.setState({ errorMessage: "El correo electronico es invalido" });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" className={classes.title}>
              Recuperar contraseña
            </Typography>
            <Collapse in={this.state.sendEmail}>
              <Alert severity="success" style={{ marginBottom: 24 }}>
                {this.state.response}
              </Alert>
            </Collapse>
            {!this.state.sendEmail && (
              <>
                <FormControl variant="outlined" className={classes.textField}>
                  <TextField
                    type="text"
                    label="Correo electronico"
                    variant="outlined"
                    disabled={this.state.diableInputs}
                    value={this.state.email}
                    error={this.state.errorMessage.length > 0}
                    helperText={this.state.errorMessage}
                    onChange={(event) =>
                      this.setState({ email: event.target.value })
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlined />
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
                  Recuperar contraseña
                </Button>
              </>
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

export default withStyles(useStyles)(RecoverPasswordView);
