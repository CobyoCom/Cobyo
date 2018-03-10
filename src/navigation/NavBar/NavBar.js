import React from 'react';
import {FaHome, FaCalendarPlusO, FaList} from 'react-icons/lib/fa';
import Tab from '../../components/Tab/Tab';
import './NavBar.css';

const NavBar = () => (
  <div className="NavBar">
    <Tab link="/">
      <FaHome color="black" size={24} />
    </Tab>
    <Tab link="/events">
      <FaCalendarPlusO color="black" size={22} />
    </Tab>
    <Tab link="/settings">
      <FaList color="black" size={22} />
    </Tab>
  </div>
);

export default NavBar;