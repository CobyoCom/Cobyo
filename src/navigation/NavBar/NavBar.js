import React from 'react';
import PropTypes from 'prop-types';
import {FaHome, FaCalendarPlusO, FaList} from 'react-icons/lib/fa';
import Tab from '../../components/Tab/Tab';
import './NavBar.css';

const NavBar = props => (
  <div className="NavBar">
    <Tab link="/">
      <FaHome color="black" size={24} />
    </Tab>
    <Tab link="/events">
      <FaCalendarPlusO color="black" size={22} />
    </Tab>
    <Tab link="/">
      <FaList color="black" size={22} />
    </Tab>
  </div>
);

NavBar.propTypes = {
  children: PropTypes.node
};

NavBar.defaultProps = {
  children: null
};

export default NavBar;