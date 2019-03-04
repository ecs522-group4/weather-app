import "date-fns";
import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import LocationOn from "@material-ui/icons/DateRange";
import InputAdornment from "@material-ui/core/InputAdornment";
import CalendarIcon from "../assets/icons/calendar.png";

class Calendar extends Component {
  handleDateChange = date => {
    this.props.onChangeDate(date);
  };

  render() {
    const { classes, isForecastAvailable, selectedDate } = this.props;

    return (
      <>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className={classes.grid} justify="space-around">
            <DatePicker
              margin="normal"
              value={selectedDate}
              onChange={this.handleDateChange}
              error={!isForecastAvailable}
              helperText={
                isForecastAvailable
                  ? null
                  : "Forecast not available for this date."
              }
            />
          </Grid>
        </MuiPickersUtilsProvider>

        <img className={classes.icon} src={CalendarIcon} />
      </>
    );
  }
}
const styles = createStyles({
  grid: {
    position: "fixed",
    maxWidth: "20%",
    marginLeft: "68vw",
    marginTop: "33%",
    justifyContent: "flex-end"
  },
  icon: {
    width: "10%",
    marginLeft: "87%",
    position: "fixed",
    marginTop: "35%"
  }
});

export default withStyles(styles)(Calendar);
