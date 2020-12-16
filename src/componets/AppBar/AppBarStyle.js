import { fade, makeStyles } from "@material-ui/core";

const AppBarStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "#FFFFFF",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  buttons: {
    marginLeft: theme.spacing(2),
    fontWeight: 600,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.1),
    },
    margin: "0 auto",
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    width: "60%",
    maxWidth: 400,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  toolbar: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
    paddingTop: 40,
    paddingBottom: 40,
  },
  toolbarLogin: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
    paddingTop: 0,
    paddingBottom: 0,
  },
  tabMenu: {
    maxWidth: "1100px",
    margin: "0 auto",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export default AppBarStyles;
