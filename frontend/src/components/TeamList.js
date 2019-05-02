import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  Button,
  Confirm,
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
  Tab,
  Table
} from "semantic-ui-react";
import axios from "axios";
import { connect } from "react-redux";
import TeamDetails from "./TeamDetails";

class TeamList extends Component {
  constructor(props) {
    super(props);
    this.state = { teams: [], open: false };
    this.renderBodyRow = this.renderBodyRow.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.show = this.show.bind(this);
  }

  componentDidMount() {
    const userId = this.props.user.id;
    axios
      .get(`/api/teams/${userId}`)
      .then(res => {
        if (!res.data.teams) return;
        console.log(res.data.teams);
        this.setState({
          teams: res.data.teams
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteTeam = teamId => {
    console.log(teamId);
    axios
      .delete(`/api/teams/${teamId}`)
      .then(res => console.log(res))
      .catch(err => {
        console.log(err.response);
      });
  };

  renderBodyRow = idx => {
    if (this.state.teams == undefined) return [];
    return this.state.teams[idx].players.map((player, key) => {
      return (
        <Table.Row key={key}>
          <Table.Cell key={player.id}>{player.name}</Table.Cell>
        </Table.Row>
      );
    });
  };

  show = () => this.setState({ open: true });

  handleConfirm = teamId => {
    console.log(teamId);
    this.deleteTeam(teamId);
    this.setState({ open: false });
  };

  handleCancel = () => this.setState({ open: false });

  render() {
    const panes = this.state.teams.map((team, idx) => {
      return {
        menuItem: team.name,
        render: () => (
          <Tab.Pane>
            <TeamDetails key={idx} teamName={team.name} />
          </Tab.Pane>
        )
      };
    });
    return (
      <Segment basic attached padded>
        <Tab menu={{ fluid: true, vertical: true }} panes={panes} />
      </Segment>
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
export default connect(mapStateToProps)(TeamList);
