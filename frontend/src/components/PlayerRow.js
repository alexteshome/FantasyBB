import PropTypes from "prop-types";
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
import { connect } from "react-redux";
import NBA from "nba";

class PlayerRow extends Component {
  constructor(props) {
    super(props);

    this.state = this.initialState;
  }

  get initialState() {
    return {
      playerId: 0,
      team: "-",
      gp: "-",
      min: "-",
      fgPct: "-",
      ftPct: "-",
      pts: "-",
      reb: "-",
      ast: "-",
      stl: "-",
      blk: "-",
      tov: "-"
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.players !== prevProps.players) {
      this.setState({
        allPlayers: this.props.players.map(player => {
          return {
            key: player.personId,
            text: player.name + " - " + player.position,
            value: player.personId
          };
        })
      });
    }
  }
  handleSearchChange = (e, { searchQuery }) => {
    this.setState({ player: searchQuery });
  };
  handleChange = (e, { value }) => {
    if (!value) {
      this.setState(this.initialState);
      return;
    }
    this.props.selectedPlayer(this.props.row, value);
    console.log(this.props.row, value);
    NBA.stats.playerProfile({ PlayerID: value }).then(player => {
      const playerTotalStats = player.seasonTotalsRegularSeason;
      const playerLatestStats = playerTotalStats.pop();
      let {
        teamAbbreviation,
        gp,
        min,
        fgPct,
        ftPct,
        pts,
        reb,
        ast,
        stl,
        blk,
        tov
      } = playerLatestStats;
      if (teamAbbreviation === "TOT") {
        const playerStats = playerTotalStats.pop();
        teamAbbreviation = playerStats.teamAbbreviation;
      }

      this.setState({
        playerId: value,
        team: teamAbbreviation,
        gp,
        min,
        fgPct,
        ftPct,
        pts,
        reb,
        ast,
        stl,
        blk,
        tov
      });
    });
  };

  render() {
    const {
      playerId,
      team,
      gp,
      min,
      fgPct,
      ftPct,
      pts,
      reb,
      ast,
      stl,
      blk,
      tov
    } = this.state;

    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Dropdown
              onSearchChange={this.handleSearchChange}
              onChange={this.handleChange}
              placeholder="Select Player"
              search
              selection
              options={this.state.allPlayers}
              value={playerId}
            />
          </Table.Cell>
          <Table.Cell verticalAlign="middle">{team}</Table.Cell>
          <Table.Cell verticalAlign="middle">{gp}</Table.Cell>
          <Table.Cell verticalAlign="middle">{min}</Table.Cell>
          <Table.Cell verticalAlign="middle">{fgPct}</Table.Cell>
          <Table.Cell verticalAlign="middle">{ftPct}</Table.Cell>
          <Table.Cell verticalAlign="middle">{pts}</Table.Cell>
          <Table.Cell verticalAlign="middle">{reb}</Table.Cell>
          <Table.Cell verticalAlign="middle">{ast}</Table.Cell>
          <Table.Cell verticalAlign="middle">{stl}</Table.Cell>
          <Table.Cell verticalAlign="middle">{blk}</Table.Cell>
          <Table.Cell verticalAlign="middle">{tov}</Table.Cell>
          <Table.Cell verticalAlign="middle">
            {this.props.row !== 1 ? (
              <Icon
                name="close"
                color="red"
                circular
                onClick={e => {
                  e.preventDefault();
                  this.props.handleDeleteSlot(this.props.row);
                }}
              />
            ) : (
              ""
            )}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  }
}

const mapStateToProps = state => ({
  players: state.players.players
});

export default connect(mapStateToProps)(PlayerRow);
