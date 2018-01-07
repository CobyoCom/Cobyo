import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectFacebookToken} from '../reducers/globalSelectors';

class HomePage extends Component {

  render() {
    return (
      <div className="HomePage">

        {this.props.facebookToken ||
          <Link to="/login">Login</Link>
        }
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
