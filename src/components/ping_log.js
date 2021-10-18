import React from "react";
import toggle_down from "../assets/toggle_down.svg";
import toggle_right from "../assets/toggle_right.svg";

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
    const average_duration =
      records.reduce((acc, cur) => acc + cur.duration, 0) / records.length;
    const error_rate =
      records.reduce((acc, record) => acc + (record.was_success ? 0 : 1), 0) /
      records.length;

    const ping_rows = records.map((record, index) => (
      <PingRow key={record.start} index={index} {...record} />
    ));
    return (
      <React.Fragment>
        <tr>
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
          <td>{min_start}</td>
          <td>{average_duration}</td>
          <td>{error_rate}</td>
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
    const table_headers_names = [
      "ID",
      "Start",
      "Average Duration (ms)",
      "Error Rate",
    ];
    const table_headers = table_headers_names.map((name) => (
      <th key={name}>{name}</th>
    ));
    const pingbursts = this.props.pingbursts.slice().reverse();
    const table_rows = pingbursts.map((pingburst) => (
      <PingBurstRow key={pingburst.id} {...pingburst} />
    ));
    return (
      <table>
        <thead>
          <tr>{table_headers}</tr>
        </thead>
        <tbody>{table_rows}</tbody>
      </table>
    );
  }
}
