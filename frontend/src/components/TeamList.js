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
    this.state = { teams: [], open: false, clickedTeam: 0 };
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
          teams: res.data.teams,
          clickedTeam: res.data.teams[0]._id
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteTeam = () => {
    const clickedTeam = this.state.teams[this.state.clickedTeam];
    axios
      .delete(`/api/teams/${clickedTeam._id}`)
      .then(res =>
        this.setState({
          teams: this.state.teams.filter(team => team !== clickedTeam)
        })
      )
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

  show = () => {
    console.log(this.state.clickedTeam);
    this.setState({ open: true });
  };

  handleConfirm = () => {
    this.deleteTeam();
    this.setState({ open: false });
  };

  handleCancel = () => this.setState({ open: false });

  render() {
    const panes = this.state.teams.map((team, idx) => {
      return {
        menuItem: team.name,
        teamId: team._id,
        render: () => (
          <Tab.Pane>
            <Button
              negative
              basic
              onClick={this.show}
              content="Delete Team"
              floated="right"
              size="small"
            />
            <Confirm
              open={this.state.open}
              onCancel={this.handleCancel}
              onConfirm={this.handleConfirm}
            />
            <TeamDetails key={idx} teamName={team.name} />
          </Tab.Pane>
        )
      };
    });
    return (
      <Segment basic attached padded>
        <Tab
          menu={{ fluid: true, vertical: true }}
          panes={panes}
          onTabChange={(e, data) =>
            this.setState({ clickedTeam: data.activeIndex })
          }
        />
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
