import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import TodoTree from "./TodoTree";
import NavBar from "../navbar/NavBar";

const StyledH1 = styled.h1`
  font-size: 2.5rem;
  font-weight: normal;
  font-family: Optima, sans-serif;
  text-align: center;
`;

class Dashboard extends Component {
  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <>
        <NavBar />
        <StyledH1>Goals</StyledH1>
        <TodoTree />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn
  };
};

export default connect(mapStateToProps)(Dashboard);
