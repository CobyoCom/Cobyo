import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './Tab.css';

const Tab = props => (
  <div className="Tab">
    <Link to={props.link}>
      <div className="Tab-content">
        {props.icon}
        <span className="Tab-text">{props.text}</span>
      </div>
    </Link>
  </div>
);

Tab.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  text: PropTypes.string,
  link: PropTypes.string
};

Tab.defaultProps = {
  icon: null,
  text: '',
  link: '/'
};

export default Tab;
