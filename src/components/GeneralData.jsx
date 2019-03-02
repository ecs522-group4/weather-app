import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/lab/Slider";
import CircularProgress from "@material-ui/core/CircularProgress";

class GeneralData extends Component {
  handleChange = (event, sliderValue) => {
    this.props.onChangeSliderValue(sliderValue);
  };

  render() {
    const {
      classes,
      forecastWeather,
      isLoaded,
      temperatureUnit,
      windSpeedUnit,
      isValidCity,
      isForecastAvailable,
      sliderValue
    } = this.props;
    return (
      <div>
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
        {!isLoaded && isValidCity && (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        )}
        <h1 className={classes.container}>
          {isLoaded &&
            isForecastAvailable &&
            this.getWindSpeedDataBasedOnUnit(sliderValue, windSpeedUnit)}
        </h1>
        {isLoaded &&
          isForecastAvailable &&
          forecastWeather[sliderValue].windDirDEG && (
            <img
              src={require("../assets/icons/arrow.svg")}
              alt="arrow indicating wind direction"
              className={classes.arrowIcon}
              style={{
                transform: `rotate(${
                  forecastWeather[sliderValue].windDirDEG
                }deg)`
              }}
            />
          )}
        <h1 className={classes.container}>
          {isLoaded &&
            isForecastAvailable &&
            this.getTemperatureDataBasedOnUnit(sliderValue, temperatureUnit)}
        </h1>
        <h1 className={classes.container}>
          {isLoaded &&
            isForecastAvailable &&
            forecastWeather[sliderValue].weatherPrimary}
        </h1>
      </div>
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
      default:
        break;
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
    fontSize: "1.7em",
    display: "inline-block",
    width: "100%",
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
  },
  loadingContainer: {
    width: "100%",
    margin: "20px auto"
  },
  arrowIcon: {
    position: "absolute",
    right: "20%",
    width: "10vw",
    height: "10vw"
  }
});

export default withStyles(styles)(GeneralData);
