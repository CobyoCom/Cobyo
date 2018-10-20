import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./BaseNode.css";

const Ring = ({ cx, cy, r, fill, text, textStroke, onClick, animation }) => (
  <circle
    className={`BaseNode-ring ${animation ? `BaseNode-${animation}` : ""}`}
    cx={cx}
    cy={cy}
    r={r}
    fill="none"
    strokeWidth={0.8}
    stroke={fill}
  />
);

const MaskedRing = ({
  cx,
  cy,
  r,
  fill,
  text,
  textStroke,
  onClick,
  animation
}) => (
  <Fragment>
    <defs>
      <mask id="Ring-mask">
        <rect width="100%" height="100%" fill="none" />
        <circle r={r} cx={cx} cy={cy} fill="yellow" />
      </mask>
    </defs>
    <circle
      className={`BaseNode-ring ${animation ? `BaseNode-${animation}` : ""}`}
      cx={cx}
      cy={cy}
      r="100%"
      fill="none"
      mask="url(#Ring-mask)"
    />
  </Fragment>
);

const BaseNode = ({
  cx,
  cy,
  r,
  fill,
  text,
  textStroke,
  onClick,
  animation,
  ring,
  orbitalRing
}) => (
  <Fragment>
    <circle cx={cx} cy={cy} r={r} fill={fill} onClick={onClick} />
    {text && (
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        stroke={textStroke}
        strokeWidth="1px"
        dy=".3em"
        onClick={onClick}
      >
        {text}
      </text>
    )}
    {!!ring && (ring.hasMask ? <MaskedRing {...ring} /> : <Ring {...ring} />)}
    {!!orbitalRing && (
      <circle
        cx={orbitalRing.cx || "50%"}
        cy={orbitalRing.cy || "50%"}
        r={orbitalRing.r || 0}
        fill="none"
        strokeWidth={0.5}
        stroke={orbitalRing.fill || fill}
      />
    )}
  </Fragment>
);

const circlePropTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  fill: PropTypes.string,
  text: PropTypes.string,
  textStroke: PropTypes.string,
  animation: PropTypes.oneOf(["flash", "pulse"]),
  onClick: PropTypes.func
};

BaseNode.propTypes = {
  ...circlePropTypes,
  ring: PropTypes.shape({
    ...circlePropTypes,
    hasMask: PropTypes.bool
  }),
  orbitalRing: PropTypes.shape({
    ...circlePropTypes
  })
};

BaseNode.defaultProps = {
  ring: null,
  orbitalRing: null
};

export default BaseNode;
