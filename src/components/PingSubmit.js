import React, { useState } from "react";
import ColorScheme from "../ColorScheme";
import "../assets/PingSubmit.css";

export default function PingSubmit(props) {
  const blue = ColorScheme.get_color("blue");
  let blue_25 = ColorScheme.get_color_with_opacity("blue", 0.25);
  let blue_75 = ColorScheme.get_color_with_opacity("blue", 0.75);

  const [isHovering, setHoverState] = useState(false);
  const [isClicked, setClickState] = useState(false);

  const submit_style = {
    backgroundColor: blue,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const submit_hover_style = {
    boxShadow: `0px 0px 11px 0px ${blue_25}`,
  };

  const submit_click_style = {
    backgroundColor: blue_75,
  };

  function mergeStyles(original, additions) {
    //adds and potential overwrites original styles with new styles
    for (let key in additions) {
      original[key] = additions[key];
    }
  }

  if (isHovering) {
    mergeStyles(submit_style, submit_hover_style);
  }

  if (isClicked) {
    mergeStyles(submit_style, submit_click_style);
  }

  function click_handler(event) {
    setClickState(true);
    setTimeout(() => setClickState(false), 50);
    props.click_handler(event);
  }

  return (
    <div
      type="button"
      // whileHover={{ scale: 1.05 }}
      // whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      onClick={click_handler}
      style={submit_style}
      className="blue_button ping_submit"
    >
      Submit
    </div>
  );
}
