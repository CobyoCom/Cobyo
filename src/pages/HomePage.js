import React, { Component } from 'react';
import {connect} from 'react-redux';
import EventCodeForm from '../event/EntryForm/EventEntryForm';
import NavBar from '../navigation/NavBar/NavBar';
import './Page.css';

class HomePage extends Component {
  state = {
    code: ''
  };

  handleEventCodeChange = ({target: {value: code}}) => !isNaN(code) && this.setState({code});

  handleEventCodeSubmit = e => {
    e.preventDefault();
    this.props.history.push(`/${this.state.code}`);
  };

  render() {
    return (
      <div className="HomePage">
        <EventCodeForm
          onChange={this.handleEventCodeChange}
          onSubmit={this.handleEventCodeSubmit}
          value={this.state.code}
          disabled={!this.state.code}
        />
        <NavBar/>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

export default connect(
  mapStateToProps
)(HomePage);
