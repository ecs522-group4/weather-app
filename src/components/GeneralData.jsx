import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";

var background = "assets/backgrounds/boyKite.png";

class GeneralData extends Component {
  render() {
    const { classes, currentWeather, isLoaded } = this.props;
    return (
      <>
        <h1 className={classes.container}>
          {isLoaded && currentWeather.windMPH}mph
        </h1>
        <h1 className={classes.container}>
          {isLoaded && currentWeather.tempC}°C
        </h1>
        <h1 className={classes.container}>
          {isLoaded && currentWeather.weatherShort}
        </h1>
      </>
    );
  }
}

const styles = createStyles({
  container: {
    color: "#191919",
    fontFamily: "Avenir Next",
    backgroundImage: "url(" + background + ")",
    backgroundSize: "cover",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    width: "50%",
    height: "10%",
    textAlign: "left",
    margin: "0 10%"
  }
});

export default withStyles(styles)(GeneralData);
