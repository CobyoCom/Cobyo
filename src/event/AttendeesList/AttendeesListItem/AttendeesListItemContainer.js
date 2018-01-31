import React, {Component} from 'react';
import AttendeesListItem from './AttendeesListItem';

class AttendeesListItemContainer extends Component {
  render() {
    return (
      <AttendeesListItem
        {...this.props}
      />
    );
  }
}

export default AttendeesListItemContainer;