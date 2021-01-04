import React from "react";
import {
  AppBar,
  Fade,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "./../../logotipo.svg";
import AppBarStyles from "./AppBarStyle";
import MenuProfile from "./MenuProfile";
import Search from "./Search";
import ButtonsLoginSingUp from "./ButtonsLoginSingUp";
import ElevationScroll from "./ElevationScroll";
import clsx from "clsx";

const ApplicationBar = (props) => {
  const classes = AppBarStyles();

  const handleChangeMenuTab = (event, tabPosition) => {
    props.controlApp.setTabMenuPosition(tabPosition);
  };

  return (
    <div className={classes.root}>
      <ElevationScroll>
        <AppBar className={clsx(classes.appbar, "appbar__main")}>
          <Toolbar
            className={
              props.stateApp.isLogged ? classes.toolbarLogin : classes.toolbar
            }
          >
            {props.stateApp.isLogged && false && (
              <Fade in={true}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="men"
                >
                  <MenuIcon />
                </IconButton>
              </Fade>
            )}

            <img
              src={logo}
              style={{ height: 35, cursor: "pointer" }}
              className={classes.logo}
              onClick={() => {
                props.controlApp.history.push("/home");
              }}
              alt="logo"
            />
            <div className={classes.grow} />
            {!props.stateApp.isLoadingAppBar &&
              (props.stateApp.isLogged ? (
                <>
                  <Fade in={true}>
                    <Search />
                  </Fade>
                  <div className={classes.grow} />
                  <MenuProfile
                    stateApp={props.stateApp}
                    controlApp={props.controlApp}
                  />
                </>
              ) : (
                <ButtonsLoginSingUp controlApp={props.controlApp} />
              ))}
          </Toolbar>
          {props.stateApp.showTabMenu && props.stateApp.isLogged && (
            <Tabs
              value={props.stateApp.tabMenuPosition}
              indicatorColor="secondary"
              textColor="secondary"
              onChange={handleChangeMenuTab}
              aria-label="disabled tabs example"
              className={classes.tabMenu}
            >
              <Tab
                label="Todos los Recursos"
                onClick={() => props.controlApp.historyPush("/resources")}
              />
              <Tab
                label="Mis recursos"
                onClick={() => props.controlApp.historyPush("/myresources")}
              />
              <Tab
                label="Favoritos"
                onClick={() => props.controlApp.historyPush("/list/favorites")}
              />
              <Tab
                label="Ver mas tarde"
                onClick={() => props.controlApp.historyPush("/list/watchlater")}
              />
            </Tabs>
          )}
        </AppBar>
      </ElevationScroll>
    </div>
  );
};
export default ApplicationBar;
