import React from "react";
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const appbarStyle = {
  toolbar: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
  },
};

export default class ApplicationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={useStyles.root}>
        <AppBar position="fixed">
          <Toolbar style={appbarStyle.toolbar} className="appbar__main" >
            <IconButton
              edge="start"
              className={useStyles.menuButton}
              color="inherit"
              aria-label="men"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={useStyles.title}>
              Biblioteca
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}