import React, { Component } from "react";

class DirectionalArrows extends Component {
  state = {
    initialRotation: 0,
    data: []
  };

  constructor(props) {
    super(props);
    this.state.initialRotation = props.initialRotation;
    this.state.data = props.data;
  }

  render() {
    return <React.Fragment>{this.getAllArrowImages()}</React.Fragment>;
  }

  getAllArrowImages() {
    let padding = (756 / this.state.data.length - 16.5) * 0.5; //-1 * (800 / this.state.data.length - 16.2);
    let returnValue = [];
    for (let i = 0; i < this.state.data.length; i++) {
      if (i === 0) {
        returnValue.push(
          this.getRotatedArrowImage(
            this.state.data[i].arrowDirection,
            75,
            padding,
            i
          )
        );
      } else if (i === this.state.data.length - 1) {
        returnValue.push(
          this.getRotatedArrowImage(
            this.state.data[i].arrowDirection,
            padding,
            0,
            i
          )
        );
      } else {
        returnValue.push(
          this.getRotatedArrowImage(
            this.state.data[i].arrowDirection,
            padding,
            padding,
            i
          )
        );
      }
    }
    return returnValue;
  }

  getRotatedArrowImage(rotation, marginLeft, marginRight, key) {
    return (
      <img
        style={{
          transform: `rotate(${this.state.initialRotation +
            Math.floor(rotation)}deg)`,
          marginLeft: marginLeft,
          marginRight: marginRight,
          width: 16
        }}
        alt=""
        key={key}
        src={
          "http://iconshow.me/media/images/ui/ios7-icons/png/16/arrow-left-c.png"
        }
      />
    );
  }
}

export default DirectionalArrows;
