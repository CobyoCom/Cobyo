import React, { Component } from 'react';
import FacebookLoginButton from '../login/FacebookLoginButton';

class LoginPage extends Component {

  handleLoginSuccess = () => {
    this.props.history.push('/');
  };

  handleLoginFailure = () => {

  };

  render() {
    return (
      <div className="LoginPage">
        <FacebookLoginButton
          onLoginSuccess={this.handleLoginSuccess}
          onLoginFailure={this.handleLoginFailure}
        />
      </div>
    );
  }
}

export default LoginPage;
