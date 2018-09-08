import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = props => <div className="Header">{props.children}</div>;

Header.propTypes = {
  children: PropTypes.node
};

Header.defaultProps = {
  children: null
};

export default Header;
