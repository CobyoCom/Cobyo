import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FaHome, FaCalendarCheckO, FaList} from 'react-icons/lib/fa';
import Tab from '../../components/Tab/Tab';
import {selectActiveEventId} from '../../event/activeEventSelectors';
import './NavBar.css';

const NavBar = props => (
  <div className="NavBar">
    <Tab
      link="/"
      icon={<FaHome color="#808080" size={24} />}
      text="Home"
      isActive={props.activeTab === "Home"}
    />
    <Tab
      link={props.activeEventId ? `/events/${props.activeEventId}` : '/events'}
      icon={<FaCalendarCheckO color="#808080" size={22} />}
      text="Events"
      isActive={props.activeTab === "Events"}
    />
    <Tab
      link="/settings"
      icon={<FaList color="#808080" size={22} />}
      text="Settings"
      isActive={props.activeTab === "Settings"}
    />
  </div>
);

NavBar.propTypes = {
  activeEventId: PropTypes.number,
  activeTab: PropTypes.oneOf(["Home", "Events", "Create", "Settings"])
};

NavBar.defaultProps = {
  activeEventId: null,
  activeTab: null
};

const mapStateToProps = state => ({
  activeEventId: selectActiveEventId(state)
});

export default connect(
  mapStateToProps
)(NavBar);