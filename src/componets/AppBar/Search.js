import { fade, InputBase, makeStyles } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
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
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const Search = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchOutlined />
        </div>
        <InputBase
          placeholder={"Buscar..."}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={(event) => {
            props.controlApp.historyPush(
              `/resources?search=${event.target.value}`
            );
          }}
        />
      </div>
    </>
  );
};

export default Search;
