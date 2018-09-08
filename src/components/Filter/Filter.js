import React from 'react';
import PropTypes from 'prop-types';
import './Filter.css';

export const FilterLabel = props => (
  <button
    className="FilterLabel"
    onClick={() => props.onClick(props.value)}
    disabled={props.isSelected}
    type="button"
  >
    {props.children}
  </button>
);

FilterLabel.propTypes = {
  children: PropTypes.node.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

FilterLabel.defaultProps = {
  isSelected: false
};

const Filter = props => <div className="Filter">{props.children}</div>;

Filter.propTypes = {
  children: PropTypes.array.isRequired
};

export default Filter;
