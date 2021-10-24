import React from "react";
import "../assets/Monitor.css";
import log_icon from "../icons/log_icon.svg";
import health_icon from "../icons/health_icon.svg";
import delay_icon from "../icons/delay_icon.svg";
import ColorScheme from "../ColorScheme";
import PingLog from "./PingLog";

export default class Pane extends React.Component {
  render() {
    const bg0 = ColorScheme.get_color("bg0");
    return (
      <React.Fragment>
        <div className="monitor_tab_button_array">
          <button
            style={{ backgroundColor: bg0 }}
            className="monitor_tab_button"
          >
            <img src={log_icon} alt="log" />
          </button>
          <button
            style={{ backgroundColor: bg0 }}
            className="monitor_tab_button"
          >
            <img src={health_icon} alt="health" />
          </button>
          <button
            style={{ backgroundColor: bg0 }}
            className="monitor_tab_button"
          >
            <img src={delay_icon} alt="delay" />
          </button>
        </div>
        <PingLog {...this.props} />
      </React.Fragment>
    );
  }
}
