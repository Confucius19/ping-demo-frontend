import React from "react";

export default class PingConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: "ffff::abc",
      packet_size: 53,
      num_packets: 10,
      timeout_duration: 500,
      interval: 1000,
    };
  }

  click_handler = () => {
    const pc_ids = [
      "destination",
      "packet_size",
      "num_packets",
      "timeout_duration",
      "interval",
    ];
    const pingburst_request = {};
    for (const id of pc_ids) {
      pingburst_request[id] = this.state[id];
    }
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
      console.log(await res.json());
    });
    console.log("Sent Pingburst!", pingburst_request);
  };

  handle_input_change = (event) => {
    const target = event.target;
    const value =
      target.type === "number" ? Number(target.value) : target.value;
    this.setState({ [target.name]: value });
  };

  render() {
    let style = {
      display: "flex",
      flexDirection: "column",
      width: "200px",
      margin: "0 auto",
    };
    return (
      <div className="ping_config" style={style}>
        <label>
          Destination IP
          <input
            type="text"
            name="destination"
            id="destination"
            onChange={this.handle_input_change}
            value={this.state.destination}
          />
        </label>
        <label>
          Packet Size
          <input
            type="number"
            name="packet_size"
            id="packet_size"
            onChange={this.handle_input_change}
            value={this.state.packet_size}
          />
        </label>
        <label>
          Number of Packets
          <input
            type="number"
            name="num_packets"
            id="num_packets"
            onChange={this.handle_input_change}
            value={this.state.num_packets}
          />
        </label>
        <label>
          Timeout Duration
          <input
            type="number"
            name="timeout_duration"
            id="timeout_duration"
            onChange={this.handle_input_change}
            value={this.state.timeout_duration}
          />
        </label>
        <label>
          Interval
          <input
            type="number"
            name="interval"
            id="interval"
            onChange={this.handle_input_change}
            value={this.state.interval}
          />
        </label>

        <button id="submit" type="button" onClick={this.click_handler}>
          Submit
        </button>
      </div>
    );
  }
}
