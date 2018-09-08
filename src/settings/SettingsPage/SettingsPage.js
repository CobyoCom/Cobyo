import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import NavBar from '../../navigation/NavBar/NavBar';
import './SettingsPage.css';

const SettingsPage = props => (
  <div className="SettingsPage">
    <ul className="SettingsPage-actions">
      <li className="SettingsPage-action">
        <Button size="small" variation="secondary" onClick={props.onCacheClick}>
          Clear cache
        </Button>
      </li>
      <li className="SettingsPage-action">
        <Button
          size="small"
          variation="secondary"
          onClick={props.onFeedbackClick}
        >
          Send feedback
        </Button>
      </li>
    </ul>
    <NavBar activeTab="Settings" />
  </div>
);

SettingsPage.propTypes = {
  onCacheClick: PropTypes.func.isRequired,
  onFeedbackClick: PropTypes.func.isRequired
};

export default SettingsPage;
