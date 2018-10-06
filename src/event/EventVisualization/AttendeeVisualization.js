import React, { Fragment } from "react";

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
    >
      {text.substring(0, 1)}
    </text>
    {shouldShowRing && (
      <circle
        className="AttendeeVisualization-ring"
        cx={cx}
        cy={cy}
        r={ringR}
        fill="none"
        strokeWidth={.8}
        stroke={fill}
      >
        {shouldPulse && (
          <Fragment>
            <animate attributeType="SVG" attributeName="r" begin="0s" dur="1.5s" repeatCount="indefinite" from="4%" to="10%"/>
            <animate attributeType="CSS" attributeName="opacity" begin="0s"  dur="1.5s" repeatCount="indefinite" from="1" to="0"/>
          </Fragment>
        )}
      </circle>
    )}
  </Fragment>
);

export default AttendeeVisualization;
