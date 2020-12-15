import React from "react";
import {
  Button,
  Fade,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  withStyles,
} from "@material-ui/core";
import {
  AccountCircleOutlined,
  CollectionsBookmarkOutlined,
  ExitToAppOutlined,
  ExpandLessOutlined,
  ExpandMoreOutlined,
  FavoriteBorderOutlined,
  WatchLaterOutlined,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginLeft: theme.spacing(2),
    fontWeight: 600,
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={3}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.common.dark,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.dark,
      },
    },
  },
}))(MenuItem);

const MenuProfile = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Fade in={true}>
        <Button
          aria-controls="user-menu"
          aria-haspopup="true"
          onClick={handleClick}
          variant="outlined"
          color="secondary"
          className={classes.buttons}
          startIcon={<AccountCircleOutlined />}
          endIcon={
            <>
              {Boolean(anchorEl) ? (
                <ExpandLessOutlined />
              ) : (
                <ExpandMoreOutlined />
              )}
            </>
          }
        >
          {props.stateApp.userData.nombre}
        </Button>
      </Fade>
      <StyledMenu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <AccountCircleOutlined fontSize="large" color="secondary" />
          </ListItemIcon>
          <ListItemText
            primary="Perfil"
            secondary={"@" + props.stateApp.userData.username}
          />
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemIcon>
            <CollectionsBookmarkOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Mis recursos" />
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemIcon>
            <FavoriteBorderOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Favoritos" />
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemIcon>
            <WatchLaterOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Ver mas tarde" />
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemIcon>
            <ExitToAppOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
};

export default MenuProfile;
