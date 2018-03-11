import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  selectEventAttendees,
  selectMe
} from '../../activeEventSelectors';
import {refreshEvent} from '../../eventActions';
import {AttendeePropTypes} from '../AttendeesListItem/AttendeesListItem';
import AttendeesList from './AttendeesList';

class AttendeesListContainer extends Component {
  static propTypes = {
    me: PropTypes.shape(AttendeePropTypes).isRequired,
    attendees: PropTypes.array,
    refreshEvent: PropTypes.func.isRequired
  };

  static defaultProps = {
    attendees: []
  };

  async componentDidMount() {
    try {
      await this.props.refreshEvent();
    } catch(error) {
      console.error('Loading attendees failed');
    }
  }

  render() {
    return (
      <AttendeesList {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  attendees: selectEventAttendees(state),
  me: selectMe(state)
});

const mapDispatchToProps = {
  refreshEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendeesListContainer);