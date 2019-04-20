import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  List,
  Menu,
  Message,
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
import axios from "axios";

class NewTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: "",
      slots: 0,
      players: [],
      rows: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddSlot = this.handleAddSlot.bind(this);
    this.saveTeam = this.saveTeam.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.deleteSlot = this.deleteSlot.bind(this);
  }

  componentDidMount() {
    this.props.getPlayers();
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
    console.log(this.state.teamName);
    axios.get("/api/users/me").then(res => {
      axios
        .post("/api/teams/", {
          userId: res.data.id,
          name: this.state.teamName,
          players: this.state.players
        })
        .then(
          console.log
          //window.location.reload()
        )
        .catch(res => this.setState({ saved: false }));
    });
  }
  addPlayer(key, playerId) {
    this.setState({
      players: [...this.state.players, playerId]
    });
  }
  deleteSlot(key) {
    console.log(this.state);
    console.log(key);
    this.setState({
      rows: this.state.rows.filter(row => parseInt(row.key) !== key)
    });
  }

  handleChange = (e, { value }) => this.setState({ teamName: value });

  render() {
    const { rows, teamName } = this.state;
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
          {rows}
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
        <Form onSubmit={this.saveTeam}>
          <Form.Group>
            <Form.Input
              placeholder="Enter a team name"
              value={teamName}
              required
              onChange={this.handleChange}
            />
            <Button primary>Save Team</Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default connect(
  null,
  { getPlayers }
)(NewTeam);
