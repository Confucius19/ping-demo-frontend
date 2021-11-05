import React from "react";
import ColorScheme from "../ColorScheme";
import "../assets/Tile.css";

export default class Tile extends React.Component {
  render() {
    const style = {
      backgroundColor: ColorScheme.get_color("bg2"),
    };
    return (
      <React.Fragment>
        {!this.props.omit_header && (
          <h2 className="tile_header">{this.props.title}</h2>
        )}
        <div className="tile" style={style}>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}
