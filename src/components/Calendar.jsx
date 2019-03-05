import "date-fns";
import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import DateRange from "@material-ui/icons/DateRange";
import InputAdornment from "@material-ui/core/InputAdornment";
import calendar from '../assets/icons/calendar.png';

class Calendar extends Component {
  handleDateChange = date => {
    this.props.onChangeDate(date);
  };

  render() {
    const { classes, isForecastAvailable, selectedDate } = this.props;

    return (
      <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid}>
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
              className: classes.text,

            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>

      <img className={classes.icon} src={calendar} />
      </div>
    );
  }
}
const styles = createStyles({
  grid: {
    width: "100%",
    zIndex: 5,
    justifyContent: "flex-end",
    // Moving it 6.5vw to the left to be aligned with settings and location
    position: "relative",
    right: "6.5vw"
  },
  icon: {
    width: "2.5em",
    flexPosition: "flex-end",
    marginRight: "5%",
    float: "right",
    marginTop: "-13%"
  },
  text: {
    color: "white"
  }
});

export default withStyles(styles)(Calendar);
