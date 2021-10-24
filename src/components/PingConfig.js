import React from "react";
import Slider from "./Slider";
import "../assets/PingConfig.css";
import ColorScheme from "../ColorScheme";

export default class PingConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packet_size: 53,
      timeout: 500,
      interval: 1000,
      num_packets: 10,
    };
  }

  send_pingburst = (destination_ip) => {
    const pc_ids = ["packet_size", "num_packets", "timeout", "interval"];
    const pingburst_request = {};
    for (const id of pc_ids) {
      pingburst_request[id] = this.state[id];
    }
    pingburst_request["destination"] = destination_ip;
    const request_opts = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
    };
    request_opts["body"] = JSON.stringify(pingburst_request);
    fetch("pingbursts", request_opts).then(async (res) => {
      //respons is id
      // console.log(await res.json());
    });
    // console.log("Sent Pingburst!", pingburst_request);
  };

  click_handler = () => {
    const destination_ips = [];
    for (let ip_info of this.props.ip_address_info_array)
      if (ip_info.is_selected) {
        destination_ips.push(ip_info.ip_address);
      }
    destination_ips.forEach((ip) => {
      this.send_pingburst(ip);
    });
  };

  paramter_change_handler = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="ping_form_container">
        <label className="ping_form_label">Packet Size</label>
        <Slider
          min={0}
          max={100}
          name="packet_size"
          value={this.state.packet_size}
          value_change_handler={this.paramter_change_handler}
        />
        <label className="ping_form_label">Timeout</label>
        <Slider
          min={1}
          max={9999}
          name="timeout"
          value={this.state.timeout}
          value_change_handler={this.paramter_change_handler}
        />
        <label className="ping_form_label">Interval</label>
        <Slider
          min={1}
          max={9999}
          name="interval"
          value={this.state.interval}
          value_change_handler={this.paramter_change_handler}
        />
        <label className="ping_form_label">Number of Packets</label>
        <Slider
          min={1}
          max={30}
          name="num_packets"
          value={this.state.num_packets}
          value_change_handler={this.paramter_change_handler}
        />
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
