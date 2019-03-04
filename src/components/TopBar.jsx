import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import RefreshIcon from "@material-ui/icons/Refresh";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CheckIcon from "@material-ui/icons/Check";
import Logo from "../assets/icons/logo.png";
import Menu from "../assets/icons/menu.png";


class TopBar extends Component {
  state = {
    isSettingsMenuOpen: false
  };

  handleClickRefresh = () => {
    this.props.onRefresh();
  };

  handleCloseSettings = () => {
    this.props.onCloseSettings();
    this.setState({ isSettingsMenuOpen: false });
  };

  handleOpenSettings = () => {
    this.props.onOpenSettings();
    this.setState({ isSettingsMenuOpen: true });
  };

  render() {
    const { classes } = this.props;
    const { isSettingsMenuOpen } = this.state;
    return (
      <>
        <Toolbar className={classes.container}>
          {/* Conditional rendering based on which component we are rendering
           */}
          {!isSettingsMenuOpen && (
            <img
              className={classes.logo}
              src={Logo}
              aria-label="Refresh"
              onClick={this.handleClickRefresh}
            />
          )}

          {isSettingsMenuOpen && (
            <IconButton aria-label="Go back" onClick={this.handleCloseSettings}>
              <ArrowBackIcon />
            </IconButton>
          )}

          {!isSettingsMenuOpen && (
            <img
              className={classes.menu}
              src={Menu}
              aria-label="Settings"
              onClick={this.handleOpenSettings}
            />
          )}
          {isSettingsMenuOpen && (
            <IconButton aria-label="Save">
              <CheckIcon />
            </IconButton>
          )}
        </Toolbar>
      </>
    );
  }
}

const styles = createStyles({
  container: {
    marginTop: "0%",
    position: "fixed",

    width: "100%"
  },
  name: {
    marginLeft: "1%",
    marginTop: "2%",
    width: "2vw",
    fontWeight: "400"
  },
  navBarColour: {
    backgroundColor: "white"
  },

  logo: {
    width: "6vw",
    marginLeft: "0%"
  },
  menu: {
    width: "6vw",
    marginLeft: "79%"
  }
});

export default withStyles(styles)(TopBar);
