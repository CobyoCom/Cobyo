import React, {Component} from 'react';
import SettingsPage from './SettingsPage';

class SettingsPageContainer extends Component {

  handleCacheClick = () => {
    localStorage.clear();
  };

  handleFeedbackClick = () => {};

  render() {
    return (
      <SettingsPage
        onCacheClick={this.handleCacheClick}
        onFeedbackClick={this.handleFeedbackClick}
      />
    );
  }
}

export default SettingsPageContainer;