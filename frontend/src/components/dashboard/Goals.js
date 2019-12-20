import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchTodos, addTodo } from "../../actions/todos";
import Goal from "./Goal";

const StyledH1 = styled.h1`
  font-size: 2.5rem;
  font-weight: normal;
  font-family: Optima, sans-serif;
  text-align: center;
`;

const GoalsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const NewGoalButton = styled.button`
  font-size: 1rem;
  font-weight: normal;
  font-family: Optima, sans-serif;
  margin: 1em auto;
  width: 12rem;
  box-sizing: border-box;
  display: block;
  background-color: black;
  color: white;
  padding: 0.5em;
  border-radius: 0.5em;
  cursor: pointer;
`;

class Goals extends Component {
  addGoal = (event) => {
    this.props.addTodo({ text: "", parentId: this.props.currentGoalId });
  };

  render() {
    const { childrenIds } = this.props;
    return (
      <>
        <StyledH1>{this.props.currentGoalText}</StyledH1>
        <GoalsContainer>
          <ul style={{ listStyle: "none" }}>
            {childrenIds.map((id) => (
              <li key={id} style={{ marginLeft: "-40px" }}>
                <Goal id={id} />
              </li>
            ))}
          </ul>
        </GoalsContainer>
        <NewGoalButton onClick={this.addGoal}>New Goal</NewGoalButton>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const todos = state.todos.items;
  const { currentGoalId } = state.todos;
  return {
    currentGoalText: currentGoalId ? todos[currentGoalId].text : "Goals",
    currentGoalId: currentGoalId,
    childrenIds: currentGoalId
      ? todos[currentGoalId].childrenIds
      : Object.keys(todos).filter((id) => !todos[id].parentId)
  };
};

const mapDispatchToProps = {
  fetchTodos,
  addTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(Goals);
