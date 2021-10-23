import React from "react";
import ColorScheme from "../ColorScheme";
import "../assets/FlexTable.css";
import toggle_icon from "../icons/toggle_icon.svg";
import MagnitudeIndicator from "./MagnitudeIndicator";
import StatusIndicator from "./StatusIndicator";
import { Scrollbars } from "react-custom-scrollbars";

const row_height = 45;
const divider_height = 2;

const example_table_data = [
  {
    id: 53,
    num_packets_requested: 10,
    records: [
      {
        source: "2020::A",
        destination: "2020::C",
        start: "10/22/2021, 4:00:19 PM 87ms",
        duration: 234,
        packet_size: 56,
        was_success: true,
      },
    ],
  },
  {
    id: 57,
    num_packets_requested: 10,
    records: [
      {
        source: "2020::A",
        destination: "2020::C",
        start: "10/21/2021, 4:01:19 PM 87ms",
        duration: 234,
        packet_size: 56,
        was_success: true,
      },
    ],
  },
];

function getPingBurstsByIds(ids) {
  return ids.map((id) => example_table_data.find((ele) => ele.id === id));
}

function PingRow(props) {
  const ping_cols = [
    "", //toggle filler
    `n = ${props.index + 1}`,
    props.start,
    props.duration,
    <StatusIndicator is_good_status={props.was_success} />,
  ];

  return props.genRow(ping_cols);
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
      <MagnitudeIndicator value={average_duration / max_duration} />
    );
    const error_rate =
      records.reduce((acc, record) => acc + (record.was_success ? 0 : 1), 0) /
      records.length;
    const error_rate_indicator = <MagnitudeIndicator value={error_rate} />;
    const ping_rows = records.map((record, index) => (
      <PingRow
        key={record.start}
        table_format={this.props.table_format}
        index={index}
        genRow={this.props.genRow}
        {...record}
      />
    ));

    const toggle = this.state.is_collapsed ? (
      <img
        onClick={this.handle_collapse_toggle}
        src={toggle_icon}
        alt="Toggle Right"
      />
    ) : (
      <img
        onClick={this.handle_collapse_toggle}
        src={toggle_icon}
        alt="Toggle Down"
      />
    );

    const pingburst_cols = [
      toggle,
      this.props.id,
      min_start_str,
      duration_indicator,
      error_rate_indicator,
    ];
    return (
      <React.Fragment>
        {this.props.genRow(pingburst_cols)}
        {!this.state.is_collapsed && ping_rows}
      </React.Fragment>
    );
  }
}

export default class PingLog extends React.Component {
  constructor(props) {
    super(props);

    this.table_format = [
      {
        headerValue: "",
        style: {
          flexBasis: "45px",
          flexGrow: "0",
        },
      },
      {
        headerValue: "ID",
        style: {
          flexGrow: "1",
        },
      },
      {
        headerValue: "Start",
        style: {
          flexGrow: "1",
        },
      },

      {
        headerValue: "Duration (ms)",
        style: {
          flexGrow: "1",
        },
      },
      {
        headerValue: "Error Rate",
        style: {
          flexGrow: "1",
        },
      },
    ];

    this.table_headers = this.table_format.map((col_format) => {
      return (
        <div
          key={Math.floor(Math.random() * 1000)}
          className="flex_table_datum"
          style={col_format.style}
        >
          {col_format.headerValue}
        </div>
      );
    });
  }
  render() {
    const bg3 = ColorScheme.get_color("bg3");
    const bg1 = ColorScheme.get_color("bg1");
    const main_table_style = {
      backgroundColor: ColorScheme.get_color("bg2"),
      height: 8 * (row_height + divider_height) + row_height,
    };
    // const ids = [53, 53, 53, 53, 53, 53, 53, 53, 53, 57];
    const generateBodyRow = (elements) => {
      console.assert(elements.length === this.table_format.length);
      const wrapped_elems = elements.map((ele, index) => {
        let bodyRowStyle = this.table_format[index].style;
        return (
          <div className="flex_table_datum" style={bodyRowStyle} key={index}>
            {ele}
          </div>
        );
      });
      const body_row_style = {
        borderBottom: `${divider_height}px solid ${bg1}`,
        height: row_height,
      };
      return (
        <div style={body_row_style} className="flex_table_row">
          {wrapped_elems}
        </div>
      );
    };

    // const ids = [53];
    const ids = [53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53];
    const pingbursts = getPingBurstsByIds(ids);
    const table_rows = pingbursts.map((pingburst) => {
      return (
        <PingBurstRow
          key={pingburst.id}
          {...pingburst}
          genRow={generateBodyRow}
        />
      );
    });
    const scrollbar_style = {
      width: "100%",
      height: 8 * (row_height + divider_height),
    };
    return (
      <div style={main_table_style} className="flex_table">
        <div
          style={{ backgroundColor: bg3, height: row_height }}
          className="flex_table_row flex_table_header_row"
        >
          {this.table_headers}
        </div>
        <Scrollbars style={scrollbar_style}>
          <div className="flex_table_body">{table_rows}</div>
        </Scrollbars>
      </div>
    );
  }
}
