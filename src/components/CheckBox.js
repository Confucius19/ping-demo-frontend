import React from "react";
import "../assets/CheckBox.css";
import ColorScheme from "../ColorScheme";

export default class CheckBox extends React.Component {
  render() {
    const bg_style = {
      backgroundColor: ColorScheme.get_color("bg1"),
    };
    const fg_style = {
      backgroundColor: ColorScheme.get_color("fg0"),
    };

    return (
      <div
        style={bg_style}
        className="checkbox_bg"
        onClick={(event) => {
          this.props.click_handler(!this.props.is_checked);
        }}
      >
        {this.props.is_checked && (
          <div style={fg_style} className="checkbox_fg"></div>
        )}
      </div>
    );
  }
}
