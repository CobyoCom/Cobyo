import React from 'react';
import {connect} from 'react-redux';
import {clearError} from '../errorActions';
import {selectErrorMessage} from '../errorSelectors';
import ErrorBanner from './ErrorBanner';

const ErrorBannerContainer = props => (
  !!props.errorMessage ?
    <ErrorBanner {...props} /> :
    null
);

const mapStateToProps = state => ({
  errorMessage: selectErrorMessage(state)
});

const mapDispatchToProps = {
  clearError
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorBannerContainer)