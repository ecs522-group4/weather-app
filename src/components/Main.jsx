import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import TopBar from "./TopBar";
/* --- WEATHER API --- */
const BASE_URL = "https://api.aerisapi.com";
const FETCH_CURRENT = "observations";
const FETCH_FORECAST = "forecasts";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const KEYS = `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
const OPTIONS_CURRENT = `%format=json&filter=allstations&limit=1&${KEYS}`;
const OPTIONS_FORECAST = `format=json&filter=1hr&limit=23&${KEYS}`;

class Main extends Component {
  state = {
    // Coordinates for query
    lat: null,
    long: null,
    // Stores an object with current weather information
    currentWeather: "",
    // Stores an object with weather information for the next 23 hours
    forecastWeather: "",
    // Indicates if we received the API data correctly
    isLoaded: false
  };

  render() {
    const { classes } = this.props;
    const { currentWeather, isLoaded } = this.state;

    return (
      <div className={classes.container}>
        <TopBar />
        <h1>Weather App</h1>
        <p>Weather: {isLoaded && currentWeather.weatherShort}</p>
        <p>Temperature: {isLoaded && currentWeather.tempC}</p>
        <p>Wind speed: {isLoaded && currentWeather.windKPH}</p>
        <p>
          Place: {isLoaded && currentWeather.cityName},{" "}
          {isLoaded && currentWeather.countryName}
        </p>
        <button onClick={this.updateWeatherBasedOnLocation}>
          Get weather for my location
        </button>
      </div>
    );
  }

  async componentDidMount() {
    // Fetch weather data as soon as we load the app
    this.fetchWeatherFromAPI();
  }

  // This function queries the API, and if we receive a valid response we tidy
  // it up and store it in the state
  fetchWeatherFromAPI = async () => {
    const { lat, long } = this.state;
    // If coordinates have been set, query by GPS position. Otherwise use
    // automatic position (retrieved by IP)
    const LOCATION = lat === null ? ":auto" : `${lat},${long}`;
    // Fetch data from the API, sanitize it and store it.
    // Fetch current weather
    fetch(`${BASE_URL}/${FETCH_CURRENT}/${LOCATION}?${OPTIONS_CURRENT}`)
      .then(res => res.json())
      .then(result => {
        if (!result.success) {
          console.error("Current API call failed", result.error);
        } else {
          const currentWeather = {
            placeName: result.response.place.name,
            cityName: result.response.place.city,
            countryName: result.response.place.country,
            dateTime: result.response.obDateTime,
            tempC: result.response.ob.tempC,
            tempF: result.response.ob.tempF,
            humidity: result.response.ob.humidity,
            windKTS: result.response.ob.windSpeedKTS,
            windKPH: result.response.ob.windSpeedKPH,
            windMPH: result.response.ob.windSpeedMPH,
            windDirDeg: result.response.ob.windDirDEG,
            windDir: result.response.ob.windDir,
            windGustKTS: result.response.ob.windGustKTS,
            windGustKPH: result.response.ob.windGustKPH,
            windGustMPH: result.response.ob.windGustMPH,
            weather: result.response.ob.weather,
            weatherShort: result.response.ob.weatherShort,
            windchillC: result.response.ob.windchillC,
            windchillF: result.response.ob.windchillF,
            feelsLikeC: result.response.ob.feelsLikeC,
            feelsLikeF: result.response.ob.feelsLikeF,
            isDay: result.response.ob.isDay,
            sunrise: result.response.ob.sunriseISO,
            sunset: result.response.ob.sunsetISO,
            skyCoverage: result.response.ob.sky
          };
          this.setState({ currentWeather });
        }
      });

    // Fetch forecast for the next 23 hours
    fetch(`${BASE_URL}/${FETCH_FORECAST}/${LOCATION}?${OPTIONS_FORECAST}`)
      .then(res => res.json())
      .then(result => {
        if (!result.success) {
          console.error("Forecast API call failed", result.error);
          this.setState({ isLoaded: false });
        } else {
          const forecastWeather = result.response[0].periods;
          this.setState({ forecastWeather, isLoaded: true });
        }
      });
  };

  // This function retrieves Users' position, then updates the state with the
  // GPS data and queries the API.
  updateWeatherBasedOnLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.setState({ lat: pos.coords.latitude, long: pos.coords.longitude });
        this.fetchWeatherFromAPI();
      },
      err => {
        console.error(err);
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
