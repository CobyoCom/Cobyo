import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { formatCalendar, fromNow } from "../../../helpers/moment";
import AttendeesListItem, { AttendeePropTypes } from "./AttendeesListItem";
import { makeSelectIsMe } from "../../../me/meSelectors";
import { selectIsCalculatingDuration } from "../../../reducers/ui/uiEventSelectors";
import { toggleShowTravelModeSelect, refreshMe } from "../../eventUserActions";
import {
  selectActiveEventCode,
  selectActiveEventMyTravelMode
} from "../../activeEventSelectors";

class AttendeesListItemContainer extends Component {
  static propTypes = {
    ...AttendeePropTypes,
    isMe: PropTypes.bool.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    showTravelModeSelect: PropTypes.func.isRequired
  };

  getHasProbablyArrived = () => this.props.duration < 60;

  getDurationStatus = () => {
    if (isNaN(this.props.duration)) {
      return "";
    }

    if (!this.props.hasLeft) {
      const minutes = Math.floor(this.props.duration / (60 * 1000));
      if (minutes > 0) {
        return `${minutes} minutes away`;
      }

      const seconds = this.props.duration & 60;
      return `${seconds} seconds away`;
    }

    const arrivalTime = this.props.duration + this.props.updatedTime;
    return formatCalendar(arrivalTime);
  };

  getUpdatedTimeStatus = () => {
    if (this.props.isRefreshing && this.props.isMe) {
      return "calculating...";
    }

    if (!this.props.updatedTime && this.props.isMe) {
      return "invalid";
    }

    return fromNow(this.props.updatedTime);
  };

  handleClick = this.props.refreshMe;

  handleIconClick = e => {
    e.stopPropagation();
    this.props.showTravelModeSelect();
  };

  render() {
    return (
      <AttendeesListItem
        {...this.props}
        {...this.state}
        hasProbablyArrived={this.getHasProbablyArrived()}
        durationStatus={this.getDurationStatus()}
        updatedTimeStatus={this.getUpdatedTimeStatus()}
        onClick={this.handleClick}
        onIconClick={this.handleIconClick}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  code: selectActiveEventCode(state),
  travelMode: selectActiveEventMyTravelMode(state),
  isMe: makeSelectIsMe(state)(ownProps.user.name),
  isRefreshing: selectIsCalculatingDuration(state)
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  toggleShowTravelModeSelect,
  refreshMe
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { code, travelMode, ...restState } = stateProps;
  const {
    dispatch,
    toggleShowTravelModeSelect,
    refreshMe,
    ...restDispatch
  } = dispatchProps;
  return {
    ...ownProps,
    ...restState,
    ...restDispatch,
    showTravelModeSelect: () => dispatch(toggleShowTravelModeSelect(true)),
    refreshMe: () => dispatch(refreshMe({ code, travelMode }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  AttendeesListItemContainer
);
