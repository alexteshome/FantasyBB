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
  Table
} from "semantic-ui-react";
import axios from "axios";
import { connect } from "react-redux";

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
    let parts = this.props.match.url.split("/");
    const urlId = parts.pop() || parts.pop();

    const panels = this.state.teams.map((team, idx) => {
      const content = (
        <div>
          <Table key={idx} celled>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell collapsing>Name</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{this.renderBodyRow(idx)}</Table.Body>
          </Table>
          <Button
            as={Link}
            to={`/${urlId}/${encodeURIComponent(team.name)}`}
            primary
            content="View"
            style={{ width: "8.5em" }}
          />
          <Button
            negative
            content="Delete"
            onClick={this.show}
            style={{ width: "8.5em" }}
          />
          <Confirm
            open={this.state.open}
            onCancel={this.handleCancel}
            onConfirm={() => this.handleConfirm(team._id)}
          />
        </div>
      );
      return { key: "panel-" + idx, title: team.name, content: { content } };
    });
    return (
      <Container>
        <Accordion defaultActiveIndex={0} panels={panels} styled />
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
export default connect(mapStateToProps)(TeamList);
