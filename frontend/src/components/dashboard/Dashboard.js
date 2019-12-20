import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import Goals from "./Goals";
import NavBar from "../navbar/NavBar";
import { fetchTodos } from "../../actions/todos";

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <>
        <NavBar />
        <Goals />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps = {
  fetchTodos
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
