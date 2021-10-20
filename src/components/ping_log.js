import React from "react";
import toggle_down from "../assets/toggle_down.svg";
import toggle_right from "../assets/toggle_right.svg";
import MagnitudeIndicator from "./magnitude_indicator";
import "../assets/ping_config.css";

function PingRow(props) {
  return (
    <tr>
      <td>n = {props.index + 1}</td>
      <td>{props.start}</td>
      <td>{props.duration}</td>
      <td>{props.was_success ? "True" : "False"}</td>
    </tr>
  );
}

class PingBurstRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_collapsed: true,
    };
  }

  handle_collapse_toggle = (e) => {
    this.setState((state) => {
      return { is_collapsed: !state.is_collapsed };
    });
  };

  render() {
    const records = this.props.records;
    const min_start = records[0].start;
    const min_start_matches = min_start.match(
      /(\d{1,2}\/\d{1,2}).*(\d{1,2}:\d{1,2})/
    );
    const min_start_str = min_start_matches[1] + " " + min_start_matches[2];

    const valid_duration_records = records.filter(
      (record) => record.duration !== -1
    );
    const average_duration =
      valid_duration_records.reduce(
        (acc, cur) => (cur === -1 ? acc : acc + cur.duration),
        0
      ) / valid_duration_records.length;
    const max_duration = 300;
    const duration_indicator = (
      <div style={{ margin: "0px auto" }}>
        <MagnitudeIndicator value={average_duration / max_duration} />
      </div>
    );
    const error_rate =
      records.reduce((acc, record) => acc + (record.was_success ? 0 : 1), 0) /
      records.length;
    const error_rate_indicator = (
      <div style={{ margin: "0px auto" }}>
        <MagnitudeIndicator value={error_rate} />
      </div>
    );

    const ping_rows = records.map((record, index) => (
      <PingRow key={record.start} index={index} {...record} />
    ));

    const row_style = {
      // borderBottom: "2px solid var(--bg1)",
    };
    return (
      <React.Fragment>
        <tr style={row_style}>
          <td>
            {!this.state.is_collapsed && (
              <img
                onClick={this.handle_collapse_toggle}
                src={toggle_down}
                alt="Toggle Down"
              ></img>
            )}
            {this.state.is_collapsed && (
              <img
                onClick={this.handle_collapse_toggle}
                src={toggle_right}
                alt="Toggle Right"
              ></img>
            )}
            {this.props.id}
          </td>
          <td>{min_start_str}</td>
          <td>{duration_indicator}</td>
          <td>{error_rate_indicator}</td>
        </tr>
        {!this.state.is_collapsed && ping_rows}
      </React.Fragment>
    );
  }
}

export default class PingLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed_map: {},
    };
  }

  render() {
    const table_style = {
      tableLayout: "fixed",
      width: 620,
      backgroundColor: "var(--bg2)",
      borderRadius: 9,
      margin: "20px auto",
      borderCollapse: "collapse",
    };

    const table_headers_names = ["ID", "Start", "Duration", "Error Rate"];
    const table_headers = table_headers_names.map((name) => (
      <th key={name}>{name}</th>
    ));
    const pingbursts = this.props.pingbursts.slice().reverse();
    const table_rows = pingbursts.map((pingburst) => (
      <PingBurstRow key={pingburst.id} {...pingburst} />
    ));
    return (
      <table style={table_style}>
        <thead>
          <tr>{table_headers}</tr>
        </thead>
        <tbody>{table_rows}</tbody>
      </table>
    );
  }
}
