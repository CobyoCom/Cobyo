import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "../../components/Button/Button";
import "./TimeSelect.css";
import "../../components/Input/Input.css";
import { to } from "../../helpers/moment";
import { editEventScheduledTime } from "../eventActions_old";
import { selectEventScheduledTime } from "../activeEventSelectors_old";

class TimeSelect extends Component {
  static propTypes = {
    scheduledTime: PropTypes.number,
    editEventScheduledTime: PropTypes.func.isRequired,
    onConfirmTime: PropTypes.func.isRequired
  };

  static defaultProps = {
    scheduledTime: null,
    isUpdating: false
  };

  state = {
    hour:
      (this.props.scheduledTime
        ? new Date(this.props.scheduledTime).getHours()
        : new Date().getHours() + 1) % 12, // 0-11
    minute: this.props.scheduledTime
      ? new Date(this.props.scheduledTime).getMinutes()
      : 0,
    isAM:
      (this.props.scheduledTime
        ? new Date(this.props.scheduledTime).getHours()
        : new Date().getHours() + 1) < 12
  };

  getMessage = () => {
    if (this.props.scheduledTime && !this.state.isUpdating) {
      const scheduledInFuture = `This event happens ${to(new Date(this.props.scheduledTime))}.`;
      const scheduledInPast = `This event happened ${to(new Date(this.props.scheduledTime))}.`;

      return this.getIsConfirmDisabled() ? scheduledInPast : scheduledInFuture
    } else {
      const notScheduled = 'No time has been set.';
      const updatingSchedule = `This event will now happen ${to(this.getDate())}.`;

      return this.state.isUpdating ? updatingSchedule : notScheduled
    }
  };

  getHourString = () => {
    if (this.state.hour < 10) {
      return `0${this.state.hour}`;
    }

    return `${this.state.hour}`;
  };

  getMinuteString = () => {
    if (this.state.minute < 10) {
      return `0${this.state.minute}`;
    }

    return `${this.state.minute}`;
  };

  getDate = () => {
    const now = new Date();
    const hour = this.state.hour + (this.state.isAM ? 0 : 12);
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      this.state.minute,
      0
    );
  };

  getIsConfirmDisabled = () => this.getDate() < new Date();

  handleHourChange = ({ target: { value } }) => {
    let hour = parseInt(value, 10);
    if (isNaN(hour)) {
      return;
    }
    if (hour > 99) {
      hour %= 100;
    }

    this.setState({ hour: hour > 12 ? Math.floor(hour / 10) : hour });
  };

  handleMinuteChange = ({ target: { value } }) => {
    let minute = parseInt(value, 10);
    if (isNaN(minute)) {
      return;
    }
    if (minute > 99) {
      minute %= 100;
    }

    this.setState({
      minute: minute > 59 ? Math.floor(minute / 10) : minute,
      isUpdating: true
    });
  };

  handleMeridiemChange = () =>
    this.setState(prevState => ({ isAM: !prevState.isAM }));

  handleConfirmTime = async () => {
    try {
      await this.props.editEventScheduledTime(this.getDate().getTime());
      this.props.onConfirmTime();
    } catch (error) {}
  };

  render() {
    return (
      <div className="TimeSelect">
        <h3>{this.getMessage()}</h3>
        <div className="TimeSelect-inputArea">
          <input
            className="Input Input-large"
            onChange={this.handleHourChange}
            value={this.getHourString()}
            maxLength={3}
          />
          :
          <input
            className="Input Input-large"
            onChange={this.handleMinuteChange}
            value={this.getMinuteString()}
            maxLength={3}
          />
        </div>
        <div className="TimeSelect-contentArea">
          <Button size="small" onClick={this.handleMeridiemChange}>
            {this.state.isAM ? "AM" : "PM"}
          </Button>
        </div>
        <Button
          disabled={this.getIsConfirmDisabled()}
          onClick={this.handleConfirmTime}
        >
          {this.props.scheduledTime ? "Update" : "Go"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  scheduledTime: selectEventScheduledTime(state)
});

const mapDispatchToProps = {
  editEventScheduledTime
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeSelect);
