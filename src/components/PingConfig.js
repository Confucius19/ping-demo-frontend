import React from "react";
import Slider from "./Slider";
import "../assets/PingConfig.css";
import ColorScheme from "../ColorScheme";

export default class PingConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.config_state = {
      packet_size: 53,
      timeout_duration: 500,
      interval: 1000,
      num_packets: 10,
    };
  }

  click_handler = () => {
    // const pc_ids = [
    //   "destination",
    //   "packet_size",
    //   "num_packets",
    //   "timeout_duration",
    //   "interval",
    // ];
    // const pingburst_request = {};
    // for (const id of pc_ids) {
    //   pingburst_request[id] = this.state[id];
    // }
    // const request_opts = {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   mode: "cors",
    // };
    // request_opts["body"] = JSON.stringify(pingburst_request);
    // fetch("pingbursts", request_opts).then(async (res) => {
    //   console.log(await res.json());
    // });
    // console.log("Sent Pingburst!", pingburst_request);
  };

  handle_input_change = (event) => {
    const target = event.target;
    const value =
      target.type === "number" ? Number(target.value) : target.value;
    this.setState({ [target.name]: value });
  };

  render() {
    return (
      <div className="ping_form_container">
        <label className="ping_form_label">Packet Size</label>
        <Slider min={0} max={100} defaultValue={50} />
        <label className="ping_form_label">Timeout</label>
        <Slider min={1} max={2000} defaultValue={500} />
        <label className="ping_form_label">Interval</label>
        <Slider min={1} max={9999} defaultValue={5000} />
        <label className="ping_form_label">Number of Packets</label>
        <Slider min={1} max={30} defaultValue={10} />
        <button
          type="button"
          onClick={this.click_handler}
          style={{ backgroundColor: ColorScheme.get_color("blue") }}
          className="blue_button ping_submit"
        >
          Submit
        </button>
      </div>
    );
  }
}
