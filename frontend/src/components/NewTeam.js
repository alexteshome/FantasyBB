import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Icon,
  Message,
  Table
} from "semantic-ui-react";
import { getPlayers } from "../actions/players";
import { connect } from "react-redux";
import StatsHeader from "./StatsHeader";
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
    if (this.state.slots < 14) this.handleAddSlot();
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
    const {
      slots,
      rows,
      teamName,
      saved,
      message,
      totalFantasyPts
    } = this.state;
    return (
      <Container>
        <br />
        <Header>Add your fantasy team</Header>
        <Divider />
        <Table celled compact definition sortable textAlign="center">
          <Table.Header fullWidth>
            <StatsHeader />
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
                  disabled={slots > 13}
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
    user: state.auth.user
  };
};
export default connect(mapStateToProps, { getPlayers })(NewTeam);
