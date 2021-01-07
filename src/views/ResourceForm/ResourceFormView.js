import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import API from "../../config/api";
import MaskedInput from "react-text-mask";
import withMediaQuery from "../../utils/withMediaQuery";
import LoadingView from "../LoadingView";
import { DescriptionOutlined, SaveOutlined } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

const axios = require("axios");

const useStyles = (theme) => ({
  title: {
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  textInfo: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  gridItemForm: {
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center",
  },
  gridItemTitle: {
    fontWeight: 600,
    paddingRight: 16,
    textAlign: "right",
    flexGrow: 0,
    maxWidth: "32%",
    flexBasis: "32%",
  },
  gridItemInput: {
    flexGrow: 0,
    maxWidth: "68%",
    flexBasis: "68%",
    paddingRight: 16,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NumberMask = (props) => {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
      placeholderChar={"\u2000"}
    />
  );
};

NumberMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

class ResourceFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: "",
      description: "",
      anyo_publicacion: "",
      autor: "",
      imagen: undefined,
      archivo: undefined,
      tipo: "",
      categoria: "",
      errorMessage: {
        titulo: "",
        description: "",
        anyo_publicacion: "",
        autor: "",
        imagen: "",
        archivo: "",
        tipo: "",
        categoria: "",
      },
      listCategorias: [],
      listTipoRecursos: [],
      isLoading: true,
      disableButton: true,
      showError: false,
      openDialogInfo: false,
      editedMode: false,
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
        titulo: "",
        description: "",
        anyo_publicacion: "",
        autor: "",
        imagen: "",
        archivo: "",
        tipo: "",
        categoria: "",
      },
    });
  };

  resetState() {
    this.setState({
      titulo: "",
      description: "",
      anyo_publicacion: "",
      autor: "",
      imagen: undefined,
      archivo: undefined,
      tipo: "",
      categoria: "",
      isLoading: false,
      disableButton: true,
      showError: false,
      editedMode: false,
    });
  }

  checkInputs = async () => {
    setTimeout(
      () =>
        this.setState({
          disableButton: !(
            this.state.titulo.trim().length > 0 &&
            this.state.description.trim().length > 0 &&
            this.state.anyo_publicacion > 0 &&
            this.state.autor.trim().length > 0 &&
            this.state.tipo > 0 &&
            this.state.categoria > 0 &&
            (this.state.editedMode ||
              typeof this.state.imagen !== "undefined") &&
            (this.state.editedMode || typeof this.state.archivo !== "undefined")
          ),
        }),
      100
    );
  };

  componentDidMount() {
    this.loadListCategories();
    this.loadListTypeResource();
  }

  loadEditResource = async () => {
    if (typeof this.props.editedResource?.id != "undefined") {
      this.setState({
        titulo: this.props.editedResource.titulo,
        description: this.props.editedResource.descripcion,
        anyo_publicacion: this.props.editedResource.anyo_publicacion,
        autor: this.props.editedResource.autor,
        tipo: this.props.editedResource.tipo.id,
        categoria: this.props.editedResource.categoria.id,
        editedMode: true,
        disableButton: false,
      });
    }
  };

  loadListCategories = async () => {
    axios({
      method: "GET",
      url: API.baseURL + "recurso/categoria-list/",
    }).then((response) => {
      if (
        response.status === 200 &&
        typeof response.data?.length !== "undefined" &&
        response.data.length > 0
      ) {
        this.setState({ listCategorias: response.data });
        if (
          this.state.listCategorias.length > 0 &&
          this.state.listTipoRecursos.length > 0
        ) {
          this.setState({ isLoading: false });
        }
      }
    });
  };

  loadListTypeResource = async () => {
    axios({
      method: "GET",
      url: API.baseURL + "recurso/tipoRecurso-list/",
    }).then((response) => {
      if (
        response.status === 200 &&
        typeof response.data?.length !== "undefined" &&
        response.data.length > 0
      ) {
        this.setState({ listTipoRecursos: response.data });
        if (
          this.state.listCategorias.length > 0 &&
          this.state.listTipoRecursos.length > 0
        ) {
          this.setState({ isLoading: false });
        }
      }
    });
  };

  addResource = async () => {
    this.setState({ isLoading: true });
    const formData = new FormData();
    formData.append("usuario", this.props.stateApp.userData.id);
    formData.append("titulo", this.state.titulo);
    formData.append("descripcion", this.state.description);
    formData.append("anyo_publicacion", this.state.anyo_publicacion);
    formData.append("autor", this.state.autor);
    formData.append("tipo", this.state.tipo);
    formData.append("categoria", this.state.categoria);
    formData.append("imagen", this.state.imagen, this.state.imagen.name);
    formData.append("archivo", this.state.archivo, this.state.archivo.name);
    axios({
      method: "POST",
      url: API.baseURL + "recurso/recurso-create/",
      data: formData,
    })
      .then((response) => {
        if (typeof response.data?.id != "undefined") {
          this.props.controlApp.resourceDialog.close();
          this.setState({ openDialogInfo: true });
          this.resetState();
        } else {
          this.setState({ showError: true });
        }
      })
      .catch((error) => {
        this.setState({ showError: true });
        if (typeof error.response?.data != "undefined") {
          let data = error.response.data;

          if (typeof data.titulo != "undefined") {
            this.setErrorMessage("titulo", data.titulo);
          }

          if (typeof data.description != "undefined") {
            this.setErrorMessage("description", data.descripcion);
          }

          if (typeof data.anyo_publicacion != "undefined") {
            this.setErrorMessage("anyo_publicacion", data.anyo_publicacion);
          }

          if (typeof data.autor != "undefined") {
            this.setErrorMessage("autor", data.autor);
          }

          if (typeof data.imagen != "undefined") {
            this.setErrorMessage("imagen", data.imagen);
          }

          if (typeof data.archivo != "undefined") {
            this.setErrorMessage("archivo", data.archivo);
          }

          if (typeof data.tipo != "undefined") {
            this.setErrorMessage("tipo", data.tipo);
          }

          if (typeof data.categoria != "undefined") {
            this.setErrorMessage("categoria", data.categoria);
          }
        }
      })
      .then(() => {
        this.setState({ isLoading: false });
      });
  };

  saveEditResource = async () => {
    this.setState({ isLoading: true });
    const formData = new FormData();
    formData.append("usuario", this.props.stateApp.userData.id);
    formData.append("titulo", this.state.titulo);
    formData.append("descripcion", this.state.description);
    formData.append("anyo_publicacion", this.state.anyo_publicacion);
    formData.append("autor", this.state.autor);
    formData.append("tipo", this.state.tipo);
    formData.append("categoria", this.state.categoria);
    if (typeof this.state.imagen != "undefined") {
      formData.append("imagen", this.state.imagen, this.state.imagen.name);
    }
    if (typeof this.state.archivo != "undefined") {
      formData.append("archivo", this.state.archivo, this.state.archivo.name);
    }
    axios({
      method: "PUT",
      url:
        API.baseURL + `recurso/recurso-update/${this.props.editedResource.id}/`,
      data: formData,
    })
      .then((response) => {
        if (typeof response.data?.id != "undefined") {
          this.props.controlApp.resourceDialog.close();
          this.setState({ openDialogInfo: true });
          this.resetState();
          setTimeout(() => this.props.controlApp.history.go(0), 2000);
        } else {
          this.setState({ showError: true });
        }
      })
      .catch((error) => {
        this.setState({ showError: true });
        if (typeof error.response?.data != "undefined") {
          let data = error.response.data;

          if (typeof data.titulo != "undefined") {
            this.setErrorMessage("titulo", data.titulo);
          }

          if (typeof data.description != "undefined") {
            this.setErrorMessage("description", data.descripcion);
          }

          if (typeof data.anyo_publicacion != "undefined") {
            this.setErrorMessage("anyo_publicacion", data.anyo_publicacion);
          }

          if (typeof data.autor != "undefined") {
            this.setErrorMessage("autor", data.autor);
          }

          if (typeof data.imagen != "undefined") {
            this.setErrorMessage("imagen", data.imagen);
          }

          if (typeof data.archivo != "undefined") {
            this.setErrorMessage("archivo", data.archivo);
          }

          if (typeof data.tipo != "undefined") {
            this.setErrorMessage("tipo", data.tipo);
          }

          if (typeof data.categoria != "undefined") {
            this.setErrorMessage("categoria", data.categoria);
          }
        }
      })
      .then(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const listCategories = this.state.listCategorias.map((item) => (
      <MenuItem key={item.id.toString()} value={item.id}>
        {item.nombre}
      </MenuItem>
    ));

    const listTypeResource = this.state.listTipoRecursos.map((item) => (
      <MenuItem key={item.id.toString()} value={item.id}>
        {item.nombre}
      </MenuItem>
    ));

    const { classes, fullScreen = false } = this.props;

    return (
      <>
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          onClose={this.props.controlApp.resourceDialog.close}
          disableBackdropClick
          keepMounted
          aria-labelledby="form-dialog-resource-title"
          fullScreen={fullScreen}
          onEntering={() => this.loadEditResource()}
          onExiting={() => {
            this.resetState();
            this.props.controlApp.resourceDialog.edit({});
          }}
        >
          {!this.state.isLoading && (
            <DialogTitle
              id="form-dialog-resource-title"
              disableTypography
              style={{ paddingTop: 24, paddingBottom: 24 }}
            >
              <Typography variant="h5" className={classes.title}>
                <DescriptionOutlined style={{ marginRight: 16 }} />
                Agregar recurso
              </Typography>
            </DialogTitle>
          )}
          <DialogContent>
            {this.state.isLoading ? (
              <div style={{ width: 300, height: 150 }}>
                <LoadingView />
              </div>
            ) : (
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Collapse in={this.state.showError}>
                    <Alert severity="error">
                      <strong>Error</strong> No se puedo agregar el recurso
                      porfavor revice los campos.
                    </Alert>
                  </Collapse>
                </Grid>
                <Grid item container xs={12} className={classes.gridItemForm}>
                  <Grid item className={classes.gridItemTitle}>
                    Titulo:
                  </Grid>
                  <Grid item className={classes.gridItemInput}>
                    <FormControl style={{ width: "100%" }}>
                      <TextField
                        label="Titulo"
                        variant="outlined"
                        value={this.state.titulo}
                        error={this.state.errorMessage.titulo.length > 0}
                        helperText={this.state.errorMessage.titulo}
                        onChange={(event) => {
                          this.setState({ titulo: event.target.value });
                          this.checkInputs();
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item container xs={12} className={classes.gridItemForm}>
                  <Grid item className={classes.gridItemTitle}>
                    Descripción:
                  </Grid>
                  <Grid item className={classes.gridItemInput}>
                    <FormControl style={{ width: "100%" }}>
                      <TextField
                        label="Descripción"
                        variant="outlined"
                        multiline
                        rows={3}
                        value={this.state.description}
                        error={this.state.errorMessage.description.length > 0}
                        helperText={this.state.errorMessage.description}
                        onChange={(event) => {
                          this.setState({ description: event.target.value });
                          this.checkInputs();
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item container xs={12} className={classes.gridItemForm}>
                  <Grid item className={classes.gridItemTitle}>
                    Año de publicación:
                  </Grid>
                  <Grid item className={classes.gridItemInput}>
                    <FormControl style={{ width: "100%" }}>
                      <TextField
                        label="Año de publicación"
                        variant="outlined"
                        value={this.state.anyo_publicacion}
                        error={
                          this.state.errorMessage.anyo_publicacion.length > 0
                        }
                        helperText={this.state.errorMessage.anyo_publicacion}
                        onChange={(event) => {
                          this.setState({
                            anyo_publicacion: event.target.value,
                          });
                          this.checkInputs();
                        }}
                        InputProps={{
                          inputComponent: NumberMask,
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item container xs={12} className={classes.gridItemForm}>
                  <Grid item className={classes.gridItemTitle}>
                    Autor:
                  </Grid>
                  <Grid item className={classes.gridItemInput}>
                    <FormControl style={{ width: "100%" }}>
                      <TextField
                        label="Autor"
                        variant="outlined"
                        value={this.state.autor}
                        error={this.state.errorMessage.autor.length > 0}
                        helperText={this.state.errorMessage.autor}
                        onChange={(event) => {
                          this.setState({ autor: event.target.value });
                          this.checkInputs();
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item container xs={12} className={classes.gridItemForm}>
                  <Grid item className={classes.gridItemTitle}>
                    Imagen:
                  </Grid>
                  <Grid item className={classes.gridItemInput}>
                    <FormControl style={{ width: "100%" }}>
                      <TextField
                        error={this.state.errorMessage.imagen.length > 0}
                        helperText={this.state.errorMessage.imagen}
                        variant="outlined"
                        type="file"
                        inputProps={{
                          accept: "image/png, image/jpeg, image/gif",
                        }}
                        onChange={(event) => {
                          this.setState({ imagen: event.target.files[0] });
                          this.checkInputs();
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item container xs={12} className={classes.gridItemForm}>
                  <Grid item className={classes.gridItemTitle}>
                    Archivo:
                  </Grid>
                  <Grid item className={classes.gridItemInput}>
                    <FormControl style={{ width: "100%" }}>
                      <TextField
                        error={this.state.errorMessage.archivo.length > 0}
                        helperText={this.state.errorMessage.archivo}
                        variant="outlined"
                        type="file"
                        inputProps={{
                          accept:
                            "application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*",
                        }}
                        onChange={(event) => {
                          this.setState({ archivo: event.target.files[0] });
                          this.checkInputs();
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item container xs={12} className={classes.gridItemForm}>
                  <Grid item className={classes.gridItemTitle}>
                    Categoria:
                  </Grid>
                  <Grid item className={classes.gridItemInput}>
                    <FormControl
                      variant="outlined"
                      style={{ width: "100%" }}
                      error={this.state.errorMessage.categoria.length > 0}
                    >
                      <InputLabel id="select-label-categoria">
                        Categoria
                      </InputLabel>
                      <Select
                        label="Categoria"
                        labelId="select-label-categoria"
                        value={this.state.categoria}
                        onChange={(event) => {
                          this.setState({ categoria: event.target.value });
                          this.checkInputs();
                        }}
                      >
                        {listCategories}
                      </Select>
                      <FormHelperText>
                        {this.state.errorMessage.categoria}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item container xs={12} className={classes.gridItemForm}>
                  <Grid item className={classes.gridItemTitle}>
                    Tipo:
                  </Grid>
                  <Grid item className={classes.gridItemInput}>
                    <FormControl
                      variant="outlined"
                      style={{ width: "100%" }}
                      error={this.state.errorMessage.tipo.length > 0}
                    >
                      <InputLabel id="select-label-categoria">Tipo</InputLabel>
                      <Select
                        label="Tipo"
                        labelId="select-label-categoria"
                        value={this.state.tipo}
                        onChange={(event) => {
                          this.setState({ tipo: event.target.value });
                          this.checkInputs();
                        }}
                      >
                        {listTypeResource}
                      </Select>
                      <FormHelperText>
                        {this.state.errorMessage.tipo}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          {!this.state.isLoading && (
            <DialogActions style={{ padding: "16px 40px" }}>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => {
                  this.props.controlApp.resourceDialog.close();
                  this.resetState();
                }}
              >
                Cerrar
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                disabled={this.state.disableButton}
                onClick={() => {
                  if (this.state.editedMode) {
                    this.saveEditResource();
                  } else {
                    this.addResource();
                  }
                }}
              >
                {this.state.editedMode ? "Guardar" : "Agregar"}
              </Button>
            </DialogActions>
          )}
        </Dialog>
        <Dialog
          open={this.state.openDialogInfo}
          onClose={() => {
            this.setState({ openDialogInfo: false });
            this.props.controlApp.history.go(0);
          }}
        >
          <DialogTitle>Recurso guardo</DialogTitle>
          <DialogContent>
            <Typography
              variant="body1"
              style={{ padding: "32px 16px" }}
              className={classes.textInfo}
            >
              <SaveOutlined style={{ marginRight: 16, fontSize: 32 }} />
              Se guardo el recurso correctamente
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => {
                this.setState({ openDialogInfo: false });
                this.props.controlApp.history.go(0);
              }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </>
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
  ])(ResourceFormView)
);
