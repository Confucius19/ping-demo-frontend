import React from "react";
import ColorScheme from "../ColorScheme";
import cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import dagre from "cytoscape-dagre";
import produce from "immer";
// import "../assets/Pane.css";
const fg0 = ColorScheme.get_color("fg0");
const blue = ColorScheme.get_color("blue");
const orange = ColorScheme.get_color("orange");

cytoscape.use(dagre);

export default class Topology extends React.Component {
  constructor(props) {
    super(props);
    this.layout = { name: "dagre" };
  }
  componentDidMount() {
    this.cy.on("select", "node", (e) => {
      const node = e.target;
      this.props.ip_selection_handler(node.id(), true);
    });
    this.cy.on("unselect", "node", (e) => {
      const node = e.target;
      this.props.ip_selection_handler(node.id(), false);
    });
    this.cy.on("add", "node", (_evt) => {
      this.cy.layout(this.layout).run();
    });
  }
  render() {
    const ip_info_array = this.props.ip_address_info_array;
    const unnormalized_elements = produce(this.props.elements, (elements) => {
      const nodes = elements.nodes;
      for (const node of nodes) {
        const ip_info = ip_info_array.find(
          (ip_info) => ip_info.ip_address === node.data.id
        );
        node.selected = ip_info.is_selected;
      }
    });

    return (
      <CytoscapeComponent
        elements={CytoscapeComponent.normalizeElements(unnormalized_elements)}
        cy={(cy) => {
          this.cy = cy;
        }}
        style={{ width: "100%" }}
        layout={this.layout}
        stylesheet={[
          {
            selector: "node",
            style: {
              "background-color": orange,
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
          {
            selector: "node:selected",
            style: {
              "background-color": blue,
              "box-shadow": "0px 0px  10px 10 px red",
            },
          },
        ]}
        wheelSensitivity={0.1}
      />
    );
    // return <div style={{ width: "100%" }} id="cy"></div>;
  }
}
