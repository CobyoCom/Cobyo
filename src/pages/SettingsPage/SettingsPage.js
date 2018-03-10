import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import NavBar from '../../navigation/NavBar/NavBar';
import './SettingsPage.css';

const SettingsPage = props => (
  <div className="SettingsPage">
    <ul className="SettingsPage-actions">
      <li className="SettingsPage-action">
        <Button size="small" onClick={props.onCacheClick}>
          Clear cache
        </Button>
      </li>
      <li className="SettingsPage-action">
        <Button size="small" onClick={props.onFeedbackClick}>
          Send feedback
        </Button>
      </li>
    </ul>
    <NavBar/>
  </div>
);

SettingsPage.propTypes = {
  onCacheClick: PropTypes.func.isRequired,
  onFeedbackClick: PropTypes.func.isRequired
};

export default SettingsPage;