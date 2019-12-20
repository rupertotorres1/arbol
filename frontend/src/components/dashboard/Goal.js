import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  updateTodo,
  deleteTodo,
  changeCurrentGoalId
} from "../../actions/todos";

const Box = styled.div`
  width: 12rem;
  margin-top: 0.7rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.2rem;
`;

const StyledInput = styled.textarea`
  font-family: Optima, sans-serif;
  width: 10rem;
  margin: 0.5rem auto;
  display: block;
  font-size: 1rem;
  resize: none;
  overflow: hidden;
`;

const StyledP = styled.p`
  font-family: Optima, sans-serif;
  width: 6rem;
  margin: 0.5rem 0.4rem;
  font-size: 1rem;
  word-wrap: break-word;
  cursor: pointer;
  display: inline-block;
`;

const DeleteTodoBtn = styled.button`
  margin-left: -10px;
  border-radius: 10px;
  margin-top: -10px;
  display: block;
  margin-bottom: -8px;
  background-color: #000000b0;
  color: white;
  cursor: pointer;
`;

class TodoNode extends Component {
  state = {
    isEditing: this.props.isNewTodo
  };

  textInput = React.createRef();

  componentDidMount() {
    if (this.state.isEditing) this.textInput.current.focus();
  }

  resizeInput = () => {
    this.textInput.current.style.height = "auto";
    this.textInput.current.style.height =
      this.textInput.current.scrollHeight + "px";
  };

  saveOnEnter = (event) => {
    if (event.key === "Enter") {
      this.textInput.current.blur();
    }
  };

  editGoal = (event) => {
    this.setState(
      {
        isEditing: true
      },
      () => {
        this.textInput.current.focus();
        this.resizeInput();
        // TODO: set cursor at the end
      }
    );
  };

  updateTodo = (event) => {
    const { id } = this.props;

    this.setState({
      isEditing: false
    });

    const newText = event.target.value;
    if (!newText) {
      this.props.deleteTodo(id);
    } else if (newText !== this.props.text) {
      this.props.updateTodo(id, newText);
    }
  };

  deleteTodo = (event) => {
    const { id } = this.props;
    this.props.deleteTodo(id);
  };

  changeCurrentGoalId = (event) => {
    this.props.changeCurrentGoalId(this.props.id);
  };

  render() {
    const { text } = this.props;
    const { isEditing } = this.state;

    return (
      <Box
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {!isEditing && <button>C</button>}
        {isEditing ? (
          <StyledInput
            rows="1"
            defaultValue={text}
            placeholder="Enter new goal"
            onBlur={this.updateTodo}
            onKeyDown={this.saveOnEnter}
            onChange={this.resizeInput}
            ref={this.textInput}
          />
        ) : (
          <StyledP onClick={this.changeCurrentGoalId}> {text}</StyledP>
        )}
        {!isEditing && <button onClick={this.editGoal}>E</button>}
        {!isEditing && <button onClick={this.deleteTodo}>D</button>}
      </Box>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    text: state.todos.items[ownProps.id].text,
    isNewTodo: ownProps.id == state.todos.newTodoId
  };
};

const mapDispatchToProps = {
  updateTodo,
  deleteTodo,
  changeCurrentGoalId
};

const ConnectedTodoNode = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoNode);

export default ConnectedTodoNode;
