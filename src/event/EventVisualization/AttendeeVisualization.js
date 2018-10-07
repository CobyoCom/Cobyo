import React, { Fragment } from "react";
import "./AttendeeVisualization.css";

const AttendeeVisualization = ({
  cx,
  cy,
  r,
  fill,
  text,
  textStroke,
  onClick,
  shouldShowRing,
  ringR,
  shouldPulse
}) => (
  <Fragment>
    <circle cx={cx} cy={cy} r={r} fill={fill} onClick={onClick} />
    <text
      x={cx}
      y={cy}
      textAnchor="middle"
      stroke={textStroke}
      strokeWidth="1px"
      dy=".3em"
      onClick={onClick}
    >
      {text.substring(0, 1)}
    </text>
    {shouldShowRing && (
      <circle
        className={`AttendeeVisualization-ring ${shouldPulse &&
          "AttendeeVisualization-pulse"}`}
        cx={cx}
        cy={cy}
        r={ringR}
        fill="none"
        strokeWidth={0.8}
        stroke={fill}
      />
    )}
  </Fragment>
);

export default AttendeeVisualization;
