import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authentication";
import { withRouter } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

class Navbar extends Component {
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const authLinks = (
      <div onClick={this.onLogout.bind(this)}>
        {/* <img
            src={user.avatar}
            alt={user.name}
            title={user.name}
            className="rounded-circle"
            style={{ width: "25px", marginRight: "5px" }}
          /> */}
        Logout
      </div>
    );
    const guestLinks = (
      <div>
        <Link to="/register">
          <Button inverted>Sign Up</Button>
        </Link>
        <Link to="/login" style={{ marginLeft: "0.3em" }}>
          <Button inverted>Sign In</Button>
        </Link>
      </div>
    );
    return (
      <Segment inverted style={{ padding: "0 0" }} vertical>
        <Container>
          <Menu inverted size="huge">
            <Menu.Item as={Link} to="/" header>
              FantasyAT
            </Menu.Item>
            {isAuthenticated ? (
              <Menu.Item as={Link} to="/teamlist" header>
                Team List
              </Menu.Item>
            ) : (
              ""
            )}
            {isAuthenticated ? (
              <Menu.Item as={Link} to="/newteam">
                New Team
              </Menu.Item>
            ) : (
              ""
            )}
            {isAuthenticated ? (
              <Menu.Item onClick={this.onLogout.bind(this)} position="right">
                Logout
              </Menu.Item>
            ) : (
              <Menu.Item position="right" style={{ padding: "0" }}>
                {guestLinks}
              </Menu.Item>
            )}
          </Menu>
        </Container>
      </Segment>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
