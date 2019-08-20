import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./home/Home";
import Dashboard from "./dashboard/Dashboard";
import Auth from "./auth/Auth";
import { checkAuthenticated } from "../actions/auth";

class App extends Component {
  componentDidMount() {
    this.props.checkAuthenticated();
  }

  render() {
    return (
      !this.props.authLoading && (
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/register" component={Auth} />
          <Route path="/login" render={() => <Auth isLogin />} />
        </Router>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authLoading: state.auth.loading
  };
};
const mapDispatchToProps = {
  checkAuthenticated
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
