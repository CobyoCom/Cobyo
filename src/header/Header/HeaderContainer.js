import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectHasError} from '../../error/errorSelectors';
import Header from './Header';

class HeaderContainer extends Component {
  render() {
    return (
      <Header
        showError={this.props.showError}
      />
    );
  }
}

const mapStateToProps = state => ({
  showError: selectHasError(state)
});

export default connect(
  mapStateToProps
)(HeaderContainer);