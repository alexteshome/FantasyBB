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
  state = {};

  handleSearchChange = (e, { value }) => this.setState({ playerID: value });
  handleChange = (e, { value }) => {
    const fetchPlayers = async () => {
      //convert country to country code for api url
      const players_api_call = await fetch(
        `https://cors-anywhere.herokuapp.com/http://data.nba.net/data/10s/prod/v1/2018/players/${value}_profile.json`
      );
      return players_api_call.json();
    };
    fetchPlayers().then(player => {
      const { teamdId } = player.league.standard;
      const {
        ppg,
        rpg,
        apg
      } = player.league.standard.stats.regularSeason.season[0].total;

      // NBA.stats.teamInfoCommon({ TeamID: teamId }).then(team => {
      this.setState({ playerID: value, ppg, rpg, apg });
      // });
    });
  };

  render() {
    const { playerID, ppg, rpg, apg } = this.state;
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
              options={this.props.players ? this.props.players : []}
              value={playerID}
            />
          </Table.Cell>
          <Table.Cell />
          <Table.Cell>{ppg}</Table.Cell>
          <Table.Cell>{rpg}</Table.Cell>
          <Table.Cell>{apg}</Table.Cell>
          <Table.Cell collapsing>
            <Icon name="close" />
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
