import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import ReactionPicker from './ReactionPicker';
import './ReactionButton.css';

class ReactionButton extends Component {

  static propTypes = {

  };

  state = {
    isPickerOpen: false
  };

  handleClick = (e) => {
    e.preventDefault();

    this.setState(prevState => ({
      isPickerOpen: !prevState.isPickerOpen
    }));
  };

  render() {
    return (
      <div className="ReactionButton">
        <ReactionPicker isOpen={this.state.isPickerOpen}/>
        <Button
          size="small"
          variation="secondary"
          onClick={this.handleClick}
        >
          +
        </Button>
      </div>
    );
  }
}

export default ReactionButton;