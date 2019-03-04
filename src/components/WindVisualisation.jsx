import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";

class WindVisualisation extends Component {
  state = { context: null };

  componentDidMount = () => {
    // Initialise the canvas:
    const ctx = this.refs.canvas.getContext("2d");
    this.setState({ context: this.refs.canvas.getContext("2d") });
  };

  componentDidUpdate = () => {
    this.state.context.clearRect(0, 0, 375, 200);
    this.drawAllComponents();
  };

  drawAllComponents = () => {
    this.drawUnits();

    this.drawWind();
  };

  drawUnits = () => {
    const { context } = this.state;
    const { isLoaded } = this.props;
    if (isLoaded) {
      // Drawing the hours (dynamical, from now to 24 hours later) on canvas
      context.font = "11px Helvetica";
      let date = new Date();
      let hour = date.getHours();
      let xHourCoord = 36;
      for (let i = 0; i < 9; i++) {
        let tempHour = hour;
        if (hour.toString().length === 1) {
          tempHour = "0" + hour.toString();
        }
        context.fillText(tempHour, xHourCoord, 190);
        xHourCoord += 36;
        if (hour > 20) {
          hour = hour - 21;
        } else {
          hour += 3;
        }
      }
      // Drawing the time unit on the canvas
      context.font = "17px Helvetica";
      context.fillText("hr", 346, 191);
      context.beginPath();
    }
  };

  drawWind = () => {
    const { forecastWeather, isLoaded, windSpeedUnit, isOkToFly } = this.props;
    const { context } = this.state;

    if (isLoaded) {
      // Drawing the speed unit on the canvas
      context.font = "15px Helvetica";
      context.fillText(windSpeedUnit, 5, 12);
      context.beginPath();
      context.font = "14px Helvetica";
      // Drawing the wind speed numbers on canvas
      let maxWind = this.findMaxWind(windSpeedUnit);
      console.log("Maximum wind speed: " + maxWind);
      let speedY = 165;
      let canvasUnit = "0";
      for (let i = 0; i <= 2; i++) {
        context.fillText(canvasUnit, 10, speedY);
        speedY -= 65;
        if (i === 0) {
          canvasUnit = Math.floor(maxWind / 10) + 1;
          canvasUnit = canvasUnit.toString() + "0";
          canvasUnit = parseInt(canvasUnit) / 2;
          canvasUnit = canvasUnit.toString();
        }
        if (i === 1) {
          canvasUnit = Math.floor(maxWind / 10) + 1;
          canvasUnit = canvasUnit.toString() + "0";
        }
      }
      // Drawing the WindVisualisation
      let windXCoord = 36;
      let maximumUnit = Math.floor(maxWind / 10) + 1;
      maximumUnit = maximumUnit.toString() + "0";
      maximumUnit = parseInt(maximumUnit);
      let yCoord;
      switch (windSpeedUnit) {
        case "KPH":
          for (let i = 0; i < 23; i++) {
            context.beginPath();
            context.strokeStyle = isOkToFly(i) ? "#51c928" : "#000000";
            yCoord = Math.floor(
              165 - 130 / (maximumUnit / forecastWeather[i].windSpeedKPH)
            );
            context.moveTo(windXCoord, yCoord);
            windXCoord += 12;
            context.lineTo(
              windXCoord,
              Math.floor(
                165 - 130 / (maximumUnit / forecastWeather[i + 1].windSpeedKPH)
              )
            );
            context.stroke();
            context.closePath();
          }

          break;
        case "KTS":
          for (let i = 0; i < 23; i++) {
            context.beginPath();
            context.strokeStyle = isOkToFly(i) ? "#51c928" : "#000000";
            yCoord = Math.floor(
              165 - 130 / (maximumUnit / forecastWeather[i].windSpeedKTS)
            );
            context.moveTo(windXCoord, yCoord);
            windXCoord += 12;
            context.lineTo(
              windXCoord,
              Math.floor(
                165 - 130 / (maximumUnit / forecastWeather[i + 1].windSpeedKTS)
              )
            );
            context.stroke();
            context.closePath();
          }
          break;
        case "MPH":
          for (let i = 0; i < 23; i++) {
            context.beginPath();
            context.strokeStyle = isOkToFly(i) ? "#51c928" : "#000000";
            yCoord = Math.floor(
              165 - 130 / (maximumUnit / forecastWeather[i].windSpeedMPH)
            );
            context.moveTo(windXCoord, yCoord);
            windXCoord += 12;
            context.lineTo(
              windXCoord,
              Math.floor(
                165 - 130 / (maximumUnit / forecastWeather[i + 1].windSpeedMPH)
              )
            );
            context.stroke();
            context.closePath();
          }
          break;
        default:
          break;
      }
    }
  };

  findMaxWind = speedUnit => {
    const { forecastWeather, isLoaded } = this.props;
    if (isLoaded) {
      let maxWind = 0;
      switch (speedUnit) {
        case "KPH":
          maxWind = forecastWeather[0].windSpeedKPH;
          for (let x = 1; x <= 23; x++) {
            if (forecastWeather[x].windSpeedKPH > maxWind) {
              maxWind = forecastWeather[x].windSpeedKPH;
            }
          }
          break;
        case "KTS":
          maxWind = forecastWeather[0].windSpeedKTS;
          for (let x = 1; x <= 23; x++) {
            if (forecastWeather[x].windSpeedKTS > maxWind) {
              maxWind = forecastWeather[x].windSpeedKTS;
            }
          }
          break;
        case "MPH":
          maxWind = forecastWeather[0].windSpeedMPH;
          for (let x = 1; x <= 23; x++) {
            if (forecastWeather[x].windSpeedMPH > maxWind) {
              maxWind = forecastWeather[x].windSpeedMPH;
            }
          }
          break;
        default:
          break;
      }
      return maxWind;
    }
  };

  render() {
    return <canvas ref="canvas" width={375} height={200} />;
  }
}

const styles = createStyles({});

export default withStyles(styles)(WindVisualisation);
