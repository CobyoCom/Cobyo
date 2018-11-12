import React from "react";
import PropTypes from "prop-types";
import GoogleLogin from "react-google-login";
import { FaGoogle } from "react-icons/fa";
import "./LoginForm.css";

const CLIENT_ID =
  "984125752182-ut361co91neeoncn5hepr6m0frqo22bd.apps.googleusercontent.com";

const LoginForm = props => (
  <div className="LoginForm">
    <GoogleLogin
      className="LoginForm-button LoginForm-button--google"
      clientId={CLIENT_ID}
      onSuccess={props.onSuccess}
      onFailure={props.onFailure}
      responseType="id_token"
    >
      <FaGoogle size={20} />
      <span className="LoginForm-button-text">Google</span>
    </GoogleLogin>
  </div>
);

LoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired
};

export default LoginForm;
