import React from "react";
import ColorScheme from "../ColorScheme";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
// import "../assets/Pane.css";
const fg0 = ColorScheme.get_color("fg0");
export default class Topology extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    cytoscape.use(dagre);
    this.cy = cytoscape({
      container: document.getElementById("cy"), // container to render in

      elements: [
        // list of graph elements to start with
        {
          // node a
          data: { id: "a" },
        },
        {
          // node b
          data: { id: "b" },
        },
        {
          // node b
          data: { id: "c" },
        },
        {
          // edge ab
          data: { id: "ab", source: "a", target: "b" },
          // edge ab
        },
        {
          // edge ab
          data: { id: "ac", source: "a", target: "c" },
          // edge ab
        },
      ],

      style: [
        // the stylesheet for the graph
        {
          selector: "node",
          style: {
            "background-color": "#666",
            label: "data(id)",
          },
        },

        {
          selector: "edge",
          style: {
            width: 3,
            "line-color": fg0,
            "target-arrow-color": fg0,
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
          },
        },
      ],

      layout: {
        name: "dagre",
      },
      wheelSensitivity: 0.1,
    });
  }
  render() {
    return <div style={{ width: "100%" }} id="cy"></div>;
  }
}
