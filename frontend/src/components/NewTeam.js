import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Search,
  Segment,
  Sidebar,
  Table,
  Visibility
} from "semantic-ui-react";
import { getPlayers } from "../actions/players";
import { connect } from "react-redux";
import NBA from "nba";
import PlayerRow from "./PlayerRow";

class NewTeam extends Component {
  componentDidMount() {
    this.props.getPlayers();
  }
  render() {
    return (
      <Table celled compact definition>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell>Player</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
            <Table.HeaderCell>PPG</Table.HeaderCell>
            <Table.HeaderCell>RPG</Table.HeaderCell>
            <Table.HeaderCell>APG</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <PlayerRow />
      </Table>
    );
  }
}

export default connect(
  null,
  { getPlayers }
)(NewTeam);
