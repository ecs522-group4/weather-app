import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";

class MoveKite extends Component {
  render() {
    return (
      <>
        <div>
          <img
            className="moveK"
            src={require("../assets/graphics/greenKite.png")}
            alt="green kite"
          />
        </div>
      </>
    );
  }
}

export default MoveKite;
