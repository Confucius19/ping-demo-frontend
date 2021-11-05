import React from "react";
import "../assets/Monitor.css";
import log_icon from "../icons/log_icon.svg";
import health_icon from "../icons/health_icon.svg";
import delay_icon from "../icons/delay_icon.svg";
import ColorScheme from "../ColorScheme";
import PingLog from "./PingLog";
import DelayMonitor from "./DelayMonitor";

const MONITOR_STATE = {
  LOG: 0,
  HEALTH: 1,
  DELAY: 2,
};
Object.freeze(MONITOR_STATE);

export default class Monitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monitor_state: MONITOR_STATE.LOG,
    };
  }

  state_changer = (target_state) => {
    if (this.state.monitor_state === target_state) {
      return;
    }
    this.setState({ monitor_state: target_state });
  };

  render() {
    const bg0 = ColorScheme.get_color("bg0");

    let display_element;
    switch (this.state.monitor_state) {
      case MONITOR_STATE.LOG:
      case MONITOR_STATE.HEALTH:
        display_element = <PingLog {...this.props} />;
        break;
      case MONITOR_STATE.DELAY:
        display_element = <DelayMonitor {...this.props} />;
        break;
      default:
        console.error("Encountered invalid MONITOR_STATE");
    }
    return (
      <React.Fragment>
        <div className="monitor_tab_button_array">
          <button
            style={{ backgroundColor: bg0 }}
            className="monitor_tab_button"
            onClick={() => this.state_changer(MONITOR_STATE.LOG)}
          >
            <img src={log_icon} alt="log" />
          </button>
          <button
            style={{ backgroundColor: bg0 }}
            className="monitor_tab_button"
            onClick={() => this.state_changer(MONITOR_STATE.HEALTH)}
          >
            <img src={health_icon} alt="health" />
          </button>
          <button
            style={{ backgroundColor: bg0 }}
            className="monitor_tab_button"
            onClick={() => this.state_changer(MONITOR_STATE.DELAY)}
          >
            <img src={delay_icon} alt="delay" />
          </button>
        </div>
        {display_element}
      </React.Fragment>
    );
  }
}
