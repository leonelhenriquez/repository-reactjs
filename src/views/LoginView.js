import React from "react";
import clsx from "clsx";
import { withStyles, Typography, Card, CardContent, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, TextField } from "@material-ui/core";
import { AccountCircleOutlined, LockOutlined, VisibilityOffOutlined, VisibilityOutlined } from "@material-ui/icons";

const useStyles = (theme) => ({
  rootLoginView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    margin: 0,
    padding: "40px 20px",
  },
  loginCard: {
    width: "100%",
    maxWidth: 350,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  iconAccount: {
    width: 50,
    height: 50,
    margin: "0 auto",
    color: theme.palette.secondary.main,
    textAlign: "center"
  },
  margin: {
    padding: theme.spacing(1),
  },
  textField: {
    width: '100%',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    }
    this.props.controlApp.setShowTabMenu(false);
  }

  setShowPassword = (show) => this.setState({showPassword: show});

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rootLoginView}>
        <Card className={classes.loginCard}>
          <CardContent>
            <AccountCircleOutlined className={classes.iconAccount} />
            <Typography variant="h5">Iniciar sesión</Typography>
            <FormControl variant="outlined" className={classes.textField}>
              <TextField
                type={this.state.showPassword ? 'text' : 'password'}
                label="Contraseña"
                variant="outlined"
                InputProps={{
                  startAdornment:(
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={()=> this.setShowPassword(!this.state.showPassword)}
                        onMouseDown={(event => event.preventDefault())}
                      >
                        {this.state.showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </FormControl>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(useStyles)(LoginView);
