import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {init} from '../helpers/fb';
import Button from '../components/Button/Button';

class FacebookLoginButton extends Component {
  static propTypes = {
    text: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    type: PropTypes.oneOf(['button', 'submit']),
    disabled: PropTypes.bool
  };

  static defaultProps = {
    text: 'Facebook',
    size: 'medium',
    type: 'button',
    disabled: false
  };

  handleClick = () => {
    init().then(FB => new Promise((resolve, reject) =>
      FB.login(response => {
        if (response.status === 'connected') {
          const {authResponse: {accessToken}} = response;
          localStorage.setItem('facebookToken', accessToken);
          resolve();
        } else {
          console.warn(`User did not authorize the Facebook application.`);
          reject();
        }
      }, {scope: 'public_profile,email,user_friends'})
    ));
  };

  render() {
    return (
      <Button
        onClick={this.handleClick}
        size={this.props.size}
        type={this.props.type}
        disabled={this.props.disabled}
      >
        {this.props.text}
      </Button>
    );
  }
}

export default FacebookLoginButton;