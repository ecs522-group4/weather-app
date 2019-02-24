import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";

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
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
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

  handleChange = name => value => {
    let cleanValue = { ...value };
    // Take just the city name (e.g. "London, England, UK" to "London")
    const newLabel = cleanValue.label.split(",")[0];
    cleanValue.label = newLabel;
    this.setState({
      [name]: cleanValue,
      suggestions: []
    });
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
                value: cityResult["matching_full_name"].split(",")[0],
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
    const { classes } = this.props;

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
            onChange={this.handleChange("locationQuery")}
            placeholder="Select location.."
            onTyping={this.getCities}
            onBlur={this.handleBlur}
          />
        </NoSsr>
      </div>
    );
  }
}

const styles = createStyles({
  root: {
    flexGrow: 1,
    height: 100,
    width: 250,
    zIndex: 10
  },
  input: {
    display: "flex",
    padding: 0,
    width: 250
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