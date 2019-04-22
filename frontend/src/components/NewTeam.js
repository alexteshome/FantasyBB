import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Icon,
  Message,
  Popup,
  Responsive,
  Search,
  Segment,
  Sidebar,
  Table
} from "semantic-ui-react";
import { getPlayers } from "../actions/players";
import { connect } from "react-redux";
import PlayerRow from "./PlayerRow";
import axios from "axios";

class NewTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: "typing",
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
    const { teamName, players } = this.state;
    if (players.length == 0) {
      this.setState({
        saved: "error",
        message: {
          header: "Team could not be saved",
          content: "Add players before saving the team"
        }
      });
    } else {
      axios
        .post("/api/teams/", {
          userId: this.props.user.id,
          name: teamName,
          players: players
        })
        .then(res => {
          this.setState({
            saved: "saved",
            message: res.data.message,
            teamName: "",
            slots: 0,
            players: [],
            rows: []
          });
        })
        .catch(err => {
          this.setState({ saved: "error", message: err.response.data.message });
        });
    }
  }

  addPlayer(key, playerId) {
    this.setState({
      players: [...this.state.players, playerId]
    });
  }
  deleteSlot(key) {
    this.setState({
      rows: this.state.rows.filter(row => parseInt(row.key) !== key)
    });
  }

  handleChange = (e, { value }) =>
    this.setState({ saved: "typing", teamName: value });

  render() {
    const { rows, teamName, saved, message } = this.state;
    return (
      <Container>
        <br />
        <Header>Add your fantasy team</Header>
        <Divider />
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
                <Button
                  style={{
                    background: "none",
                    border: "none",
                    margin: 0,
                    padding: 0,
                    cursor: "pointer",
                    color: "blue"
                  }}
                  onClick={this.handleAddSlot}
                >
                  <Icon name="add" />
                  Add Player
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <Form
          success={saved === "saved"}
          error={saved === "error"}
          onSubmit={this.saveTeam}
        >
          <Form.Input
            placeholder="Enter a team name"
            value={teamName}
            required
            onChange={this.handleChange}
          />
          {saved === "typing" ? (
            ""
          ) : (
            <Message
              success={saved === "saved"}
              error={saved === "error"}
              header={message.header}
              content={message.content}
            />
          )}
          <Button primary>Save Team</Button>
        </Form>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  };
};
export default connect(
  mapStateToProps,
  { getPlayers }
)(NewTeam);
