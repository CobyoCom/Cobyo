import React from 'react';
import { connect } from 'react-redux';
import { clearError } from '../errorBannerActions';
import ErrorBanner from './ErrorBanner';
import { selectErrorMessage } from '../../reducers/appState/appStateSelectors';

const ErrorBannerContainer = props =>
  !!props.errorMessage ? (
    <ErrorBanner {...props} onClose={props.clearError} />
  ) : null;

const mapStateToProps = state => ({
  errorMessage: selectErrorMessage(state)
});

const mapDispatchToProps = {
  clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ErrorBannerContainer
);
