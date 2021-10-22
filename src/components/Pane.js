import React from "react";
import ColorScheme from "../ColorScheme";
import "../assets/Pane.css";

export default class Pane extends React.Component {
  render() {
    const style = {
      backgroundColor: ColorScheme.get_color("bg1"),
    };
    return (
      <div className="pane" style={style}>
        {this.props.children}
      </div>
    );
  }
}
