import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";

class WindVisualisation extends Component {
  state = { context: null };

  componentDidMount = () => {
    // Initialise the canvas:
    const context = this.refs.canvas.getContext("2d");
    this.setState({ context });
  };

  // On component update, refresh the canvas content
  componentDidUpdate = () => {
    let windowWidth = window.innerWidth - 20;
    this.state.context.clearRect(0, 0, windowWidth, 200);
    this.drawAllComponents();
  };

  drawAllComponents = () => {
    this.drawUnits();
    this.drawWind();
  };

  // Draw the dynamic units (y represents wind speed and x represent time)
  drawUnits = () => {
    const { context } = this.state;
    const { isLoaded } = this.props;
    const HOURS_TO_DISPLAY = 9;
    if (isLoaded) {
      // Drawing the hours (dynamical, from now to 24 hours later) on canvas
      context.font = "12px Helvetica";
      context.fillStyle = "white";
      let date = new Date();
      let hour = date.getHours();
      // Adjust x coordinate depending to the window size so that the graph
      // is suitable for any mobile screen size
      let xHourCoord = Math.floor(window.innerWidth / 10);
      for (let i = 0; i < HOURS_TO_DISPLAY; i++) {
        let tempHour = hour;
        // Add a 0 at the beginning if the hour has only one digit
        if (hour.toString().length === 1) {
          tempHour = "0" + hour.toString();
        }
        context.fillText(tempHour, xHourCoord, 190);
        xHourCoord += Math.floor(window.innerWidth / 10);
        // Normalise hours to the 00-24 range, taking into account we are
        // jumping by three hours
        if (hour > 20) {
          hour = hour - 21;
        } else {
          hour += 3;
        }
      }
      context.beginPath();
    }
  };

  // Draw the actual graph
  drawWind = () => {
    const {
      forecastWeather,
      isLoaded,
      windSpeedUnit,
      isOkToFly,
      sliderValue
    } = this.props;
    const { context } = this.state;

    if (isLoaded) {
      // Drawing the speed unit on the canvas
      context.font = "15px Helvetica";
      context.fillText(windSpeedUnit, 5, 12);
      context.beginPath();
      context.font = "14px Helvetica";
      // Drawing the wind speed numbers on canvas
      let maxWind = this.findMaxWind(windSpeedUnit);
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
      let windXCoord = Math.floor(window.innerWidth / 10);
      let maximumUnit = Math.floor(maxWind / 10) + 1;
      maximumUnit = maximumUnit.toString() + "0";
      maximumUnit = parseInt(maximumUnit);
      let yCoord;
      let opacity = "0.3)";
      switch (windSpeedUnit) {
        case "KPH":
          for (let i = 0; i <= 23; i++) {
            if (i === sliderValue) {
              opacity = "0.8)";
            } else if (i !== sliderValue && opacity === "0.8)") {
              opacity = "0.3)";
            }
            context.beginPath();
            context.strokeStyle = isOkToFly(i)
              ? "rgb(63, 198, 79, " + opacity
              : "rgb(255, 255, 255, " + opacity;
            yCoord = Math.floor(
              165 - 130 / (maximumUnit / forecastWeather[i].windSpeedKPH)
            );
            context.moveTo(windXCoord, yCoord);
            windXCoord += Math.floor(window.innerWidth / 28.5);

            if (i === 23) {
              context.lineTo(
                windXCoord,
                Math.floor(
                  165 - 130 / (maximumUnit / forecastWeather[i].windSpeedKPH)
                )
              );
            }

            if (i !== 23) {
              context.lineTo(
                windXCoord,
                Math.floor(
                  165 -
                    130 / (maximumUnit / forecastWeather[i + 1].windSpeedKPH)
                )
              );
            }

            context.lineTo(windXCoord, 165);
            windXCoord -= Math.floor(window.innerWidth / 28.5);
            context.lineTo(windXCoord, 165);
            context.lineTo(windXCoord, yCoord);
            windXCoord += Math.floor(window.innerWidth / 28.5);
            context.fillStyle = context.strokeStyle;
            context.fill();
            context.closePath();
            context.stroke();
          }

          break;
        case "KTS":
          for (let i = 0; i <= 23; i++) {
            if (i === sliderValue) {
              opacity = "0.8)";
            } else if (i !== sliderValue && opacity === "0.8)") {
              opacity = "0.3)";
            }
            context.beginPath();
            context.strokeStyle = isOkToFly(i)
              ? "rgb(63, 198, 79, " + opacity
              : "rgb(255, 255, 255, " + opacity;
            yCoord = Math.floor(
              165 - 130 / (maximumUnit / forecastWeather[i].windSpeedKTS)
            );
            context.moveTo(windXCoord, yCoord);
            windXCoord += Math.floor(window.innerWidth / 28.5);

            if (i === 23) {
              context.lineTo(
                windXCoord,
                Math.floor(
                  165 - 130 / (maximumUnit / forecastWeather[i].windSpeedKTS)
                )
              );
            }

            if (i !== 23) {
              context.lineTo(
                windXCoord,
                Math.floor(
                  165 -
                    130 / (maximumUnit / forecastWeather[i + 1].windSpeedKTS)
                )
              );
            }
            context.lineTo(windXCoord, 165);
            windXCoord -= Math.floor(window.innerWidth / 28.5);
            context.lineTo(windXCoord, 165);
            context.lineTo(windXCoord, yCoord);
            windXCoord += Math.floor(window.innerWidth / 28.5);
            context.fillStyle = context.strokeStyle;
            context.fill();
            context.closePath();
            context.stroke();
          }
          break;
        case "MPH":
          for (let i = 0; i <= 23; i++) {
            if (i === sliderValue) {
              opacity = "0.8)";
            } else if (i !== sliderValue && opacity === "0.8)") {
              opacity = "0.3)";
            }
            context.beginPath();
            context.strokeStyle = isOkToFly(i)
              ? "rgb(63, 198, 79, " + opacity
              : "rgb(255, 255, 255, " + opacity;
            yCoord = Math.floor(
              165 - 130 / (maximumUnit / forecastWeather[i].windSpeedMPH)
            );
            context.moveTo(windXCoord, yCoord);
            windXCoord += Math.floor(window.innerWidth / 28.5);
            if (i === 23) {
              context.lineTo(
                windXCoord,
                Math.floor(
                  165 - 130 / (maximumUnit / forecastWeather[i].windSpeedMPH)
                )
              );
            }

            if (i !== 23) {
              context.lineTo(
                windXCoord,
                Math.floor(
                  165 -
                    130 / (maximumUnit / forecastWeather[i + 1].windSpeedMPH)
                )
              );
            }
            context.lineTo(windXCoord, 165);
            windXCoord -= Math.floor(window.innerWidth / 28.5);
            context.lineTo(windXCoord, 165);
            context.lineTo(windXCoord, yCoord);
            windXCoord += Math.floor(window.innerWidth / 28.5);
            context.fillStyle = context.strokeStyle;
            context.fill();
            context.closePath();
            context.stroke();
          }
          break;
        default:
          break;
      }
    }
  };

  // Find the maximum value of the wind speed for the forecast. This way, we can
  // dynamically set the Y axis values in the graph
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
    let windowWidth = window.innerWidth - 20;

    return <canvas ref="canvas" width={windowWidth} height={200} />;
  }
}

const styles = createStyles({});

export default withStyles(styles)(WindVisualisation);
