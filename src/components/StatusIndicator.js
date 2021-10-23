import React from "react";
import ColorScheme from "../ColorScheme";

export default class StatusIndicator extends React.Component {
  render() {
    const bg1 = ColorScheme.get_color("bg1");
    const green = ColorScheme.get_color("green");
    const red = ColorScheme.get_color("red");
    const status_color = this.props.is_good_status ? green : red;
    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14"
          cy="14"
          r="12.5"
          fill={status_color}
          stroke={bg1}
          strokeWidth="3"
        />
      </svg>
    );
  }
}
