import React, { Component } from 'react';
import {connect} from 'react-redux';
import NavBar from '../navigation/NavBar/NavBar';

class HomePage extends Component {

  render() {
    return (
      <div className="HomePage">
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
