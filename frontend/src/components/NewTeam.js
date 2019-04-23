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
      rows: [],
      totalFantasyPts: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddSlot = this.handleAddSlot.bind(this);
    this.saveTeam = this.saveTeam.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.deletePlayer = this.deletePlayer.bind(this);
  }
  componentDidMount() {
    this.handleAddSlot();
  }
  componentDidUpdate() {
    if (this.state.rows.length === 0) {
      this.setState({ totalFantasyPts: 0 });
      this.handleAddSlot();
    }
  }

  handleAddSlot(e) {
    if (e) e.preventDefault();
    this.setState({
      slots: this.state.slots + 1,
      rows: [
        ...this.state.rows,
        <PlayerRow
          key={this.state.slots + 1}
          row={this.state.slots + 1}
          numRows={this.state.rows.length}
          selectedPlayer={this.addPlayer}
          handleDeletePlayer={this.deletePlayer}
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

  addPlayer(playerId, player, fantasyPts) {
    console.log(player);
    this.setState({
      players: [
        ...this.state.players,
        {
          _id: playerId,
          name: player
        }
      ],
      totalFantasyPts: this.state.totalFantasyPts + fantasyPts
    });
  }
  deletePlayer(playerId, key, fantasyPts) {
    this.setState({
      players: this.state.players.filter(player => player._id !== playerId),
      rows: this.state.rows.filter(row => parseInt(row.key) !== key),
      totalFantasyPts: this.state.totalFantasyPts - fantasyPts
    });
  }

  handleChange = (e, { value }) =>
    this.setState({ saved: "typing", teamName: value });

  render() {
    const { rows, teamName, saved, message, totalFantasyPts } = this.state;
    console.log(this.state.players);
    return (
      <Container>
        <br />
        <Header>Add your fantasy team</Header>
        <Divider />
        <Table celled compact definition sortable textAlign="center">
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell collapsing>Player</Table.HeaderCell>
              <Table.HeaderCell>Team</Table.HeaderCell>
              <Popup
                trigger={<Table.HeaderCell>GP</Table.HeaderCell>}
                content="Games Played"
              />
              <Popup
                trigger={<Table.HeaderCell>MIN</Table.HeaderCell>}
                content="Minutes Played Per Game"
              />
              <Popup
                trigger={<Table.HeaderCell>PTS</Table.HeaderCell>}
                content="Points Per Game"
              />
              <Popup
                trigger={<Table.HeaderCell>FG%</Table.HeaderCell>}
                content="Field Goal Percentage"
              />
              <Popup
                trigger={<Table.HeaderCell>FG3M</Table.HeaderCell>}
                content="Three Point Field Goals Made Per Game "
              />
              <Popup
                trigger={<Table.HeaderCell>FG3%</Table.HeaderCell>}
                content="Three Point Field Goal Percentage"
              />
              <Popup
                trigger={<Table.HeaderCell>FT%</Table.HeaderCell>}
                content="Free Throw Percentage"
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
              <Popup
                trigger={<Table.HeaderCell>FPTS</Table.HeaderCell>}
                content="NBA Fantasy Points"
              />
              <Table.HeaderCell collapsing />
            </Table.Row>
          </Table.Header>
          {rows}
          <Table.Footer fullWidth>
            <Table.Row textAlign="left">
              <Table.HeaderCell colSpan="14">
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
              <Table.HeaderCell style={{ textAlign: "center" }}>
                {totalFantasyPts === 0 ? 0 : totalFantasyPts.toFixed(1)}
              </Table.HeaderCell>
              <Table.HeaderCell />
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
    isAuthenticated: state.auth.isAuthenticated,
    players: state.players.players
  };
};
export default connect(
  mapStateToProps,
  { getPlayers }
)(NewTeam);
