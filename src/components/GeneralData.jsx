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
        {!isLoaded && isValidCity && (
          <div className={classes.loadingContainer}>
            <CircularProgress size={50} className={classes.loadingIcon} />
          </div>
        )}
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
        <h1 className={`${classes.container} ${classes.windSpeed}`}>
          {isLoaded &&
            isForecastAvailable &&
            this.getWindSpeedDataBasedOnUnit(sliderValue, windSpeedUnit)}
        </h1>
        <h1 className={`${classes.container} ${classes.temperature}`}>
          {isLoaded &&
            isForecastAvailable &&
            this.getTemperatureDataBasedOnUnit(sliderValue, temperatureUnit)}
        </h1>
        <h1 className={`${classes.container} ${classes.weatherDescription}`}>
          {isLoaded &&
            isForecastAvailable &&
            forecastWeather[sliderValue].weatherPrimary}
        </h1>
        {this.props.children}
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
    position: "relative",
    color: "white",
    display: "inline-block",
    width: "100%",
    marginTop: "-2%",
    textAlign: "center"
  },
  sliderContainer: {
    position: "relative",
    marginLeft: "14vw",
    marginRight: "8vw",
    marginTop: "0%"
  },
  loadingContainer: {
    width: "100%",
    margin: "20px auto"
  },
  loadingIcon: {
    color: "white"
  },
  arrowIcon: {
    position: "relative",
    textAlign: "center",
    width: "12vw",
    paddingBottom: "-2%",
    height: "10vw"
  },
  windSpeed: {
    fontFamily: "CaviarDreams",
    lineHeight: "2%",
    fontSize: "10vw",
    marginTop: "15%"
  },
  temperature: {
    marginTop: "2%",
    fontSize: "17vw",
    marginBottom: "0%"
  },
  weatherDescription: {
    marginTop: "-1%",
    fontSize: "5vw",
    marginBottom: "10%",
    fontFamily: "Open Sans Light !important"
  }
});

export default withStyles(styles)(GeneralData);
