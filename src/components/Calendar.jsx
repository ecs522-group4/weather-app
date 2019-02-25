import "date-fns";
import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import LocationOn from "@material-ui/icons/DateRange";
import InputAdornment from "@material-ui/core/InputAdornment";

class Calendar extends Component {
  state = {
    selectedDate: new Date()
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
    this.props.onChangeDate(date);
  };

  render() {
    const { classes, isForecastAvailable } = this.props;
    const { selectedDate } = this.state;

    return (
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
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <LocationOn />
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}
const styles = createStyles({
  grid: {
    width: "60%"
  }
});

export default withStyles(styles)(Calendar);
