import React, {Fragment} from 'react';

const AttendeeVisualization = ({cx, cy, r, fill, text, textStroke}) => console.log(text) || (
  <Fragment>
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
    />
    <text
      x={cx}
      y={cy}
      textAnchor="middle"
      stroke={textStroke}
      strokeWidth="1px"
      dy=".3em"
    >
      {text}
    </text>
  </Fragment>
);

export default AttendeeVisualization;