import React from 'react';
import PropTypes from 'prop-types';
import Tab from '../../components/Tab/Tab';
import './NavBar.css';

const NavBar = props => (
  <div className="NavBar">
    <Tab iconId="Home" link="/"/>
    <Tab iconId="Create" link="/create"/>
    <Tab iconId={3} />
    <Tab iconId={4} />
  </div>
);

NavBar.propTypes = {
  children: PropTypes.node
};

NavBar.defaultProps = {
  children: null
};

export default NavBar;