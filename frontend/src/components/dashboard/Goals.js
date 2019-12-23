import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ArrowUpward } from "@material-ui/icons";
import { fetchTodos, addTodo, changeCurrentGoalId } from "../../actions/todos";
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
  width: 10rem;
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
    this.props.addTodo({ text: "", parentId: this.props.goalId });
  };

  goToParent = (event) => {
    this.props.changeCurrentGoalId(this.props.parentId);
  };

  render() {
    const { childrenIds } = this.props;
    return (
      <>
        <StyledH1>
          {this.props.goalId && (
            <ArrowUpward
              onClick={this.goToParent}
              style={{ marginRight: "1rem", cursor: "pointer" }}
            ></ArrowUpward>
          )}
          {this.props.text}
        </StyledH1>
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
  // TODO: this might not be the best way

  const todos = state.todos.items;
  const { currentGoalId } = state.todos;
  return {
    goalId: currentGoalId,
    text: currentGoalId ? todos[currentGoalId].text : "Goals",
    parentId: currentGoalId ? todos[currentGoalId].parentId : null,
    childrenIds: currentGoalId
      ? todos[currentGoalId].childrenIds
      : Object.keys(todos).filter((id) => !todos[id].parentId)
  };
};

const mapDispatchToProps = {
  fetchTodos,
  addTodo,
  changeCurrentGoalId
};

export default connect(mapStateToProps, mapDispatchToProps)(Goals);
