import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {init} from '../helpers/fb';
import {facebookLogin} from './loginActions';
import Button from '../components/Button/Button';

class FacebookLoginButton extends Component {
  static propTypes = {
    onLoginSuccess: PropTypes.func.isRequired,
    onLoginFailure: PropTypes.func.isRequired,
    facebookLogin: PropTypes.func.isRequired,
    text: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    type: PropTypes.oneOf(['button', 'submit']),
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    text: 'Facebook',
    size: 'medium',
    type: 'button',
    disabled: false
  };

  handleClick = () => {
    init().then(FB =>
      this.props.facebookLogin(FB)
        .then(this.props.onLoginSuccess)
        .catch(this.props.onLoginFailure)
    );
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

const mapDispatchToProps = {
  facebookLogin
};

export default connect(
  null,
  mapDispatchToProps
)(FacebookLoginButton);