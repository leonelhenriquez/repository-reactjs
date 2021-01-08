import React from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  withStyles,
  Avatar,
  Grid,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  FormControl,
  TextField,
  Snackbar,
} from "@material-ui/core";
import Transition from "../../utils/Transition";
import withMediaQuery from "../../utils/withMediaQuery";
import API from "../../config/api";
import LoadingView from "../LoadingView";
import { Alert } from "@material-ui/lab";

const axios = require("axios");

const useStyles = (theme) => ({
  root: {
    maxWidth: 800,
    margin: "0 auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4771f4",
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    fontWeight: "bold",
    fontSize: 32,
  },
  card: {
    display: "inline-grid",
    boxShadow: "1.4 1.4 #182026",
    "&:hover": {
      boxShadow: "1 1 #182026",
    },
    margin: "1em 0",
    marginRight: "1em",
  },
  card2: {
    margin: "1em 0",
  },
  grid: {
    padding: "4em 1em 4em 3em",
  },
  gridItemForm: {
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  gridItemTitle: {
    fontWeight: 600,
    paddingRight: 16,
    textAlign: "right",
    flexGrow: 0,
  },
});

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let colour = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return colour;
}

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.stateApp.userData.username,
      email: props.stateApp.userData.email,
      name: props.stateApp.userData.nombre,
      lastname: props.stateApp.userData.apellido,
      openDialogPerfil: false,
      openDialogPassword: false,
      edit: {
        userName: props.stateApp.userData.username,
        email: props.stateApp.userData.email,
        name: props.stateApp.userData.nombre,
        lastname: props.stateApp.userData.apellido,
        password: "",
        repeatPassword: "",
      },
      errorMessage: {
        userName: "",
        email: "",
        name: "",
        lastname: "",
        password: "",
        repeatPassword: "",
      },
      loading: false,
      openMessageUpdate: false,
      openMessagePassword: false,
    };
  }

  componentDidMount() {
    this.props.controlApp.setShowTabMenu(false);
  }

  closeDialogPerfil = async () => {
    this.setState({ openDialogPerfil: false });
  };

  openDialogPerfil = async () => {
    this.setState({
      openDialogPerfil: true,
      edit: {
        userName: this.props.stateApp.userData.username,
        email: this.props.stateApp.userData.email,
        name: this.props.stateApp.userData.nombre,
        lastname: this.props.stateApp.userData.apellido,
        password: "",
        repeatPassword: "",
      },
    });
  };

  openDialogPassword = async () => {
    this.setState({
      openDialogPassword: true,
      edit: {
        userName: this.props.stateApp.userData.username,
        email: this.props.stateApp.userData.email,
        name: this.props.stateApp.userData.nombre,
        lastname: this.props.stateApp.userData.apellido,
        password: "",
        repeatPassword: "",
      },
    });
  };

  closeDialogPassword = async () => {
    this.setState({ openDialogPassword: false });
  };

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
        userName: "",
        email: "",
        name: "",
        lastname: "",
        password: "",
        repeatPassword: "",
      },
    });
  };

  handleCloseMessageUpdate = () => {
    this.setState({ openMessageUpdate: false });
  };

  handleOpenMessageUpdate = () => {
    this.setState({ openMessageUpdate: true });
  };

  handleCloseMessagePassword = () => {
    this.setState({ openMessagePassword: false });
  };

  handleOpenMessagePassword = () => {
    this.setState({ openMessagePassword: true });
  };

  updateUserProfile = async () => {
    let token = localStorage.getItem("token");
    this.resetErrorMessage();
    this.setState({ loading: true });
    axios({
      method: "PUT",
      url:
        API.baseURL +
        `rest-auth/update_profile/${this.props.stateApp.userData.id}/`,
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        username: this.state.edit.userName,
        first_name: this.state.edit.name,
        last_name: this.state.edit.lastname,
        email: this.state.edit.email,
      },
    })
      .then((response) => {
        this.handleOpenMessageUpdate();
        this.props.controlApp.loadUser();
        this.setState({
          ...this.state.edit,
        });
        this.closeDialogPerfil();
      })
      .catch((err) => {
        let data = err.response.data;

        if (typeof data.username != "undefined") {
          this.setErrorMessage("userName", data.username);
        }

        if (typeof data.email != "undefined") {
          this.setErrorMessage("email", data.email);
        }

        if (typeof data.first_name != "undefined") {
          this.setErrorMessage("name", data.first_name);
        }

        if (typeof data.email != "undefined") {
          this.setErrorMessage("lastname", data.last_name);
        }
      })
      .then(() => {
        this.setState({ loading: false });
      });
  };

  updateUserPassword = async () => {
    let token = localStorage.getItem("token");
    this.resetErrorMessage();
    this.setState({ loading: true });
    axios({
      method: "POST",
      url: API.baseURL + "rest-auth/password/change/",
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        new_password1: this.state.edit.password,
        new_password2: this.state.edit.repeatPassword,
      },
    })
      .then((response) => {
        this.handleOpenMessagePassword();
        this.setState({
          ...this.state.edit,
        });
        this.closeDialogPassword();
      })
      .catch((err) => {
        let data = err.response.data;

        if (typeof data.new_password1 != "undefined") {
          this.setErrorMessage("password", data.new_password1);
        }

        if (typeof data.new_password2 != "undefined") {
          this.setErrorMessage("repeatPassword", data.new_password2);
        }
      })
      .then(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { classes, fullScreen = false } = this.props;

    return (
      <div className={classes.root}>
        <Grid container className={classes.grid} spacing={5}>
          <Grid item>
            <Avatar
              className={classes.avatar}
              style={{ backgroundColor: stringToColor(this.state.name) }}
            >
              {this.state.name[0]}
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h5">
              {this.state.name} {this.state.lastname}
            </Typography>
            <Typography variant="subtitle1">@{this.state.userName}</Typography>
            <ButtonGroup>
              <Button size="small" onClick={this.openDialogPerfil}>
                Editar perfil
              </Button>
              <Button size="small" onClick={this.openDialogPassword}>
                Cambiar contraseña
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Card className={classes.card2}>
          <CardContent>
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={12}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Mi perfil
                </Typography>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={3} style={{ fontWeight: "bold" }}>
                  Nombre:
                </Grid>
                <Grid item xs={9}>
                  {this.state.name}
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={3} style={{ fontWeight: "bold" }}>
                  Apellido:
                </Grid>
                <Grid item xs={9}>
                  {this.state.lastname}
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={3} style={{ fontWeight: "bold" }}>
                  Email:
                </Grid>
                <Grid item xs={9}>
                  {this.state.email}
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={3} style={{ fontWeight: "bold" }}>
                  Usuario:
                </Grid>
                <Grid item xs={9}>
                  {this.state.userName}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Dialog
          open={this.state.openDialogPerfil}
          aria-labelledby="form-dialog-profile-title"
          TransitionComponent={Transition}
          fullScreen={fullScreen}
          keepMounted
          disableBackdropClick
          onClose={this.closeDialogPerfil}
        >
          {this.state.loading ? (
            <DialogContent>
              <div style={{ width: 300, height: 150 }}>
                <LoadingView />
              </div>
            </DialogContent>
          ) : (
            <>
              <DialogTitle id="form-dialog-profile-title">
                Editar Perfil
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={1} alignItems="center">
                  <Grid item container xs={12} className={classes.gridItemForm}>
                    <Grid
                      item
                      xs={3}
                      className={classes.gridItemTitle}
                      style={{ fontWeight: "bold" }}
                    >
                      Nombre:
                    </Grid>
                    <Grid item xs={8}>
                      <FormControl style={{ width: "100%" }}>
                        <TextField
                          variant="outlined"
                          value={this.state.edit.name}
                          error={this.state.errorMessage.name.length > 0}
                          helperText={this.state.errorMessage.name}
                          onChange={(event) => {
                            this.setState({
                              edit: {
                                ...this.state.edit,
                                name: event.target.value,
                              },
                            });
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} className={classes.gridItemForm}>
                    <Grid
                      item
                      xs={3}
                      className={classes.gridItemTitle}
                      style={{ fontWeight: "bold" }}
                    >
                      Apellido:
                    </Grid>
                    <Grid item xs={8}>
                      <FormControl style={{ width: "100%" }}>
                        <TextField
                          variant="outlined"
                          value={this.state.edit.lastname}
                          error={this.state.errorMessage.lastname.length > 0}
                          helperText={this.state.errorMessage.lastname}
                          onChange={(event) => {
                            this.setState({
                              edit: {
                                ...this.state.edit,
                                lastname: event.target.value,
                              },
                            });
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} className={classes.gridItemForm}>
                    <Grid
                      item
                      xs={3}
                      className={classes.gridItemTitle}
                      style={{ fontWeight: "bold" }}
                    >
                      Email:
                    </Grid>
                    <Grid item xs={8}>
                      <FormControl style={{ width: "100%" }}>
                        <TextField
                          variant="outlined"
                          value={this.state.edit.email}
                          error={this.state.errorMessage.email.length > 0}
                          helperText={this.state.errorMessage.email}
                          onChange={(event) => {
                            this.setState({
                              edit: {
                                ...this.state.edit,
                                email: event.target.value,
                              },
                            });
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} className={classes.gridItemForm}>
                    <Grid
                      item
                      xs={3}
                      className={classes.gridItemTitle}
                      style={{ fontWeight: "bold" }}
                    >
                      Usuario:
                    </Grid>
                    <Grid item xs={8}>
                      <FormControl style={{ width: "100%" }}>
                        <TextField
                          variant="outlined"
                          value={this.state.edit.userName}
                          error={this.state.errorMessage.userName.length > 0}
                          helperText={this.state.errorMessage.userName}
                          onChange={(event) => {
                            this.setState({
                              edit: {
                                ...this.state.edit,
                                userName: event.target.value,
                              },
                            });
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>

              <DialogActions>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={this.closeDialogPerfil}
                >
                  Cerrar
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={this.updateUserProfile}
                >
                  Guardar
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        <Dialog
          open={this.state.openDialogPassword}
          aria-labelledby="form-dialog-profile-title"
          TransitionComponent={Transition}
          fullScreen={fullScreen}
          keepMounted
          disableBackdropClick
          onClose={this.closeDialogPassword}
        >
          {this.state.loading ? (
            <DialogContent>
              <div style={{ width: 300, height: 150 }}>
                <LoadingView />
              </div>
            </DialogContent>
          ) : (
            <>
              <DialogTitle id="form-dialog-profile-title">
                Cambiar contraseña
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={1} alignItems="center">
                  <Grid item container xs={12} className={classes.gridItemForm}>
                    <Grid
                      item
                      xs={3}
                      className={classes.gridItemTitle}
                      style={{ fontWeight: "bold" }}
                    >
                      Contraseña:
                    </Grid>
                    <Grid item xs={8}>
                      <FormControl style={{ width: "100%" }}>
                        <TextField
                          type="password"
                          variant="outlined"
                          value={this.state.edit.password}
                          error={this.state.errorMessage.password.length > 0}
                          helperText={this.state.errorMessage.password}
                          onChange={(event) => {
                            this.setState({
                              edit: {
                                ...this.state.edit,
                                password: event.target.value,
                              },
                            });
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} className={classes.gridItemForm}>
                    <Grid
                      item
                      xs={3}
                      className={classes.gridItemTitle}
                      style={{ fontWeight: "bold" }}
                    >
                      Repetir contraseña:
                    </Grid>
                    <Grid item xs={8}>
                      <FormControl style={{ width: "100%" }}>
                        <TextField
                          type="password"
                          variant="outlined"
                          value={this.state.edit.repeatPassword}
                          error={
                            this.state.errorMessage.repeatPassword.length > 0
                          }
                          helperText={this.state.errorMessage.repeatPassword}
                          onChange={(event) => {
                            this.setState({
                              edit: {
                                ...this.state.edit,
                                repeatPassword: event.target.value,
                              },
                            });
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>

              <DialogActions>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={this.closeDialogPassword}
                >
                  Cerrar
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={this.updateUserPassword}
                >
                  Guardar
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.openMessageUpdate}
          autoHideDuration={3000}
          onClose={this.handleCloseMessageUpdate}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={this.handleCloseMessageUpdate}
            severity="success"
          >
            El perfil a sido actulizado correctamente
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.openMessagePassword}
          autoHideDuration={3000}
          onClose={this.handleCloseMessagePassword}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={this.handleCloseMessagePassword}
            severity="success"
          >
            La contraseña fue cambiada correctamente
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(useStyles)(
  withMediaQuery([
    [
      "fullScreen",
      (theme) => theme.breakpoints.down("sm"),
      {
        defaultMatches: false,
      },
    ],
  ])(ProfileView)
);
