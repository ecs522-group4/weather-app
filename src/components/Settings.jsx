import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import InputBase from "@material-ui/core/InputBase";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import TopBar from "./TopBar";

const maxTemperatureC = 50;
const minTemperatureC = -18;
const maxTemperatureF = 122;
const minTemperatureF = 0;
const maxSpeedKPH = 200;
const minSpeedKPH = 0;
const maxSpeedMPH = 124;
const minSpeedMPH = 0;
const maxSpeedKTS = 107;
const minSpeedKTS = 0;

class Settings extends Component {
  state = {
    checked: ["daytime"],
    windSpeed: "15",
    temperature: "20",
    temperatureUnit: "C",
    speedUnit: "KPH"
  };

  // Handling array of switches
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  handleDecreaseWindSpeed = () => {
    const { windSpeed } = this.state;
    const newSpeed = parseInt(windSpeed) - 1;
    this.updateWindSpeedValue(newSpeed);
  };

  handleIncreaseWindSpeed = () => {
    const { windSpeed } = this.state;
    const newSpeed = parseInt(windSpeed) + 1;
    this.updateWindSpeedValue(newSpeed);
  };

  handleChangeWindSpeed = e => {
    const windSpeed = e.target.value;
    this.updateWindSpeedValue(windSpeed);
  };

  // Perform boundaries check before updating the wind speed value
  updateWindSpeedValue = windSpeed => {
    // If user users letters or backspace/delete as first input, show 0 rather
    // than an empty textfield
    windSpeed = windSpeed === "" ? 0 : windSpeed;
    const { speedUnit } = this.state;
    switch (speedUnit) {
      case "KPH":
        if (windSpeed <= maxSpeedKPH && windSpeed >= minSpeedKPH) {
          this.setState({ windSpeed });
        }
        break;
      case "MPH":
        if (windSpeed <= maxSpeedMPH && windSpeed >= minSpeedMPH) {
          this.setState({ windSpeed });
        }
        break;
      case "KTS":
        if (windSpeed <= maxSpeedKTS && windSpeed >= minSpeedKTS) {
          this.setState({ windSpeed });
        }
        break;
    }
  };

  handleDecreaseTemperature = () => {
    const { temperature } = this.state;
    const newTemperature = parseInt(temperature) - 1;
    this.updateTemperatureValue(newTemperature);
  };

  handleIncreaseTemperature = () => {
    const { temperature, temperatureUnit } = this.state;
    const newTemperature = parseInt(temperature) + 1;
    this.updateTemperatureValue(newTemperature);
  };

  handleChangeTemperature = e => {
    const temperature = e.target.value;
    this.updateTemperatureValue(temperature);
  };

  // Perform boundaries check before updating the temperature value
  updateTemperatureValue = temperature => {
    temperature = temperature === "" ? 0 : temperature;
    const { temperatureUnit } = this.state;
    switch (temperatureUnit) {
      case "C":
        // If temperature entered is null (letter/backspace/delete) then set it
        // to the minimum
        if (temperature <= maxTemperatureC && temperature >= minTemperatureC) {
          this.setState({ temperature });
        }
        break;
      case "F":
        if (temperature <= maxTemperatureF && temperature >= minTemperatureF) {
          this.setState({ temperature });
        }
        break;
    }
  };

  // When switching units, do the conversion and display updated value
  handleChangeTemperatureUnit = (e, value) => {
    if (value) {
      this.setState({ temperatureUnit: value }, () => {
        const convertedTemperature =
          this.state.temperatureUnit === "F"
            ? Math.floor((this.state.temperature * 9) / 5 + 32)
            : Math.floor(((this.state.temperature - 32) * 5) / 9);
        this.updateTemperatureValue(convertedTemperature);
      });
    }
  };

  handleChangeSpeedUnit = (e, value) => {
    // map() function used in Processing. Re-mapping wind speed values as
    // approximating them with forumlas (e.g. 1 MPH * 1.602 = 1 KPH) resulted in
    // a bug where switching between speed units would increase the speed value
    // over the limit.
    function mapRange(value, low1, high1, low2, high2) {
      return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
    }

    if (value) {
      const oldUnit = this.state.speedUnit;
      this.setState({ speedUnit: value }, () => {
        const { speedUnit, windSpeed } = this.state;
        let convertedWindSpeed;
        if (oldUnit === "KPH" && speedUnit === "MPH")
          convertedWindSpeed = mapRange(
            windSpeed,
            minSpeedKPH,
            maxSpeedKPH,
            minSpeedMPH,
            maxSpeedMPH
          );
        if (oldUnit === "KPH" && speedUnit === "KTS")
          convertedWindSpeed = mapRange(
            windSpeed,
            minSpeedKPH,
            maxSpeedKPH,
            minSpeedKTS,
            maxSpeedKTS
          );
        if (oldUnit === "MPH" && speedUnit === "KPH")
          convertedWindSpeed = mapRange(
            windSpeed,
            minSpeedMPH,
            maxSpeedMPH,
            minSpeedKPH,
            maxSpeedKPH
          );
        if (oldUnit === "MPH" && speedUnit === "KTS")
          convertedWindSpeed = mapRange(
            windSpeed,
            minSpeedMPH,
            maxSpeedMPH,
            minSpeedKTS,
            maxSpeedKTS
          );
        if (oldUnit === "KTS" && speedUnit === "KPH")
          convertedWindSpeed = mapRange(
            windSpeed,
            minSpeedKTS,
            maxSpeedKTS,
            minSpeedKPH,
            maxSpeedKPH
          );
        if (oldUnit === "KTS" && speedUnit === "MPH")
          convertedWindSpeed = mapRange(
            windSpeed,
            minSpeedKTS,
            maxSpeedKTS,
            minSpeedMPH,
            maxSpeedMPH
          );
        this.updateWindSpeedValue(Math.round(convertedWindSpeed));
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { temperatureUnit, speedUnit } = this.state;
    // Current URL
    const { pathname } = this.props.location;

    return (
      <>
        <TopBar pathname={pathname} />
        <List
          subheader={
            <ListSubheader>Optimal weather conditions settings</ListSubheader>
          }
        >
          <ListItem>
            <ListItemText primary="Day time" secondary="Fly during day time" />
            <ListItemSecondaryAction>
              <Switch
                onChange={this.handleToggle("daytime")}
                checked={this.state.checked.indexOf("daytime") !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Minimum Wind Speed in ${speedUnit}`}
              secondary={
                this.state.speedUnit === "KPH"
                  ? `Values between ${minSpeedKPH} ${speedUnit} and ${maxSpeedKPH} ${speedUnit}`
                  : this.state.speedUnit === "MPH"
                  ? `Values between ${minSpeedMPH} ${speedUnit} and ${maxSpeedMPH} ${speedUnit}`
                  : `Values between ${minSpeedKTS} ${speedUnit} and ${maxSpeedKTS} ${speedUnit}`
              }
            />
            <ListItemSecondaryAction>
              <RemoveIcon size="small" onClick={this.handleDecreaseWindSpeed} />
              {/* onFocus will select all the text. We need blur to remove the 
               selection in case the user don't type anything after focussing*/}
              <InputBase
                type="number"
                value={this.state.windSpeed}
                onChange={this.handleChangeWindSpeed}
                onBlur={e => e.target.blur()}
                onFocus={e => e.target.select()}
                inputProps={{
                  style: { textAlign: "right", fontSize: "1.3em" }
                }}
                className={classes.windSpeed}
              />
              <AddIcon size="small" onClick={this.handleIncreaseWindSpeed} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText
              primary={"Minimum Temperature in °" + this.state.temperatureUnit}
              secondary={
                temperatureUnit === "C"
                  ? `Values between ${minTemperatureC} °${temperatureUnit} and ${maxTemperatureC} °${temperatureUnit}`
                  : `Values between ${minTemperatureF} °${temperatureUnit} and ${maxTemperatureF} °${temperatureUnit}`
              }
            />
            <ListItemSecondaryAction>
              <RemoveIcon
                size="small"
                onClick={this.handleDecreaseTemperature}
              />
              <InputBase
                type="number"
                value={this.state.temperature}
                onChange={this.handleChangeTemperature}
                onBlur={e => e.target.blur()}
                onFocus={e => e.target.select()}
                inputProps={{
                  style: { textAlign: "right", fontSize: "1.3em" }
                }}
                className={classes.windSpeed}
              />
              <AddIcon size="small" onClick={this.handleIncreaseTemperature} />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List
          subheader={<ListSubheader>Units of measure</ListSubheader>}
          className={classes.root}
        >
          <ListItem>
            <ListItemText
              primary="Temperature"
              secondary="Celsius or Fahrenheit"
            />
            <ListItemSecondaryAction>
              <ToggleButtonGroup
                value={this.state.temperatureUnit}
                exclusive
                onChange={this.handleChangeTemperatureUnit}
              >
                <ToggleButton value="C">°C </ToggleButton>
                <ToggleButton value="F">°F </ToggleButton>
              </ToggleButtonGroup>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Speed"
              secondary="Kilometers, Miles or Knots"
            />
            <ListItemSecondaryAction>
              <ToggleButtonGroup
                value={this.state.speedUnit}
                exclusive
                onChange={this.handleChangeSpeedUnit}
              >
                <ToggleButton value="KPH">KPH </ToggleButton>
                <ToggleButton value="MPH">MPH </ToggleButton>
                <ToggleButton value="KTS">KTS </ToggleButton>
              </ToggleButtonGroup>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </>
    );
  }
}

const styles = createStyles({
  windSpeed: {
    width: "2.2em",
    margin: "0 0.5em",
    textAlign: "right",
    textSize: "1.4em"
  }
});

export default withStyles(styles)(Settings);
