import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchTodos, addTodo } from "../../actions/todos";
import TodoNode from "./TodoNode";

const GoalsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const NewGoalButton = styled.button`
  font-size: 1rem;
  font-weight: normal;
  font-family: Optima, sans-serif;
  margin: 1em auto;
  width: 10rem;
  box-sizing: border-box;
  display: block;
  background-color: black;
  color: white;
  padding: 0.5em;
  border-radius: 0.5em;
  cursor: pointer;
`;

class TodoTree extends Component {
  componentDidMount() {
    this.props.fetchTodos();
  }

  addTodo = (event) => {
    this.props.addTodo({ text: "", parentId: null });
  };

  render() {
    const { rootIds } = this.props;
    return (
      <>
        <GoalsContainer>
          <ul style={{ listStyle: "none" }}>
            {rootIds.map((id) => (
              <li key={id} style={{ marginLeft: "-40px" }}>
                <TodoNode id={id} />
              </li>
            ))}
          </ul>
        </GoalsContainer>
        <NewGoalButton onClick={this.addTodo}>New Goal</NewGoalButton>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const todos = state.todos.items;
  return {
    rootIds: Object.keys(todos).filter((id) => !todos[id].parentId)
  };
};

const mapDispatchToProps = {
  fetchTodos,
  addTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoTree);
