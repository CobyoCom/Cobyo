import React from 'react';
import PropTypes from 'prop-types';
import ErrorBannerContainer from '../../error/ErrorBanner/ErrorBannerContainer';
import './Header.css';

const Header = props => (
  <div className="Header">
    {props.showError && <ErrorBannerContainer/>}
  </div>
);

Header.propTypes = {
  showError: PropTypes.bool
};

Header.defaultProps = {
  showError: false
};

export default Header;