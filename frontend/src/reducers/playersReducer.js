import { GET_ALL_PLAYERS } from "../actions/types";

export default function(state = { players: [] }, action) {
  switch (action.type) {
    case GET_ALL_PLAYERS:
      return {
        ...state,
        players: action.payload.map(player => {
          return {
            id: player.playerId,
            name: player.playerName,
            team: player.teamAbbreviation,
            stats: {
              gp: player.gp,
              min: player.min,
              pts: player.pts,
              fgPct: player.fgPct,
              fg3Pct: player.fg3Pct,
              fG3M: player.fG3M,
              ftPct: player.ftPct,
              reb: player.reb,
              ast: player.ast,
              stl: player.stl,
              blk: player.blk,
              tov: player.tov,
              fantasyPts: player.nbaFantasyPts
            },
            title: player.playerName,
            description: player.teamAbbreviation
          };
        })
      };
    default:
      return state;
  }
}
