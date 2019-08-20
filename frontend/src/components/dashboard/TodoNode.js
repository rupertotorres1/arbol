import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addTodo, updateTodo, deleteTodo } from "../../actions/todos";

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
  width: 10rem;
  margin: 0.5rem auto;
  font-size: 1rem;
  word-wrap: break-word;
`;

const AddChildBtn = styled.button`
  display: block;
  margin: -8px auto -10px auto;
  background-color: #000000b0;
  color: white;
  cursor: pointer;
  border-radius: 0.3rem;
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
    isHovering: false,
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

  handleMouseEnter = (event) => {
    this.setState({
      isHovering: true
    });
  };

  handleMouseLeave = (event) => {
    this.setState({
      isHovering: false
    });
  };

  handleClickText = (event) => {
    this.setState(
      {
        isEditing: true
      },
      () => {
        this.textInput.current.focus();
        this.resizeInput();
      }
    );
  };

  addTodo = (event) => {
    const parentId = this.props.id;
    this.props.addTodo({ text: "", parentId });
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

  render() {
    const { text, childrenIds } = this.props;
    const { isEditing, isHovering } = this.state;

    return (
      <>
        <Box
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {isHovering && (
            <DeleteTodoBtn title="Delete" onClick={this.deleteTodo}>
              x
            </DeleteTodoBtn>
          )}
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
            <StyledP onClick={this.handleClickText}> {text}</StyledP>
          )}
          {isHovering && (
            <AddChildBtn title="Add subgoal" onClick={this.addTodo}>
              {" "}
              +{" "}
            </AddChildBtn>
          )}
        </Box>
        <ul style={{ listStyle: "none" }}>
          {childrenIds.map((childId) => (
            <li key={childId}>
              <ConnectedTodoNode id={childId} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.todos.items[ownProps.id],
    isNewTodo: ownProps.id == state.todos.newTodoId
  };
};

const mapDispatchToProps = {
  addTodo,
  updateTodo,
  deleteTodo
};

const ConnectedTodoNode = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoNode);

export default ConnectedTodoNode;
