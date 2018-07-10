import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CreatePage from './CreatePage';
import {editEventPlace} from '../createActions';

class EditEventPageContainer extends Component {

  static propTypes = {
    eventId: PropTypes.string.isRequired,
    editEventPlace: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await this.props.editEventPlace(this.props.eventId);
      const eventId = response.data.editEvent.code;
      this.props.history.push(`/${eventId}`);
    } catch (error) {

    }
  };

  render() {
    return (
      <CreatePage
        disabled={false}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

const mapDispatchToProps = {
  editEventPlace
};

export default connect(
  null,
  mapDispatchToProps
)(EditEventPageContainer);