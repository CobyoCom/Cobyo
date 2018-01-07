import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '../components/Button/Button';
import SearchPlacesContainer from '../create/SearchPlacesContainer';

class CreateForm extends Component {

  handleSubmit = e => {
    e.preventDefault();

    // TODO
  };

  render() {
    return (
      <form
        className="CreateForm"
        onSubmit={this.handleSubmit}
      >
        <SearchPlacesContainer/>

        <Button
          type="submit"
        >
          Submit
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({

});

export default connect(
  mapStateToProps
)(CreateForm);
