import React from "react";
import { Table, Popup } from "semantic-ui-react";

const StatsHeader = () => {
  return (
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
  );
};
export default StatsHeader;
