import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { logout } from "../../actions/auth";

const MainContainer = styled.div`
  margin: 1.5rem 2rem;
`;

const AuthContainer = styled.div`
  float: right;
`;

const StyledLink = styled(Link)`
  font-weight: normal;
  font-family: Optima, sans-serif;
  font-size: 1rem;
  color: gray;
  text-decoration: none;
`;

class NavBar extends Component {
  render() {
    return (
      <MainContainer>
        <StyledLink to="/"> Árbol </StyledLink>
        <AuthContainer>
          {this.props.loggedIn && (
            <StyledLink to="/" onClick={this.props.logout}>
              Log out
            </StyledLink>
          )}
        </AuthContainer>
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
