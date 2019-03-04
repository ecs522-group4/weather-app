import "date-fns";
import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import DateRange from "@material-ui/icons/DateRange";
import InputAdornment from "@material-ui/core/InputAdornment";

class Calendar extends Component {
  handleDateChange = date => {
    this.props.onChangeDate(date);
  };

  render() {
    const { classes, isForecastAvailable, selectedDate } = this.props;

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
              disableUnderline: true,
              endAdornment: (
                <InputAdornment>
                  <DateRange className={classes.icon} />
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
    width: "100%",
    zIndex: 5,
    justifyContent: "flex-end"
  },
  icon: {
    color: "white"
  }
});

export default withStyles(styles)(Calendar);
