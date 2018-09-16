import React, { Component } from 'react';
import LoginForm from './LoginForm';

class LoginFormContainer extends Component {
  handleLoginSuccess = response => {
    console.log(response);
    alert(response);
  };

  handleLoginFailure = response => {
    console.error(response);
    alert(response);
  };

  render() {
    return (
      <LoginForm
        onSuccess={this.handleLoginSuccess}
        onFailure={this.handleLoginFailure}
      />
    );
  }
}

export default LoginFormContainer;
