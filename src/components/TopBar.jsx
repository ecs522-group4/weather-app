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
        <AppBar
          position="static"
          classes={{ colorPrimary: classes.navBarColour }}
          className={classes.container}
        >
          <Toolbar>
            {/* Conditional rendering based on which component we are rendering
             */}
            {!isSettingsMenuOpen && (
              <IconButton
                color="inherit"
                aria-label="Refresh"
                onClick={this.handleClickRefresh}
              >
                <RefreshIcon />
              </IconButton>
            )}
            {isSettingsMenuOpen && (
              <IconButton
                color="inherit"
                aria-label="Go back"
                onClick={this.handleCloseSettings}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography variant="h6" color="inherit" className={classes.title}>
              WhetherWind
            </Typography>
            {!isSettingsMenuOpen && (
              <IconButton
                color="inherit"
                aria-label="Settings"
                onClick={this.handleOpenSettings}
              >
                <SettingsIcon />
              </IconButton>
            )}
            {isSettingsMenuOpen && (
              <IconButton color="inherit" aria-label="Save">
                <CheckIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

const styles = createStyles({
  title: {
    flexGrow: 1
  },
  navBarColour: {
    backgroundColor: "#061ca3"
  },
  linkToSettings: {
    textDecoration: "none",
    color: "inherit",
    display: "none"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    margin: "0 auto"
  }
});

export default withStyles(styles)(TopBar);
