import React from 'react';
import PropTypes from 'prop-types';

const ErrorBanner = props => (
  <div>{props.errorMessage}</div>
);

ErrorBanner.propTypes = {
  errorMessage: PropTypes.string
};

ErrorBanner.defaultProps = {
  errorMessage: ''
};

export default ErrorBanner;