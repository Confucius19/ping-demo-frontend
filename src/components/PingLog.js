import React, { useContext, useState } from "react";
import "../assets/FlexTable.css";
import MagnitudeIndicator from "./MagnitudeIndicator";
import StatusIndicator from "./StatusIndicator";
import { AnimatePresence, motion } from "framer-motion";
import FlexTable from "./FlexTable";
import { ColorScheme, THEME, ThemeContext } from "../ColorScheme";

const duration_max_baseline = 600;

function PingRow(props) {
  const start_matches = props.start.match(/(\d{1,2}:\d{1,2}:\d{1,2}.*M)/);
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

function PingBurstRow(props) {
  const [is_collapsed, setCollapse] = useState(true);
  const theme = useContext(ThemeContext);
  const records = props.records;
  if (records.length === 0) {
    const pingburst_cols = ["", props.id, "N/A", "N/A", "N/A"];
    return props.genRow(pingburst_cols);
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
      table_format={props.table_format}
      index={index}
      genRow={props.genRow}
      {...record}
    />
  ));

  const fill =
    theme === THEME.TI
      ? ColorScheme.get_color("gray", THEME.TI)
      : ColorScheme.get_color("bg1", theme);
  const toggle = (
    <motion.svg
      style={{ userSelect: "none", cursor: "pointer" }}
      animate={{
        rotate: is_collapsed ? 0 : 90,
      }}
      initial={false}
      onClick={() => setCollapse(!is_collapsed)}
      width="17"
      height="19"
      viewBox="0 0 17 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.1858 9.5L0.970119 18.5933L0.970119 0.406734L16.1858 9.5Z"
        fill={fill}
      />
    </motion.svg>
  );

  const pingburst_cols = [
    toggle,
    props.id,
    min_start_str,
    duration_indicator,
    error_rate_indicator,
  ];

  const ping_row_variants = {
    collapsed: {
      height: 0,
    },
    open: {
      height: props.total_row_height * props.records.length,
    },
  };

  return (
    <React.Fragment>
      {props.genRow(pingburst_cols)}
      <AnimatePresence>
        {!is_collapsed && (
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
// }

export default function PingLog(props) {
  const table_format = [
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

  const table_rows = props.pingbursts
    .slice()
    .reverse()
    .map((pingburst) => {
      return {
        id: pingburst.id,
        ...pingburst,
      };
    });

  return (
    <FlexTable
      row_component={PingBurstRow}
      table_format={table_format}
      table_rows={table_rows}
    />
  );
}
