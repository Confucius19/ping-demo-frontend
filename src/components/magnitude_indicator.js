import React from "react";

export default class MagnitudeIndicator extends React.Component {
  render() {
    //
    // this.props.thresholds
    const thresholds = {
      0.3: "var(--aqua)",
      0.6: "var(--yellow)",
      0.9: "var(--red)",
    };

    const borderRadius = 9;
    const height = 21;
    const width = 124;

    const background_style = {
      backgroundColor: "var(--bg1)",
      borderRadius,
      height,
      width,
    };

    const value = this.props.value;
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
