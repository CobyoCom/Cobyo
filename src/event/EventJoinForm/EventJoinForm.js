import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectActiveEventCode } from "../activeEventSelectors";
import { editMe } from "../../me/meActions";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./EventJoinForm.css";

class EventJoinForm extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    editMe: PropTypes.func.isRequired
  };

  state = {
    nameValue: ""
  };

  getIsDisabled = () => !this.state.nameValue;

  handleChangeName = ({ target: { value: nameValue } }) =>
    this.setState({ nameValue });

  handleSubmit = e => {
    e.preventDefault();
    this.props.editMe(this.state.nameValue);
  };

  render() {
    return (
      <form className="EventJoinForm" onSubmit={this.handleSubmit}>
        <Input
          size="medium"
          maxLength={24}
          value={this.state.nameValue}
          placeholder={"Enter first name..."}
          onChange={this.handleChangeName}
          autoFocus
        />
        <Button disabled={this.getIsDisabled()} size="small">
          Join
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  code: selectActiveEventCode(state)
});

const mapDispatchToProps = {
  editMe
};

export default connect(mapStateToProps, mapDispatchToProps)(EventJoinForm);
