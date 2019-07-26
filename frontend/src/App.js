import React, { Component } from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NewTeam from "./components/NewTeam";
import TeamList from "./components/TeamList";
import TeamDetails from "./components/TeamDetails";
import PrivateRoute from "./components/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import { getPlayers } from "./actions/players";

class App extends Component {
  componentDidMount() {
    this.props.getPlayers();
  }
  render() {
    return (
      <Router>
        <div>
          <Navbar />

          <div>
            <Route exact path="/home" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute
              exact
              authenticated={this.props.auth.isAuthenticated}
              path="/newteam"
              component={NewTeam}
            />
            <PrivateRoute
              exact
              authenticated={this.props.auth.isAuthenticated}
              path="/teamlist"
              component={TeamList}
            />
            <PrivateRoute
              exact
              authenticated={this.props.auth.isAuthenticated}
              path="/teamlist/:teamId"
              component={TeamDetails}
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

export default connect(
  mapStateToProps,
  { getPlayers }
)(withRouter(App));
