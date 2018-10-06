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
  ringR
}) => (
  <Fragment>
    {shouldShowRing && (
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
    )}
    <circle cx={cx} cy={cy} r={r} fill={fill} onClick={onClick} />
  </Fragment>
);

export default DestinationVisualization;
