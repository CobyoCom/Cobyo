import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeTravelMode, refreshEvent} from '../../eventActions';
import AttendeesListItem, {AttendeePropTypes} from './AttendeesListItem';
import {selectUserName} from "../../activeEventSelectors";

class AttendeesListItemContainer extends Component {

  static propTypes = {
    ...AttendeePropTypes,
    isMe: PropTypes.bool.isRequired,
    changeTravelMode: PropTypes.func.isRequired,
    refreshEvent: PropTypes.func.isRequired
  };

  state = {
    isTravelModeOpen: false
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
        onClickTravelMode={this.handleClickTravelMode}
        onCloseTravelMode={this.handleCloseTravelMode}
        onChangeTravelMode={this.handleChangeTravelMode}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isMe: selectUserName(state) === ownProps.userName
});

const mapDispatchToProps = {
  changeTravelMode,
  refreshEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendeesListItemContainer);