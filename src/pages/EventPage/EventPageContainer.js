import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchEvent} from '../../event/eventActions';
import {selectEventId, selectIsLoggedIn} from '../../event/activeEventSelectors';
import EventPage from './EventPage';

class EventPageContainer extends Component {

  static propTypes = {
    eventId: PropTypes.string.isRequired,
    isEventLoaded: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    fetchEvent: PropTypes.func.isRequired
  };

  static defaultProps = {
    isEventLoaded: false,
    isLoggedIn: false
  };

  async componentDidMount() {
    try {
      await this.props.fetchEvent(this.props.eventId);
    } catch(error) {
      this.props.history.replace('/404');
    }
  }

  render() {
    return (
      <EventPage
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state),
  isEventLoaded: selectEventId(state) !== null
});

const mapDispatchToProps = {
  fetchEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPageContainer);