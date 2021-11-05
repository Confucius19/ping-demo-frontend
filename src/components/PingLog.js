import React from "react";
import ColorScheme from "../ColorScheme";
import "../assets/FlexTable.css";
import toggle_icon from "../icons/toggle_icon.svg";
import MagnitudeIndicator from "./MagnitudeIndicator";
import StatusIndicator from "./StatusIndicator";
import { Scrollbars } from "react-custom-scrollbars";
import { AnimatePresence, motion } from "framer-motion";

const row_height = 45;
const divider_height = 2;

const duration_max_baseline = 600;

function PingRow(props) {
  const start_matches = props.start.match(/(\d{1,2}:\d{1,2}:\d{1,2}.*M)/);
  // console.log(props.start);
  const start = start_matches[1];
  const ping_cols = [
    "", //toggle filler
    `n = ${props.index + 1}`,
    start,
    <MagnitudeIndicator
      value={props.duration / duration_max_baseline}
      tooltip={`${props.duration.toFixed(2)}ms`}
    />,

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
    if (records.length === 0) {
      const pingburst_cols = ["", this.props.id, "N/A", "N/A", "N/A"];
      return this.props.genRow(pingburst_cols);
    }
    const min_start = records[0].start;
    const min_start_matches = min_start.match(
      /(\d{1,2}\/\d{1,2}).*(\d{1,2}:\d{1,2}:\d{1,2}).*(.M)/
    );
    const min_start_str =
      // min_start_matches[1] +
      // " " +
      min_start_matches[2] + " " + min_start_matches[3];

    const valid_duration_records = records.filter(
      (record) => record.duration !== -1
    );
    const average_duration =
      valid_duration_records.reduce(
        (acc, cur) => (cur === -1 ? acc : acc + cur.duration),
        0
      ) / valid_duration_records.length;
    const duration_indicator = (
      <MagnitudeIndicator
        value={average_duration / duration_max_baseline}
        tooltip={`${average_duration.toFixed(2)}ms`}
      />
    );
    const error_rate =
      records.reduce((acc, record) => acc + (record.was_success ? 0 : 1), 0) /
      records.length;
    const error_rate_indicator = (
      <MagnitudeIndicator
        value={error_rate}
        tooltip={`${error_rate.toFixed(2) * 100}%`}
      />
    );
    const ping_rows = records.map((record, index) => (
      <PingRow
        key={record.start}
        table_format={this.props.table_format}
        index={index}
        genRow={this.props.genRow}
        {...record}
      />
    ));

    const toggle = (
      <motion.img
        style={{ userSelect: "none", cursor: "pointer" }}
        animate={{
          rotate: this.state.is_collapsed ? 0 : 90,
        }}
        initial={false}
        onClick={this.handle_collapse_toggle}
        src={toggle_icon}
        alt="Toggle Right"
      />
    );

    const pingburst_cols = [
      toggle,
      this.props.id,
      min_start_str,
      duration_indicator,
      error_rate_indicator,
    ];

    const ping_row_variants = {
      collapsed: {
        height: 0,
      },
      open: {
        height: this.props.total_row_height * this.props.records.length,
      },
    };

    return (
      <React.Fragment>
        {this.props.genRow(pingburst_cols)}
        <AnimatePresence>
          {!this.state.is_collapsed && (
            <motion.div
              variants={ping_row_variants}
              style={{
                overflow: "hidden",
              }}
              initial="collapsed"
              animate="open"
              exit="collapsed"
            >
              {ping_rows}
            </motion.div>
          )}
        </AnimatePresence>
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
    const generateBodyRow = (elements, wrapper_props = {}) => {
      console.assert(elements.length === this.table_format.length);
      const wrapped_elems = elements.map((ele, index) => {
        let bodyRowStyle = this.table_format[index].style;
        return (
          <div className="flex_table_datum" style={bodyRowStyle} key={index}>
            {ele}
          </div>
        );
      });
      let body_row_style = {
        borderBottom: `${divider_height}px solid ${bg1}`,
        height: row_height,
      };

      if (wrapper_props["style"]) {
        body_row_style = Object.assign(
          {},
          wrapper_props["style"],
          body_row_style
        ); //rightmost gets precedence
        delete wrapper_props["style"];
      }
      return (
        <motion.div
          style={body_row_style}
          className="flex_table_row"
          {...wrapper_props}
        >
          {wrapped_elems}
        </motion.div>
      );
    };

    // const ids = [53];
    // const ids = [53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53, 53];
    // const pingbursts = getPingBurstsByIds(ids);
    const table_rows = this.props.pingbursts
      .slice()
      .reverse()
      .map((pingburst) => {
        return (
          <PingBurstRow
            key={pingburst.id}
            {...{ total_row_height: row_height + divider_height, ...pingburst }}
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
          <div style={{ position: "relative" }} className="flex_table_body">
            {table_rows}
          </div>
        </Scrollbars>
      </div>
    );
  }
}
