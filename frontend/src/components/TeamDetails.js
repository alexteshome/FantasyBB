import React, { Component } from "react";
import { Container, Table, Header } from "semantic-ui-react";
import StatsHeader from "./StatsHeader";
import axios from "axios";
import { connect } from "react-redux";
import NBA from "nba";

class TeamDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { teamName: "", players: [] };
  }
  componentDidMount() {
    let parts = this.props.match.url.split("/");
    const urlId = parts.pop() || parts.pop();
    const teamName = decodeURIComponent(urlId);
    this.setState({ teamName });
    const userId = this.props.user.id;
    axios
      .get(`/api/teams/${userId}`)
      .then(res => {
        if (!res.data.teams) return;
        this.setState({
          players: res.data.teams.find(team => team.name == teamName).players
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const allPlayers = this.props.players;
    if (allPlayers.length == 0) return "";
    const team = this.state.players.map((player, key) => {
      const playerInfo = allPlayers.find(
        statePlayer => statePlayer.id == player._id
      );
      console.log(playerInfo);
      const stats = playerInfo.stats;
      return (
        <Table.Row key={key}>
          <Table.Cell key={player._id} verticalAlign="middle" singleLine>
            {player.name}
          </Table.Cell>
          <Table.Cell verticalAlign="middle">{playerInfo.team}</Table.Cell>
          <Table.Cell verticalAlign="middle">{stats.gp}</Table.Cell>
          <Table.Cell verticalAlign="middle">{stats.min}</Table.Cell>
          <Table.Cell verticalAlign="middle">{stats.pts}</Table.Cell>
          <Table.Cell verticalAlign="middle">{stats.fgPct}</Table.Cell>
          <Table.Cell verticalAlign="middle">{stats.fG3M}</Table.Cell>
          <Table.Cell verticalAlign="middle">{stats.fg3Pct}</Table.Cell>
          <Table.Cell verticalAlign="middle">{stats.ftPct}</Table.Cell>
          <Table.Cell verticalAlign="middle">{stats.reb}</Table.Cell>
          <Table.Cell verticalAlign="middle">{stats.ast}</Table.Cell>
          <Table.Cell verticalAlign="middle">{stats.stl}</Table.Cell>
          <Table.Cell verticalAlign="middle">{stats.blk}</Table.Cell>
          <Table.Cell verticalAlign="middle">{stats.tov}</Table.Cell>
          <Table.Cell verticalAlign="middle">{stats.fantasyPts}</Table.Cell>
        </Table.Row>
      );
    });

    return (
      <Container style={{ marginTop: "50px" }}>
        <Header textAlign="center">{this.state.teamName}</Header>
        <Table celled compact definition sortable textAlign="center">
          <Table.Header fullWidth>
            <StatsHeader />
          </Table.Header>
          <Table.Body>
            <Table.Row />
            {team}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    players: state.players.players
  };
};
export default connect(mapStateToProps)(TeamDetails);
