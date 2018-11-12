import React from "react";
import { Link } from "react-router-dom";
import { FaBackward } from "react-icons/fa";

const BackToEventsButton = () => (
  <div
    style={{
      position: "absolute",
      top: "7px",
      left: "10px"
    }}
  >
    <Link to="/events">
      <FaBackward color="white" size={16} />
    </Link>
  </div>
);

export default BackToEventsButton;
