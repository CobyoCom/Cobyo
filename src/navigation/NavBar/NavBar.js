import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectActiveEventCode } from "../../event/activeEventSelectors";
import { FaHome, FaCalendarCheck, FaList } from "react-icons/fa";
import Tab from "../../components/Tab/Tab";
import "./NavBar.css";

const NavBar = props => (
  <div className="NavBar">
    <Tab
      link="/"
      icon={<FaHome color="#808080" size={24} />}
      text="Home"
      isActive={props.activeTab === "Home"}
    />
    <Tab
      link={props.code ? `/${props.code}` : "/events"}
      icon={<FaCalendarCheck color="#808080" size={22} />}
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
  code: PropTypes.string,
  activeTab: PropTypes.oneOf(["Home", "Events", "Create", "Settings"])
};

NavBar.defaultProps = {
  code: null,
  activeTab: null
};

const mapStateToProps = state => ({
  code: selectActiveEventCode(state)
});

export default connect(mapStateToProps)(NavBar);
