import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { login, register } from "../../actions/auth";
import NavBar from "../navbar/NavBar";

const StyledDiv = styled.div`
  text-align: center;
  width: 17rem;
  margin: 22vh auto 22vh auto;
`;

const StyledH1 = styled.h1`
  font-size: 2.5rem;
  font-weight: normal;
  font-family: Optima, sans-serif;
`;

const StyledInput = styled.input`
  font-size: 1rem;
  font-weight: normal;
  font-family: Optima, sans-serif;
  margin: 1em auto;
  width: 100%;
  box-sizing: border-box;
  display: block;
  padding: 0.5em;
  border-radius: 0.5em;
`;

const StyledBtn = styled.button`
  font-size: 1rem;
  font-weight: normal;
  font-family: Optima, sans-serif;
  margin: 1em auto;
  width: 100%;
  box-sizing: border-box;
  display: block;
  background-color: black;
  color: white;
  padding: 0.5em;
  border-radius: 0.5em;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  font-weight: normal;
  font-family: Optima, sans-serif;
  font-size: 1rem;
  display: inline-block;
  color: gray;
  text-decoration: none;
`;

class Auth extends Component {
  state = {
    username: "",
    password: ""
  };

  handleUsernameInput = (event) => {
    this.setState({
      username: event.target.value
    });
  };

  handlePasswordInput = (event) => {
    this.setState({
      password: event.target.value
    });
  };

  handleLogin = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.login({ username, password });
  };

  handleRegister = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.register({ username, password });
  };

  render() {
    const { loggedIn, isLogin } = this.props;

    if (loggedIn) {
      return <Redirect to="/dashboard" />;
    }

    const mainText = isLogin ? "Log in to Árbol" : "Join Árbol";
    const buttonText = isLogin ? "Log in" : "Create account";
    const redirectText = isLogin
      ? "Don't have an account yet?"
      : "Already have an account?";
    const redirectLocation = isLogin ? "/register" : "/login";
    const submitHandler = isLogin ? this.handleLogin : this.handleRegister;

    const { username, password } = this.state;

    return (
      <>
        <NavBar />
        <StyledDiv>
          <StyledH1>{mainText}</StyledH1>
          <form onSubmit={submitHandler}>
            <StyledInput
              type="text"
              placeholder="Username"
              value={username}
              onChange={this.handleUsernameInput}
            />
            <StyledInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.handlePasswordInput}
            />
            <StyledBtn>{buttonText}</StyledBtn>
          </form>
          <StyledLink to={redirectLocation}>{redirectText}</StyledLink>
        </StyledDiv>
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
  login,
  register
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
