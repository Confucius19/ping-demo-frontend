import React from "react";
import ColorScheme from "../ColorScheme";

export default class MagnitudeIndicator extends React.Component {
  render() {
    //
    // this.props.thresholds
    const thresholds = {
      0.3: ColorScheme.get_color("green"),
      0.6: ColorScheme.get_color("yellow"),
      0.9: ColorScheme.get_color("red"),
    };

    const borderRadius = 9;
    const height = 21;

    const background_style = {
      backgroundColor: ColorScheme.get_color("bg1"),
      borderRadius,
      height,
      width: "80%",
    };

    let value = this.props.value;
    value = Math.min(1,value);
    let foreground_color;
    for (let threshold_val in thresholds) {
      foreground_color = thresholds[threshold_val];
      if (threshold_val > value) {
        break;
      }
    }
    const foreground_style = {
      backgroundColor: foreground_color,
      height,
      borderRadius,
      width: `${value * 100}%`,
    };

    for (let key in this.props.style) {
      background_style[key] = this.props.style[key];
      foreground_style[key] = this.props.style[key];
    }

    return (
      <div style={background_style}>
        <div style={foreground_style}></div>
      </div>
    );
  }
}
