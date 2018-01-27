import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import FaBeer from 'react-icons/lib/fa/beer';
import './Tab.css';

const Tab = props => (
  <div className="Tab">
    <Link to={props.link}>
      {props.children}
    </Link>
  </div>
);

Tab.propTypes = {
  children: PropTypes.node,
  link: PropTypes.string
};

Tab.defaultProps = {
  link: '/'
};

export default Tab;
