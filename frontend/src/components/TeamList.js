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
import axios from "axios";
import { connect } from "react-redux";
import NBA from "nba";

class TeamList extends Component {
  constructor(props) {
    super(props);
    this.state = { teams: [] };
    this.renderBodyRow = this.renderBodyRow.bind(this);
  }

  componentDidMount() {
    const userId = this.props.user.id;
    axios
      .get(`/api/teams/${userId}`)
      .then(res => {
        if (!res.data.teams) return;
        this.setState({
          teams: res.data.teams
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  renderBodyRow = ({ _id, name }, i) => ({
    key: _id,
    cells: [
      _id || "No name specified",
      name ? { content: name, warning: false } : "unknown"
    ]
  });

  render() {
    console.log(this.state.teams);
    return (
      <Table
        celled
        headerRow={["ID", "Name"]}
        renderBodyRow={this.renderBodyRow}
        tableData={
          this.state.teams[3] ? this.state.teams[3].players : []
        }
      />
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
