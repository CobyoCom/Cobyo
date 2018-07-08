import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {selectIsLoggedIn} from '../activeEventSelectors';
import {FaClipboard, FaSignOut} from 'react-icons/lib/fa';
import CopyToClipboard from 'react-copy-to-clipboard';
import EventSettings from './EventSettings';
import Button from "../../components/Button/Button";

class EventSettingsContainer extends Component {

  static propTypes = {
    showCopyUrlTab: PropTypes.bool.isRequired,
    showCloseEventTab: PropTypes.bool.isRequired
  };

  state = {
    isOpen: false
  };

  handleClick = () => this.setState(prevState => ({isOpen: !prevState.isOpen}));

  getTabs = () => {
    const tabs = [];

    if (this.props.showCopyUrlTab) {
      tabs.push(
        <CopyToClipboard
          text={window.location.href}
          onCopy={this.handleClick}
        >
          <Button icon={<FaClipboard color="white" size={16} />}>
            Copy URL
          </Button>
        </CopyToClipboard>
      );
    }

    if (this.props.showCloseEventTab) {
      tabs.push(
        <Button
          onClick={() => console.log('Closing event')}
          icon={<FaSignOut color="white" size={16} />}
        >
          Close Event
        </Button>
      );
    }

    return tabs;
  };

  render() {
    return (
      <EventSettings
        isOpen={this.state.isOpen}
        onClick={this.handleClick}
        onClose={this.handleClick}
        tabs={this.getTabs()}
      />
    )
  }
}

const mapStateToProps = state => ({
  showCopyUrlTab: true,
  showCloseEventTab: selectIsLoggedIn(state)
});

export default connect(
  mapStateToProps
)(EventSettingsContainer);