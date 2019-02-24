import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import TopBar from "./TopBar";
import Settings from "./Settings";
import GeneralData from "./GeneralData";
import LocationSearchbar from "./LocationSearchbar";

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
    isLoaded: false,
    isSettingsMenuOpen: false,
    // Default settings. User can change these in the Settings
    temperatureUnit: "C",
    windSpeedUnit: "KPH",
    minimumTemperature: 20,
    minimumWindSpeed: 15,
    sliderValue: 0,
    currentCity: ""
  };

  render() {
    const { classes } = this.props;
    const {
      currentWeather,
      forecastWeather,
      isLoaded,
      isSettingsMenuOpen,
      temperatureUnit,
      windSpeedUnit,
      minimumWindSpeed,
      minimumTemperature
    } = this.state;

    return (
      <div className={classes.container}>
        <TopBar
          isSettingsMenuOpen={isSettingsMenuOpen}
          onRefresh={this.updateWeatherBasedOnLocation}
          onCloseSettings={this.closeSettingsMenu}
          onOpenSettings={this.openSettingsMenu}
        />
        <LocationSearchbar onSelectNewCity={this.updateCurrentCity} />
        {isLoaded && (
          <h1 style={{ display: this.checkIfCanFlyKite() ? "block" : "none" }}>
            You can fly!
          </h1>
        )}
        {isSettingsMenuOpen === false ? (
          <GeneralData
            isLoaded={isLoaded}
            currentWeather={currentWeather}
            forecastWeather={forecastWeather}
            temperatureUnit={temperatureUnit}
            windSpeedUnit={windSpeedUnit}
            onChangeSliderValue={this.updateSliderValue}
          />
        ) : (
          <Settings
            temperatureUnit={temperatureUnit}
            windSpeedUnit={windSpeedUnit}
            minimumWindSpeed={minimumWindSpeed}
            minimumTemperature={minimumTemperature}
            onChangeTemperatureUnit={this.changeTemperatureUnit}
            onChangeSpeedUnit={this.changeSpeedUnit}
            onChangeTemperature={this.changeminimumTemperature}
            onChangeWindSpeed={this.changeminimumWindSpeed}
          />
        )}
      </div>
    );
  }

  async componentDidMount() {
    // Fetch weather data as soon as we load the app
    this.fetchWeatherFromAPI();
  }

  // This function queries the API, and if we receive a valid response we tidy
  // it up and store it in the state
  fetchWeatherFromAPI = async currentCity => {
    let currentWeather;
    let location;
    // If no city specified by the users
    if (!currentCity) {
      const { lat, long } = this.state;
      // If coordinates have been set, query by GPS position. Otherwise use
      // automatic position (retrieved by IP)
      location = lat === null ? ":auto" : `${lat},${long}`;
    } else {
      location = currentCity;
    }
    // Fetch data from the API, sanitize it and store it.
    // Fetch current weather
    fetch(`${BASE_URL}/${FETCH_CURRENT}/${location}?${OPTIONS_CURRENT}`)
      .then(res => res.json())
      .then(result => {
        if (!result.success) {
          console.error("Current API call failed", result.error);
        } else {
          currentWeather = {
            placeName: result.response.place.name,
            cityName: result.response.place.city,
            countryName: result.response.place.country,
            dateTime: result.response.obDateTime,
            tempC: result.response.ob.tempC,
            tempF: result.response.ob.tempF,
            humidity: result.response.ob.humidity,
            windSpeedKTS: result.response.ob.windSpeedKTS,
            windSpeedKPH: result.response.ob.windSpeedKPH,
            windSpeedMPH: result.response.ob.windSpeedMPH,
            windDirDEG: result.response.ob.windDirDEG,
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
            sunriseISO: result.response.ob.sunriseISO,
            sunsetISO: result.response.ob.sunsetISO,
            sky: result.response.ob.sky
          };
          this.setState({ currentWeather });
        }
      });

    // Fetch forecast for the next 23 hours
    fetch(`${BASE_URL}/${FETCH_FORECAST}/${location}?${OPTIONS_FORECAST}`)
      .then(res => res.json())
      .then(result => {
        if (!result.success) {
          console.error("Forecast API call failed", result.error);
          this.setState({ isLoaded: false });
        } else {
          const forecastWeather = result.response[0].periods;
          // Adding the currentWeather at the beginning of the forecast array
          forecastWeather.unshift(currentWeather);
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

  closeSettingsMenu = () => {
    this.setState({ isSettingsMenuOpen: false });
  };

  openSettingsMenu = () => {
    this.setState({ isSettingsMenuOpen: true });
  };

  changeTemperatureUnit = temperatureUnit => {
    this.setState({ temperatureUnit });
  };

  changeSpeedUnit = windSpeedUnit => {
    this.setState({ windSpeedUnit });
  };

  changeminimumWindSpeed = minimumWindSpeed => {
    this.setState({ minimumWindSpeed });
  };

  changeminimumTemperature = minimumTemperature => {
    this.setState({ minimumTemperature });
  };

  updateSliderValue = sliderValue => {
    this.setState({ sliderValue });
  };

  updateCurrentCity = currentCity => {
    if (currentCity) {
      this.setState({ currentCity });
      this.fetchWeatherFromAPI(currentCity);
    }
  };

  checkIfCanFlyKite = () => {
    const {
      minimumWindSpeed,
      minimumTemperature,
      temperatureUnit,
      windSpeedUnit,
      forecastWeather,
      sliderValue
    } = this.state;
    const temperature =
      temperatureUnit === "C"
        ? forecastWeather[sliderValue].tempC
        : forecastWeather[sliderValue].tempF;
    const windSpeed =
      windSpeedUnit === "KPH"
        ? forecastWeather[sliderValue].windSpeedKPH
        : windSpeedUnit === "MPH"
        ? forecastWeather[sliderValue].windSpeedMPH
        : forecastWeather[sliderValue].windSpeedKTS;

    if (temperature >= minimumTemperature && windSpeed >= minimumWindSpeed) {
      return true;
    }
    return false;
  };
}

const styles = createStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    margin: "0 auto"
  }
});

export default withStyles(styles)(Main);
