import React from "react";
import ColorScheme from "../ColorScheme";
import "../assets/Slider.css";
import RCSlider from "rc-slider";
import "rc-slider/assets/index.css";

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
    };
  }

  textChangeHandler = (event) => {
    let val = event.target.value;
    const is_valid_number = /^-{0,1}\d+$/.test(val);
    if (!is_valid_number) {
      return;
    }
    val = Math.max(this.props.min, val);
    val = Math.min(this.props.max, val);
    this.changeHandler(val);
  };

  changeHandler = (value) => {
    this.setState({ value });
  };
  render() {
    const progress_color = ColorScheme.get_color("blue");
    const bg1 = ColorScheme.get_color("bg1");
    const slider_height = 12;
    const handle_radius = (slider_height * 5) / 6;
    const main_border_radius = 9;

    const step = this.props.step || 1;
    return (
      <div className="slider_container">
        <RCSlider
          style={{
            height: slider_height,
            padding: 0,
            width: "60%",
          }}
          railStyle={{
            backgroundColor: bg1,
            borderRadius: main_border_radius,
            height: slider_height,
          }}
          trackStyle={{
            backgroundColor: progress_color,
            borderRadius: main_border_radius,
            height: slider_height,
          }}
          handleStyle={{
            borderRadius: handle_radius,
            width: handle_radius * 2,
            height: handle_radius * 2,
            backgroundColor: progress_color,
            border: `1px solid ${bg1}`,
            boxShadow: "none",
            // top: -(handle_radius - slider_height / 2),
          }}
          min={this.props.min}
          max={this.props.max}
          step={step}
          value={this.state.value}
          defaultValue={this.props.defaultValue}
          onChange={this.changeHandler}
        ></RCSlider>

        <input
          className="slider_input"
          type="text"
          style={{ backgroundColor: bg1 }}
          spellCheck="false"
          value={String(this.state.value)}
          onChange={this.textChangeHandler}
        />
      </div>
    );
  }
}
