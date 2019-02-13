import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import RefreshIcon from "@material-ui/icons/Refresh";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CheckIcon from "@material-ui/icons/Check";

class ClassName extends Component {
  handleClickRefresh = () => {
    this.props.onRefresh();
  };

  render() {
    const { classes, onRefresh, pathname } = this.props;
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
            {pathname === "/" && (
              <IconButton
                color="inherit"
                aria-label="Refresh"
                onClick={this.handleClickRefresh}
              >
                <RefreshIcon />
              </IconButton>
            )}
            {pathname === "/Settings" && (
              <IconButton
                color="inherit"
                aria-label="Go back"
                to="/"
                component={Link}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography variant="h6" color="inherit" className={classes.title}>
              WhetherWind
            </Typography>
            {pathname === "/" && (
              <IconButton
                component={Link}
                color="inherit"
                aria-label="Settings"
                to="/Settings"
              >
                <SettingsIcon />
              </IconButton>
            )}
            {pathname === "/Settings" && (
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

export default withStyles(styles)(ClassName);
