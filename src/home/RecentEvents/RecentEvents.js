import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import './RecentEvents.css';

const getFormattedLocation = location => location && location.split(',')[0];

const RecentEvents = props => (
  <div className="RecentEvents">
    {!!props.events.length && <p>Back to</p>}
    {props.events.map(({ code, name }) => (
      <div key={code} className="RecentEvent">
        <Button
          onClick={() => props.history.push(`/${code}`)}
          size="small"
          variation="secondary"
        >
          {getFormattedLocation(name)}
        </Button>
      </div>
    ))}
  </div>
);

RecentEvents.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
  history: PropTypes.object.isRequired
};

RecentEvents.defaultProps = {
  events: []
};

export default RecentEvents;
