import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Redirect,
  Switch
} from "react-router-dom";
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

          <Switch>
            <Route
              exact
              path={process.env.PUBLIC_URL + "/home"}
              component={Home}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/register"}
              component={Register}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/login"}
              component={Login}
            />

            <PrivateRoute
              exact
              authenticated={this.props.auth.isAuthenticated}
              path={process.env.PUBLIC_URL + "/newteam"}
              component={NewTeam}
            />
            <PrivateRoute
              exact
              authenticated={this.props.auth.isAuthenticated}
              path={process.env.PUBLIC_URL + "/teamlist"}
              component={TeamList}
            />
            <PrivateRoute
              exact
              authenticated={this.props.auth.isAuthenticated}
              path={process.env.PUBLIC_URL + "/teamlist/:teamId"}
              component={TeamDetails}
            />
            <Route
              path="/"
              render={() => <Redirect to={process.env.PUBLIC_URL + "/home"} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getPlayers })(withRouter(App));
