import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addTime, formatCalendar, fromNow} from '../../helpers/moment';
import {changeTravelMode, refreshEvent} from '../eventActions';
import AttendeesListItem, {AttendeePropTypes} from './AttendeesListItem';
import {selectUserName, selectIsRefreshing, selectEventId} from "../activeEventSelectors";

class AttendeesListItemContainer extends Component {

  static propTypes = {
    ...AttendeePropTypes,
    eventId: PropTypes.number.isRequired,
    isMe: PropTypes.bool.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    changeTravelMode: PropTypes.func.isRequired,
    refreshEvent: PropTypes.func.isRequired
  };

  state = {
    isTravelModeOpen: false
  };

  getHasProbablyArrived = () => this.props.duration < 60;

  getDurationStatus = () => {
    if (this.props.duration === null || isNaN(this.props.duration)) {
      return '';
    }

    if (!this.props.hasLeft) {
      const minutes = Math.floor(this.props.duration / 60);
      if (minutes > 0) {
        return `${minutes} minutes away`;
      }

      const seconds = this.props.duration & 60;
      return `${seconds} seconds away`;
    }
    const arrivalTime = addTime(this.props.duration, this.props.lastUpdated);
    return formatCalendar(arrivalTime);
  };

  getLastUpdatedStatus = () => {
    if (this.props.isRefreshing && this.props.isMe) {
      return 'calculating...';
    }

    if (!this.props.lastUpdated && this.props.isMe) {
      return 'invalid';
    }

    return fromNow(this.props.lastUpdated);
  };

  handleClickTravelMode = () => this.setState({isTravelModeOpen: true});

  handleCloseTravelMode = () => this.setState({isTravelModeOpen: false});

  handleChangeTravelMode = async (e) => {
    this.handleCloseTravelMode();

    this.props.changeTravelMode(this.props.eventId, e);
    this.props.refreshEvent();
  };

  render() {
    return (
      <AttendeesListItem
        {...this.props}
        {...this.state}
        hasProbablyArrived={this.getHasProbablyArrived()}
        durationStatus={this.getDurationStatus()}
        lastUpdatedStatus={this.getLastUpdatedStatus()}
        onClickTravelMode={this.handleClickTravelMode}
        onCloseTravelMode={this.handleCloseTravelMode}
        onChangeTravelMode={this.handleChangeTravelMode}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isMe: selectUserName(state) === ownProps.userName,
  isRefreshing: selectIsRefreshing(state),
  eventId: selectEventId(state)
});

const mapDispatchToProps = {
  changeTravelMode,
  refreshEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendeesListItemContainer);