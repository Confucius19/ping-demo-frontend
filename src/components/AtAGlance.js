import React from "react";
import "../assets/AtAGlance.css";
import ArcBar from "./ArcBar.js";

export default class AtAGlance extends React.Component {
  render() {
    const pingbursts = this.props.pingbursts;
    let success_counter = 0;
    let packet_counter = 0;
    let duration_sum = 0;
    let success_sum = 0;
    for (const pingburst of pingbursts) {
      for (const record of pingburst.records) {
        success_sum += record.was_success ? 1 : 0;
        packet_counter++;
        if (record.was_success) {
          duration_sum += record.duration;
          success_counter++;
        }
      }
    }

    const average_duration =
      success_counter !== 0 ? duration_sum / success_counter : 1;
    const success_rate =
      packet_counter !== 0 ? success_sum / packet_counter : 1;
    const max_duration = 1000;
    let duration_percent = Math.min(1, average_duration / max_duration);

    let thresholds = {
      0.5: "C",
      0.6: "B",
      0.7: "A",
      0.8: "A+",
    };
    const overall_metric = (1 - duration_percent + success_rate) / 2;
    let grade = "D";
    for (const threshold in thresholds) {
      if (threshold < overall_metric) {
        grade = thresholds[threshold];
      }
    }

    return (
      <div className="at_a_glance_container">
        <ArcBar
          minLabel="0%"
          maxLabel="100%"
          valueText={`${(success_rate * 100).toFixed(1)}%`}
          valueDescription="Success Rate"
          percentFull={success_rate}
        />
        <ArcBar
          minLabel="0"
          maxLabel={max_duration}
          valueText={`${Math.floor(average_duration)}ms`}
          valueDescription="Average Delay"
          percentFull={duration_percent}
        />
        <h2 className="at_a_glance_grade">Grade: {grade}</h2>
      </div>
    );
  }
}
