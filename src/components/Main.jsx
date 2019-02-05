import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";

/* --- WEATHER API --- */
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
const KEY = process.env.REACT_APP_OPENWEATHER_KEY;

class Main extends Component {
  state = {
    lat: 51.5,
    long: 0.12,
    data: "",
    isLoaded: false
  };

  render() {
    const { classes } = this.props;
    const { data, isLoaded } = this.state;

    return (
      <div className={classes.container}>
        <h1>Weather App</h1>
        <p>Weather: {isLoaded && data.weather[0].main}</p>
        <p>
          Temperature:
          {isLoaded && (parseInt(data.main.temp) - 273.15).toFixed(2)}
        </p>
        <p>Wind speed: {isLoaded && data.wind.speed}</p>
        <p>
          Place: {isLoaded && data.name}, {isLoaded && data.sys.country}
        </p>
        <button onClick={this.updateWeatherBasedOnLocation}>
          Get weather for my location
        </button>
      </div>
    );
  }

  async componentDidMount() {
    this.fetchWeatherFromAPI();
  }

  fetchWeatherFromAPI = async () => {
    const { lat, long } = this.state;
    fetch(`${BASE_URL}lat=${lat}&lon=${long}&appid=${KEY}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({ data: result, isLoaded: true });
        },
        error => {
          console.log(error);
          this.setState({ data: error, isLoaded: true });
        }
      );
  };

  updateWeatherBasedOnLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.setState({ lat: pos.coords.latitude, long: pos.coords.longitude });
        this.fetchWeatherFromAPI();
      },
      err => {
        console.log(err);
      }
    );
  };
}

const styles = createStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "414px",
    height: "736px",
    textAlign: "center",
    margin: "0 auto",
    backgroundColor: "#fafafa"
  }
});

export default withStyles(styles)(Main);
