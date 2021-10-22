import React from "react";
import "../assets/AtAGlance.css";
import ArcBar from "./ArcBar.js";

export default class AtAGlance extends React.Component {
  render() {
    return (
      <div className="at_a_glance_container">
        <ArcBar
          minLabel="0%"
          maxLabel="100%"
          valueText="16%"
          valueDescription="Error Rate"
          percentFull={0.2}
        />
        <ArcBar
          minLabel="0"
          maxLabel="1000"
          valueText="850ms"
          valueDescription="Average Delay"
          percentFull={0.85}
        />
        <h2 className="at_a_glance_grade">Grade: A+</h2>
      </div>
    );
  }
}
