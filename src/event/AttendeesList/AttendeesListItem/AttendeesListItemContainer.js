import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import {addTime} from '../../../helpers/moment';
import {changeTravelMode, refreshEvent} from '../../eventActions';
import AttendeesListItem, {AttendeePropTypes} from './AttendeesListItem';
import {selectUserName, selectIsRefreshing} from "../../activeEventSelectors";

class AttendeesListItemContainer extends Component {

  static propTypes = {
    ...AttendeePropTypes,
    isMe: PropTypes.bool.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    changeTravelMode: PropTypes.func.isRequired,
    refreshEvent: PropTypes.func.isRequired
  };

  state = {
    isTravelModeOpen: false
  };

  formatArrivalTime = eta => {
    return moment(eta).calendar(null, {
      sameDay: 'h:mm a',
      nextDay: '[Tomorrow at ] h:mm a',
      nextWeek: 'dddd h:mm a',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: '[-]'
    });
  };

  getUserStatus = () => {
    if (this.props.isRefreshing && this.props.isMe) {
      return 'calculating...';
    }

    if (this.props.duration === null || isNaN(this.props.duration)) {
      return this.formatArrivalTime(null);
    }

    if (!this.props.hasLeft) {
      const minutes = Math.floor(this.props.duration / 60);
      if (minutes > 0) {
        return `${minutes} minutes`;
      }

      const seconds = this.props.duration & 60;
      return `${seconds} seconds`;
    }

    return this.formatArrivalTime(addTime(this.props.duration, this.props.lastUpdated).format('YYYY-MM-DD HH:mm'));
  };

  handleClickTravelMode = () => this.setState({isTravelModeOpen: true});

  handleCloseTravelMode = () => this.setState({isTravelModeOpen: false});

  handleChangeTravelMode = async (e) => {
    this.handleCloseTravelMode();

    await this.props.changeTravelMode(e);
    this.props.refreshEvent();
  };

  render() {
    return (
      <AttendeesListItem
        {...this.props}
        {...this.state}
        userStatus={this.getUserStatus()}
        onClickTravelMode={this.handleClickTravelMode}
        onCloseTravelMode={this.handleCloseTravelMode}
        onChangeTravelMode={this.handleChangeTravelMode}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isMe: selectUserName(state) === ownProps.userName,
  isRefreshing: selectIsRefreshing(state)
});

const mapDispatchToProps = {
  changeTravelMode,
  refreshEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendeesListItemContainer);