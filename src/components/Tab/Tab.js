import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {Link} from 'react-router-dom';
import './Tab.css';

const Tab = props => (
  <div className="Tab">
    <Link to={props.link}>
      <div className="Tab-content">
        {props.icon}
        <span
          className={cx("Tab-text", {
            'Tab-text--active': props.isActive
          })}
        >
          {props.text}
        </span>
      </div>
    </Link>
  </div>
);

Tab.propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.node,
  icon: PropTypes.node,
  text: PropTypes.string,
  link: PropTypes.string,
};

Tab.defaultProps = {
  isActive: false,
  icon: null,
  text: '',
  link: '/'
};

export default Tab;
