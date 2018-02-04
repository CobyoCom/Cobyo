import React, {Component} from 'react';
import AttendeesListItem, {AttendeePropTypes} from './AttendeesListItem';

class AttendeesListItemContainer extends Component {

  static propTypes = {
    ...AttendeePropTypes
  };

  handleClickTravelMode = () => {

  };

  render() {
    return (
      <AttendeesListItem
        {...this.props}
        onClickTravelMode={this.handleClickTravelMode}
      />
    );
  }
}

export default AttendeesListItemContainer;