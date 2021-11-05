import React from "react";
import ColorScheme from "../ColorScheme";
import { motion } from "framer-motion";
import ReactTooltip from "react-tooltip";

export default class MagnitudeIndicator extends React.Component {
  render() {
    //
    // this.props.thresholds
    const thresholds = {
      0.33: ColorScheme.get_color("green"),
      0.66: ColorScheme.get_color("yellow"),
      0.9: ColorScheme.get_color("red"),
    };

    const borderRadius = 9;
    const height = 21;

    const background_style = {
      backgroundColor: ColorScheme.get_color("bg1"),
      borderRadius,
      height,
      width: "80%",
      overflow: "hidden",
    };

    const value = Math.min(1, this.props.value);
    let foreground_color;
    for (let threshold_val in thresholds) {
      foreground_color = thresholds[threshold_val];
      if (threshold_val > value) {
        break;
      }
    }
    const foreground_style = {
      backgroundColor: foreground_color,
      height,
      borderRadius,
      width: `${value * 100}%`,
    };

    for (let key in this.props.style) {
      background_style[key] = this.props.style[key];
      foreground_style[key] = this.props.style[key];
    }
    const width = (value * 0.9 + 0.15) * 100;
    return (
      <>
        <div style={background_style} data-tip={this.props.tooltip || "N/A"}>
          <motion.div
            animate={{ width }}
            transition={{ duration: 0.5 }}
            initial={false}
            style={foreground_style}
          />
        </div>
        <ReactTooltip effect="solid" place="bottom" delayHide={0} />
      </>
    );
  }
}
