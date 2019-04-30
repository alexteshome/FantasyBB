import PropTypes from "prop-types";
import React, { Component } from "react";
import { Icon, Search, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import _ from "lodash";

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
      fg3Pct: "-",
      fG3M: "-",
      pts: "-",
      reb: "-",
      ast: "-",
      stl: "-",
      blk: "-",
      tov: "-",
      fantasyPts: 0,
      isLoading: false,
      results: [],
      value: ""
    };
  }
  componentDidMount() {
    this.resetComponent();
    if (this.searchInputRef.focus) {
      this.searchInputRef.focus();
    }
  }
  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleSearchChange = (e, { value }) => {
    if (value.length < 3) {
      this.setState({ value });
      return;
    }
    if (this.state.fantasyPts !== "-") {
      this.props.handleDeletePlayer(
        this.props.row,
        this.state.fantasyPts,
        false
      );
      this.state = this.initialState;
    }
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.name);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.players, isMatch)
      });
    }, 300);
  };
  handleResultSelect = (e, { result }) => {
    this.props.selectedPlayer(result.id, result.name, result.stats.fantasyPts);

    this.setState({
      playerId: result.id,
      team: result.team,
      ...result.stats,
      value: result.name,
      selected: true
    });
  };

  render() {
    const {
      playerId,
      team,
      gp,
      min,
      pts,
      fgPct,
      fg3Pct,
      fG3M,
      ftPct,
      reb,
      ast,
      stl,
      blk,
      tov,
      fantasyPts,
      isLoading,
      results,
      value,
      selected
    } = this.state;
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell verticalAlign="middle" singleLine>
            {selected ? (
              value
            ) : (
              <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true
                })}
                results={value.length < 3 ? [] : results}
                value={value}
                placeholder="Select Player"
                input={{ ref: r => (this.searchInputRef = r) }}
              />
            )}
          </Table.Cell>
          <Table.Cell verticalAlign="middle">{team}</Table.Cell>
          <Table.Cell verticalAlign="middle">{gp}</Table.Cell>
          <Table.Cell verticalAlign="middle">{min}</Table.Cell>
          <Table.Cell verticalAlign="middle">{pts}</Table.Cell>
          <Table.Cell verticalAlign="middle">{fgPct}</Table.Cell>
          <Table.Cell verticalAlign="middle">{fG3M}</Table.Cell>
          <Table.Cell verticalAlign="middle">{fg3Pct}</Table.Cell>
          <Table.Cell verticalAlign="middle">{ftPct}</Table.Cell>
          <Table.Cell verticalAlign="middle">{reb}</Table.Cell>
          <Table.Cell verticalAlign="middle">{ast}</Table.Cell>
          <Table.Cell verticalAlign="middle">{stl}</Table.Cell>
          <Table.Cell verticalAlign="middle">{blk}</Table.Cell>
          <Table.Cell verticalAlign="middle">{tov}</Table.Cell>
          <Table.Cell verticalAlign="middle">{fantasyPts}</Table.Cell>
          <Table.Cell verticalAlign="middle">
            <Icon
              name="close"
              color="red"
              onClick={e => {
                e.preventDefault();
                this.props.handleDeletePlayer(
                  playerId,
                  this.props.row,
                  fantasyPts
                );
              }}
              style={
                this.props.numRows < 1 && !selected
                  ? { visibility: "hidden" }
                  : { visbility: "visible" }
              }
            />
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
