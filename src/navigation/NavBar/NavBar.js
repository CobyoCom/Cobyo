import React from 'react';
import {FaHome, FaCalendarPlusO, FaList} from 'react-icons/lib/fa';
import Tab from '../../components/Tab/Tab';
import './NavBar.css';

const NavBar = () => (
  <div className="NavBar">
    <Tab
      link="/"
      icon={<FaHome color="#808080" size={24} />}
      text="Home"
    />
    <Tab
      link="/events"
      icon={<FaCalendarPlusO color="#808080" size={22} />}
      text="Create"
    />
    <Tab
      link="/settings"
      icon={<FaList color="#808080" size={22} />}
      text="Settings"
    />
  </div>
);

export default NavBar;