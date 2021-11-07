import React from "react";
import Tile from "./Tile";
import * as d3 from "d3";
import { ColorScheme } from "../ColorScheme";

function timestamp_string_to_date(timestamp) {
  //example timestamp string "10/31/2021, 10:49:35 AM 221ms"
  const date_regex_matches = timestamp.match(/(.*) (\d{1,3})ms/);
  //index 0 is the entire timestamp string
  //index 1 is date time w/o ms
  // index 2 is ms
  if (date_regex_matches.length < 3) {
    console.error("Could not convert timesatm string: ", timestamp);
  }
  const date_without_ms = date_regex_matches[1];
  const ms = parseInt(date_regex_matches[2]);
  const converted_date = new Date(date_without_ms);
  converted_date.setMilliseconds(ms);
  return converted_date;
}

/**
 *  Input:
 *  All Pingbursts
 *  Destination ips to display
 *  Time interval e.g. the past hour
 *
 * Output:
 *  x : time
 *  y : Delay per node
 *
 */
function LineChart(
  series_array,
  {
    x = ([x]) => x, // given d in data, returns the (temporal) x-value
    y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
    defined, // for gaps in data
    curve = d3.curveBumpX, // method of interpolation between points
    marginTop = 20, // top margin, in pixels
    marginRight = 30, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 40, // left margin, in pixels
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    xType = d3.scaleTime, // the x-scale type
    xDomain, // [xmin, xmax]
    xRange = [marginLeft, width - marginRight], // [left, right]
    yType = d3.scaleLinear, // the y-scale type
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    color = "currentColor", // stroke color of line
    strokeLinecap = "round", // stroke line cap of the line
    strokeLinejoin = "round", // stroke line join of the line
    strokeWidth = 1.5, // stroke width of line, in pixels
    strokeOpacity = 1, // stroke opacity of line
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
  } = {}
) {
  // Compute values.
  // const X = d3.map(data, x);
  // const Y = d3.map(data, y);
  // const I = d3.map(data, (_, i) => i);
  // if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
  // const D = d3.map(data, defined);

  // Compute default domains.
  if (xDomain === undefined) {
    const all_x_extents = series_array.map((series) =>
      d3.extent(series.data, x)
    );
    const x_min = d3.min(all_x_extents, (extent) => extent[0]);
    const x_max = d3.max(all_x_extents, (extent) => extent[1]);
    xDomain = [x_min, x_max];
  }
  if (yDomain === undefined) {
    const all_y_maxes = series_array.map((series) => d3.max(series.data, y));
    const max = d3.max(all_y_maxes);
    yDomain = [0, max];
  }

  // Construct scales and axes.
  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(width / 80)
    .tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

  // Construct a line generator.
  const line = d3
    .line()
    .defined((datum) => y(datum) !== -1)
    .curve(curve)
    .x((datum) => xScale(x(datum)))
    .y((datum) => yScale(y(datum)));

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(xAxis);

  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(yAxis)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(yLabel)
    );

  // svg
  //   .append("path")
  //   .attr("fill", "none")
  //   .attr("stroke", "currentColor")
  //   .attr("d", line(I.filter((i) => D[i])));
  for (let series of series_array) {
    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", series.color)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linecap", strokeLinecap)
      .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-opacity", strokeOpacity)
      .attr("d", line(series.data));
  }
  return svg.node();
}

export default class DelayMonitor extends React.Component {
  componentDidMount() {
    function ip_series(pingbursts, dest_ip) {
      const data = [];
      for (let pingburst of pingbursts) {
        const valid_pingburst =
          pingburst.records.length !== 0 &&
          pingburst.records[0].dest_ip === dest_ip;
        if (!valid_pingburst) {
          continue;
        }
        for (let record of pingburst.records) {
          data.push({
            start: timestamp_string_to_date(record.start),
            duration: record.duration,
          });
        }
      }
      const color = ColorScheme.get_color("blue");
      return { data, color, id: dest_ip };
    }
    const series_array = [
      ip_series(this.props.pingbursts, "2020::C"),
      ip_series(this.props.pingbursts, "2020::10"),
    ];
    console.log(series_array);

    const start = new Date();
    start.setMinutes(start.getMinutes() - 10);
    const finish = new Date();
    const chart = LineChart(series_array, {
      x: (datum) => datum.start,
      y: (datum) => datum.duration,
      xDomain: [start, finish],
    });
    this.chart = chart;
    document.getElementById("delay_monitor_root").appendChild(chart);
  }

  componentDidUpdate() {
    this.chart.selectAll();
  }

  render() {
    return (
      <Tile omit_header={true}>
        <div id="delay_monitor_root"></div>
      </Tile>
    );
  }
}
