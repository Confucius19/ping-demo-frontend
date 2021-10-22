import React from "react";
import ColorScheme from "../ColorScheme";
import "../assets/ArcBar.css";

export default class ArcBar extends React.Component {
  render() {
    let bg1 = ColorScheme.get_color("bg1");
    let progress_color = ColorScheme.get_color("green");
    const gray = ColorScheme.get_color("gray");
    let total_arc_length = 210.487;
    let percent = this.props.percentFull;
    const stroke_dash = {
      strokeDasharray: total_arc_length,
      strokeDashoffset: -1 * total_arc_length * (1 - percent),
    };
    return (
      <div className="arc_bar_container">
        <svg
          className="arc_bar"
          width="144"
          height="77"
          viewBox="0 0 144 77"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            style={{ stroke: bg1 }}
            d="M139 72
        C139 54.2305 131.941 37.1888 119.376 24.6238
        C106.811 12.0589 89.7695 5 72 5
        C54.2305 5 37.1888 12.0589 24.6239 24.6238
        C12.0589 37.1888 5 54.2305 5 72"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            style={{ stroke: progress_color, ...stroke_dash }}
            d="M139 72
        C139 54.2305 131.941 37.1888 119.376 24.6238
        C106.811 12.0589 89.7695 5 72 5
        C54.2305 5 37.1888 12.0589 24.6239 24.6238
        C12.0589 37.1888 5 54.2305 5 72"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
        <h3 className="arc_bar_label_top">{this.props.valueText}</h3>
        <h4 className="arc_bar_label_bottom">{this.props.valueDescription}</h4>
        <p style={{ color: gray }} className="arc_bar_tick arc_bar_tick_left">
          {this.props.minLabel}
        </p>
        <p style={{ color: gray }} className="arc_bar_tick arc_bar_tick_right">
          {this.props.maxLabel}
        </p>
      </div>
    );
  }
}
