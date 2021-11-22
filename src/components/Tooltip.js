import React, { useEffect, useRef, useState } from "react";
import reactDom from "react-dom";
import "../assets/Tooltip.css";

function TooltipPortal(props) {
  return reactDom.createPortal(
    <div style={{ ...props.loc }} className="tooltip-text">
      {props.content || "N/A"}
    </div>,
    document.body
  );
}

export default function Tooltip(props) {
  const localRef = useRef(null);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const boundingRect = localRef.current.getBoundingClientRect();
    const currentLeft = boundingRect.left;
    const currentTop = boundingRect.top + window.scrollY;
    console.log(currentTop, top);
    if (top !== currentTop) {
      setTop(currentTop);
    }
    if (left !== currentLeft) {
      setLeft(currentLeft);
    }
  });
  return (
    <div
      className="tooltip-container"
      style={{ width: "100%", display: "relative" }}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      {props.children}
      <div ref={localRef} className="tooltip-bottom-center"></div>
      {shown && (
        <TooltipPortal
          loc={{ top, left }}
          content={props.content}
        ></TooltipPortal>
      )}
    </div>
  );
}
