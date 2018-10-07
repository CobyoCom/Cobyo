import React, { Fragment } from "react";
import "./DestinationVisualization.css";

const DestinationVisualization = ({
  cx,
  cy,
  r,
  fill,
  onClick,
  shouldShowRing,
  shouldPulse,
  ringR,
  ringText,
  ringTextY,
  text
}) => (
  <Fragment>
    {shouldShowRing && (
      <Fragment>
        <circle
          className={`DestinationVisualization-ring ${shouldPulse &&
            "DestinationVisualization-pulse"}`}
          cx={cx}
          cy={cy}
          r={ringR}
          fill="none"
          strokeWidth={0.8}
          stroke={fill}
        />
        <text
          x={cx}
          y={ringTextY}
          strokeWidth={0.8}
          stroke={fill}
          textAnchor="middle"
        >
          {ringText}
        </text>
      </Fragment>
    )}
    <circle cx={cx} cy={cy} r={r} fill={fill} onClick={onClick} />
    <text
      x={cx}
      y={cy}
      textAnchor="middle"
      stroke="black"
      strokeWidth="1px"
      dy=".3em"
      onClick={onClick}
    >
      {text}
    </text>
  </Fragment>
);

export default DestinationVisualization;
