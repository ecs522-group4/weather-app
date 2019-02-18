import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";

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
    fontSize: "170%",
    display: "flex",
    flexDirection: "column",
    width: "60%",
    height: "20%",
    textAlign: "left",
    marginBottom: "7%",
    marginLeft: "10%",
    top: "60%"
  }
});

export default withStyles(styles)(GeneralData);
