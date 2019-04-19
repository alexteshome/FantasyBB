import React, { Component } from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import NewTeam from "./components/NewTeam";
import PrivateRoute from "./components/PrivateRoute";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />

          <div >
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute
              exact
              authenticated={this.props.auth.isAuthenticated}
              path="/newteam"
              component={NewTeam}
            />
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(App));
