import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import LocationOn from "@material-ui/icons/LocationOn";
import InputAdornment from "@material-ui/core/InputAdornment";

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      multiline
      error={!props.selectProps.isValidCity}
      helperText={
        props.selectProps.isValidCity ? null : "Selected city not supported"
      }
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        },
        endAdornment: (
          <InputAdornment>
            <LocationOn />
          </InputAdornment>
        )
      }}
      onChange={e => {
        props.selectProps.onTyping(e.target.value);
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
        // Correctly display even the longer cities names
        whiteSpace: "normal",
        height: "100%"
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function LocationValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.LocationValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

// Components to override Select default ones
const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  LocationValue,
  ValueContainer
};

class LocationSearchbar extends Component {
  state = {
    locationQuery: null,
    suggestions: []
  };

  handleSelectNewCity = name => value => {
    let cleanValue = { ...value };
    // Take just the city name (e.g. "London, England, UK" to "London")
    const newLabel = cleanValue.label.split(",")[0];
    // Take the last part (e.g. "London, England, UK" to "UK")
    const newValue = cleanValue.value
      .split(",")
      .pop()
      .trim();
    cleanValue.label = newLabel;
    cleanValue.value = newValue;
    this.setState({
      [name]: cleanValue,
      suggestions: []
    });
    // Format string to query weather API correctly (e.g. London,England)
    this.props.onSelectNewCity(`${cleanValue.label},${cleanValue.value}`);
  };

  handleBlur = e => {
    // Reset suggestions
    this.setState({
      suggestions: []
    });
  };

  getCities = query => {
    if (query && query.length > 2) {
      const req = new XMLHttpRequest();
      req.open("GET", `https://api.teleport.org/api/cities/?search=${query}`);
      req.setRequestHeader("Accept", `application/vnd.teleport.v1+json`);
      req.send();
      req.addEventListener("load", () => {
        if (req.status !== 200) {
          console.error("Location Search API error");
        } else if (req.status === 200) {
          const results = JSON.parse(req.response);
          const suggestions = results["_embedded"]["city:search-results"].map(
            cityResult => {
              return {
                value: cityResult["matching_full_name"],
                label: cityResult["matching_full_name"]
              };
            }
          );
          this.setState({ suggestions });
        }
      });
    }
    this.setState({ suggestions: [] });
  };

  render() {
    const { classes, isValidCity } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        "& input": {
          font: "inherit"
        }
      })
    };

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            styles={selectStyles}
            options={this.state.suggestions}
            components={components}
            value={this.state.locationQuery}
            onChange={this.handleSelectNewCity("locationQuery")}
            placeholder="Select location.."
            onTyping={this.getCities}
            onBlur={this.handleBlur}
            isValidCity={isValidCity}
          />
        </NoSsr>
      </div>
    );
  }
}

const styles = createStyles({
  root: {
    flexGrow: 1,
    zIndex: 10,
    // Component alignment
    alignSelf: "flex-end",
    // Margin of the component
    margin: "1.2em 0"
  },
  input: {
    display: "flex",
    padding: 0,
    right: 0,
    // Size of the input
    width: "50vw"
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center"
  },

  noOptionsMessage: {
    padding: `1px`
  },
  locationQueryValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: "1px",
    left: 0,
    right: 0
  },
  divider: {
    height: "1px"
  }
});

export default withStyles(styles)(LocationSearchbar);
