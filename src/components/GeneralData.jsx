import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/lab/Slider";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

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
      <>
        <div className={classes.container}>
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

          <Typography className={classes.wind}>
            {isLoaded &&
              isForecastAvailable &&
              this.getWindSpeedDataBasedOnUnit(sliderValue, windSpeedUnit)}
          </Typography>
          <Typography className={classes.temp}>
            {isLoaded &&
              isForecastAvailable &&
              this.getTemperatureDataBasedOnUnit(sliderValue, temperatureUnit)}
          </Typography>

          <Typography className={classes.weath}>
            {isLoaded &&
              isForecastAvailable &&
              forecastWeather[sliderValue].weather}
          </Typography>
        </div>
        <div className={classes.sliderContainer}>
          {/* the forecastWeather array has 23 elements (0-22 index).
              the slider has a range between 0-23 to allow us to assign the 0
              to the currentWeather, and the remaning 1-23 to forecastWeather.
              However, we need to change the range from 1-23 to 0-22.
              (sliderValue - 1) */}
          <Slider
            classes={classes.slider}
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
      default:
        break;
    }
  };

  getTemperatureDataBasedOnUnit = (sliderValue, unit) => {
    const { forecastWeather } = this.props;
    return unit === "F"
      ? `${forecastWeather[sliderValue].tempF}°F`
      : `${forecastWeather[sliderValue].tempC}°C`;
  };
}

const styles = createStyles({
  container: {
    position: "fixed",
    marginTop: "0%",
    marginLeft: "30%"
  },
  sliderContainer: {
    marginLeft: "10%",
    marginRight: "10%",
    height: "100%",
    marginTop: "60%"
  },
  loadingContainer: {
    width: "100%",
    margin: "20px auto"
  },
  arrowIcon: {
    marginTop: "-50%",
    width: "15vw"
  },
  temp: {
    fontSize: "17vw",
    marginTop: "20%",
    positon: "absolute",
    float: "right",
    marginRight: "2%",
    color: "white"
  },
  wind: {
    positon: "absolute",
    fontSize: "10vw",
    marginTop: "-5%",

    color: "white"
  },
  weath: {
    positon: "absolute",
    fontSize: "5vw",
    width: "100%",

    marginTop: "-10%",

    color: "white"
  }
});

export default withStyles(styles)(GeneralData);
