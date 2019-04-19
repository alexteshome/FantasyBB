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
  Item,
  List,
  Menu,
  Popup,
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
  constructor(props) {
    super(props);
    this.state = {
      slots: 0,
      players: { 1: 0 },
      rows: []
    };
    this.handleAddSlot = this.handleAddSlot.bind(this);
    this.saveTeam = this.saveTeam.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.deleteSlot = this.deleteSlot.bind(this);
  }

  componentDidMount() {
    this.props.getPlayers();
    this.setState({
      slots: this.state.slots + 1,
      rows: [
        ...this.state.rows,
        <PlayerRow
          key={this.state.slots + 1}
          row={this.state.slots + 1}
          selectedPlayer={this.addPlayer}
          handleDeleteSlot={this.deleteSlot}
        />
      ]
    });
  }
  handleAddSlot(e) {
    e.preventDefault();
    this.setState({
      slots: this.state.slots + 1,
      rows: [
        ...this.state.rows,
        <PlayerRow
          key={this.state.slots + 1}
          row={this.state.slots + 1}
          selectedPlayer={this.addPlayer}
          handleDeleteSlot={this.deleteSlot}
        />
      ]
    });
  }
  saveTeam(e) {
    console.log(this.state.players);
  }
  addPlayer(key, playerId) {
    this.setState({
      players: { [key]: playerId }
    });
  }
  deleteSlot(key) {
    console.log(this.state);
    console.log(key);
    this.setState({
      rows: this.state.rows.filter(row => parseInt(row.key) !== key)
    });
  }
  render() {
    return (
      <Container>
        <br />
        <Header>Add your fantasy team</Header>
        <Table celled compact definition textAlign="center">
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell collapsing>Player</Table.HeaderCell>
              <Table.HeaderCell>Team</Table.HeaderCell>
              <Popup
                trigger={<Table.HeaderCell>GP</Table.HeaderCell>}
                content="Games Played"
              />
              <Popup
                trigger={<Table.HeaderCell>MP</Table.HeaderCell>}
                content="Minutes Played Per Game"
              />
              <Popup
                trigger={<Table.HeaderCell>FG%</Table.HeaderCell>}
                content="Field Goal Percentage"
              />
              <Popup
                trigger={<Table.HeaderCell>FT%</Table.HeaderCell>}
                content="Free Throw Percentage"
              />
              <Popup
                trigger={<Table.HeaderCell>PTS</Table.HeaderCell>}
                content="Points Per Game"
              />
              <Popup
                trigger={<Table.HeaderCell>REB</Table.HeaderCell>}
                content="Rebounds Per Game"
              />
              <Popup
                trigger={<Table.HeaderCell>AST</Table.HeaderCell>}
                content="Assists Per Game"
              />
              <Popup
                trigger={<Table.HeaderCell>STL</Table.HeaderCell>}
                content="Steals Per Game"
              />
              <Popup
                trigger={<Table.HeaderCell>BLK</Table.HeaderCell>}
                content="Blocks Per Game"
              />
              <Popup
                trigger={<Table.HeaderCell>TOV</Table.HeaderCell>}
                content="Turnovers Per Game"
              />
              <Table.HeaderCell collapsing />
            </Table.Row>
          </Table.Header>
          {this.state.rows}
          <Table.Footer fullWidth>
            <Table.Row textAlign="left">
              <Table.HeaderCell verticalAlign="middle" colSpan="13">
                <a
                  href="#"
                  style={{ textDecoration: "none" }}
                  onClick={this.handleAddSlot}
                >
                  <Icon name="add" />
                  Add Player
                </a>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <Button primary onClick={this.saveTeam}>
          Save Team
        </Button>
      </Container>
    );
  }
}

export default connect(
  null,
  { getPlayers }
)(NewTeam);
