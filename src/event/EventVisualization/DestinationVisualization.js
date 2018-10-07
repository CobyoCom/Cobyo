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
          stroke="white"
          textAnchor="middle"
          onClick={onClick}
        >
          {ringText}
        </text>
      </Fragment>
    )}
    <circle cx={cx} cy={cy} r={r} fill={fill} />
    <text
      x={cx}
      y={cy}
      textAnchor="middle"
      stroke="black"
      strokeWidth="1px"
      dy=".3em"
    >
      {text}
    </text>
  </Fragment>
);

export default DestinationVisualization;
