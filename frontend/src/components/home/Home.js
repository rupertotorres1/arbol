import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const StyledDiv = styled.div`
  text-align: center;
  margin-top: 25vh;
  margin-bottom: 25vh;
`;

const StyledH1 = styled.h1`
  margin: 0;
  font-size: 8.5rem;
  font-weight: normal;
  font-family: Optima, sans-serif;
  animation: ${fadeIn} 2s;
`;

const StyledP = styled.p`
  margin: 0 auto 1.8rem auto;
  font-size: 1.7rem;
  font-weight: normal;
  font-family: Optima, sans-serif;
  opacity: 0;
  animation: ${fadeIn} 2s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
`;

const StyledLink = styled(Link)`
  font-weight: normal;
  font-family: Optima, sans-serif;
  font-size: 1.3rem;
  display: inline-block;
  background-color: black;
  color: white;
  padding: 0.7em;
  text-decoration: none;
  border-radius: 2em;
  opacity: 0;
  animation: ${fadeIn} 2s;
  animation-delay: 2s;
  animation-fill-mode: forwards;
`;

class Home extends Component {
  render() {
    return (
      <>
        <StyledDiv>
          <StyledH1> Árbol </StyledH1>
          <StyledP> Organize your goals</StyledP>
          {this.props.loggedIn ? (
            <StyledLink to="/dashboard"> Go to Goals </StyledLink>
          ) : (
            <StyledLink to="/login"> Get started </StyledLink>
          )}
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

export default connect(mapStateToProps)(Home);
