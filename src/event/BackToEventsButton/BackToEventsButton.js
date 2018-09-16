import React from 'react';
import { Link } from 'react-router-dom';
import { FaBackward } from 'react-icons/lib/fa';

const BackToEventsButton = props => (
  <div style={{
    position: 'absolute',
    top: '7px',
    left: '10px'
  }}>
    <Link to="/events">
      <FaBackward color="white" size={16} />
    </Link>
  </div>
);

export default BackToEventsButton;