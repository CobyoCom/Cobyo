import React from 'react';
import PropTypes from 'prop-types';
import ErrorBannerContainer from '../../error/ErrorBanner/ErrorBannerContainer';

const Header = props => (
  <div>
    Cobyo
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