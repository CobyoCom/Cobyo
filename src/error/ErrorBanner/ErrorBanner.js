import React from 'react';
import PropTypes from 'prop-types';
import Banner from '../../components/Banner/Banner';
import './ErrorBanner.css';

const ErrorBanner = props => (
  <Banner onClose={props.onClose}>
    <span className="ErrorBanner-message">{props.errorMessage}</span>
  </Banner>
);

ErrorBanner.propTypes = {
  errorMessage: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

ErrorBanner.defaultProps = {
  errorMessage: 'There was an error.'
};

export default ErrorBanner;
