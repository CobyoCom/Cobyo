import {connect} from 'react-redux';
import {clearError} from '../errorActions';
import {selectErrorMessage} from '../errorSelectors';
import ErrorBanner from './ErrorBanner';

const mapStateToProps = state => ({
  errorMessage: selectErrorMessage(state)
});

const mapDispatchToProps = {
  clearError
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorBanner)