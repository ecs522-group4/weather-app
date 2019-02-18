import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/lab/Slider";

class GeneralData extends Component {
  state = {
    sliderValue: 0
  };

  handleChange = (event, sliderValue) => {
    this.setState({ sliderValue });
    this.props.onChangeSliderValue(sliderValue);
  };

  render() {
    const {
      classes,
      currentWeather,
      forecastWeather,
      isLoaded,
      temperatureUnit,
      windSpeedUnit,
      onChangeSliderValue
    } = this.props;
    const { sliderValue } = this.state;
    return (
      <>
        <div className={classes.sliderContainer}>
          {/* the forecastWeather array has 23 elements (0-22 index).
              the slider has a range between 0-23 to allow us to assign the 0
              to the currentWeather, and the remaning 1-23 to forecastWeather.
              However, we need to change the range from 1-23 to 0-22.
              (sliderValue - 1) */}
          <Slider
            classes={{ container: classes.slider }}
            min={0}
            max={23}
            step={1}
            value={sliderValue}
            aria-labelledby="label"
            onChange={this.handleChange}
          />
        </div>
        <h1 className={classes.container}>
          {isLoaded &&
            this.getWindSpeedDataBasedOnUnit(sliderValue, windSpeedUnit)}
        </h1>
        <h1 className={classes.container}>
          {isLoaded &&
            this.getTemperatureDataBasedOnUnit(sliderValue, temperatureUnit)}
        </h1>
        <h1 className={classes.container}>
          {isLoaded && forecastWeather[sliderValue].weather}
        </h1>
      </>
    );
  }

  getWindSpeedDataBasedOnUnit = (sliderValue, unit) => {
    const { forecastWeather } = this.props;
    switch (unit) {
      case "KPH":
        return `${forecastWeather[sliderValue].windSpeedKPH} ${unit}`;
      case "MPH":
        return `${forecastWeather[sliderValue].windSpeedMPH} ${unit}`;
      case "KTS":
        return `${forecastWeather[sliderValue].windSpeedKTS} ${unit}`;
    }
  };

  getTemperatureDataBasedOnUnit = (sliderValue, unit) => {
    const { forecastWeather } = this.props;
    return unit === "F"
      ? `${forecastWeather[sliderValue].tempF} °F`
      : `${forecastWeather[sliderValue].tempC} °C`;
  };
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
  },
  sliderContainer: {
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "20%"
  }
});

export default withStyles(styles)(GeneralData);
