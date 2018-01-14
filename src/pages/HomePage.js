import React, { Component } from 'react';
import {connect} from 'react-redux';
import {selectFacebookToken} from '../login/loginSelectors';
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
  facebookToken: selectFacebookToken(state)
});

export default connect(
  mapStateToProps
)(HomePage);
