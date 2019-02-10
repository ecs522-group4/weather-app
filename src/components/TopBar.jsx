import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

class TopBar extends Component {
  state = {
    rigth: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <Typography>Settings</Typography>
        <Typography>Temperature</Typography>
        <Typography>Wind Spind</Typography>
        <Typography>Sunny</Typography>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              WhetherWind
            </Typography>

            <Drawer
              anchor="right"
              open={this.state.right}
              onClose={this.toggleDrawer("right", false)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer("right", false)}
                onKeyDown={this.toggleDrawer("right", false)}
              >
                {sideList}
              </div>
            </Drawer>
            <IconButton
              className={classes.menuButton}
              onClick={this.toggleDrawer("right", true)}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = createStyles({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 10
  },
  list: {
    width: 350
  }
});

export default withStyles(styles)(TopBar);
