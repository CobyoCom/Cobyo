import React from 'react';
import PropTypes from 'prop-types';
import {FaClose} from 'react-icons/lib/fa';
import Button from "../Button/Button";
import './Banner.css';

const Banner = props => (
  <div className="Banner">
    {props.children}
    <Button
      icon={<FaClose/>}
      iconOnly
      onClick={props.onClose}
      size="small"
    />
  </div>
);

Banner.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

Banner.defaultProps = {
  children: null,
};

export default Banner;