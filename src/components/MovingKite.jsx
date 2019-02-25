import React, { Component } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";

class MoveKite extends Component {
  render() {
    const { isOkToFly } = this.props;
    let kiteImg = isOkToFly ? "greenKite.png" : "greyKite.png";
    console.log(isOkToFly);
    return (
      <>
        <div>
          <img
            className={isOkToFly ? "kiteCSS moveK" : "kiteCSS"}
            src={
              isOkToFly
                ? require("../assets/graphics/greenKite.png")
                : require("../assets/graphics/greyKite.png")
            }
            alt="green kite"
          />
        </div>
      </>
    );
  }
}

export default MoveKite;
