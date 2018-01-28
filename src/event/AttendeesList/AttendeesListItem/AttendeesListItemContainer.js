import React, {Component} from 'react';
import AttendeesListItem from './AttendeesListItem';

class AttendeesListItemContainer extends Component {
  state = {
    isExpanded: false
  };

  handleClick = () => this.setState(prevState => ({isExpanded: !prevState.isExpanded}));

  render() {
    return (
      <AttendeesListItem
        {...this.props}
        {...this.state}
        onClick={this.handleClick}
      />
    );
  }
}

export default AttendeesListItemContainer;